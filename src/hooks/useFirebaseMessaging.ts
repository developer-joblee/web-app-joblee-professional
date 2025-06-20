/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { messaging, getToken, onMessage } from '../firebase/firebase';

export const useFirebaseMessaging = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
        })
          .then((currentToken: string) => {
            if (currentToken) {
              setToken(currentToken);
              console.log('FCM Token:', currentToken);
            } else {
              console.warn('Sem token de registro');
            }
          })
          .catch((error: any) => {
            console.error('Erro ao buscar o token', error);
          });
      }
    });

    onMessage(messaging, (payload) => {
      console.log('Mensagem recebida em primeiro plano:', payload);
      setNotification(payload.notification);
    });
  }, []);

  return { token, notification };
};
