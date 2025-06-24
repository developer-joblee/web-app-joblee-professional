import { useAuth } from '@/hooks/useAuth';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  Portal,
  Stack,
} from '@chakra-ui/react';
import {
  LuCalendar,
  LuHouse,
  LuReceipt,
  LuUser,
  LuWallet,
  LuCircleHelp,
  LuLogOut,
} from 'react-icons/lu';
import { UserProfileButton } from './user-profile-button';

const navItems = [
  { icon: LuHouse, label: 'Home', path: '/' },
  { icon: LuCalendar, label: 'Agendamentos', path: '/' },
  { icon: LuWallet, label: 'Carteira', path: '/' },
  { icon: LuReceipt, label: 'Ordens', path: '/' },
  { icon: LuUser, label: 'Perfil', path: '/' },
];

const configItems = [
  { icon: LuHouse, label: 'Home', path: '/' },
  { icon: LuCalendar, label: 'Agendamentos', path: '/' },
  { icon: LuWallet, label: 'Carteira', path: '/' },
  { icon: LuReceipt, label: 'Ordens', path: '/' },
  { icon: LuCircleHelp, label: 'Ajuda', path: '/' },
];

export const AppSidebar = ({ opened }: { opened: boolean }) => {
  const { handleSignOut } = useAuth();
  return (
    <Stack
      height="100dvh"
      padding="0.5rem"
      backgroundColor="gray.50"
      border="1px solid #e4e4e7"
      display={{ base: 'none', md: 'block' }}
    >
      <Stack justifyContent="space-between" height="100%">
        <Stack gap="2rem">
          <Box width="100%">
            <Avatar.Root shape="rounded" size="md">
              <Avatar.Fallback name="Joblee" />
              <Avatar.Image src="https://images.seeklogo.com/logo-png/38/1/company-logo-png_seeklogo-389186.png" />
            </Avatar.Root>
          </Box>

          <Box
            data-state={opened ? 'open' : 'closed'}
            width={opened ? '15rem' : '40px'}
            transition="all 0.3s ease-in-out"
          >
            {navItems.map((item) => (
              <Box key={item.label} width="100%">
                <Button
                  size="xs"
                  width="100%"
                  justifyContent="flex-start"
                  variant="ghost"
                  fontSize="smaller"
                  color="gray.600"
                  _hover={{ color: '#27272A' }}
                  gap={opened ? '0.5rem' : '0'}
                  aria-label={item.label}
                >
                  <item.icon />
                  {opened ? item.label : null}
                </Button>
              </Box>
            ))}
          </Box>

          <Box
            data-state={opened ? 'open' : 'closed'}
            width={opened ? '15rem' : '40px'}
            transition="all 0.3s ease-in-out"
          >
            {configItems.map((item) => (
              <Box key={item.label} width="100%">
                <Button
                  size="xs"
                  width="100%"
                  justifyContent="flex-start"
                  variant="ghost"
                  fontSize="smaller"
                  color="gray.600"
                  _hover={{ color: '#27272A' }}
                  gap={opened ? '0.5rem' : '0'}
                  aria-label={item.label}
                >
                  <item.icon />
                  {opened ? item.label : null}
                </Button>
              </Box>
            ))}
          </Box>
        </Stack>
        <Menu.Root positioning={{ placement: 'top-end' }}>
          <Menu.Trigger asChild>
            <IconButton variant="ghost" padding="0 0.25rem" height="50px">
              <UserProfileButton
                opened={opened}
                name="Segun Adebayo"
                email="segun@joblee.com"
                image="https://bit.ly/sage-adebayo"
              />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item width="10rem" value="new-txt" cursor="pointer">
                  <LuUser /> Perfil
                </Menu.Item>
                <Menu.Item width="10rem" value="new-file" cursor="pointer">
                  <LuCircleHelp /> Ajuda
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  width="10rem"
                  value="export"
                  cursor="pointer"
                  onClick={handleSignOut}
                >
                  <LuLogOut />
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Stack>
    </Stack>
  );
};
