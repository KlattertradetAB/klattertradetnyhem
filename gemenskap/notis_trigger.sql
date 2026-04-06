-- Trigger for Direct Messages
CREATE OR REPLACE FUNCTION notify_dm_receiver()
RETURNS TRIGGER AS $$
DECLARE
    sender_name TEXT;
    receiver_id UUID;
    snippet TEXT;
BEGIN
    -- Get sender name
    SELECT full_name INTO sender_name FROM profiles WHERE id = NEW.user_id;
    
    -- Get receiver id (the other participant)
    SELECT user_id INTO receiver_id 
    FROM dm_participants 
    WHERE room_id = NEW.room_id AND user_id != NEW.user_id 
    LIMIT 1;

    snippet := left(NEW.content, 50) || (CASE WHEN length(NEW.content) > 50 THEN '...' ELSE '' END);

    -- Insert notification
    IF receiver_id IS NOT NULL THEN
        INSERT INTO notifications (user_id, title, message, type, thread_id, is_read)
        VALUES (
            receiver_id,
            'Nytt meddelande från ' || coalesce(split_part(sender_name, ' ', 1), 'Någon'),
            snippet,
            'dm',
            NEW.room_id,
            false
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_dm_message_insert ON dm_messages;
CREATE TRIGGER on_dm_message_insert
    AFTER INSERT ON dm_messages
    FOR EACH ROW EXECUTE FUNCTION notify_dm_receiver();

-- Trigger for Community Chat (Forum)
CREATE OR REPLACE FUNCTION notify_community_chat()
RETURNS TRIGGER AS $$
DECLARE
    sender_name TEXT;
    snippet TEXT;
    thread_title TEXT;
BEGIN
    -- Get sender name
    SELECT full_name INTO sender_name FROM profiles WHERE id = NEW.user_id;
    
    -- Get thread title if exists
    IF NEW.thread_id IS NOT NULL THEN
        SELECT title INTO thread_title FROM threads WHERE id = NEW.thread_id;
    ELSE
        thread_title := 'Allmän';
    END IF;

    snippet := left(NEW.content, 30) || (CASE WHEN length(NEW.content) > 30 THEN '...' ELSE '' END);

    -- Insert notifications for (some) active users or all?
    -- We can limit to 100 for now to avoid accidental spam/performance issues
    INSERT INTO notifications (user_id, title, message, type, thread_id, is_read)
    SELECT 
        p.id,
        'Nytt i ' || thread_title,
        coalesce(split_part(sender_name, ' ', 1), 'Någon') || ': ' || snippet,
        'chat',
        NEW.thread_id,
        false
    FROM profiles p
    WHERE p.id != NEW.user_id
    LIMIT 100;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_chat_message_insert ON chat_messages;
CREATE TRIGGER on_chat_message_insert
    AFTER INSERT ON chat_messages
    FOR EACH ROW EXECUTE FUNCTION notify_community_chat();
