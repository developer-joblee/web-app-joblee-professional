import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from '../firebase-exports.ts';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Listener para mensagens em foreground (quando o app está ativo)
onMessage(messaging, (payload) => {
  console.log('📨 Mensagem recebida em foreground:', payload);

  // Verificar se Notification API está disponível antes de usar
  if (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    Notification.permission === 'granted'
  ) {
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
  } else {
    console.log('⚠️ Notification API não disponível ou permissão negada');
  }
});

export { messaging, getToken, onMessage };
