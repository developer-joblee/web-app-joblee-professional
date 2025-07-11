/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Field,
  Flex,
  Stack,
  Text,
  Image,
  PinInput,
} from '@chakra-ui/react';
import { colors } from '@/styles/tokens';
import { defaultColor } from '@/theme';
import { useAuthentication } from '@/pages/Authentication/Authentication.hooks';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const ResendCodeButton = () => {
  const timerRef = useRef<any>(null);
  const { cachedCredentials, registerLoading, resendSignUpCode } = useAuth();
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState<number>(15);

  const handleResendCode = () => {
    setTimerActive(true);
    resendSignUpCode({
      username: cachedCredentials.username,
    });
    timerRef.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };

  useEffect(() => {
    if (time === 0) {
      clearInterval(timerRef.current);
      setTime(15);
      setTimerActive(false);
    }
  }, [time]);

  return (
    <Button
      fontSize="sm"
      variant="plain"
      padding="1rem 0 0 0"
      color={timerActive ? 'gray.500' : defaultColor[900]}
      onClick={() => !registerLoading && !timerActive && handleResendCode()}
    >
      {timerActive
        ? `Reenviar novamente em ${time} segundos`
        : 'Reenviar código'}
    </Button>
  );
};

export const CodeVerify = () => {
  const {
    error,
    cachedCredentials,
    registerLoading,
    navigate,
    setCachedCredentials,
    handleConfirmSignUp,
  } = useAuthentication();

  return (
    <Stack gap="2rem" maxWidth="360px" width="full" id="login-container">
      <Image
        src="https://i.postimg.cc/CxKJqbfZ/wide-joblee-logo-new.png"
        alt="Joblee"
        width="100%"
        objectFit="contain"
        height="70px"
      />
      <Stack gap="0.75rem">
        <Text
          fontSize="3xl"
          textAlign="center"
          fontWeight="bold"
          lineHeight="1"
        >
          Verifique seu email
        </Text>
        <Text
          fontSize="md"
          color="gray.500"
          fontWeight="light"
          lineHeight="1.2"
        >
          Insira o código de verificação que foi enviado para seu email
        </Text>
      </Stack>

      <Stack gap="1rem">
        <Field.Root required alignItems="center" justifyContent="center">
          <Flex gap="8px">
            <PinInput.Root>
              <PinInput.HiddenInput
                onChange={(e) =>
                  setCachedCredentials({
                    ...cachedCredentials,
                    code: e.target.value,
                  })
                }
              />
              <PinInput.Control>
                <PinInput.Input index={0} placeholder="" />
                <PinInput.Input index={1} placeholder="" />
                <PinInput.Input index={2} placeholder="" />
                <PinInput.Input index={3} placeholder="" />
                <PinInput.Input index={4} placeholder="" />
                <PinInput.Input index={5} placeholder="" />
              </PinInput.Control>
            </PinInput.Root>
          </Flex>
          <Field.HelperText
            color={colors.error}
            display={error.code ? 'block' : 'none'}
          >
            El código es obligatorio.
          </Field.HelperText>
          <ResendCodeButton />
        </Field.Root>
      </Stack>

      <Button
        onClick={() => handleConfirmSignUp(cachedCredentials)}
        disabled={registerLoading}
        loading={registerLoading}
      >
        Verificar código
      </Button>
      <Flex justifyContent="center" alignItems="center" gap="0.25rem">
        <Text fontSize="sm">Voltar para a tela de</Text>
        <Button
          variant="plain"
          height="auto"
          padding="0"
          color={registerLoading ? 'gray.500' : defaultColor[900]}
          fontSize="sm"
          onClick={() => !registerLoading && navigate('/login')}
        >
          Login
        </Button>
      </Flex>
    </Stack>
  );
};
