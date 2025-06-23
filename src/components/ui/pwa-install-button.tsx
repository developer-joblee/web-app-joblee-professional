import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';

export const PWAInstallButton = () => {
  const {
    isInstalled,
    isInstallable,
    dismissInstallPrompt,
    showInstallPrompt,
  } = usePWAInstall();

  const handleInstall = async () => {
    const result = await showInstallPrompt();
    if (result) {
      alert('Aplicativo instalado com sucesso!');
    } else {
      alert('Instalação cancelada ou falhou.');
    }
  };

  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      open={!isInstalled && isInstallable}
      size="xs"
      placement="bottom"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Positioner pointerEvents="none">
          <Dialog.Content margin="16px">
            <Dialog.Body>
              <Text fontSize="sm">Deseja instalar o aplicativo Joblee?</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={dismissInstallPrompt}
                >
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button size="xs" onClick={handleInstall}>
                Instalar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
