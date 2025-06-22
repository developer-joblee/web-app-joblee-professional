import { Button, Card, Flex, Stack, Text, Avatar, Box } from '@chakra-ui/react';
import { LuCalendar, LuClock, LuHash, LuMapPin } from 'react-icons/lu';

export const OrderCard = () => {
  return (
    <Card.Root width="100%">
      <Card.Body gap="2" padding="1rem">
        <Flex>
          <Stack gap="0">
            <Flex alignItems="center" gap="0.25rem">
              <LuHash size="0.5rem" />
              <Text fontSize="x-small">ORD-025-2025</Text>
            </Flex>

            <Flex alignItems="center" gap="0.25rem">
              <Avatar.Root shape="rounded" size="md">
                <Avatar.Fallback name="Joblee" />
                <Avatar.Image src="" />
              </Avatar.Root>
              <Text fontSize="lg" fontWeight="normal">
                Felipe E
              </Text>
            </Flex>
            <Box
              width="100%"
              height="200px"
              overflow="hidden"
              borderRadius="md"
            >
              <iframe
                title="Mapa"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.5)' }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=-23.5039103,-46.6995141&z=15&output=embed"
              />
            </Box>

            <Flex alignItems="center" gap="0.25rem">
              <LuMapPin size="0.75rem" />
              <Text fontSize="small">Rua Professor Joao Machado, 705</Text>
            </Flex>
            <Flex alignItems="center" gap="1rem">
              <Flex alignItems="center" gap="0.25rem">
                <LuClock size="0.75rem" />
                <Text fontSize="small">08:00 - 10:00</Text>
              </Flex>
              <Flex alignItems="center" gap="0.25rem">
                <LuCalendar size="0.75rem" />
                <Text fontSize="small">15/06/2025</Text>
              </Flex>
            </Flex>
            <Text fontSize="sm">Descrição</Text>
          </Stack>
        </Flex>
      </Card.Body>
      <Card.Footer justifyContent="flex-end" padding="1rem">
        <Button size="sm" width="full">
          Ver detalhes
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
