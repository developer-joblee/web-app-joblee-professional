import { defaultColor } from '@/theme';
import {
  Box,
  Flex,
  Text,
  Stack,
  Portal,
  Popover,
  IconButton,
} from '@chakra-ui/react';
import { BsFillPatchQuestionFill } from 'react-icons/bs';

const colors: Record<number, string> = {
  1: 'red',
  2: 'coral',
  3: 'orange',
  4: 'gold',
  5: 'green',
};

const strengthText: Record<number, string> = {
  1: 'Fraco',
  2: 'Fraco',
  3: 'Médio',
  4: 'Médio',
  5: 'Forte',
};

const levelItems = [
  '8 caracteres',
  '1 letra maiúscula',
  '1 letra minúscula',
  '1 número',
  '1 caractere especial',
];

export const PasswordStrengthBar = ({ level }: { level: number }) => {
  return (
    <Stack>
      <Flex gap="0.25rem" mt="-0.5rem">
        <Box
          height="4px"
          borderRadius="2px"
          width="100%"
          backgroundColor={level >= 1 ? colors[level] : 'gray.100'}
        />
        <Box
          height="4px"
          borderRadius="2px"
          width="100%"
          backgroundColor={level >= 2 ? colors[level] : 'gray.100'}
        />
        <Box
          height="4px"
          borderRadius="2px"
          width="100%"
          backgroundColor={level >= 3 ? colors[level] : 'gray.100'}
        />
        <Box
          height="4px"
          borderRadius="2px"
          width="100%"
          backgroundColor={level >= 4 ? colors[level] : 'gray.100'}
        />
        <Box
          height="4px"
          borderRadius="2px"
          width="100%"
          backgroundColor={level === 5 ? colors[level] : 'gray.100'}
        />
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontSize="xs" color="gray.500">
          {strengthText[level]}
        </Text>
        <Popover.Root positioning={{ placement: 'bottom-end' }} closeOnEscape>
          <Popover.Trigger asChild>
            <IconButton size="sm" variant="plain" mt="-0.75rem">
              <BsFillPatchQuestionFill color={defaultColor[900]} />
            </IconButton>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content
                width="fit-content"
                css={{ '--popover-bg': '#333' }}
              >
                <Popover.Arrow />
                <Popover.Body padding="0.75rem">
                  <Text fontSize="xs" color="white">
                    A senha deve conter pelo menos:
                  </Text>
                  {levelItems.map((item, index) => (
                    <Text fontSize="xs" color="white" key={index}>
                      {item}
                    </Text>
                  ))}
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Flex>
    </Stack>
  );
};
