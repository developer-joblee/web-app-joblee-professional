import { OrderCard } from '@/components/ui/order-card';
import { Stack } from '@chakra-ui/react';
import { Withdraw } from './components/Withdraw';
import { WithdrawResponsible } from './components/WithdrawResponsible';

export const Home = () => {
  return (
    <Stack gap="1rem">
      <Withdraw />
      <WithdrawResponsible />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </Stack>
  );
};
