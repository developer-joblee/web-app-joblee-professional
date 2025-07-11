import {
  Avatar,
  Flex,
  IconButton,
  Stack,
  Text,
  Float,
  Circle,
  Drawer,
  Portal,
  Card,
  CloseButton,
  Grid,
} from '@chakra-ui/react';
import { Inbox } from '@/assets/icons/inbox';
import React from 'react';
import { useGlobal } from '@/hooks/useGlobal';
import { defaultColor } from '@/theme';
import { LuCalendar, LuEllipsisVertical } from 'react-icons/lu';
interface TopBarResponsiveMenuProps {
  children: React.ReactNode;
}

interface NotificationButtonProps {
  count: number;
}

const NotificationButton = ({ count }: NotificationButtonProps) => (
  <IconButton
    variant="solid"
    backgroundColor="rgba(255, 255, 255, 0.2)"
    borderRadius="full"
    padding="0"
  >
    <Inbox color="white" />
    <Float>
      <Circle size="5" bg="red" color="white">
        <Text fontSize="xs">{count}</Text>
      </Circle>
    </Float>
  </IconButton>
);

const UserHeader = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { user, path } = useGlobal();
  const { fullName = '' } = user;
  const [firstName, secondName] = fullName.split(' ');

  const hideHeader = path !== '/';

  if (hideHeader) return;

  return (
    <>
      <Drawer.Root
        open={drawerOpen}
        closeOnInteractOutside={true}
        onOpenChange={(e) => setDrawerOpen(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Notificações</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body padding="0">
                <Stack>
                  <Card.Root border="none">
                    <Card.Body padding="1rem">
                      <Grid templateColumns="30px 1fr 30px" gap="0.25rem">
                        <LuCalendar />
                        <Stack gap="0">
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.900"
                          >
                            Reserva confirmada
                          </Text>
                          <Text fontSize="xs" color="gray.500" lineHeight="1">
                            Sua reserva foi confirmada com sucesso para o dia
                            15/06/2025
                          </Text>
                        </Stack>
                        <LuEllipsisVertical />
                      </Grid>
                    </Card.Body>
                  </Card.Root>
                </Stack>
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
      <Flex
        position="fixed"
        top="0"
        zIndex="1100"
        width="100%"
        padding="0.5rem 1rem"
        backgroundColor={defaultColor[900]}
        onClick={() => setDrawerOpen(true)}
      >
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Flex gap="1rem">
            <Avatar.Root shape="full" size="md">
              <Avatar.Image
                src={user.profilePhoto}
                alt={`${firstName} ${secondName}`}
              />
            </Avatar.Root>
            <Stack gap="0">
              <Text fontSize="xs" color="white">
                Bem-vindo(a)!
              </Text>
              <Text fontSize="md" color="white" fontWeight="normal">
                {firstName} {secondName}
              </Text>
            </Stack>
          </Flex>
          <NotificationButton count={2} />
        </Flex>
      </Flex>
    </>
  );
};

export const TopBarResponsiveMenu = ({
  children,
}: TopBarResponsiveMenuProps) => {
  const { path } = useGlobal();

  const hideHeader = path !== '/';

  return (
    <Stack>
      <UserHeader />
      <Stack
        paddingBottom="4rem"
        paddingTop="3.5rem"
        padding={hideHeader ? '1rem 0 5rem 0' : '3.5rem 1rem 5rem 1rem'}
      >
        {children}
      </Stack>
    </Stack>
  );
};
