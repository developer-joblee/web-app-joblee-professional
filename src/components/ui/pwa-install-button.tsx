import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button, Flex } from '@chakra-ui/react';
import { LuArrowDownToLine } from 'react-icons/lu';

export const PWAInstallButton = () => {
  const { isInstalled, isInstallable, showInstallPrompt } = usePWAInstall();

  const handleInstall = async () => {
    const result = await showInstallPrompt();
    if (result) {
      alert('Aplicativo instalado com sucesso!');
    } else {
      alert('Instalação cancelada ou falhou.');
    }
  };

  return (
    <Flex
      display={isInstalled || !isInstallable ? 'none' : 'flex'}
      position="fixed"
      bottom="20px"
      right="20px"
    >
      <Button onClick={handleInstall}>
        Instalar Joblee <LuArrowDownToLine />
      </Button>
    </Flex>
  );
};
