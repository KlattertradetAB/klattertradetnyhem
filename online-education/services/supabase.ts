import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials from settings -> API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safeguard: Use a dummy URL if keys are not provided to prevent app crash/hang.
const isReady = !!supabaseUrl && !!supabaseAnonKey;

export const supabase = createClient(
  isReady ? supabaseUrl : 'https://placeholder-project.supabase.co',
  isReady ? supabaseAnonKey : 'placeholder-key'
);

if (!isReady) {
  console.warn("Supabase not configured. Please add your SUPABASE_URL and SUPABASE_ANON_KEY in services/supabase.ts");
}

/*
-- RUN THIS SQL IN YOUR SUPABASE SQL EDITOR --

-- Profiles table to store additional user info
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  email text,
  newsletter_opt_in boolean default false,
  accepted_terms text[] default '{}',
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Course Progress table
create table public.course_progress (
  user_id uuid references auth.users not null,
  course_id text not null,
  current_sub_module_id text,
  is_completed boolean default false,
  updated_at timestamp with time zone default now(),
  primary key (user_id, course_id)
);

-- Enable RLS
alter table public.course_progress enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create policy "Users can view own progress." on course_progress
  for select using (auth.uid() = user_id);

create policy "Users can update own progress." on course_progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update own progress update." on course_progress
  for update using (auth.uid() = user_id);
*/
