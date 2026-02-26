```sql
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'user',
  membership_level int default 0,
  membership_active boolean default false,
  phone text,
  application_reason text,
  timezone text,
  last_localization text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policy: Public profiles are viewable by everyone
do $$ begin
  create policy "Public profiles are viewable by everyone." on public.profiles for select using ( true );
exception when duplicate_object then null; end $$;

-- Policy: Users can insert their own profile
do $$ begin
  create policy "Users can insert their own profile." on public.profiles for insert with check ( auth.uid() = id );
exception when duplicate_object then null; end $$;

-- Policy: Users can update their own profile
do $$ begin
  create policy "Users can update own profile." on public.profiles for update using ( auth.uid() = id );
exception when duplicate_object then null; end $$;

-- Function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at on profiles
drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id, 
    email, 
    full_name, 
    role, 
    membership_level, 
    membership_active,
    phone,
    application_reason
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'user'),
    coalesce((new.raw_user_meta_data->>'membership_level')::int, 0),
    coalesce((new.raw_user_meta_data->>'membership_active')::boolean, false),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'application_reason'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
