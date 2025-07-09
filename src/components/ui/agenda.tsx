import { COLORS } from '@/constants/styles';
import { defaultColor } from '@/theme';
import {
  Box,
  Flex,
  Stack,
  Text,
  Heading,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { Map } from '@/assets/icons/map';

interface AgendaProps {
  selectedDate: Date;
  items: AgendaItem[];
}

interface AgendaItem {
  id: string;
  time: string;
  title: string;
  client: string;
  address: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
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
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
];

export const Agenda = ({ selectedDate, items }: AgendaProps) => {
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
    <Box padding="1rem" bg="gray.50" position="relative" zIndex="8">
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
