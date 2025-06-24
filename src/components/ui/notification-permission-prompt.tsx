/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Button, Dialog, Portal, Text, Box, Alert } from '@chakra-ui/react';
import { messaging, getToken } from '@/firebase/firebase';

export const NotificationPermissionPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermission>('default');
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  console.log('fcmToken', fcmToken);

  // Detecta se é iOS
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  // Detecta se a PWA está instalada
  const isPWAInstalled = () => {
    const windowObject: any = window || {};
    return (
      windowObject?.navigator.standalone === true ||
      windowObject?.matchMedia('(display-mode: standalone)').matches
    );
  };

  // Verifica suporte ao FCM
  const isFCMSupported = () => {
    const hasBasicSupport =
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'Notification' in window &&
      'PushManager' in window;

    if (isIOS()) {
      return hasBasicSupport && isPWAInstalled();
    }

    return hasBasicSupport;
  };

  useEffect(() => {
    // Verificar status atual da permissão
    if ('Notification' in window) {
      console.log('Notification permission status:');
      setPermissionStatus(Notification.permission);
    }

    // Mostrar prompt apenas se:
    // 1. FCM for suportado
    // 2. Permissão ainda não foi solicitada
    // 3. Não foi dispensado recentemente
    console.log('shouldShow');
    const shouldShow =
      isFCMSupported() &&
      Notification.permission === 'default' &&
      !wasRecentlyDismissed();

    setShowPrompt(shouldShow);
  }, []);

  const wasRecentlyDismissed = () => {
    const dismissed = localStorage.getItem('notification-prompt-dismissed');
    if (!dismissed) return false;

    const dismissedTime = parseInt(dismissed);
    const dayInMs = 24 * 60 * 60 * 1000;
    return Date.now() - dismissedTime < dayInMs;
  };

  const handleAllowNotifications = async () => {
    try {
      console.log('🔔 Solicitando permissão de notificação...');

      // Esta linha DEVE ser chamada dentro de um handler de evento do usuário
      const permission = await Notification.requestPermission();
      console.log('📝 Permissão obtida:', permission);

      setPermissionStatus(permission);

      if (permission === 'granted') {
        // Agora podemos obter o token FCM
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

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem(
      'notification-prompt-dismissed',
      Date.now().toString(),
    );
  };

  // Debug info
  const debugInfo = () => {
    console.log('=== Notification Debug ===');
    console.log('Is iOS:', isIOS());
    console.log('Is PWA Installed:', isPWAInstalled());
    console.log('FCM Supported:', isFCMSupported());
    console.log('Permission Status:', permissionStatus);
    console.log('Show Prompt:', showPrompt);
  };

  if (!showPrompt) return null;

  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      open={true}
      size="sm"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content margin="16px">
            <Dialog.Header>
              <Dialog.Title>🔔 Ativar Notificações</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text fontSize="sm" marginBottom="12px">
                Deseja receber notificações da Joblee? Você será informado
                sobre:
              </Text>
              <Box as="ul" fontSize="sm" paddingLeft="16px" marginBottom="12px">
                <li>• Novas oportunidades de trabalho</li>
                <li>• Mensagens de clientes</li>
                <li>• Atualizações importantes</li>
              </Box>

              {isIOS() && !isPWAInstalled() && (
                <Alert.Root
                  status="info"
                  fontSize="xs"
                  title="This is the alert title"
                >
                  <Alert.Indicator />
                  <Alert.Title>
                    📱 No iOS, certifique-se de ter instalado o app na tela
                    inicial primeiro.
                  </Alert.Title>
                </Alert.Root>
              )}

              {/* Debug button - remover em produção */}
              <Button
                size="xs"
                variant="ghost"
                onClick={debugInfo}
                marginTop="8px"
              >
                Debug Info (remover em produção)
              </Button>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                marginRight="8px"
              >
                Agora não
              </Button>
              <Button size="sm" onClick={handleAllowNotifications}>
                Permitir Notificações
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
