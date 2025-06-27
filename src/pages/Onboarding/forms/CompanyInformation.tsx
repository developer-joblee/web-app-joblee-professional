/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Field,
  FileUpload,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { LuFileImage } from 'react-icons/lu';
import { useOnboarding } from '../Onboarding.context';
import { FileUploadList } from '@/components/ui/file-upload-list';
import { ResponsiveSelect } from '@/components/ui/responsive-select';
import { serviceCategories } from '../Onboarding.constants';

export const CompanyInformation = () => {
  const { error, setUser } = useOnboarding();
  return (
    <Stack gap="2rem">
      <Stack gap="0.25rem">
        <ResponsiveSelect
          label="Escolha a categoria que melhor descreve sua empresa/negócio"
          options={serviceCategories}
          placeholder="Selecione"
          onChange={(selected: any) =>
            setUser((prev) => ({
              ...prev,
              serviceCategory: selected.value,
            }))
          }
        />
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
          Adicione as fotos que irão compor o seu portfolio.
        </Text>

        <FileUpload.Root accept="image/*" maxFiles={10} mt={4} mb={4}>
          <FileUpload.HiddenInput />
          <Stack
            gap="0.25rem"
            width={{ base: 'full', md: 'calc(50% - 0.5rem)' }}
          >
            <FileUpload.Trigger asChild>
              <Button variant="outline" size="sm">
                <LuFileImage /> Adicionar foto do perfil
              </Button>
            </FileUpload.Trigger>
            <Text fontSize="xs" textAlign="center">
              Essas fotos serão exibidas para os usuários.
            </Text>
          </Stack>
          <FileUploadList />
        </FileUpload.Root>
      </Stack>
    </Stack>
  );
};
