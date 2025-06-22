import {
  Card,
  Stat,
  FormatNumber,
  Badge,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { LuEye } from 'react-icons/lu';

export const Withdraw = () => {
  return (
    <Card.Root width="100%">
      <Card.Body gap="2" padding="1rem">
        <Stat.Root gap="0">
          <Stat.Label>Meu saldo</Stat.Label>
          <Stat.ValueText
            fontSize="3xl"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <FormatNumber value={935.4} style="currency" currency="BRL" />
            <IconButton size="xs" variant="outline">
              <LuEye />
            </IconButton>
          </Stat.ValueText>
          <Badge variant="plain" px="0">
            <Stat.HelpText>
              valor total disponível e a liberar{' '}
              <FormatNumber value={935.4} style="currency" currency="BRL" />
            </Stat.HelpText>
          </Badge>
        </Stat.Root>
      </Card.Body>
      <Card.Footer justifyContent="flex-end" padding="1rem">
        <Button size="sm" width="full">
          Sacar
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
