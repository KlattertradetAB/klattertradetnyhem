-- 1. Skapa tabellen för att spara sidvisningar
CREATE TABLE IF NOT EXISTS public.page_views (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    path text NOT NULL,
    session_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- 2. Slå på säkerhetsprinciper (RLS)
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- 3. Tillåt VEM SOM HELST (inloggad eller oinloggad) att spara ett klick
CREATE POLICY "Allow tracking for everyone" ON public.page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- 4. Tillåt ENDAST inloggade personer (vi filtrerar admin i koden) att läsa statistiken
CREATE POLICY "Allow admins to read views" ON public.page_views
  FOR SELECT TO authenticated
  USING (true);
