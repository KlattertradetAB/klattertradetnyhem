
export interface NotificationItem {
    id: string;
    title: string;
    content: string;
    time: string;
    timestamp: number;
    icon: string; // Emoji or Lucide icon name
    color: string;
    read: boolean;
    groupId?: string;
}

const STORAGE_KEY = 'horizonten_notifications';

type NotificationListener = (notifications: NotificationItem[]) => void;
let listeners: NotificationListener[] = [];

export const getNotifications = (): NotificationItem[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error('Error parsing notifications:', e);
        return [];
    }
};

const saveNotifications = (notifications: NotificationItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    listeners.forEach(l => l(notifications));
};

export const addNotification = (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'> & { groupId?: string }) => {
    const notifications = getNotifications();
    const newNotification: NotificationItem = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        read: false
    };

    saveNotifications([newNotification, ...notifications].slice(0, 50)); // Keep last 50
};

export const addGroupedNotification = (
    data: { title: string; content: string; icon: string; color: string; senderName: string; groupId: string }
) => {
    const notifications = getNotifications();
    const now = Date.now();
    const GROUP_WINDOW = 2 * 60 * 1000; // 2 minutes

    // Find if there's a recent notification with the same groupId
    const existingIndex = notifications.findIndex(n => n.groupId === data.groupId && (now - n.timestamp) < GROUP_WINDOW);

    if (existingIndex !== -1) {
        const existing = notifications[existingIndex];
        // Parse how many people are in the group
        const match = existing.title.match(/(\d+) till/);
        const count = match ? parseInt(match[1]) + 1 : 2;

        const updatedNotification: NotificationItem = {
            ...existing,
            title: `${data.senderName} och ${count - 1} till har skrivit`,
            content: data.content, // Show the latest message snippet
            timestamp: now, // Refresh timestamp
            read: false
        };

        const newNotifications = [...notifications];
        newNotifications[existingIndex] = updatedNotification;
        // Move to top
        newNotifications.splice(existingIndex, 1);
        saveNotifications([updatedNotification, ...newNotifications].slice(0, 50));
    } else {
        addNotification({
            title: data.title,
            content: data.content,
            icon: data.icon,
            color: data.color,
            time: 'Just nu',
            groupId: data.groupId
        });
    }
};

export const clearNotifications = () => {
    saveNotifications([]);
};

export const deleteNotification = (id: string) => {
    const notifications = getNotifications();
    saveNotifications(notifications.filter(n => n.id !== id));
};

export const subscribeToNotifications = (listener: NotificationListener) => {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter(l => l !== listener);
    };
};
