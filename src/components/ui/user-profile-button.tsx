import { Button } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

type UserProfileButtonProps = {
  opened: boolean;
  name: string;
  email: string;
  image: string;
  padding?: string;
};

export const UserProfileButton = ({
  opened,
  name,
  email,
  image,
  padding,
}: UserProfileButtonProps) => {
  return (
    <Button
      variant="ghost"
      justifyContent="flex-start"
      height="60px"
      gap="0.75rem"
      width="100%"
      padding={padding || (opened ? '1rem' : '0.125rem')}
    >
      <Avatar.Root shape="rounded" size="sm">
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
    </Button>
  );
};
