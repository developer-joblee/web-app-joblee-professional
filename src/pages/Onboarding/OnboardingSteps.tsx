/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { Stepper } from './components/Stepper';
import { componentsByStep, steps } from './Onboarding.constants';
import { useOnboarding } from './Onboarding.context';
import { useStorage } from '@/hooks/useStorage';
import { useNavigate } from 'react-router-dom';
import { decodeJWT } from '@aws-amplify/core';

export const OnboardingSteps = () => {
  const { user, setUser } = useOnboarding();
  const { getStorage } = useStorage();
  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useOnboarding();
  const Component = componentsByStep[currentStep];

  useEffect(() => {
    const idToken = getStorage('idToken');
    if (!idToken) {
      navigate('/login');
    } else {
      const { payload } = decodeJWT(idToken);
      const { email } = payload;
      const userNew: any = {
        ...user,
        email,
      };
      setUser(userNew);
    }
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
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      >
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
