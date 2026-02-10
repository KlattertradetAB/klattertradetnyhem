-- Create a table for survey responses
create table public.survey_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text, -- Optional, can be anonymous
  answers jsonb not null, -- Stores the raw answers (indices)
  scores jsonb, -- Stores calculated scores if needed (or just recalculate on read)
  metadata jsonb -- For any extra info (e.g., version of quiz)
);

-- Enable RLS
alter table public.survey_responses enable row level security;

-- Policies

-- Allow anyone to insert (public submission)
create policy "Anyone can insert survey responses"
  on public.survey_responses for insert
  with check ( true );

-- Allow users to view their own responses (if email matches, though this is tricky without auth. simpler: only admins view all)
-- For now, let's keep it simple: public insert, admin select.

create policy "Admins can view all survey responses"
  on public.survey_responses for select
  using ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ) );
