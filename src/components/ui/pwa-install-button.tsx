/* eslint-disable react-hooks/exhaustive-deps */
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const PWAInstallButton = () => {
  const [canShowModal, setCanShowModal] = useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      const shouldShow = isInstalled || !isInstallable ? false : true;
      setCanShowModal(shouldShow);
    }, 5000);
  }, []);

  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      open={canShowModal}
      size="xs"
      placement="bottom"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Positioner pointerEvents="none">
          <Dialog.Content margin="16px">
            <Dialog.Header>
              <Dialog.Title>Deseja instalar o Joblee?</Dialog.Title>
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
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    // <Flex
    //   display={isInstalled || !isInstallable ? 'none' : 'flex'}
    //   position="fixed"
    //   bottom="20px"
    //   right="20px"
    // >
    //   <Button onClick={handleInstall}>
    //     Instalar Joblee <LuArrowDownToLine />
    //   </Button>
    // </Flex>
  );
};
