
// Simple notification chime sound as base64 to ensure it works without external files
const NOTIFICATION_SOUND = 'data:audio/mp3;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAG1xUAALDkAALDkAAAL5hAAAIm5jPLr3a8wAAAAAAAAAAg6UAWCFAlh1fM+auYUBjK+P1GhzG128x+s2F8p/2k9p+hEONqDxd5f/nF3j8K/p4d/5f3/5+38/p/k73///+9/n////53/+//95////////3///9//7//+////2//3/3////////7///9///////_7///9//7//+////2//3/3////////7///9///////';

export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered with scope:', registration.scope);
            return registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
    return null;
};

export const playNotificationSound = () => {
    try {
        const audio = new Audio(NOTIFICATION_SOUND);
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed (user interaction needed first):', e));
    } catch (error) {
        console.error('Error playing sound:', error);
    }
};

export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return false;

    if (Notification.permission === 'granted') return true;

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
};

export const sendNotification = (title: string, body: string) => {
    // Play sound always (internal app notification)
    playNotificationSound();

    // Show system notification if in background/minimized
    if (document.hidden && Notification.permission === 'granted') {
        new Notification(title, {
            body,
            icon: '/assets/logo_transparent_final.png' // using our logo
        });
    }
};
