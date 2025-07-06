import {
  Bleed,
  Box,
  Button,
  Flex,
  Menu,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LuChevronDown, LuMoveDownLeft, LuMoveUpRight } from 'react-icons/lu';
import { BalanceChart } from './components/BalanceChart';
import { Grid } from '@chakra-ui/react';
import { Transactions } from './components/Transactions';
import { NavigationHeader } from '@/components/ui/navigation-header';

export const Wallet = () => {
  const [value, setValue] = useState('currentBalance');
  const items = [
    { value: 'currentBalance', label: 'Saldo Atual' },
    { value: 'incomingBalance', label: 'A receber' },
  ];

  return (
    <Stack gap="1rem">
      <NavigationHeader title="Sua carteira" />

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

      <Box backgroundColor="gray.200" borderRadius="md">
        <Grid templateColumns="1fr 1fr">
          <Stack gap="0" p="1rem">
            <Flex alignItems="center" gap="0.25rem">
              <LuMoveDownLeft color="green" />
              <Text fontSize="xs" color="gray.500">
                Saldo Atual
              </Text>
            </Flex>
            <Text fontSize="lg" fontWeight="bold">
              R$ 935,40
            </Text>
          </Stack>
          <Stack gap="0" p="1rem">
            <Flex alignItems="center" gap="0.25rem">
              <LuMoveUpRight color="red" />
              <Text fontSize="xs" color="gray.500">
                Saldo Receber
              </Text>
            </Flex>
            <Text fontSize="lg" fontWeight="bold">
              R$ 935,40
            </Text>
          </Stack>
        </Grid>
      </Box>

      <Transactions />
    </Stack>
  );
};
