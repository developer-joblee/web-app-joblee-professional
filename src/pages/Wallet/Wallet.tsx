import {
  Flex,
  Menu,
  Text,
  Bleed,
  Stack,
  Portal,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { BalanceChart } from './components/BalanceChart';
import { Transactions } from './components/Transactions';
import { NavigationHeader } from '@/components/ui/navigation-header';

export const Wallet = () => {
  const [value, setValue] = useState('currentBalance');
  const items = [
    { value: 'currentBalance', label: 'Saldo Atual' },
    { value: 'incomingBalance', label: 'A receber' },
  ];

  return (
    <NavigationHeader title="Sua carteira">
      <Stack gap="1rem" padding="1rem" overflow="none">
        <Flex alignItems="flex-end" justifyContent="space-between" mb="1rem">
          <Stack gap="0" mt={3}>
            <Text fontSize="xs" color="gray.500">
              {value === 'currentBalance' ? 'Saldo Atual' : 'A receber'}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              R$ 935,40
            </Text>
          </Stack>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline" size="sm" mb="0.5rem">
                {value === 'currentBalance' ? 'Saldo Atual' : 'A receber'}{' '}
                <LuChevronDown />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content minW="10rem">
                  <Menu.RadioItemGroup
                    value={value}
                    onValueChange={(e) => setValue(e.value)}
                  >
                    {items.map((item) => (
                      <Menu.RadioItem key={item.value} value={item.value}>
                        {item.label}
                        <Menu.ItemIndicator />
                      </Menu.RadioItem>
                    ))}
                  </Menu.RadioItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
        <BalanceChart />
        <Bleed />
        <Transactions />
      </Stack>
    </NavigationHeader>
  );
};
