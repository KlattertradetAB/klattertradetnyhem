import { supabase } from './supabase';
import { getCurrentUser } from './auth';

export interface NotificationItem {
    id: string;
    title: string;
    message: string; // Changed from content to match DB
    created_at: string;
    is_read: boolean;
}

type NotificationListener = (notifications: NotificationItem[]) => void;
let listeners: NotificationListener[] = [];
let currentSubscription: any = null;

const notifyListeners = (notifications: NotificationItem[]) => {
    listeners.forEach(l => l(notifications));
};

export const fetchNotifications = async () => {
    const user = await getCurrentUser();
    if (!user) return [];

    // Filter by created_at > 24 hours ago
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .gt('created_at', oneDayAgo)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }

    notifyListeners(data || []);
    return data || [];
};

export const subscribeToNotifications = (listener: NotificationListener) => {
    listeners.push(listener);

    // Initial fetch
    fetchNotifications();

    // Setup realtime subscription if not exists
    if (!currentSubscription) {
        setupSubscription();
    }

    return () => {
        listeners = listeners.filter(l => l !== listener);
        if (listeners.length === 0 && currentSubscription) {
            currentSubscription.unsubscribe();
            currentSubscription = null;
        }
    };
};

const setupSubscription = async () => {
    const user = await getCurrentUser();
    if (!user) return;

    currentSubscription = supabase
        .channel('public:notifications')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
                // Determine if we should play sound (handled in frontend usually, but we can emit event)
                // fetch new list to ensure correct order/state
                fetchNotifications();

                // Optional: Trigger system notification sound here if desired
                // or let the UI component handle "new item" effects
            }
        )
        .subscribe();
};

export const markAsRead = async (id: string) => {
    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);

    if (!error) {
        fetchNotifications(); // Refresh state
    }
};

export const clearNotifications = async () => {
    const user = await getCurrentUser();
    if (!user) return;

    // We can either delete them or just mark all as read?
    // User asked "tills man tar bort alla", implying delete.
    const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);

    if (!error) {
        fetchNotifications();
    }
};

export const deleteNotification = async (id: string) => {
    const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

    if (!error) {
        fetchNotifications();
    }
};
