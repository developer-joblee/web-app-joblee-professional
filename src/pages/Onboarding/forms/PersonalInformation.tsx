import {
  Stack,
  Input,
  Field,
  InputGroup,
  FileUpload,
  Text,
  Button,
} from '@chakra-ui/react';
import {
  LuUser,
  LuMail,
  LuSmartphone,
  LuBriefcaseBusiness,
  LuFileImage,
} from 'react-icons/lu';
import { colors } from '@/styles/tokens';
import { FileUploadList } from '@/components/ui/file-upload-list';
import { maskPhone } from '@/utils/masks';
import { useOnboarding } from '../Onboarding.context';

export const PersonalInformation = () => {
  const { user, error, setUser } = useOnboarding();
  return (
    <Stack gap="1rem">
      <Stack gap="1rem" direction={{ base: 'column', md: 'row' }}>
        <Field.Root>
          <Field.Label>Nome completo</Field.Label>
          <InputGroup startElement={<LuUser />}>
            <Input
              value={user.name}
              placeholder="Insira seu nome"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </InputGroup>
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Número de telefone <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<LuSmartphone />}>
            <Input
              value={maskPhone(user.phoneNumber)}
              placeholder="(XX) XXXXX-XXXX"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </InputGroup>
          <Field.HelperText
            color={colors.error}
            display={error?.phoneNumber ? 'block' : 'none'}
          >
            Número obrigatório.
          </Field.HelperText>
        </Field.Root>
      </Stack>
      <Stack gap="1rem" direction={{ base: 'column', md: 'row' }}>
        <Field.Root required>
          <Field.Label>Endereço de e-mail</Field.Label>
          <InputGroup startElement={<LuMail />}>
            <Input
              disabled
              value={user?.email}
              placeholder="Insira seu email"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </InputGroup>
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Nome da empresa / Nome social. <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<LuBriefcaseBusiness />}>
            <Input
              placeholder="Insira o nome da empresa ou nome social"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
            />
          </InputGroup>
          <Field.HelperText
            color={colors.error}
            display={error?.companyName ? 'block' : 'none'}
          >
            Campo obrigatório.
          </Field.HelperText>
        </Field.Root>
      </Stack>

      <FileUpload.Root accept="image/*" maxFiles={1} mt={4}>
        <FileUpload.HiddenInput />
        <Stack gap="0.25rem" width={{ base: 'full', md: 'calc(50% - 0.5rem)' }}>
          <FileUpload.Trigger asChild>
            <Button variant="outline" size="sm">
              <LuFileImage /> Adicionar foto do perfil
            </Button>
          </FileUpload.Trigger>
          <Text fontSize="xs" textAlign="center">
            Essa será a foto que irá ser exibida para os usuários.
          </Text>
        </Stack>
        <FileUploadList />
      </FileUpload.Root>
    </Stack>
  );
};
