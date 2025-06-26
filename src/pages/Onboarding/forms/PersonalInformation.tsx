import {
  Stack,
  Input,
  Field,
  InputGroup,
  FileUpload,
  Icon,
  Box,
} from '@chakra-ui/react';
import {
  LuUser,
  LuMail,
  LuUpload,
  LuSmartphone,
  LuBriefcaseBusiness,
} from 'react-icons/lu';
import { colors } from '@/styles/tokens';
import type { FormProps } from '../Onboarding';

export const PersonalInformation = ({ user, error }: FormProps) => {
  return (
    <Stack gap={{ base: '0', md: '1rem' }}>
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
          <Field.Label>Endereço de email</Field.Label>
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

      <FileUpload.Root
        maxW="full"
        alignItems="stretch"
        maxFiles={10}
        mt={6}
        accept="image/*"
      >
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone>
          <Icon size="md" color="fg.muted">
            <LuUpload />
          </Icon>
          <FileUpload.DropzoneContent>
            <Box>
              Você pode arrastar e soltar as fotos que ficarão no seu portfolio
              aqui
            </Box>
            <Box color="fg.muted">.png, .jpg (até 5MB)</Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
        <FileUpload.List />
      </FileUpload.Root>
    </Stack>
  );
};
