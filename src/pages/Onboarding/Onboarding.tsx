/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type LazyExoticComponent,
} from 'react';
import { useStorage } from '@/hooks/useStorage';
import { useNavigate } from 'react-router-dom';
import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { User } from '@/assets/icons/user';
import { Map } from '@/assets/icons/map';

import { defaultColor } from '@/theme';
import { COLORS } from '@/constants/styles';
import { Stepper } from './components/Stepper';
import { decodeJWT } from '@aws-amplify/core';
import { Briefcase } from '@/assets/icons/briefcase';

export type FormProps = {
  user: {
    email: string;
    phoneNumber: string;
    companyName: string;
    address: string;
    portfolio: string[];
  };
  error: {
    email?: boolean;
    phoneNumber?: boolean;
    companyName?: boolean;
    address?: boolean;
    portfolio?: boolean;
  };
};

const steps = [
  {
    title: 'Precisamos de algumas informações para finalizar seu cadastro.',
    subtitle: 'Preencha os campos abaixo para continuar.',
    icon: ({ active, size }: { active: boolean; size: number }) => (
      <User color={active ? defaultColor[900] : COLORS.TITLE} size={size} />
    ),
    description: 'Contact Details',
    index: 0,
  },
  {
    title: 'Agora precisamos saber sua localização.',
    subtitle:
      'O endereço será utilizado para que os seus clientes encontrem você.',
    icon: ({ active, size }: { active: boolean; size: number }) => (
      <Map color={active ? defaultColor[900] : COLORS.TITLE} size={size} />
    ),
    description: 'Payment',
    index: 1,
  },
  {
    title: 'Agora precisamos de informações sobre sua empresa.',
    subtitle:
      'Aqui você pode adicionar a descrição e as fotos que irão compor o seu portfolio.',
    icon: ({ active, size }: { active: boolean; size: number }) => (
      <Briefcase
        color={active ? defaultColor[900] : COLORS.TITLE}
        size={size}
      />
    ),
    description: 'Book an Appointment',
    index: 2,
  },
];

const componentsByStep: Record<number, LazyExoticComponent<any>> = {
  0: lazy(() =>
    import('./forms/PersonalInformation').then(({ PersonalInformation }) => ({
      default: PersonalInformation,
    })),
  ),
  1: lazy(() =>
    import('./forms/AddressInformation').then(({ AddressInformation }) => ({
      default: AddressInformation,
    })),
  ),
  2: lazy(() =>
    import('./forms/CompanyInformation').then(({ CompanyInformation }) => ({
      default: CompanyInformation,
    })),
  ),
};

export const Onboarding = () => {
  const { getStorage } = useStorage();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(0);
  const Component: any = componentsByStep[currentStep];

  useEffect(() => {
    const idToken = getStorage('idToken');
    if (!idToken) {
      navigate('/login');
    } else {
      const { payload } = decodeJWT(idToken);
      setUser({
        email: payload.email,
      });
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
          <Suspense fallback={<Spinner />}>
            <Component user={user} />
          </Suspense>
        </Stack>
      </Stepper>
    </Stack>
  );
};
