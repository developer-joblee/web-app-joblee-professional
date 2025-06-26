import {
  Box,
  Field,
  FileUpload,
  Icon,
  NativeSelect,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { LuUpload } from 'react-icons/lu';
import type { FormProps } from '../Onboarding';

export const CompanyInformation = ({ user, error }: FormProps) => {
  console.log(user);
  return (
    <Stack gap="2rem">
      <Stack gap="0.25rem">
        <Text fontSize="sm" fontWeight="medium">
          Adicione as fotos que irão compor o seu portfolio.
        </Text>
        <FileUpload.Root
          maxW="full"
          alignItems="stretch"
          maxFiles={10}
          mt={6}
          accept="image/*"
        >
          {/* <Grid gridTemplateColumns="1fr 1fr" gap="1rem"> */}
          <FileUpload.HiddenInput />
          <FileUpload.Dropzone>
            <Icon size="md" color="fg.muted">
              <LuUpload />
            </Icon>
            <FileUpload.DropzoneContent>
              <Box>
                Você pode arrastar e soltar as fotos que ficarão no seu
                portfolio aqui
              </Box>
              <Box color="fg.muted">.png, .jpg (até 5MB)</Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
          <FileUpload.List />
          {/* </Grid> */}
        </FileUpload.Root>
      </Stack>

      <Field.Root invalid={!!error?.companyName}>
        <Field.Label>Descrição sobre sua empresa/negócio</Field.Label>
        <Textarea rows={8} placeholder="Insira uma descrição" />
        <Field.HelperText>
          Essa descrição será exibida no seu perfil.
        </Field.HelperText>
        <Field.ErrorText>Essa descrição é obrigatória.</Field.ErrorText>
      </Field.Root>

      <Stack gap="0.25rem">
        <Text fontSize="sm" fontWeight="medium">
          Escolha a categoria que melhor descreve sua empresa/negócio.
        </Text>
        <NativeSelect.Root>
          <NativeSelect.Field>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Stack>
    </Stack>
  );
};
