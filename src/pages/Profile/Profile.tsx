import { Bleed, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { LuChevronRight } from 'react-icons/lu';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/styles';
import { User } from '@/assets/icons/user.tsx';
import { Bank } from '@/assets/icons/bank.tsx';
import { Notifications } from '@/assets/icons/notifications.tsx';
import { Logout } from '@/assets/icons/logout.tsx';
import { Lock } from '@/assets/icons/lock.tsx';
import { ShieldSecurity } from '@/assets/icons/shield-security.tsx';
import { Headphone } from '@/assets/icons/headphone.tsx';
import { Trash } from '@/assets/icons/trash.tsx';

export const Profile = () => {
  const { handleSignOut } = useAuth();

  const personal = [
    {
      icon: User,
      label: 'Dados pessoais',
      action: () => {},
    },
    {
      icon: Bank,
      label: 'Informações bancarias',
      action: () => {},
    },
  ];

  const general = [
    {
      icon: Notifications,
      label: 'Notificações',
      action: () => {},
    },
    {
      icon: Lock,
      label: 'Esqueceu a senha',
      action: handleSignOut,
    },
  ];

  const privacy = [
    {
      icon: ShieldSecurity,
      label: 'Termos de uso',
      action: () => {},
    },
    {
      icon: Headphone,
      label: 'Ajuda',
      action: () => {},
    },
  ];

  const account = [
    {
      icon: Trash,
      label: 'Deletar conta',
      action: () => {},
    },
    {
      icon: Logout,
      label: 'Sair',
      action: handleSignOut,
    },
  ];

  return (
    <Stack>
      <Bleed />
      <Stack>
        <Text fontSize="small">Dados Pessoais</Text>
        {personal.map((item) => (
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
                  <item.icon />{' '}
                  <Text fontSize="1rem" fontWeight="bold">
                    {item.label}
                  </Text>
                </Stack>
                <LuChevronRight />
              </Flex>
            </Button>
          </Stack>
        ))}
      </Stack>
      <Bleed height="1rem" />
      <Stack>
        <Text fontSize="small">Gerais</Text>
        {general.map((item) => (
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
                  <item.icon />{' '}
                  <Text fontSize="1rem" fontWeight="bold">
                    {item.label}
                  </Text>
                </Stack>
                <LuChevronRight />
              </Flex>
            </Button>
          </Stack>
        ))}
      </Stack>
      <Bleed height="1rem" />
      <Stack>
        <Text fontSize="small">Termos e Condições de Uso</Text>
        {privacy.map((item) => (
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
                  <item.icon />{' '}
                  <Text fontSize="1rem" fontWeight="bold">
                    {item.label}
                  </Text>
                </Stack>
                <LuChevronRight />
              </Flex>
            </Button>
          </Stack>
        ))}
      </Stack>
      <Bleed height="1rem" />
      <Stack>
        <Text fontSize="small">Conta e Acesso</Text>
        {account.map((item) => (
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
                  <item.icon />{' '}
                  <Text fontSize="1rem" fontWeight="bold">
                    {item.label}
                  </Text>
                </Stack>
                <LuChevronRight />
              </Flex>
            </Button>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
