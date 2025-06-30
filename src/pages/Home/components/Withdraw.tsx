import { FormatNumber } from '@/components/ui/format-number';
import {
  Card,
  Stat,
  Badge,
  Button,
  IconButton,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import {
  LuEye,
  LuDollarSign,
  LuArrowRight,
  LuClock,
  LuTrendingUp,
} from 'react-icons/lu';

const cards = [
  {
    id: 'balance',
    title: 'Saldo disponível',
    icon: LuDollarSign,
    actionIcon: LuArrowRight,
    action: {
      type: 'button',
      label: 'Sacar agora',
      onClick: () => {},
    },
  },
  {
    id: 'incoming',
    title: 'A Receber',
    icon: LuClock,
    actionIcon: LuClock,
    action: {
      type: 'text',
      label: 'Aguardando liberação',
    },
  },
  {
    id: 'totalMonth',
    title: 'Este mês',
    icon: LuTrendingUp,
    actionIcon: LuTrendingUp,
    background: '#111827',
    color: 'white',
    action: {
      type: 'stat',
      label: 'vs mês anterior',
    },
  },
  {
    id: 'total',
    title: 'Total geral',
    icon: LuDollarSign,
    actionIcon: LuArrowRight,
    action: {
      type: 'text',
      label: 'Disponível + Pendente',
    },
  },
];

export const Withdraw = () => {
  return (
    <Flex gap="1rem">
      {cards.map((card) => (
        <Card.Root
          width="100%"
          display={{ base: 'none', md: 'flex' }}
          background={card.background}
          color={card.color}
        >
          <Card.Header padding="1rem 1rem 0 1rem">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="fit-content"
              bg="gray.100"
              padding="0.5rem"
              borderRadius="l3"
            >
              <card.icon size="22px" color={card.background} />
            </Box>
          </Card.Header>
          <Card.Body gap="2" padding="1rem">
            <Stat.Root>
              <Stat.Label color={card.color}>{card.title}</Stat.Label>
              <Stat.ValueText
                fontSize="3xl"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <FormatNumber value={935.4} color={card.color} />
                <IconButton size="xs" variant="outline">
                  <LuEye color={card.color} />
                </IconButton>
              </Stat.ValueText>
            </Stat.Root>
          </Card.Body>
          <Card.Footer
            justifyContent="space-between"
            padding="0 1rem 1rem 1rem"
          >
            <Button
              width="full"
              size="xs"
              variant="subtle"
              display={card.action?.type === 'button' ? 'flex' : 'none'}
              color={card.color}
            >
              {card.action?.label}
              <card.actionIcon />
            </Button>
            <Text
              height="32px"
              color={card.color || 'gray.500'}
              fontSize="sm"
              display={card.action?.type === 'text' ? 'flex' : 'none'}
            >
              {card.action?.label}
            </Text>
            <Stat.Root
              height="32px"
              display={card.action?.type === 'stat' ? 'flex' : 'none'}
            >
              <Badge
                colorPalette="green"
                variant="plain"
                px="0"
                color={card.color}
              >
                <Stat.UpIndicator />
                1.9% {card.action?.label}
              </Badge>
            </Stat.Root>
          </Card.Footer>
        </Card.Root>
      ))}
    </Flex>
  );
};
