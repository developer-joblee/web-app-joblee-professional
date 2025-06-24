import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { LuConstruction, LuLifeBuoy, LuRotateCcw } from 'react-icons/lu';

export const ErrorFallback = () => {
  return (
    <Stack
      height="70vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      gap="24px"
    >
      <LuConstruction size={100} color="gray" />
      <Stack gap="8px" width="500px" textAlign="center">
        <Text fontSize="xl">Houve um erro ao carregar o conteudo</Text>
        <Text fontSize="md">
          Tente recarregar a pagina clicando no botao abaixo, se o problema
          persistir entre em contato com o suporte.
        </Text>
      </Stack>
      <HStack marginTop="24px">
        <Button variant="solid">
          <LuLifeBuoy /> Contatar Suporte
        </Button>
        <Button variant="outline">
          <LuRotateCcw />
          Recarregar
        </Button>
      </HStack>
    </Stack>
  );
};
