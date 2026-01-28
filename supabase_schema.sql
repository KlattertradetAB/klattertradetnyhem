-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text default 'user',
  membership_level int default 0,
  membership_active boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Policy: Public profiles are viewable by everyone (or just authenticated users depending on need)
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

-- Policy: Users can insert their own profile.
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

-- Policy: Users can update their own profile.
create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a table for Notifications
create table notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Notifications
alter table notifications enable row level security;

create policy "Users can view their own notifications."
  on notifications for select
  using ( auth.uid() = user_id );

create policy "Users can update their own notifications (mark as read)."
  on notifications for update
  using ( auth.uid() = user_id );

-- Create a table for Chat Messages (Community Chat)
create table chat_messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  thread_id text, -- Can be 'general' or specific thread UUIDs
  content text not null,
  is_ai boolean default false,
  persona_id text, -- ID of the AI persona if is_ai is true
  edit_count int default 0,
  is_edited boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Chat Messages
alter table chat_messages enable row level security;

create policy "Authenticated users can read all messages."
  on chat_messages for select
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can send messages."
  on chat_messages for insert
  with check ( auth.role() = 'authenticated' AND auth.uid() = user_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to handle chat notifications (Broadcast to all users except sender)
create or replace function public.handle_new_chat_message()
returns trigger as $$
begin
  -- Insert a notification for every user except the sender
  -- This might be slow for large user bases, but fits the current requirement.
  insert into public.notifications (user_id, title, message, created_at)
  select id, 'Nytt meddelande', 'Någon skrev i chatten', now()
  from public.profiles
  where id != new.user_id;
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for chat messages
create trigger on_chat_message_created
  after insert on public.chat_messages
  for each row execute procedure public.handle_new_chat_message();
