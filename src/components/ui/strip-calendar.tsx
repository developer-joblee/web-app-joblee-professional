import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  IconButton,
  Circle,
  Stack,
  Float,
  Heading,
} from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface AgendaItem {
  id: string;
  time: string;
  title: string;
  client: string;
  address: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
}

interface StripCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  agendaItems: (date: Date) => AgendaItem[];
}

interface DateItem {
  date: Date;
  day: string;
  dayNumber: number;
  month: string;
  isToday: boolean;
  isSelected: boolean;
}

export const StripCalendar = ({
  selectedDate = new Date(),
  agendaItems,
  onDateSelect,
}: StripCalendarProps) => {
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

  const [dates, setDates] = useState<DateItem[]>(generateDates());

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
    <>
      <Box
        padding="0 1rem"
        backgroundColor="white"
        position="sticky"
        top="68px"
        zIndex="100"
      >
        <Box w="full" backgroundColor="white">
          <Flex justify="space-between" padding="0" align="center">
            <Heading size="md" padding="0 0 0 1rem">
              {currentDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Heading>
            <Flex gap="0.5rem" padding="0 1rem 0 0">
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
                  {agendaItems(dateItem.date).length > 0 && (
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
    </>
  );
};
