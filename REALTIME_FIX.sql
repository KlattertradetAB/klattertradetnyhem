/*
  ENABLE REALTIME FOR CHAT
  This script enables the supabase_realtime publication for all tables 
  involved in the community chat and notification system.
*/

-- 1. Enable Realtime for the necessary tables
-- We first check if the publication exists (default is supabase_realtime)
-- and then add the tables to it.

BEGIN;
  -- Vi lägger till tabellerna en och en för att undvika fel om någon tabell saknas
  DO $$ 
  BEGIN
    -- Enable for chat_messages (den viktigaste)
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'chat_messages') THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
    END IF;

    -- Enable for profiles
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
    END IF;

    -- Enable for notifications
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'notifications') THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
    END IF;

    -- Enable for threads (om den finns)
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'threads') THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.threads;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    -- Om den redan är tillagd eller annat fel uppstår, fortsätt bara
    RAISE NOTICE 'Kunde inte lägga till tabell i publication: %', SQLERRM;
  END $$;
COMMIT;

-- 2. Verify settings (Optional informational query)
-- SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
