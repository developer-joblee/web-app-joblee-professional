import { usePWAInstall } from '@/hooks/usePWAInstall';
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Text,
  Box,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const PWAInstallButton = () => {
  const {
    isInstalled,
    isInstallable,
    dismissInstallPrompt,
    showInstallPrompt,
  } = usePWAInstall();

  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  // Detectar iOS
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  // Verificar se é iOS e não está instalado
  useEffect(() => {
    if (isIOS() && !isInstalled && !isInstallable) {
      setShowIOSInstructions(true);
    }
  }, [isInstalled, isInstallable]);

  const handleInstall = async () => {
    const result = await showInstallPrompt();
    if (result) {
      console.log('Aplicativo instalado com sucesso!');
    } else {
      console.log('Instalação cancelada ou falhou.');
    }
  };

  const handleIOSDismiss = () => {
    setShowIOSInstructions(false);
    // Salvar preferência para não mostrar novamente por um tempo
    localStorage.setItem('ios-install-dismissed', Date.now().toString());
  };

  // Verificar se já foi dispensado recentemente
  const wasRecentlyDismissed = () => {
    const dismissed = localStorage.getItem('ios-install-dismissed');
    if (!dismissed) return false;

    const dismissedTime = parseInt(dismissed);
    const dayInMs = 24 * 60 * 60 * 1000;
    return Date.now() - dismissedTime < dayInMs; // Mostrar novamente após 1 dia
  };

  // Modal padrão para Android/Desktop
  if (!isIOS() && !isInstalled && isInstallable) {
    return (
      <Dialog.Root
        closeOnInteractOutside={false}
        open={true}
        size="xs"
        placement="bottom"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Positioner pointerEvents="none">
            <Dialog.Content margin="16px">
              <Dialog.Header>
                <Dialog.Title>Deseja instalar o App da Joblee?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text fontSize="sm">
                  Instalar o aplicativo permite que você use a Joblee como um
                  aplicativo nativo.
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={dismissInstallPrompt}
                  >
                    Cancelar
                  </Button>
                </Dialog.ActionTrigger>
                <Button size="sm" onClick={handleInstall}>
                  Instalar
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild onClick={dismissInstallPrompt}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }

  // Modal específico para iOS
  if (isIOS() && showIOSInstructions && !wasRecentlyDismissed()) {
    return (
      <Dialog.Root
        closeOnInteractOutside={false}
        open={true}
        size="sm"
        placement="bottom"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Positioner pointerEvents="none">
            <Dialog.Content margin="16px">
              <Dialog.Header>
                <Dialog.Title>📱 Instalar App no iOS</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text fontSize="sm" marginBottom="12px">
                  Para receber notificações e usar o app como nativo no iOS:
                </Text>
                <Box as="ol" fontSize="sm" paddingLeft="16px">
                  <li>
                    Toque no botão <strong>Compartilhar</strong> 📤 (parte
                    inferior da tela)
                  </li>
                  <li>
                    Role para baixo e toque em{' '}
                    <strong>"Adicionar à Tela de Início"</strong> ➕
                  </li>
                  <li>
                    Toque em <strong>"Adicionar"</strong> no canto superior
                    direito
                  </li>
                  <li>Use o app através do ícone na tela de início</li>
                </Box>
                <Text fontSize="xs" color="gray.500" marginTop="12px">
                  ℹ️ As notificações só funcionam quando o app é instalado desta
                  forma no iOS 16.4+
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button size="sm" onClick={handleIOSDismiss} width="100%">
                  Entendi
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }

  return null;
};
