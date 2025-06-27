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
import { useState } from 'react';
import { getAddressByZipCode, getCoordinates } from '@/services/services';
import { ResponsiveSelect } from '@/components/ui/responsive-select';

export const AddressInformation = ({ user, error }: FormProps) => {
  const [address, setAddress] = useState({
    neighborhood: '',
    number: '',
    city: '',
    state: '',
    street: '',
    zipCode: '',
    latitude: 0,
    longitude: 0,
  });
  const [coordinatesLoading, setCoordinatesLoading] = useState(false);
  const [zipCode, setZipCode] = useState('');

  const handleZipCodeChange = async () => {
    try {
      setCoordinatesLoading(true);
      const { data } = await getAddressByZipCode(zipCode);
      const response = await getCoordinates(zipCode);
      setAddress({
        neighborhood: data.bairro,
        number: '',
        city: data.localidade,
        state: data.uf,
        street: data.logradouro,
        zipCode: zipCode,
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setCoordinatesLoading(false);
    }
  };

  return (
    <Stack gap="1rem">
      <Field.Root required width="50%" disabled={coordinatesLoading}>
        <Field.Label>CEP</Field.Label>
        <InputGroup startElement={<LuTag />}>
          <Input
            placeholder="00000-000"
            onBlur={handleZipCodeChange}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </InputGroup>
      </Field.Root>
      <Field.Root required>
        <Field.Label>Endereço</Field.Label>
        <InputGroup startElement={<LuMapPin />}>
          <Input
            value={address.street}
            placeholder="Insira seu endereço"
            onChange={(e) => console.log(e)}
          />
        </InputGroup>
      </Field.Root>
      <Grid gap="1rem" gridTemplateColumns="1fr 2fr">
        <Field.Root required>
          <Field.Label>Número</Field.Label>
          <InputGroup startElement={<LuHash />}>
            <Input placeholder="0000" onChange={(e) => console.log(e)} />
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

      <Grid gap="1rem" direction="column" gridTemplateColumns="2.75fr 1.25fr">
        <Field.Root required>
          <Field.Label>Cidade</Field.Label>
          <InputGroup startElement={<LuMapPinned />}>
            <Input
              value={address.city}
              placeholder="Insira sua cidade"
              onChange={(e) => console.log(e)}
            />
          </InputGroup>
        </Field.Root>

        <Field.Root required>
          <Field.Label>Estado</Field.Label>
          <InputGroup startElement={<LuMap />}>
            <Input placeholder="Estado" onChange={(e) => console.log(e)} />
          </InputGroup>
          <Field.HelperText
            color={colors.error}
            display={error?.companyName ? 'block' : 'none'}
          >
            Campo obrigatório.
          </Field.HelperText>
        </Field.Root>
      </Grid>
      <ResponsiveSelect
        label="Estado"
        icon={<LuMap />}
        placeholder="Estado"
        options={[
          { name: 'SP', id: 'sp' },
          { name: 'RJ', id: 'rj' },
          { name: 'MG', id: 'mg' },
          { name: 'ES', id: 'es' },
          { name: 'RS', id: 'rs' },
        ]}
      />
    </Stack>
  );
};
