import { supabase } from './supabase';
import { DmRoom, DmMessage, Profile } from '../types';

export const dmService = {
  /**
   * Fetches the current user's active DM conversations.
   * Joins with profiles to get the "other" participant's info.
   */
    async getConversations(): Promise<DmRoom[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        // 1. Get all room IDs the user is a participant in
        const { data: participants, error: pError } = await (supabase
            .from('dm_participants' as any) as any)
            .select('room_id')
            .eq('user_id', user.id);

        if (pError) {
          console.error('Error fetching participants:', pError);
          return [];
        }
        if (!participants || participants.length === 0) return [];

        const roomIds = (participants as any[]).map(p => p.room_id);

        // 2. Fetch the rooms and their (other) participants
        const { data: rooms, error: rError } = await (supabase
            .from('dm_rooms' as any) as any)
            .select(`
        *,
        dm_participants (
          user_id,
          profiles (
            id,
            full_name,
            avatar_url,
            role,
            email
          )
        )
      `)
            .in('id', roomIds)
            .order('last_message_at', { ascending: false });

        if (rError) {
          console.error('Error fetching rooms:', rError);
          return [];
        }
        if (!rooms) return [];

    // 3. Map to DmRoom interface, injecting the "other" user profile
    return (rooms as any[]).map(room => {
      const otherParticipant = room.dm_participants.find((p: any) => p.user_id !== user.id);
      return {
        id: room.id,
        created_at: room.created_at,
        last_message_at: room.last_message_at,
        metadata: room.metadata,
        other_user: otherParticipant?.profiles || null
      };
    });
  },

  /**
   * Gets or creates a DM room between the current user and another user.
   * Internal logic handled by a PostgreSQL function for atomicity.
   */
    async getOrCreateRoom(otherUserId: string): Promise<string | null> {
        const { data, error } = await (supabase.rpc as any)('get_or_create_dm_room', {
            other_user_id: otherUserId
        });

    if (error) {
      console.error('Error getting/creating DM room:', error);
      return null;
    }

    return data as string;
  },

  /**
   * Fetches messages for a specific DM room.
   */
    async getMessages(roomId: string, limit = 50): Promise<DmMessage[]> {
        const { data, error } = await (supabase
            .from('dm_messages' as any) as any)
            .select('*')
            .eq('room_id', roomId)
            .order('created_at', { ascending: true })
            .limit(limit);

    if (error) {
      console.error('Error fetching DM messages:', error);
      return [];
    }

    return data as DmMessage[];
  },

  /**
   * Fetches public threads where the current user has posted a message.
   */
  async getParticipatedThreads(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // 1. Get unique thread IDs from chat_messages for this user
    const { data: messageData, error: mError } = await supabase
      .from('chat_messages')
      .select('thread_id')
      .eq('user_id', user.id);

    if (mError) {
      console.error('Error fetching message data:', mError);
      return [];
    }
    if (!messageData) return [];

    const threadIds = [...new Set(messageData.map((m: any) => m.thread_id).filter(id => id !== null))];
    if (threadIds.length === 0) return [];

    // 2. Fetch thread details for those IDs
    const { data: threads, error: tError } = await supabase
      .from('threads')
      .select('*')
      .in('id', threadIds)
      .order('created_at', { ascending: false });

    if (tError || !threads) return [];
    return threads;
  },

  /**
   * Sends a message to a DM room.
   */
    async sendMessage(roomId: string, content: string): Promise<DmMessage | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await (supabase
            .from('dm_messages' as any) as any)
            .insert({
                room_id: roomId,
                user_id: user.id,
                content
            })
            .select()
            .single();

        if (error) {
            console.error('Error sending DM message:', error);
            return null;
        }

        // Update room's last_message_at
        await (supabase
            .from('dm_rooms' as any) as any)
            .update({ last_message_at: new Date().toISOString() })
            .eq('id', roomId);

        return data as DmMessage;
    },

  /**
   * Subscribes to new messages in a specific room.
   */
    subscribeToRoom(roomId: string, onNewMessage: (message: DmMessage) => void) {
        return supabase
            .channel(`dm:${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'dm_messages',
                    filter: `room_id=eq.${roomId}`
                },
                (payload) => {
                    onNewMessage(payload.new as DmMessage);
                }
            )
            .subscribe();
    },

  /**
   * Subscribes to any new DM messages for the current user (for notifications).
   */
  async subscribeToAllDMs(onNewMessage: (payload: any) => void) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // We can't filter by user_id for all DMs accurately in a single filter if we want to catch incoming.
    // Instead, we subscribe to ALL inserts on dm_messages and filter in JS, 
    // OR rely on the database trigger to create a notification.
    // Database trigger is better for performance and consistency.
    return null;
  }
};
