import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button, Flex } from '@chakra-ui/react';
import { LuArrowDownToLine } from 'react-icons/lu';

export const PWAInstallButton = () => {
  const { showInstallPrompt } = usePWAInstall();

  const handleInstall = async () => {
    const result = await showInstallPrompt();
    if (result) {
      console.log('Aplicativo instalado com sucesso!');
    } else {
      console.log('Instalação cancelada ou falhou.');
    }
  };

  return (
    <Flex position="fixed" bottom="20px" right="20px">
      <Button onClick={handleInstall}>
        Instalar Joblee <LuArrowDownToLine />
      </Button>
    </Flex>
  );
};
