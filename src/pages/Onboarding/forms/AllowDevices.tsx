import { Button, EmptyState, Stack, VStack } from '@chakra-ui/react';
import { LuShieldAlert, LuShieldCheck } from 'react-icons/lu';
import { useNotification } from '@/hooks/useNotification';
import { Footer } from '../components/Footer';
import { useOnboarding } from '../Onboarding.context';
import type { UserProps } from '@/types';
import { useGlobal } from '@/hooks/useGlobal';

export const AllowDevices = () => {
  const { permissionStatus, handleAllowNotifications } = useNotification();

  const { onNext, onPrev, submitLoading, currentStep } = useOnboarding();

  const { user } = useGlobal();

  const form = {
    ...user,
  } as UserProps;

  return (
    <Stack>
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            {permissionStatus === 'granted' ? (
              <LuShieldCheck color="green" />
            ) : (
              <LuShieldAlert color="orange" />
            )}
          </EmptyState.Indicator>
          <VStack textAlign="center" gap="1rem">
            <EmptyState.Title>
              {permissionStatus === 'granted'
                ? 'Notificações Permitidas'
                : 'Permita notificações'}
            </EmptyState.Title>
            <EmptyState.Description width="full" maxWidth="300px">
              Ao ativar notificações, você receberá notificações de novos
              clientes e orçamentos.
            </EmptyState.Description>
            <Button
              onClick={handleAllowNotifications}
              disabled={permissionStatus === 'granted'}
            >
              Permitir notificações
            </Button>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>

      <Footer
        onNext={(step) => onNext(step, form)}
        onPrev={(step) => onPrev(step)}
        loading={submitLoading}
        currentStep={currentStep}
      />
    </Stack>
  );
};
