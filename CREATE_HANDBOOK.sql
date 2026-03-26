CREATE TABLE IF NOT EXISTS public.board_handbook (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    content text NOT NULL,
    category text NOT NULL,
    author_id uuid REFERENCES auth.users(id),
    created_at timestamp with time zone DEFAULT now()
);

-- Turn on Row Level Security
ALTER TABLE public.board_handbook ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (board members/admins) to read the handbook
CREATE POLICY "Allow authenticated users to read handbook" ON public.board_handbook
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to insert logic (can be restricted further if needed)
CREATE POLICY "Allow authenticated users to insert handbook" ON public.board_handbook
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to delete (should ideally only be admin)
CREATE POLICY "Allow authenticated users to delete handbook" ON public.board_handbook
  FOR DELETE TO authenticated USING (true);
