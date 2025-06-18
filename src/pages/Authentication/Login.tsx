import {
  Button,
  Checkbox,
  Field,
  Flex,
  Input,
  InputGroup,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { LuLock, LuMail } from 'react-icons/lu';
import { colors } from '@/styles/tokens';
import { defaultColor } from '@/theme';
import { useAuthentication } from '@/pages/Authentication/Authentication.hooks';

export const Login = () => {
  const {
    error,
    signInLoading,
    cachedCredentials,
    navigate,
    setCachedCredentials,
    handleSignIn,
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
      <Stack gap="0rem">
        <Text fontSize="3xl" fontWeight="bold" lineHeight="1.2">
          Olá,
        </Text>
        <Text fontSize="3xl" fontWeight="bold" lineHeight="1">
          Bem vindo de volta
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight="light" lineHeight="2">
          Insira suas credenciais para continuar
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

        <Field.Root required>
          <Field.Label>
            Senha <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<LuLock />}>
            <PasswordInput
              placeholder="Insira sua senha"
              onChange={(e) =>
                setCachedCredentials({
                  ...cachedCredentials,
                  password: e.target.value,
                })
              }
            />
          </InputGroup>
          <Field.HelperText
            color={colors.error}
            display={error.password ? 'block' : 'none'}
          >
            Senha obrigatória.
          </Field.HelperText>
        </Field.Root>
        <Flex justifyContent="space-between">
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Lembre-se de mim</Checkbox.Label>
          </Checkbox.Root>
          <Button
            variant="plain"
            height="auto"
            padding="0"
            color={defaultColor[900]}
            fontSize="sm"
            onClick={() => navigate('/code-verify')}
          >
            Esqueceu sua senha?
          </Button>
        </Flex>
      </Stack>

      <Button
        disabled={signInLoading}
        loading={signInLoading}
        onClick={() => handleSignIn(cachedCredentials)}
      >
        Entrar
      </Button>
      <Flex justifyContent="center" alignItems="center" gap="0.5rem">
        <Text fontSize="sm">Ainda não tem uma conta?</Text>
        <Button
          variant="plain"
          height="auto"
          padding="0"
          color={defaultColor[900]}
          fontSize="sm"
          onClick={() => navigate('/register')}
        >
          Cadastre-se
        </Button>
      </Flex>
    </Stack>
  );
};
