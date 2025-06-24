import { Flex } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

type UserProfileButtonProps = {
  opened: boolean;
  name: string;
  email: string;
  image: string;
  mobile?: boolean;
};

export const UserProfileButton = ({
  opened,
  name,
  email,
  image,
}: UserProfileButtonProps) => {
  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      gap="0.75rem"
      width="100%"
      padding="0.25rem 0"
    >
      <Avatar.Root shape="rounded" size="sm" minWidth="40px" minHeight="40px">
        <Avatar.Fallback name={name} />
        <Avatar.Image src={image} />
      </Avatar.Root>
      <Stack
        gap="0px"
        width="100%"
        alignItems="flex-start"
        display={opened ? 'flex' : 'none'}
        opacity={opened ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
      >
        <Text fontWeight="medium">{name}</Text>
        <Text fontSize="xs" fontWeight="normal">
          {email}
        </Text>
      </Stack>
    </Flex>
  );
};
