-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text default 'user',
  membership_level int default 0,
  membership_active boolean default false,
  phone text,
  application_reason text,
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
  insert into public.profiles (id, email, full_name, role, membership_level, membership_active, phone, application_reason)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    coalesce(new.raw_user_meta_data->>'role', 'user'),
    coalesce((new.raw_user_meta_data->>'membership_level')::int, 0),
    coalesce((new.raw_user_meta_data->>'membership_active')::boolean, false),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'application_reason'
  );
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

-- Create a table for Login Events (Analytics)
create table if not exists public.login_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  logged_in_at timestamp with time zone default timezone('utc'::text, now()) not null,
  metadata jsonb default '{}'::jsonb
);

-- RLS for Login Events
alter table public.login_events enable row level security;

create policy "Users can insert their own login events."
  on public.login_events for insert
  with check ( auth.uid() = user_id );

create policy "Admins can view all login events."
  on public.login_events for select
  using ( exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

-- Orders Table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  email text not null,
  book_title text not null,
  status text default 'Mottagen',
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.orders enable row level security;
create policy "Admins can manage all orders." on public.orders for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Bookings Table
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  email text not null,
  service_type text not null,
  booking_date date not null,
  booking_time text not null,
  status text default 'Väntar',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.bookings enable row level security;
create policy "Admins can manage all bookings." on public.bookings for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Contact Messages Table
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  sender_name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.contact_messages enable row level security;
create policy "Admins can manage all contact messages." on public.contact_messages for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
