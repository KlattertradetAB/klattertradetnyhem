-- ==========================================
-- UNIFIED & ROBUST DATABASE FIX
-- ==========================================

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Unified)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email text,
  full_name text,
  role text DEFAULT 'user',
  membership_level int DEFAULT 0,
  membership_active boolean DEFAULT false,
  phone text,
  application_reason text,
  avatar_url text,
  timezone text,
  last_localization text,
  notifications_enabled boolean DEFAULT true,
  last_login timestamp with time zone,
  login_count int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. Login Events Table (MISSING IN ORIGINAL SCHEMA)
CREATE TABLE IF NOT EXISTS public.login_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  logged_in_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata jsonb
);

-- 4. Robust Trigger Function
-- This function is designed to NEVER throw an error (failsafe), 
-- preventing "Database error saving new user" during signup.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    role, 
    membership_level, 
    membership_active, 
    phone, 
    application_reason,
    avatar_url
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'user'),
    COALESCE((new.raw_user_meta_data->>'membership_level')::int, 0),
    COALESCE((new.raw_user_meta_data->>'membership_active')::boolean, false),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'application_reason',
    new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = now();
    
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- We log to Postgres logs but return NEW so Auth creation succeeds
  RAISE WARNING 'Error in handle_new_user trigger for user %: %', new.id, SQLERRM;
  RETURN new;
END;
$$;

-- 5. Re-apply Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. Updated At Trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 7. Ensure RLS is active but permits work
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING ( true );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK ( auth.uid() = id );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING ( auth.uid() = id );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 8. Enable permissions for login_events
ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Users can insert their own login events" ON public.login_events FOR INSERT WITH CHECK ( auth.uid() = user_id );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
