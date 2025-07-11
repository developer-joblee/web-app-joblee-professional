import { OrderCard } from '@/components/ui/order-card';
import { Box, Stack, Text } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { Withdraw } from './components/Withdraw';
import { WithdrawResponsible } from './components/WithdrawResponsible';
import './Home.css';

export const Home = () => {
  return (
    <Stack gap="1rem">
      <Withdraw />
      <WithdrawResponsible />
      <div className="slider">
        <Text
          fontSize="sm"
          fontWeight="500"
          paddingBottom="0.5rem"
          textAlign="left"
          color="gray.800"
        >
          Serviços agendados
        </Text>
        <div className="slides">
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <Box
            width="25px"
            backgroundColor="gray.100"
            padding="0.5rem"
            onClick={() => alert('Mais')}
          >
            <Stack alignItems="center">
              <Text fontSize="xs" fontWeight="500">
                Mais
              </Text>
              <LuArrowRight size={20} />
            </Stack>
          </Box>
        </div>
      </div>
    </Stack>
  );
};
