import { COLORS } from '@/constants/styles';
import {
  CloseButton,
  Drawer,
  EmptyState,
  Float,
  IconButton,
  Portal,
  Stack,
  VStack,
  Circle,
  Text,
} from '@chakra-ui/react';
import { LuBell } from 'react-icons/lu';

const EmptyNotification = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content alignItems="center" justifyContent="center">
        <EmptyState.Indicator>
          <LuBell color={COLORS.TITLE} />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Você não tem notificações</EmptyState.Title>
          <EmptyState.Description>
            Nenhuma notificação foi encontrada
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export const NotificationDrawer = () => {
  return (
    <Drawer.Root size={{ base: 'full', md: 'md' }}>
      <Drawer.Trigger asChild>
        <IconButton variant="outline" size="sm">
          <LuBell />
          <Float>
            <Circle size="5" bg="red" color="white">
              <Text fontSize="xs">2</Text>
            </Circle>
          </Float>
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md" height="95dvh">
            <Drawer.Header>
              <Drawer.Title>Notificações</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack>
                <EmptyNotification />
              </Stack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
