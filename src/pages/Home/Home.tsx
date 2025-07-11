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
          Orçamentos pendentes
        </Text>
        <div className="slides">
          <Box width="300px" height="100px" backgroundColor="gray.100">
            <Text>01</Text>
          </Box>
          <Box width="300px" height="100px" backgroundColor="gray.100">
            <Text>02</Text>
          </Box>
          <Box width="300px" height="100px" backgroundColor="gray.100">
            <Text>03</Text>
          </Box>
          <Box width="300px" height="100px" backgroundColor="gray.100">
            <Text>04</Text>
          </Box>
          <Box width="300px" height="100px" backgroundColor="gray.100">
            <Text>05</Text>
          </Box>
          <Box width="300px" height="100px" backgroundColor="gray.100">
            <Text>06</Text>
          </Box>
        </div>
      </div>
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
          <OrderCard map="https://maps.google.com/maps?q=-23.4754743,-46.890092&z=17&output=embed" />
          <OrderCard map="https://maps.google.com/maps?q=-23.4962359,-46.7236755&z=17&output=embed" />
          <OrderCard map="https://maps.google.com/maps?q=-23.4979416,-46.7092764&z=17&output=embed" />
          <OrderCard map="https://maps.google.com/maps?q=-23.5613496,-46.6590692&z=17&output=embed" />
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
