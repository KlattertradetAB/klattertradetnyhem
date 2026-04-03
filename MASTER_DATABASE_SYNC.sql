-- MASTER REPAIR SCRIPT FOR HORIZONTEN GEMENSKAP
-- Copy and run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/tkvogxqtylddfzzsgmtv/sql/new)

-- 1. Ensure Profiles Table exists with correct columns
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  avatar_url text,
  role text DEFAULT 'medlem',
  email text,
  last_login timestamp with time zone,
  login_count integer DEFAULT 0,
  membership_level integer DEFAULT 2,
  membership_active boolean DEFAULT true,
  notifications_enabled boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Ensure Threads Table exists (Fixes the 404 error)
CREATE TABLE IF NOT EXISTS public.threads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  category text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_name text,
  views integer DEFAULT 0,
  replies_count integer DEFAULT 0
);

ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Threads are viewable by everyone." ON public.threads FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 3. 1:1 Direct Messaging Infrastructure
CREATE TABLE IF NOT EXISTS public.dm_rooms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_message_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS public.dm_participants (
  room_id uuid REFERENCES public.dm_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  last_read_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (room_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.dm_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id uuid REFERENCES public.dm_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  is_edited boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for Messaging
ALTER TABLE public.dm_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dm_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dm_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Users see their own rooms" ON public.dm_rooms FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.dm_participants WHERE room_id = dm_rooms.id AND user_id = auth.uid()));
    
    CREATE POLICY "Users see members in their rooms" ON public.dm_participants FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.dm_participants p2 WHERE p2.room_id = dm_participants.room_id AND p2.user_id = auth.uid()));
    
    CREATE POLICY "Users see messages in their rooms" ON public.dm_messages FOR SELECT 
    USING (EXISTS (SELECT 1 FROM public.dm_participants WHERE room_id = dm_messages.room_id AND user_id = auth.uid()));

    CREATE POLICY "Users can send messages" ON public.dm_messages FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM public.dm_participants WHERE room_id = dm_messages.room_id AND user_id = auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 4. The Stored Procedure for atomic room creation
CREATE OR REPLACE FUNCTION public.get_or_create_dm_room(other_user_id uuid)
RETURNS uuid AS $$
DECLARE
  v_room_id uuid;
BEGIN
  -- 1. Check for existing 1:1 room
  SELECT p1.room_id INTO v_room_id
  FROM public.dm_participants p1
  JOIN public.dm_participants p2 ON p1.room_id = p2.room_id
  WHERE p1.user_id = auth.uid() 
    AND p2.user_id = other_user_id
    AND (SELECT count(*) FROM public.dm_participants WHERE room_id = p1.room_id) = 2;

  -- 2. Create if not found
  IF v_room_id IS NULL THEN
    INSERT INTO public.dm_rooms (metadata) VALUES ('{"type": "1:1"}'::jsonb) RETURNING id INTO v_room_id;
    INSERT INTO public.dm_participants (room_id, user_id) VALUES (v_room_id, auth.uid()), (v_room_id, other_user_id);
  END IF;

  RETURN v_room_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Enable Realtime
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Add tables to realtime publication
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.dm_messages, public.dm_rooms, public.dm_participants;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- 6. Chat Activity Triggers (Optional but good)
-- Updates last_message_at on the room
CREATE OR REPLACE FUNCTION public.handle_new_dm_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.dm_rooms SET last_message_at = NOW() WHERE id = NEW.room_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$ BEGIN
    CREATE TRIGGER on_dm_message_created
    AFTER INSERT ON public.dm_messages
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_dm_message();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

COMMIT;
