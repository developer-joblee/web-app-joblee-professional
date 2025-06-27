import { useState } from 'react';
import { messaging, getToken } from '@/firebase/firebase';

export const useNotification = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermission>('default');

  console.log('fcmToken', fcmToken);

  const handleAllowNotifications = async () => {
    try {
      if (!('Notification' in window)) {
        console.error('❌ Notification API não está disponível');
        setShowPrompt(false);
        return;
      }

      console.log('🔔 Solicitando permissão de notificação...');
      const permission = await Notification.requestPermission();
      console.log('📝 Permissão obtida:', permission);

      setPermissionStatus(permission);

      if (permission === 'granted') {
        if (messaging) {
          const currentToken = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
          });

          if (currentToken) {
            console.log('✅ FCM Token obtido:', currentToken);
            setFcmToken(currentToken);

            // Aqui você pode enviar o token para seu backend
            // await sendTokenToServer(currentToken);
          } else {
            console.warn('⚠️ Não foi possível obter o token FCM');
          }
        }

        setShowPrompt(false);
      } else {
        console.warn('⚠️ Permissão de notificação negada');
        setShowPrompt(false);
      }
    } catch (error) {
      console.error('❌ Erro ao solicitar permissão:', error);
      setShowPrompt(false);
    }
  };

  return {
    showPrompt,
    permissionStatus,
    handleAllowNotifications,
  };
};
