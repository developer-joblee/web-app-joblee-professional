import { Stack } from '@chakra-ui/react';

export const Authentication = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      width="100%"
      height="100%"
      padding="24px"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Stack>
  );
};
