import { supabase } from './supabase';
import { getCurrentUser } from './auth';

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    created_at: string;
    is_read: boolean;
}

type NotificationListener = (notifications: NotificationItem[]) => void;
let listeners: NotificationListener[] = [];
let currentSubscription: any = null;
let cachedNotifications: NotificationItem[] = [];

const notifyListeners = (notifications: NotificationItem[]) => {
    cachedNotifications = notifications;
    listeners.forEach(l => l(notifications));
};

export const getNotifications = () => cachedNotifications;

const maintainLimit = async (userId: string) => {
    // Get all notifications IDs ordered by date
    const { data } = await supabase
        .from('notifications')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (data && data.length > 10) {
        const idsToDelete = data.slice(10).map(n => n.id);
        if (idsToDelete.length > 0) {
            await supabase
                .from('notifications')
                .delete()
                .in('id', idsToDelete);
        }
    }
};

export const addNotification = async (notification: { title: string; message: string }) => {
    const user = await getCurrentUser();
    if (!user) return;

    const { data, error } = await supabase
        .from('notifications')
        .insert([{
            user_id: user.id,
            title: notification.title,
            message: notification.message,
            is_read: false
        }])
        .select()
        .single();

    if (!error) {
        await maintainLimit(user.id);
        fetchNotifications();
    }
    return { data, error };
};

export const fetchNotifications = async () => {
    const user = await getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

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
                fetchNotifications();
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
