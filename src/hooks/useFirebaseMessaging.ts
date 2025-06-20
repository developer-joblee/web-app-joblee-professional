/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useFirebaseMessaging.ts
import { useEffect, useState } from 'react';
import { messaging, getToken, onMessage } from '../firebase/firebase';

export const useFirebaseMessaging = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey:
            'BA0k9VVEMpos6SKh2--5iVUXrnnXy6bZD4y2v4GPuwiDzz-yn6VkysB-q6GjZul1DxLeSEgY_WUKvGU9g8zZA58',
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
