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

export const CodeVerify = () => {
  const {
    error,
    cachedCredentials,
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
          <Button
            fontSize="sm"
            variant="plain"
            padding="1rem 0 0 0"
            color={defaultColor[900]}
            onClick={() => console.log('resend')}
          >
            Reenviar código
          </Button>
        </Field.Root>
      </Stack>

      <Button onClick={() => handleConfirmSignUp(cachedCredentials)}>
        Verificar código
      </Button>
      <Flex justifyContent="center" alignItems="center" gap="0.25rem">
        <Text fontSize="sm">Voltar para a tela de</Text>
        <Button
          variant="plain"
          height="auto"
          padding="0"
          color={defaultColor[900]}
          fontSize="sm"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </Flex>
    </Stack>
  );
};
