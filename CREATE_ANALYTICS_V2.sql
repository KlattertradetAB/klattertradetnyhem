-- 1. Lägg till nya kolumner för avancerad spårning
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS device text;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS referrer text;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS screen_res text;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS browser_language text;
ALTER TABLE public.page_views ADD COLUMN IF NOT EXISTS time_zone text;

-- Observera: Denna uppdatering påverkar inte gammal data, all gammal data får NULL i de nya fälten.
