import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { LuMoveDownLeft, LuMoveUpRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export const WithdrawResponsible = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/wallet');
  };

  return (
    <Box backgroundColor="gray.100" borderRadius="md" onClick={handleClick}>
      <Grid templateColumns="1fr 1fr">
        <Stack gap="0" p="1rem" alignItems="center">
          <Flex alignItems="center" gap="0.25rem">
            <LuMoveDownLeft color="green" />
            <Text fontSize="xs" color="gray.500">
              Saldo Disponível
            </Text>
          </Flex>
          <Text fontSize="lg" fontWeight="bold">
            R$ 935,40
          </Text>
        </Stack>
        <Stack gap="0" p="1rem" alignItems="center">
          <Flex alignItems="center" gap="0.25rem">
            <LuMoveUpRight color="blueviolet" />
            <Text fontSize="xs" color="gray.500">
              Saldo a Receber
            </Text>
          </Flex>
          <Text fontSize="lg" fontWeight="bold">
            R$ 0,00
          </Text>
        </Stack>
      </Grid>
    </Box>
  );
};
