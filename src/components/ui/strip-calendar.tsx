import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  IconButton,
  Heading,
  Card,
  CardBody,
  Circle,
  Stack,
  Float,
} from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Map } from '@/assets/icons/map';
import { defaultColor } from '@/theme';
import { COLORS } from '@/constants/styles';
import { NavigationHeader } from './navigation-header';

interface StripCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

interface DateItem {
  date: Date;
  day: string;
  dayNumber: number;
  month: string;
  isToday: boolean;
  isSelected: boolean;
}

interface AgendaItem {
  id: string;
  time: string;
  title: string;
  client: string;
  address: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
}

interface AgendaProps {
  selectedDate: Date;
  items: AgendaItem[];
}

const dayTimes = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const Agenda = ({ selectedDate, items }: AgendaProps) => {
  console.log(selectedDate);
  const getColorScheme = (color: AgendaItem['color']) => {
    switch (color) {
      case 'yellow':
        return { borderColor: 'yellow.400', bg: 'yellow.50' };
      case 'green':
        return { borderColor: 'green.400', bg: 'green.50' };
      case 'blue':
        return { borderColor: 'blue.400', bg: 'blue.50' };
      case 'purple':
        return { borderColor: 'purple.400', bg: 'purple.50' };
      default:
        return { borderColor: 'gray.400', bg: 'gray.50' };
    }
  };

  return (
    <Box mt={6} padding="1rem" bg="gray.50" position="relative" zIndex="8">
      <Heading size="md" mb={4}>
        Lista de serviço
      </Heading>
      <Stack gap={4}>
        {dayTimes.map((time) => (
          <Flex key={time} gap={4} minHeight="92px" position="relative">
            <Text fontSize="xs" fontWeight="semibold" zIndex={11}>
              {time}
            </Text>
            <Box
              position="absolute"
              top={2}
              left={10}
              right={10}
              h="1px"
              zIndex={10}
              width="calc(100% - 40px)"
              borderTop={`1px ${COLORS.BORDER}`}
              borderStyle="dashed"
            />
            <Stack w="full">
              {items
                .filter((item) => item.time === time)
                .map((item) => {
                  const colors = getColorScheme(item.color);
                  return (
                    <Card.Root key={item.id} variant="elevated" mt={3}>
                      <CardBody padding={0}>
                        <Flex
                          gap={4}
                          bg="white"
                          padding="0.75rem"
                          borderRadius="sm"
                        >
                          <Box
                            width="4px"
                            borderRadius="md"
                            height="auto"
                            bg={colors.borderColor}
                          />
                          <Stack flex={1} gap="0px">
                            <Text
                              fontSize="xs"
                              fontWeight="light"
                              color={colors.borderColor}
                            >
                              {item.title}
                            </Text>
                            <Text fontWeight="semibold" fontSize="md" mb={2}>
                              {item.client}
                            </Text>
                            <Flex
                              align="center"
                              gap={2}
                              fontSize="sm"
                              color="gray.600"
                            >
                              <Map color={defaultColor[900]} size={16} />
                              <Text fontSize="xs">{item.address}</Text>
                            </Flex>
                          </Stack>
                        </Flex>
                      </CardBody>
                    </Card.Root>
                  );
                })}
            </Stack>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export const StripCalendar = ({
  selectedDate = new Date(),
  onDateSelect,
}: StripCalendarProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const formatDate = (date: Date, format: string) => {
    const dateToBR = date.toLocaleDateString('pt-BR', { [format]: 'short' });
    const noPeriod = dateToBR.endsWith('.') ? dateToBR.slice(0, -1) : dateToBR;
    return noPeriod.charAt(0).toUpperCase() + noPeriod.slice(1);
  };

  // Generate dates for the strip (30 days from today)
  const generateDates = (): DateItem[] => {
    const dates: DateItem[] = [];
    const today = new Date();

    for (let i = -15; i <= 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dates.push({
        date,
        day: formatDate(date, 'weekday'),
        dayNumber: date.getDate(),
        month: formatDate(date, 'month'),
        isToday: date.toDateString() === today.toDateString(),
        isSelected: date.toDateString() === currentDate.toDateString(),
      });
    }

    return dates;
  };

  const sampleAgendaData: Record<string, AgendaItem[]> = {
    [new Date().toDateString()]: [
      {
        id: '1',
        time: '08:00',
        title: 'Corte de Cabelo',
        client: 'João Silva',
        address: 'Rua Senador Domingos Velascos, QD 28, Lt 12',
        color: 'yellow',
      },
      {
        id: '121',
        time: '08:00',
        title: 'Corte de Cabelo',
        client: 'Maria do Socorro',
        address: 'Rua Senador Domingos Velascos, QD 28, Lt 12',
        color: 'yellow',
      },
      {
        id: '2',
        time: '09:00',
        title: 'Manicure e Pedicure',
        client: 'Maria Santos',
        address: 'Av. Paulista, 1000, Apt 205',
        color: 'yellow',
      },
      {
        id: '3',
        time: '11:00',
        title: 'Massagem Relaxante',
        client: 'Carlos Oliveira',
        address: 'Rua das Flores, 123, Casa 2',
        color: 'green',
      },
      {
        id: '4',
        time: '14:00',
        title: 'Limpeza de Pele',
        client: 'Ana Costa',
        address: 'Rua Senador Domingos Velascos, QD 28, Lt 12',
        color: 'blue',
      },
    ],
    [new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()]: [
      {
        id: '5',
        time: '09:30',
        title: 'Coloração de Cabelo',
        client: 'Fernanda Lima',
        address: 'Rua Augusta, 456, Sala 301',
        color: 'purple',
      },
      {
        id: '6',
        time: '13:00',
        title: 'Depilação',
        client: 'Juliana Rocha',
        address: 'Av. Brigadeiro Faria Lima, 789',
        color: 'green',
      },
    ],
    [new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString()]: [
      {
        id: '7',
        time: '10:00',
        title: 'Escova Progressiva',
        client: 'Patrícia Mendes',
        address: 'Rua Oscar Freire, 321, Loja 15',
        color: 'yellow',
      },
      {
        id: '8',
        time: '15:30',
        title: 'Tratamento Facial',
        client: 'Roberto Alves',
        address: 'Rua Consolação, 654, Conj 12',
        color: 'blue',
      },
    ],
  };

  const [dates, setDates] = useState<DateItem[]>(generateDates());

  const getAgendaItems = (date: Date): AgendaItem[] => {
    return sampleAgendaData[date.toDateString()] || [];
  };

  const agendaItems = getAgendaItems(currentDate);

  const handleDateClick = (date: Date) => {
    const indexCurrentDate = dates.findIndex(
      (d) => d.date.toDateString() === currentDate.toDateString(),
    );
    const indexSelection = dates.findIndex(
      (d) => d.date.toDateString() === date.toDateString(),
    );

    dates[indexCurrentDate].isSelected = false;
    dates[indexSelection].isSelected = true;

    setDates(dates);
    setCurrentDate(date);
    onDateSelect?.(date);
  };

  const scrollToDate = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll to selected date on mount
  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = dates.findIndex((d) => d.isSelected);
      if (selectedIndex !== -1) {
        const selectedElement = scrollRef.current.children[
          selectedIndex
        ] as HTMLElement;
        if (selectedElement) {
          selectedElement.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          });
        }
      }
    }
  }, [dates]);

  return (
    <Stack>
      <Box
        position="fixed"
        left="0"
        right="0"
        top="0"
        p="1rem 1rem 0 1rem"
        zIndex="10"
        backgroundColor="white"
        ref={boxRef}
      >
        <NavigationHeader title="Agenda" />
        <Box
          w="full"
          maxW="4xl"
          mx="auto"
          mt="1rem"
          pb="0.5rem"
          backgroundColor="white"
        >
          <Flex justify="space-between" padding="0 1rem" align="center">
            <Heading size="md">
              {currentDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Heading>
            <Flex gap="0.5rem">
              <IconButton
                aria-label="Previous"
                children={<LuChevronLeft />}
                size="sm"
                variant="ghost"
                onClick={() => scrollToDate('left')}
              />
              <IconButton
                aria-label="Next"
                children={<LuChevronRight />}
                size="sm"
                variant="ghost"
                onClick={() => scrollToDate('right')}
              />
            </Flex>
          </Flex>

          <Flex
            ref={scrollRef}
            gap={2}
            overflowX="auto"
            pb={2}
            pt={2}
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {dates.map((dateItem, index) => (
              <Button
                key={index}
                onClick={() => handleDateClick(dateItem.date)}
                flexShrink={0}
                w="fit-content"
                h="80px"
                position="relative"
                variant="ghost"
                padding="0"
                transition="all 0.2s"
              >
                <Stack gap="0">
                  <Text fontSize="x-small" fontWeight="medium" opacity={0.7}>
                    {dateItem.day}
                  </Text>
                  <Box
                    borderRadius="full"
                    backgroundColor={dateItem.isSelected ? 'gray.900' : 'white'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transition="all 0.2s"
                    p="1"
                    h="40px"
                    w="40px"
                  >
                    <Text
                      fontSize="lg"
                      color={dateItem.isSelected ? 'white' : 'black'}
                    >
                      {dateItem.dayNumber}
                    </Text>
                  </Box>
                  {getAgendaItems(dateItem.date).length > 0 && (
                    <Float placement="bottom-center">
                      <Circle size="2" bg="red" />
                    </Float>
                  )}
                </Stack>
              </Button>
            ))}
          </Flex>
        </Box>
      </Box>
      <Stack
        pt={`${(boxRef.current?.getBoundingClientRect().height || 0) - 40}px`}
      >
        <Agenda selectedDate={currentDate} items={agendaItems} />
      </Stack>
    </Stack>
  );
};
