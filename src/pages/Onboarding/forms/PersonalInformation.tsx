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
import { useState } from 'react';
import { Footer } from '../components/Footer';
import type { UserProps } from '@/types';
import { getPresignedUrl } from '@/services/services';
import type { FileError } from '@zag-js/file-utils';

interface FileRejection {
  file: File;
  errors: FileError[];
}

interface FileDetails {
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
}

export const PersonalInformation = () => {
  const { fieldError, submitLoading, currentStep, user, onNext, onPrev } =
    useOnboarding();

  const [form, setForm] = useState({
    fullName: user.fullName,
    phoneNumber: '',
    companyName: '',
    email: user.email,
  } as UserProps);

  const handleFileAccept = async (fileDetails: FileDetails) => {
    try {
      console.log(fileDetails);
      const presignedUrl = await getPresignedUrl('profile-picture');
      console.log(presignedUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack gap="1rem">
        <Stack gap="1rem" direction={{ base: 'column', md: 'row' }}>
          <Field.Root required invalid={Boolean(fieldError.fullName)}>
            <Field.Label>Nome completo</Field.Label>
            <InputGroup startElement={<LuUser />}>
              <Input
                value={form.fullName || user.fullName}
                placeholder="Insira seu nome"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
              />
            </InputGroup>
            <Field.HelperText
              color={colors.error}
              display={fieldError.fullName ? 'block' : 'none'}
            >
              {fieldError.fullName}
            </Field.HelperText>
          </Field.Root>

          <Field.Root required invalid={Boolean(fieldError.phoneNumber)}>
            <Field.Label>
              Número de telefone <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<LuSmartphone />}>
              <Input
                value={maskPhone(form?.phoneNumber || '')}
                placeholder="(XX) XXXXX-XXXX"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </InputGroup>
            <Field.HelperText
              color={colors.error}
              display={fieldError.phoneNumber ? 'block' : 'none'}
            >
              {fieldError.phoneNumber}
            </Field.HelperText>
          </Field.Root>
        </Stack>
        <Stack gap="1rem" direction={{ base: 'column', md: 'row' }}>
          <Field.Root required>
            <Field.Label>Endereço de e-mail</Field.Label>
            <InputGroup startElement={<LuMail />}>
              <Input
                disabled
                value={form?.email || user.email}
                placeholder="Insira seu email"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </InputGroup>
          </Field.Root>

          <Field.Root required invalid={Boolean(fieldError.companyName)}>
            <Field.Label>
              Nome da empresa / Nome social. <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<LuBriefcaseBusiness />}>
              <Input
                placeholder="Insira o nome da empresa ou nome social"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    companyName: e.target.value,
                  }))
                }
              />
            </InputGroup>
            <Field.HelperText
              color={colors.error}
              display={fieldError.companyName ? 'block' : 'none'}
            >
              {fieldError.companyName}
            </Field.HelperText>
          </Field.Root>
        </Stack>

        <FileUpload.Root
          accept="image/*"
          maxFiles={1}
          mt={4}
          onFileChange={handleFileAccept}
        >
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
              Essa será a foto que irá ser exibida para os usuários.
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
    </>
  );
};
