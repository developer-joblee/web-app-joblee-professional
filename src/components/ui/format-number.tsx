import { Text } from '@chakra-ui/react';

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

type FormatNumberProps = {
  value: number;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
};

export const FormatNumber = ({
  value,
  fontSize,
  color = '#333',
}: FormatNumberProps) => {
  return (
    <Text fontSize={fontSize} color={color}>
      {formatNumber(value)}
    </Text>
  );
};
