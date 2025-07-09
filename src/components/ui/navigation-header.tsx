import { Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { LuArrowLeft } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

type NavigationHeaderProps = {
  title: string;
  children: React.ReactNode;
};

export const NavigationHeader = ({
  title,
  children,
}: NavigationHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        alignItems="center"
        gap="1rem"
        position="fixed"
        top="0"
        left="0"
        right="0"
        backgroundColor="white"
        padding="1rem"
        zIndex="100"
      >
        <IconButton rounded="l2" size="sm" onClick={() => navigate(-1)}>
          <LuArrowLeft />
        </IconButton>
        <Text fontSize="md" fontWeight="600">
          {title}
        </Text>
      </Flex>
      <Stack mt="3rem">{children}</Stack>
    </>
  );
};
