-- Create a table for threads
create table public.threads (
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

-- Enable RLS
alter table public.threads enable row level security;

-- Create policies
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
    select id from public.profiles where role = 'admin'
  ) );

-- Create a table for blogs
create table public.blogs (
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

-- Enable RLS for blogs
alter table public.blogs enable row level security;

-- Create policies for blogs
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
