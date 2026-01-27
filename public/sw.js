const CACHE_NAME = 'horizonten-cache-v3';
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

// Fetch Event - REQUIRED FOR PWA INSTALLABILITY
self.addEventListener('fetch', (event) => {
    // Basic pass-through strategy (or cache-first if preferred later)
    // For now, we mainly need this handler to exist.
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
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
