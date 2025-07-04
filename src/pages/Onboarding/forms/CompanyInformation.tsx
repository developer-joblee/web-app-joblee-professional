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
import { useState } from 'react';
import { useGlobal } from '@/hooks/useGlobal';
import { Footer } from '../components/Footer';
import type { UserProps } from '@/types';

export const CompanyInformation = () => {
  const { user } = useGlobal();
  const {
    categories,
    fieldError,
    currentStep,
    submitLoading,
    categoriesLoading,
    onNext,
    onPrev,
  } = useOnboarding();

  console.log(categories);

  const [form, setForm] = useState({
    ...user,
    categories: [],
  } as UserProps);

  return (
    <Stack gap="2rem">
      <Stack gap="0.25rem">
        <ResponsiveSelect
          disabled={categoriesLoading}
          error={Boolean(fieldError?.categories)}
          value={form.categories[0]?.id || ''}
          label="Escolha a categoria que melhor descreve sua empresa/negócio"
          placeholder="Selecione"
          options={categories}
          onChange={(selected: any) =>
            setForm((prev) => ({
              ...prev,
              categories: [{ id: selected.value }],
            }))
          }
        />
      </Stack>

      <Field.Root invalid={Boolean(fieldError?.description)}>
        <Field.Label>Descrição sobre sua empresa/negócio</Field.Label>
        <Textarea
          rows={8}
          placeholder="Insira uma descrição"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
        />
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
      <Footer
        onNext={(step) => onNext(step, form)}
        onPrev={(step) => onPrev(step)}
        loading={submitLoading}
        currentStep={currentStep}
      />
    </Stack>
  );
};
