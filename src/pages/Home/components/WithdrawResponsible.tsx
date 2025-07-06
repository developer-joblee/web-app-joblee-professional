import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { LuArrowRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export const WithdrawResponsible = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/wallet');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="1rem"
      padding="1rem"
      borderRadius="md"
      backgroundColor="gray.100"
      onClick={handleClick}
    >
      <Stack gap="0">
        <Text fontSize="x-small" color="gray.500">
          Saldo disponível
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="gray.900">
          R$ 935,40
        </Text>
      </Stack>
      <Stack gap="0">
        <Button variant="outline" size="xs">
          Carteira <LuArrowRight />
        </Button>
      </Stack>
    </Box>
  );
};
