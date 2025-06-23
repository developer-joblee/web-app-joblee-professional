import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from '../firebase-exports.ts';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Listener para mensagens em foreground (quando o app está ativo)
onMessage(messaging, (payload) => {
  console.log('📨 Mensagem recebida em foreground:', payload);

  // Exibir notificação manualmente quando o app está em foreground
  if (Notification.permission === 'granted') {
    const notificationTitle = payload.notification?.title || 'Joblee';
    const notificationOptions = {
      body: payload.notification?.body || 'Nova mensagem',
      icon: '/pwa-192x192.png',
      badge: '/pwa-72x72.png',
      tag: 'joblee-foreground',
      requireInteraction: false, // Não bloquear o usuário em foreground
      silent: false,
    };

    new Notification(notificationTitle, notificationOptions);
  }
});

export { messaging, getToken, onMessage };
