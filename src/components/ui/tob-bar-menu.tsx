import {
  Breadcrumb,
  Box,
  Flex,
  IconButton,
  Separator,
  Stack,
} from '@chakra-ui/react';
import { LuPanelLeft } from 'react-icons/lu';
import { NotificationDrawer } from '../notification-drawer';

type TobBarMenuProps = {
  children: React.ReactNode;
  onOpenMenu: () => void;
};

export const TobBarMenu = ({ children, onOpenMenu }: TobBarMenuProps) => {
  return (
    <Stack width="100%">
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #e4e4e7"
        padding="1rem"
        backgroundColor="gray.50"
      >
        <Flex width="100%" alignItems="center" gap="1rem">
          <IconButton variant="ghost" size="xs" onClick={onOpenMenu}>
            <LuPanelLeft />
          </IconButton>

          <Separator orientation="vertical" height="4" />

          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Inicio</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Agendamentos</Breadcrumb.Link>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Flex>
        <NotificationDrawer />
      </Flex>
      <Box padding={{ base: '0.5rem', md: '1rem 1rem' }}>{children}</Box>
    </Stack>
  );
};
