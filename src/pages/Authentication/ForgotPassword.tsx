import {
  Button,
  Field,
  Flex,
  Stack,
  Text,
  Image,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { colors } from '@/styles/tokens';
import { defaultColor } from '@/theme';
import { useAuthentication } from '@/pages/Authentication/Authentication.hooks';
import { LuMail } from 'react-icons/lu';

export const ForgotPassword = () => {
  const {
    error,
    cachedCredentials,
    forgotPasswordLoading,
    navigate,
    setCachedCredentials,
    handleForgotPassword,
  } = useAuthentication();

  return (
    <Stack gap="2rem" maxWidth="360px" width="full" id="login-container">
      <Image
        src="/src/assets/Joblee.png"
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
          Esqueceu sua senha?
        </Text>
        <Text
          fontSize="md"
          color="gray.500"
          fontWeight="light"
          lineHeight="1.2"
        >
          Preencha seu endereço de e-mail e nós lhe enviaremos um código para
          redefinir sua senha.
        </Text>
      </Stack>

      <Stack gap="1rem">
        <Field.Root required>
          <Field.Label>
            Email <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<LuMail />}>
            <Input
              placeholder="Insira seu email"
              onChange={(e) =>
                setCachedCredentials({
                  ...cachedCredentials,
                  username: e.target.value,
                })
              }
            />
          </InputGroup>
          <Field.HelperText
            color={colors.error}
            display={error.email ? 'block' : 'none'}
          >
            Email obrigatório.
          </Field.HelperText>
        </Field.Root>
      </Stack>

      <Button
        onClick={() => handleForgotPassword(cachedCredentials)}
        loading={forgotPasswordLoading}
        disabled={forgotPasswordLoading}
      >
        Enviar
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
