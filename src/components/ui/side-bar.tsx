'use client';

import { Box, Stack, Text, Flex, Icon } from '@chakra-ui/react';
import {
  LuHouse,
  LuCalendar,
  LuFileText,
  LuDollarSign,
  LuSettings,
} from 'react-icons/lu';

const navItems = [
  { icon: LuHouse, label: 'Dashboard', path: '/' },
  { icon: LuFileText, label: 'Ordens de Serviço', path: '/orders' },
  { icon: LuDollarSign, label: 'Orçamentos', path: '/quotes' },
  { icon: LuCalendar, label: 'Agenda', path: '/calendar' },
  { icon: LuSettings, label: 'Configurações', path: '/settings' },
];

export function Sidebar() {
  const bg = 'white';
  const borderColor = 'gray.200';

  return (
    <Box
      w="250px"
      h="100dvh"
      bg={bg}
      borderRight="1px"
      borderColor={borderColor}
      p={4}
      display={{ base: 'none', md: 'block' }}
      position="fixed"
      left={0}
      top={0}
    >
      <Text fontSize="xl" fontWeight="bold" mb={6} color="blue.500">
        OS Platform
      </Text>

      <Stack
        // spacing={2}
        align="stretch"
      >
        {navItems.map((item, index) => {
          const isActive = index === 0;

          return (
            <Flex
              key={item.path}
              align="center"
              p={3}
              borderRadius="md"
              cursor="pointer"
              bg={isActive ? 'blue.50' : 'transparent'}
              color={isActive ? 'blue.600' : 'gray.600'}
              _hover={{ bg: 'blue.50', color: 'blue.600' }}
              onClick={() => console.log(item.path)}
            >
              <Icon as={item.icon} mr={3} />
              <Text fontWeight={isActive ? 'semibold' : 'normal'}>
                {item.label}
              </Text>
            </Flex>
          );
        })}
      </Stack>
    </Box>
  );
}
