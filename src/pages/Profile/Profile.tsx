import { Bleed, Button, Flex, Stack } from '@chakra-ui/react';
import { IoPerson } from 'react-icons/io5';
import { LuChevronRight, LuUserRoundX } from 'react-icons/lu';
import { PiPasswordBold } from 'react-icons/pi';
import { TbLogout } from 'react-icons/tb';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/styles';

export const Profile = () => {
  const { handleSignOut } = useAuth();

  const profileItems = [
    {
      icon: IoPerson,
      label: 'Meus dados',
      action: () => {},
    },
    {
      icon: PiPasswordBold,
      label: 'Alterar Senha',
      action: () => {},
    },
    {
      icon: LuUserRoundX,
      label: 'Apagar conta',
      action: () => {},
    },
    {
      icon: TbLogout,
      label: 'Sair',
      action: handleSignOut,
    },
  ];

  return (
    <Stack>
      <Bleed />
      {profileItems.map((item) => (
        <Stack key={item.label}>
          <Button
            variant="plain"
            justifyContent="flex-start"
            padding="0"
            color={COLORS.TITLE}
            onClick={item.action}
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Stack direction="row" gap="0.5rem">
                <item.icon /> {item.label}
              </Stack>
              <LuChevronRight />
            </Flex>
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};
