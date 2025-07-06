import { COLORS } from '@/constants/styles';
import { Box, Stack, Text, Grid, Separator } from '@chakra-ui/react';
import { LuArrowDown, LuBanknote } from 'react-icons/lu';

type TransactionProps = {
  type: 'income' | 'outcome';
  source: string;
  value: number;
};

const Transaction = ({ type, source, value }: TransactionProps) => {
  return (
    <Grid templateColumns="auto 1fr auto" alignItems="stretch" gap="1rem">
      <Box
        padding="0.5rem"
        borderRadius="l2"
        backgroundColor="gray.200"
        height="min-content"
      >
        {type === 'income' ? (
          <LuArrowDown size={20} color={COLORS.PRIMARY} />
        ) : (
          <LuBanknote size={20} color={COLORS.PRIMARY} />
        )}
      </Box>
      <Stack gap="0">
        <Text fontWeight="500">
          {type === 'income' ? 'Transferência recebida' : 'Saque'}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {source}
        </Text>
      </Stack>

      <Box alignItems="flex-end" justifyContent="flex-start">
        <Text fontSize="md" fontWeight="500">
          R${value}
        </Text>
      </Box>
    </Grid>
  );
};

export const Transactions = () => {
  return (
    <Stack gap="1rem">
      <Text fontSize="md" fontWeight="500">
        Ultimas transações
      </Text>
      <Text fontSize="sm" fontWeight="500">
        Hoje
      </Text>
      <Transaction type="income" source="Felipe Erick" value={100} />
      <Separator />
      <Text fontSize="sm" fontWeight="500">
        Ontem
      </Text>
      <Transaction type="outcome" source="Joblee" value={100} />
      <Separator />
      <Text fontSize="sm" fontWeight="500">
        20 Mai
      </Text>
      <Transaction type="outcome" source="Joblee" value={100} />
      <Transaction type="income" source="Ricardo T." value={100} />
      <Transaction type="income" source="Jessica V." value={100} />
    </Stack>
  );
};
