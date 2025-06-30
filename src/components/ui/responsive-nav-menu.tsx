/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultColor } from '@/theme';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { Calendar } from '@/assets/icons/calendar.tsx';
import { Wallet } from '@/assets/icons/wallet.tsx';
import { User } from '@/assets/icons/user.tsx';
import { House } from '@/assets/icons/house.tsx';
import { useNavigate } from 'react-router-dom';

export type TabsProps = 'home' | 'calendar' | 'wallet' | 'profile';

type TabItem = {
  value: TabsProps;
  icon: any;
  label: string;
};

type ResponsiveNavMenuProps = {
  currentTab: TabsProps;
  onChangeTab: (tab: TabsProps) => void;
};

const tabs: TabItem[] = [
  {
    value: 'home',
    icon: House,
    label: 'Home',
  },
  {
    value: 'calendar',
    icon: Calendar,
    label: 'Agenda',
  },
  {
    value: 'wallet',
    icon: Wallet,
    label: 'Pagamentos',
  },
  {
    value: 'profile',
    icon: User,
    label: 'Perfil',
  },
];

const getActiveColor = (value: TabsProps, currentTab: TabsProps) => {
  return value === currentTab ? defaultColor[900] : defaultColor[500];
};

export const ResponsiveNavMenu = ({
  currentTab,
  onChangeTab,
}: ResponsiveNavMenuProps) => {
  const navigate = useNavigate();

  return (
    <Stack
      id="responsive-nav-menu"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="1100"
      width="100%"
      boxShadow="0px -2px 4px rgba(0, 0, 0, 0.1)"
      direction="row"
      gap="1rem"
      justifyContent="space-between"
      padding="0.5rem 1rem"
      backgroundColor="white"
    >
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant="plain"
          size="md"
          onClick={() => {
            onChangeTab(tab.value);
            if (tab.value === 'home') {
              navigate('/');
            }
            if (tab.value === 'calendar') {
              navigate('/calendar');
            }
          }}
        >
          <Stack gap="0" alignItems="center">
            <Box
              data-state={currentTab === tab.value ? 'open' : 'closed'}
              _open={{
                animationName: 'fade-in, scale-in',
                animationDuration: '300ms',
              }}
            >
              <tab.icon color={getActiveColor(tab.value, currentTab)} />
            </Box>
            <Text
              fontSize="x-small"
              color={getActiveColor(tab.value, currentTab)}
            >
              {tab.label}
            </Text>
          </Stack>
        </Button>
      ))}
    </Stack>
  );
};
