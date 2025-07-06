import { Flex, IconButton, Text } from '@chakra-ui/react';
import { LuArrowLeft } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export const NavigationHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  return (
    <Flex alignItems="center" gap="1rem">
      <IconButton rounded="l2" size="sm" onClick={() => navigate(-1)}>
        <LuArrowLeft />
      </IconButton>
      <Text fontSize="md" fontWeight="600">
        {title}
      </Text>
    </Flex>
  );
};
