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

// ❌ REMOVER: onMessage não funciona em service worker
// messaging.onMessage só funciona no contexto principal da aplicação

// ✅ MANTER: onBackgroundMessage para notificações em background
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem em background: ', payload);

  // Melhor tratamento dos dados da notificação
  const notificationTitle =
    payload.notification?.title || payload.data?.title || 'Joblee';

  const notificationOptions = {
    body:
      payload.notification?.body || payload.data?.body || 'Nova notificação',
    icon: '/pwa-192x192.png', // Use caminho relativo se os ícones estão na pasta public
    badge: '/pwa-72x72.png',
    tag: 'joblee-notification',
    requireInteraction: true,
    // Dados customizados para quando a notificação for clicada
    data: {
      url: payload.data?.url || '/',
      ...payload.data,
    },
    // Vibração no dispositivo (se suportado)
    vibrate: [200, 100, 200],
    // Ações personalizadas (opcional)
    actions: [
      {
        action: 'open',
        title: 'Abrir',
        icon: '/pwa-72x72.png',
      },
    ],
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

// Melhor tratamento do click na notificação
self.addEventListener('notificationclick', function (event) {
  console.log('[SW] Notification click recebido.', event);

  event.notification.close();

  // Determinar URL de destino
  const urlToOpen = event.notification.data?.url || '/';

  // Lidar com ações específicas
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients
        .matchAll({
          type: 'window',
          includeUncontrolled: true,
        })
        .then(function (clientList) {
          // Se já existe uma janela aberta, focar nela
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (
              client.url.includes(self.location.origin) &&
              'focus' in client
            ) {
              return client.focus();
            }
          }

          // Se não há janela aberta, abrir uma nova
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        }),
    );
  }
});

// Tratamento de erro de notificação
self.addEventListener('notificationerror', function (event) {
  console.error('[SW] Erro na notificação:', event);
});

// Log quando o service worker é ativado
self.addEventListener('activate', function (event) {
  console.log('[SW] Service Worker ativado');
});

// Log quando o service worker é instalado
self.addEventListener('install', function (event) {
  console.log('[SW] Service Worker instalado');
});
