const CACHE_NAME = 'horizonten-cache-v2';
const ASSETS_TO_CACHE = [
    '/app',
    '/manifest.json',
    '/assets/logo2.png'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Push Event - THIS IS THE CORE OF BACKGROUND NOTIFICATIONS
self.addEventListener('push', (event) => {
    let data = { title: 'Nytt meddelande', body: 'Du har fått ett nytt meddelande i gemenskapen.' };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: '/icon-app.jpeg',
        badge: '/icon-app.jpeg',
        vibrate: [100, 50, 100],
        data: {
            url: self.registration.scope
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification Click Event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
