import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { Stepper } from './components/Stepper';
import { componentsByStep, steps } from './Onboarding.constants';
import { useOnboarding } from './Onboarding.context';
import { useStorage } from '@/hooks/useStorage';
import { useNavigate } from 'react-router-dom';

export const OnboardingSteps = () => {
  const navigate = useNavigate();
  const { getStorage } = useStorage();
  const { currentStep, fetchCategories } = useOnboarding();
  const Component = componentsByStep[currentStep];

  useEffect(() => {
    const idToken = getStorage('idToken');
    if (!idToken) {
      navigate('/login');
    } else {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      padding="0"
      width="full"
      maxWidth="700px"
      height="100%"
      mt={8}
      alignItems="center"
    >
      <Stepper steps={steps}>
        <Stack gap="2rem">
          <Stack gap="0" mb={8} mt={8}>
            <Flex gap="1rem" alignItems="flex-start">
              {steps[currentStep].icon({
                active: true,
                size: 42,
              })}
              <Stack>
                <Text
                  fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}
                  fontWeight="bold"
                >
                  {steps[currentStep].title}
                </Text>
                <Text
                  fontWeight="light"
                  fontSize={{ base: 'xs', md: 'md', lg: 'lg' }}
                >
                  {steps[currentStep].subtitle}
                </Text>
              </Stack>
            </Flex>
          </Stack>
          <Suspense
            fallback={
              <Spinner size="md" justifyContent="center" alignItems="center" />
            }
          >
            <Component />
          </Suspense>
        </Stack>
      </Stepper>
    </Stack>
  );
};
