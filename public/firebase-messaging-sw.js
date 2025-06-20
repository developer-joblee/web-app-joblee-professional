// public/firebase-messaging-sw.js
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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem em background: ', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/pwa-192x192.png',
    badge: '/pwa-72x72.png',
    tag: 'joblee-notification',
    requireInteraction: true,
    title: data.title || data.notification?.title || 'Joblee',
  });
});
