import { defaultColor } from '@/theme';
import { Flex, Stack, Tabs, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons/lib';
import { LuHouse, LuWallet, LuReceipt, LuUser } from 'react-icons/lu';

export type TabsProps = 'home' | 'orders' | 'wallet' | 'profile';

type TabItem = {
  value: TabsProps;
  icon: IconType;
  label: string;
};

type ResponsiveNavMenuProps = {
  currentTab: TabsProps;
  onChangeTab: (tab: TabsProps) => void;
};

const tabs: TabItem[] = [
  {
    value: 'home',
    icon: LuHouse,
    label: 'Home',
  },
  {
    value: 'orders',
    icon: LuReceipt,
    label: 'Pedidos',
  },
  {
    value: 'wallet',
    icon: LuWallet,
    label: 'Carteira',
  },
  {
    value: 'profile',
    icon: LuUser,
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
    <Flex width="100%">
      <Tabs.Root
        value={currentTab}
        onValueChange={(e) => onChangeTab(e.value as TabsProps)}
        variant="plain"
        width="100%"
      >
        <Tabs.List
          bg="bg.muted"
          rounded="l3"
          gridTemplateColumns="repeat(4, 1fr)"
          p="1"
          width="100%"
          alignItems="center"
        >
          {tabs.map((tab) => (
            <Tabs.Trigger value={tab.value} height="max-content" width="25%">
              <Stack
                gap="0"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <tab.icon
                  size="1.35rem"
                  color={getActiveColor(tab.value, currentTab)}
                />
                <Text
                  fontSize="smaller"
                  color={getActiveColor(tab.value, currentTab)}
                >
                  {tab.label}
                </Text>
              </Stack>
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator rounded="l2" />
        </Tabs.List>
      </Tabs.Root>
    </Flex>
  );
};
