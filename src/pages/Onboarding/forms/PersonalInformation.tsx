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
import type { FormProps } from '../Onboarding';
import { FileUploadList } from '@/components/ui/file-upload-list';

export const PersonalInformation = ({ user, error }: FormProps) => {
  return (
    <Stack gap="1rem">
      <Stack gap="1rem" direction={{ base: 'column', md: 'row' }}>
        <Field.Root>
          <Field.Label>Nome completo</Field.Label>
          <InputGroup startElement={<LuUser />}>
            <Input
              disabled
              placeholder="Insira seu nome"
              onChange={(e) => console.log(e)}
            />
          </InputGroup>
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Número de telefone <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<LuSmartphone />}>
            <Input
              placeholder="(xx) xxxxx-xxxx"
              onChange={(e) => console.log(e)}
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
              onChange={(e) => console.log(e)}
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
              onChange={(e) => console.log(e)}
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
          <Text fontSize="xs">
            Essa será a foto que irá ser exibida para os usuários.
          </Text>
        </Stack>
        <FileUploadList />
      </FileUpload.Root>
    </Stack>
  );
};
