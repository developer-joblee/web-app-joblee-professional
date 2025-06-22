importScripts(
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyAzcYrX50165LRcF5TEhXcOl8nYDeO9o_A',
  authDomain: 'joblee-professional.firebaseapp.com',
  projectId: 'joblee-professional',
  messagingSenderId: '708447937247',
  appId: '1:708447937247:web:a83bf056ed41af06caff6a',
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Mensagem em background: ', payload);
//   const { title, body } = payload.notification;
//   self.registration.showNotification(title, {
//     body,
//     icon: 'https://i.postimg.cc/qBQLv6Cz/pwa-192x192.png',
//     badge: 'https://i.postimg.cc/prVJBR3W/pwa-72x72.png',
//     tag: 'joblee-notification',
//     requireInteraction: true,
//     title: data.title || data.notification?.title || 'Joblee',
//   });
// });

messaging.onNotificationClick((payload) => {
  console.log('[firebase-messaging-sw.js] Notificação clicada: ', payload);
});

messaging.onMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem em foreground: ', payload);
});

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem em background: ', payload);

  const notificationTitle =
    payload.notification?.title || payload.data?.title || 'Joblee';
  const notificationOptions = {
    body:
      payload.notification?.body || payload.data?.body || 'Nova notificação',
    icon: 'https://i.postimg.cc/qBQLv6Cz/pwa-192x192.png',
    badge: 'https://i.postimg.cc/prVJBR3W/pwa-72x72.png',
    tag: 'joblee-notification',
    requireInteraction: true,
    // data: {
    //   url: payload.data?.url || '/',
    //   ...payload.data,
    // },
    // actions: [
    //   {
    //     action: 'open',
    //     title: 'Abrir',
    //     icon: 'https://i.postimg.cc/prVJBR3W/pwa-72x72.png',
    //   },
    // ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/')); // ou alguma URL dinâmica
});

self.addEventListener('push', function (event) {
  const data = event.data?.json() || {};
  const title = data.title || 'Notificação';
  const options = {
    body: data.body || 'Você recebeu uma nova mensagem!',
    icon: 'https://i.postimg.cc/qBQLv6Cz/pwa-192x192.png',
    badge: 'https://i.postimg.cc/prVJBR3W/pwa-72x72.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
