import { colors } from '@/styles/tokens';
import { Field, Grid, Input, InputGroup, Stack } from '@chakra-ui/react';
import {
  LuChartNoAxesGantt,
  LuHash,
  LuMap,
  LuMapPin,
  LuMapPinned,
  LuTag,
} from 'react-icons/lu';
import type { FormProps } from '../Onboarding';

export const AddressInformation = ({ user, error }: FormProps) => {
  console.log(user);
  return (
    <>
      <Grid gap="1rem" direction="column" gridTemplateColumns="3fr 1fr">
        <Field.Root required>
          <Field.Label>Endereço</Field.Label>
          <InputGroup startElement={<LuMapPin />}>
            <Input
              placeholder="Insira seu endereço"
              onChange={(e) => console.log(e)}
            />
          </InputGroup>
        </Field.Root>
        <Field.Root required>
          <Field.Label>Número</Field.Label>
          <InputGroup startElement={<LuHash />}>
            <Input placeholder="Número" onChange={(e) => console.log(e)} />
          </InputGroup>
        </Field.Root>
      </Grid>
      <Stack gap="1rem" direction={{ base: 'column', md: 'row' }}>
        <Field.Root required>
          <Field.Label>Cidade</Field.Label>
          <InputGroup startElement={<LuMapPinned />}>
            <Input
              placeholder="Insira sua cidade"
              onChange={(e) => console.log(e)}
            />
          </InputGroup>
        </Field.Root>

        <Field.Root required>
          <Field.Label>Estado</Field.Label>
          <InputGroup startElement={<LuMap />}>
            <Input
              placeholder="Insira o estado"
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
      <Grid gap="1rem" direction="column" gridTemplateColumns="1fr 2fr">
        <Field.Root required>
          <Field.Label>CEP</Field.Label>
          <InputGroup startElement={<LuTag />}>
            <Input placeholder="00000-000" onChange={(e) => console.log(e)} />
          </InputGroup>
        </Field.Root>

        <Field.Root required>
          <Field.Label>Complemento</Field.Label>
          <InputGroup startElement={<LuChartNoAxesGantt />}>
            <Input
              placeholder="Ex. apto 123"
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
      </Grid>
    </>
  );
};
