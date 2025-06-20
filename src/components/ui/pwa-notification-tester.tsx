// src/components/PushNotificationTester.tsx
import { useFirebaseMessaging } from '@/hooks/useFirebaseMessaging';

export const PWANotificationTester = () => {
  const { token, notification } = useFirebaseMessaging();

  return (
    <div
      style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <h2>Push Notification Tester</h2>

      {token ? (
        <>
          <p>
            <strong>Seu FCM Token:</strong>
          </p>
          <textarea value={token} readOnly rows={4} style={{ width: '100%' }} />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Copie e cole esse token no Firebase Console para enviar notificações
            de teste.
          </p>
        </>
      ) : (
        <p>Solicitando permissão para notificações...</p>
      )}

      {notification && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#e6f7ff',
          }}
        >
          <h4>Notificação recebida em primeiro plano:</h4>
          <p>
            <strong>Título:</strong> {notification.title}
          </p>
          <p>
            <strong>Mensagem:</strong> {notification.body}
          </p>
        </div>
      )}
    </div>
  );
};
