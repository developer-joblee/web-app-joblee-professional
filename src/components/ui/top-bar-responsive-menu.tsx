import {
  Avatar,
  Flex,
  IconButton,
  Stack,
  Text,
  Float,
  Circle,
  Tabs,
  Stat,
  FormatNumber,
  Popover,
  Portal,
} from '@chakra-ui/react';
import { LuEye } from 'react-icons/lu';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { TbInbox } from 'react-icons/tb';
import React, { useState } from 'react';

interface User {
  name: string;
  avatar: string;
}

interface TopBarResponsiveMenuProps {
  children: React.ReactNode;
}

interface BalanceTabProps {
  value: number;
  title: string;
  description: string;
}

interface NotificationButtonProps {
  count: number;
}

interface BalanceTabsProps {
  activeTab: string | null;
  onTabChange: (value: string) => void;
}

interface InfoPopoverProps {
  title: string;
  description: string;
}

const GRADIENT_STYLE =
  'linear-gradient(90deg,rgba(110, 94, 245, 1) 50%, rgba(94, 152, 245, 1) 100%)';

const user: User = {
  name: 'Felipe E',
  avatar: 'https://bit.ly/dan-abramov',
};

const NotificationButton = ({ count }: NotificationButtonProps) => (
  <IconButton variant="solid" borderRadius="full" padding="0">
    <TbInbox />
    <Float>
      <Circle size="5" bg="red" color="white">
        <Text fontSize="xs">{count}</Text>
      </Circle>
    </Float>
  </IconButton>
);

const UserHeader = () => (
  <Flex padding="1rem">
    <Flex justifyContent="space-between" alignItems="center" width="100%">
      <Flex gap="1rem">
        <Avatar.Root shape="rounded" size="md">
          <Avatar.Image src={user.avatar} alt={user.name} />
        </Avatar.Root>
        <Stack gap="0">
          <Text fontSize="xs" color="white">
            bem-vindo(a)!
          </Text>
          <Text fontSize="md" color="white" fontWeight="normal">
            {user.name}
          </Text>
        </Stack>
      </Flex>
      <NotificationButton count={2} />
    </Flex>
  </Flex>
);

const InfoPopover = ({ title, description }: InfoPopoverProps) => (
  <Popover.Root positioning={{ placement: 'bottom-end' }}>
    <Popover.Trigger asChild>
      <IconButton size="sm" variant="plain">
        <BsFillPatchQuestionFill color="white" />
      </IconButton>
    </Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content css={{ '--popover-bg': '#333' }}>
          <Popover.Arrow />
          <Popover.Body padding="0.5rem">
            <Popover.Title color="white" fontWeight="bold">
              {title}
            </Popover.Title>
            <Text color="white">{description}</Text>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
);

const BalanceTab = ({ value, title, description }: BalanceTabProps) => (
  <Stat.Root gap="0">
    <Flex alignItems="center" justifyContent="space-between">
      <Stat.ValueText
        fontSize="3xl"
        color="white"
        gap="1rem"
        alignItems="flex-start"
      >
        <FormatNumber value={value} style="currency" currency="BRL" />
        <IconButton size="xs" variant="solid" borderRadius="full">
          <LuEye />
        </IconButton>
      </Stat.ValueText>
      <InfoPopover title={title} description={description} />
    </Flex>
  </Stat.Root>
);

const BalanceTabs = ({ activeTab, onTabChange }: BalanceTabsProps) => {
  const getTabStyle = (tabValue: string) => ({
    background: activeTab === tabValue ? GRADIENT_STYLE : 'inherit',
  });

  return (
    <Stack margin="0.5rem 1rem">
      <Tabs.Root
        defaultValue="balance"
        variant="enclosed"
        maxW="md"
        fitted
        value={activeTab}
        onValueChange={(e) => onTabChange(e.value)}
      >
        <Tabs.List bg="bg.muted" rounded="l3" height="4rem" p="1" width="100%">
          <Tabs.Trigger
            value="balance"
            fontSize="md"
            height="100%"
            justifyContent="center"
            color={activeTab === 'balance' ? 'white' : 'inherit'}
            style={getTabStyle('balance')}
          >
            Saldo Atual
          </Tabs.Trigger>
          <Tabs.Trigger
            value="incoming"
            fontSize="md"
            height="100%"
            justifyContent="center"
            color={activeTab === 'incoming' ? 'white' : 'inherit'}
            style={getTabStyle('incoming')}
          >
            Saldo Receber
          </Tabs.Trigger>
          <Tabs.Indicator rounded="l2" />
        </Tabs.List>

        <Tabs.Content value="balance" padding="1.5rem 0 0.5rem 0">
          <BalanceTab
            value={935.4}
            title="Saldo atual"
            description="Saldo atual disponível"
          />
        </Tabs.Content>

        <Tabs.Content value="incoming" padding="1.5rem 0 0.5rem 0">
          <BalanceTab
            value={1000}
            title="Saldo Receber"
            description="Saldo Receber disponível"
          />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};

export const TopBarResponsiveMenu = ({
  children,
}: TopBarResponsiveMenuProps) => {
  const [activeTab, setActiveTab] = useState<string | null>('balance');

  return (
    <Stack>
      <Stack
        style={{ background: GRADIENT_STYLE }}
        borderRadius="0 0 0.5rem 0.5rem"
      >
        <UserHeader />
        <BalanceTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};
