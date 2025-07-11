import {
  Card,
  Flex,
  Stack,
  Text,
  Avatar,
  Tag,
  Grid,
  Separator,
  EnvironmentProvider,
} from '@chakra-ui/react';
import { LuCopy } from 'react-icons/lu';

export const OrderCard = ({ map }: { map: string }) => {
  return (
    <Card.Root width="100%">
      <Card.Body gap="2" padding="1rem">
        <Stack>
          <Flex justifyContent="space-between">
            <Flex alignItems="center" gap="0.25rem" height="1rem">
              <LuCopy size={16} />
              <Text fontSize="xs">#215-2025</Text>
            </Flex>

            <Tag.Root colorPalette="blue" width="fit-content">
              <Tag.Label>Pendente</Tag.Label>
            </Tag.Root>
          </Flex>
          <Separator />
          <Grid templateColumns="1fr 1fr">
            <Flex justifyContent="flex-start" alignItems="center" gap="0.5rem">
              <Avatar.Root shape="rounded" size="xs">
                <Avatar.Fallback name="Felipe Erick" />
                <Avatar.Image src="" />
              </Avatar.Root>
              <Stack gap="0" alignItems="flex-start">
                <Text fontSize="x-small" fontWeight="bold" color="gray.900">
                  Nome do cliente
                </Text>
                <Text fontSize="md" fontWeight="bold" color="#333">
                  Felipe Erick
                </Text>
              </Stack>
            </Flex>
          </Grid>

          <Grid gap="1rem">
            <EnvironmentProvider>
              <iframe
                title="Mapa"
                width="100%"
                height="170"
                style={{
                  border: 0,
                  filter: 'grayscale(0.5)',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                }}
                loading="lazy"
                allowFullScreen
                src={map}
              />
            </EnvironmentProvider>
            <Stack gap="0">
              <Text fontSize="x-small" fontWeight="bold" color="gray.900">
                Endereço
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="#333">
                Rua Professor João Machado, 705 - Apto 38A{' '}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Nossa senhora do Ó
              </Text>
              <Text fontSize="x-small" color="gray.500">
                02927-000 - São Paulo - SP
              </Text>
            </Stack>
          </Grid>

          <Separator />
          <Grid templateColumns="1fr 1fr">
            <Stack gap="0" alignItems="flex-start">
              <Text fontSize="x-small" fontWeight="bold" color="gray.900">
                Data agendada
              </Text>
              <Text fontSize="md" fontWeight="bold" color="#333">
                15/06/2025
              </Text>
            </Stack>
            <Stack gap="0" alignItems="flex-start">
              <Text fontSize="x-small" fontWeight="bold" color="gray.900">
                Horário agendado
              </Text>
              <Text fontSize="md" fontWeight="bold" color="#333">
                08:00 - 10:00
              </Text>
            </Stack>
          </Grid>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
