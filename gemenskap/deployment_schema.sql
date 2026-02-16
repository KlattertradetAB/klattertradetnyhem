/* 
  UNIFIED DEPLOYMENT SCHEMA
  This file contains all unified database definitions for the "Gemenskap" platform.
  Execute this entire file in the Supabase SQL Editor to deploy the backend structure.
*/

-- ==========================================
-- 1. PROFILES & AUTH
-- ==========================================

create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text default 'user',
  membership_level int default 0,
  membership_active boolean default false,
  phone text,
  application_reason text,
  avatar_url text, 
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- ==========================================
-- 2. NOTIFICATIONS
-- ==========================================

create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

create policy "Users can view their own notifications."
  on public.notifications for select
  using ( auth.uid() = user_id );

create policy "Users can update their own notifications (mark as read)."
  on public.notifications for update
  using ( auth.uid() = user_id );

-- ==========================================
-- 3. CHAT MESSAGES
-- ==========================================

create table if not exists public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  thread_id text, -- 'general' or UUID
  content text not null,
  is_ai boolean default false,
  persona_id text,
  edit_count int default 0,
  is_edited boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.chat_messages enable row level security;

create policy "Authenticated users can read all messages."
  on public.chat_messages for select
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can send messages."
  on public.chat_messages for insert
  with check ( auth.role() = 'authenticated' AND auth.uid() = user_id );

-- Admin delete policy
create policy "Admins can delete messages"
  on public.chat_messages for delete
  using ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );

-- User update own policy
create policy "Users can update own messages"
  on public.chat_messages for update
  using ( auth.uid() = user_id );


-- ==========================================
-- 4. THREADS (Discussion Rooms)
-- ==========================================

create table if not exists public.threads (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  category text, 
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  author_name text,
  views integer default 0,
  replies_count integer default 0
);

alter table public.threads enable row level security;

create policy "Public threads are viewable by everyone"
  on public.threads for select
  using ( true );

create policy "Admins can insert threads"
  on public.threads for insert
  with check ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );

create policy "Admins can update threads"
  on public.threads for update
  using ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );

create policy "Admins can delete threads"
  on public.threads for delete
  using ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );

-- ==========================================
-- 5. BLOGS
-- ==========================================

create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  author_name text,
  views integer default 0
);

alter table public.blogs enable row level security;

create policy "Public blogs are viewable by everyone"
  on public.blogs for select
  using ( true );

create policy "Admins can insert blogs"
  on public.blogs for insert
  with check ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );

create policy "Admins can update blogs"
  on public.blogs for update
  using ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );

create policy "Admins can delete blogs"
  on public.blogs for delete
  using ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );

-- ==========================================
-- 6. TRIGGERS & FUNCTIONS
-- ==========================================

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role, membership_level, membership_active, phone, application_reason, avatar_url)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    coalesce(new.raw_user_meta_data->>'role', 'user'),
    coalesce((new.raw_user_meta_data->>'membership_level')::int, 0),
    coalesce((new.raw_user_meta_data->>'membership_active')::boolean, false),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'application_reason',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to handle chat notifications (Broadcast to all users except sender)
create or replace function public.handle_new_chat_message()
returns trigger as $$
begin
  -- Insert a notification for every user except the sender
  -- Only insert if the message is NOT from AI to avoid spam
  if new.is_ai = false then
    insert into public.notifications (user_id, title, message, created_at)
    select id, 'Nytt meddelande', 'Någon skrev i chatten', now()
    from public.profiles
    where id != new.user_id;
  end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for chat messages
drop trigger if exists on_chat_message_created on public.chat_messages;
create trigger on_chat_message_created
  after insert on public.chat_messages
  for each row execute procedure public.handle_new_chat_message();

-- ==========================================
-- 7. SURVEYS
-- ==========================================

create table if not exists public.survey_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text, -- Optional, can be anonymous
  answers jsonb not null, -- Stores the raw answers
  scores jsonb, -- Stores calculated scores
  metadata jsonb -- For any extra info
);

alter table public.survey_responses enable row level security;

create policy "Anyone can insert survey responses"
  on public.survey_responses for insert
  with check ( true );

create policy "Admins can view all survey responses"
  on public.survey_responses for select
  using ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );
