import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { IoPerson } from 'react-icons/io5';
import { LuChevronRight, LuUserRoundX } from 'react-icons/lu';
import { PiPasswordBold } from 'react-icons/pi';
import { TbLogout } from 'react-icons/tb';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/styles';

export const Profile = () => {
  const { handleSignOut } = useAuth();

  return (
    <Stack>
      <Text>Perfil</Text>
      <Stack>
        <Button
          variant="plain"
          justifyContent="flex-start"
          padding="0"
          color={COLORS.TITLE}
        >
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row" gap="0.5rem">
              <IoPerson /> Meus dados
            </Stack>
            <LuChevronRight />
          </Flex>
        </Button>
      </Stack>
      <Stack>
        <Button
          variant="plain"
          justifyContent="flex-start"
          padding="0"
          color={COLORS.TITLE}
        >
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row" gap="0.5rem">
              <PiPasswordBold /> Alterar Senha
            </Stack>
            <LuChevronRight />
          </Flex>
        </Button>
      </Stack>
      <Stack>
        <Button
          variant="plain"
          justifyContent="flex-start"
          padding="0"
          color={COLORS.TITLE}
        >
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row" gap="0.5rem">
              <LuUserRoundX /> Apagar conta
            </Stack>
            <LuChevronRight />
          </Flex>
        </Button>
      </Stack>
      <Stack>
        <Button
          variant="plain"
          justifyContent="flex-start"
          padding="0"
          color={COLORS.TITLE}
          onClick={() => handleSignOut()}
        >
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row" gap="0.5rem">
              <TbLogout /> Sair
            </Stack>
            <LuChevronRight />
          </Flex>
        </Button>
      </Stack>
    </Stack>
  );
};
