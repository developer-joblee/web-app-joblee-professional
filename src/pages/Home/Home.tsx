import { OrderCard } from '@/components/ui/order-card';
import { Stack } from '@chakra-ui/react';
import { Withdraw } from './components/Withdraw';

export const Home = () => {
  return (
    <Stack gap="1rem">
      <Withdraw />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </Stack>
  );
};
