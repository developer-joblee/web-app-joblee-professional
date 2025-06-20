import { defaultColor } from '@/theme';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons/lib';
import {
  IoHome,
  IoHomeOutline,
  IoPerson,
  IoPersonOutline,
  IoReceipt,
  IoReceiptOutline,
  IoWallet,
  IoWalletOutline,
} from 'react-icons/io5';

export type TabsProps = 'home' | 'orders' | 'wallet' | 'profile';

type TabItem = {
  value: TabsProps;
  icon: IconType;
  iconOutline: IconType;
  label: string;
};

type ResponsiveNavMenuProps = {
  currentTab: TabsProps;
  onChangeTab: (tab: TabsProps) => void;
};

const tabs: TabItem[] = [
  {
    value: 'home',
    icon: IoHome,
    iconOutline: IoHomeOutline,
    label: 'Home',
  },
  {
    value: 'orders',
    icon: IoReceipt,
    iconOutline: IoReceiptOutline,
    label: 'Pedidos',
  },
  {
    value: 'wallet',
    icon: IoWallet,
    iconOutline: IoWalletOutline,
    label: 'Carteira',
  },
  {
    value: 'profile',
    icon: IoPerson,
    iconOutline: IoPersonOutline,
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
  return (
    <Stack
      width="100%"
      boxShadow="0px -2px 4px rgba(0, 0, 0, 0.1)"
      direction="row"
      gap="1rem"
      justifyContent="space-between"
      padding="0.5rem 1rem"
    >
      {tabs.map((tab) => (
        <Button
          variant="plain"
          size="md"
          onClick={() => onChangeTab(tab.value)}
          key={tab.value}
        >
          <Stack gap="0" alignItems="center">
            <Box
              data-state={currentTab === tab.value ? 'open' : 'closed'}
              _open={{
                animationName: 'fade-in, scale-in',
                animationDuration: '300ms',
              }}
            >
              {currentTab === tab.value ? (
                <tab.icon color={getActiveColor(tab.value, currentTab)} />
              ) : (
                <tab.iconOutline />
              )}
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
