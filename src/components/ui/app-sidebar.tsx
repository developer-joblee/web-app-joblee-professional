import { useAuth } from '@/hooks/useAuth';
import {
  Avatar,
  Box,
  Button,
  Menu,
  Portal,
  Stack,
  Text,
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
      height="100vh"
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
            <Button
              variant="ghost"
              justifyContent="flex-start"
              height="60px"
              gap="0.75rem"
              width="100%"
              padding={opened ? '1rem' : '0.125rem'}
            >
              <Avatar.Root shape="rounded" size="sm">
                <Avatar.Fallback name="Segun Adebayo" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
              <Stack
                gap="0px"
                width="100%"
                alignItems="flex-start"
                display={opened ? 'flex' : 'none'}
                opacity={opened ? 1 : 0}
                transition="opacity 0.3s ease-in-out"
              >
                <Text fontWeight="medium">Felipe Erick</Text>
                <Text fontSize="xs" fontWeight="normal">
                  felipe@joblee.com
                </Text>
              </Stack>
            </Button>
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
