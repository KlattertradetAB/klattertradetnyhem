-- Klistra in detta i din Supabase under "SQL Editor" och tryck "Run" (Gröna knappen nere till höger)

-- 1. Lägg till kolumner i notifications ifall de saknas
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS thread_id text;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS type text DEFAULT 'chat';

-- 2. Skapa regeln (funktionen) som körs omedelbart när någon skriver i chatten
CREATE OR REPLACE FUNCTION public.handle_new_chat_message()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  sender_name text;
BEGIN
  -- Hämta vem som skickade meddelandet så vi kan skriva "Nytt från X"
  SELECT full_name INTO sender_name FROM public.profiles WHERE id = NEW.user_id;
  IF sender_name IS NULL THEN
     sender_name := 'En medlem';
  END IF;

  -- Endast om det inte är AI som skickar automatiskt (ta bort is_ai kollen om AI ska ge notiser)
  IF NEW.is_ai IS NOT TRUE THEN
      -- Skicka över en sparad notis till *alla* andra användare
      INSERT INTO public.notifications (user_id, title, message, thread_id, type, is_read)
      SELECT 
        p.id, 
        'Nytt från ' || sender_name, 
        LEFT(NEW.content, 40) || '...', 
        COALESCE(NEW.thread_id, 'general'), 
        'chat',
        false
      FROM public.profiles p
      WHERE p.id != NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- 3. Koppla regeln till tabellen chat_messages
DROP TRIGGER IF EXISTS on_chat_message_created ON public.chat_messages;
CREATE TRIGGER on_chat_message_created
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_chat_message();

-- KLART! Nu genereras notiser automatiskt även om mottagaren stängt av datorn.
