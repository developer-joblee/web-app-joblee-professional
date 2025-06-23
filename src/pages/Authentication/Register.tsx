import {
  Button,
  Checkbox,
  Field,
  Flex,
  Input,
  Stack,
  Text,
  Image,
  InputGroup,
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { LuLock, LuMail, LuUser } from 'react-icons/lu';
import { defaultColor } from '@/theme';
import { useAuthentication } from '@/pages/Authentication/Authentication.hooks';
import { colors } from '@/styles/tokens';
import { useEffect } from 'react';

export const Register = () => {
  const {
    error,
    cachedCredentials,
    navigate,
    handleSignUp,
    setConfirmPassword,
    setCachedCredentials,
  } = useAuthentication();

  useEffect(() => {
    console.log(cachedCredentials);
  }, [cachedCredentials]);

  return (
    <Stack gap="2rem" maxWidth="360px" width="full">
      <Image
        src="https://i.postimg.cc/CxKJqbfZ/wide-joblee-logo-new.png"
        alt="Joblee"
        width="100%"
        objectFit="contain"
        height="70px"
      />
      <Stack gap="0rem">
        <Text fontSize="3xl" fontWeight="bold" lineHeight="1.2">
          Olá, muito prazer!
        </Text>
        <Text fontSize="3xl" fontWeight="bold" lineHeight="1">
          Vamos criar sua conta?
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight="light" lineHeight="2">
          Insira seus dados para criar sua conta
        </Text>
      </Stack>

      <Stack gap="1rem">
        <Field.Root required>
          <Field.Label>
            Nome completo <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<LuUser />}>
            <Input
              placeholder="Insira seu nome"
              onChange={(e) =>
                setCachedCredentials({
                  ...cachedCredentials,
                  fullName: e.target.value,
                })
              }
            />
          </InputGroup>
          <Field.HelperText
            color={colors.error}
            display={error.fullName ? 'block' : 'none'}
          >
            Nome obrigatório.
          </Field.HelperText>
        </Field.Root>

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

        <Field.Root required>
          <Field.Label>
            Confirmar Senha <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<LuLock />}>
            <PasswordInput
              placeholder="Insira sua senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputGroup>
          <Field.HelperText
            color={colors.error}
            display={error.confirmPassword ? 'block' : 'none'}
          >
            Senha obrigatória.
          </Field.HelperText>
        </Field.Root>
        <Flex padding="0.5rem 0 0 0">
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Flex alignItems="center" gap="0.25rem">
              <Checkbox.Label>Li e aceito os</Checkbox.Label>
              <Button
                variant="plain"
                padding="0"
                color={defaultColor[900]}
                fontSize="sx"
                onClick={() => navigate('/code-verify')}
              >
                termos e condições de uso
              </Button>
            </Flex>
          </Checkbox.Root>
        </Flex>
      </Stack>

      <Button onClick={() => handleSignUp(cachedCredentials)}>Cadastrar</Button>
      <Flex justifyContent="center" alignItems="center" gap="0.5rem">
        <Text fontSize="sm">Já possui uma conta?</Text>
        <Button
          variant="plain"
          padding="0"
          color={defaultColor[900]}
          fontSize="sm"
          onClick={() => navigate('/login')}
        >
          Entrar
        </Button>
      </Flex>
    </Stack>
  );
};
