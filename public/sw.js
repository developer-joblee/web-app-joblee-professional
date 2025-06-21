// No seu service worker (sw.js ou similar)
self.addEventListener('push', function (event) {
  // Lógica para lidar com push notifications
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação',
    icon: 'https://i.postimg.cc/qBQLv6Cz/pwa-192x192.png',
    badge: 'https://i.postimg.cc/prVJBR3W/pwa-72x72.png',
  };

  event.waitUntil(
    self.registration.showNotification(event.data.title, options),
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  console.log('Notificação clicada');
  // Lógica para quando o usuário clica na notificação
});
