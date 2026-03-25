-- Detta tar omedelbart bort krocken så att chatten börjar fungera igen!
DROP TRIGGER IF EXISTS on_chat_message_created ON public.chat_messages;
DROP FUNCTION IF EXISTS public.handle_new_chat_message();
