
-- 1:1 Direct Messaging Schema

-- 1. Conversation Rooms
CREATE TABLE IF NOT EXISTS public.dm_rooms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_message_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- 2. Participants
CREATE TABLE IF NOT EXISTS public.dm_participants (
  room_id uuid REFERENCES public.dm_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  last_read_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (room_id, user_id)
);

-- 3. Messages
CREATE TABLE IF NOT EXISTS public.dm_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id uuid REFERENCES public.dm_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  is_edited boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies

-- RLS Policies for dm_rooms
ALTER TABLE public.dm_rooms ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Users can see rooms they are in" ON public.dm_rooms
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.dm_participants
            WHERE room_id = dm_rooms.id AND user_id = auth.uid()
        )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- RLS Policies for dm_participants
ALTER TABLE public.dm_participants ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Users can see participants in their rooms" ON public.dm_participants
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.dm_participants p2
            WHERE p2.room_id = dm_participants.room_id AND p2.user_id = auth.uid()
        )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- RLS Policies for dm_messages
ALTER TABLE public.dm_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Users can see messages in their rooms" ON public.dm_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.dm_participants
            WHERE room_id = dm_messages.room_id AND user_id = auth.uid()
        )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can send messages to their rooms" ON public.dm_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.dm_participants
            WHERE room_id = dm_messages.room_id AND user_id = auth.uid()
        )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Stored Procedure to get or create a 1:1 room
CREATE OR REPLACE FUNCTION public.get_or_create_dm_room(other_user_id uuid)
RETURNS uuid AS $$
DECLARE
  v_room_id uuid;
BEGIN
  -- Check if a 1:1 room already exists between current user and other user
  SELECT p1.room_id INTO v_room_id
  FROM public.dm_participants p1
  JOIN public.dm_participants p2 ON p1.room_id = p2.room_id
  WHERE p1.user_id = auth.uid() 
    AND p2.user_id = other_user_id
    AND (SELECT count(*) FROM public.dm_participants WHERE room_id = p1.room_id) = 2; -- Ensure it's 1:1

  -- If not found, create it
  IF v_room_id IS NULL THEN
    INSERT INTO public.dm_rooms (metadata) VALUES ('{"type": "1:1"}'::jsonb) RETURNING id INTO v_room_id;
    
    INSERT INTO public.dm_participants (room_id, user_id) VALUES (v_room_id, auth.uid());
    INSERT INTO public.dm_participants (room_id, user_id) VALUES (v_room_id, other_user_id);
  END IF;

  RETURN v_room_id;
END;
-- 5. Enable Realtime for these tables
-- This is critical for the "instant" chat feel
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        CREATE PUBLICATION supabase_realtime;
    END IF;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- Add each table to the publication safely
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.dm_messages;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.dm_rooms;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.dm_participants;
EXCEPTION WHEN OTHERS THEN NULL; END $$;
