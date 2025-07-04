// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState } from 'react';
import { getAddressByZipCode, getCoordinates } from '@/services/services';
import { ResponsiveSelect } from '@/components/ui/responsive-select';
import { maskCEP } from '@/utils/masks';
import { useOnboarding } from '../Onboarding.context';
import { states } from '../Onboarding.constants';
import type { UserProps } from '@/types';
import { Footer } from '../components/Footer';
import { toaster } from '@/components/ui/toaster';

export const AddressInformation = () => {
  const { fieldError, currentStep, submitLoading, onNext, onPrev } =
    useOnboarding();
  const [coordinatesLoading, setCoordinatesLoading] = useState(false);
  const [zipCode, setZipCode] = useState('');

  const [form, setForm] = useState({
    address: {
      neighborhood: '',
      number: '',
      complement: '',
      city: '',
      state: '',
      street: '',
      zipCode: '',
      latitude: 0,
      longitude: 0,
    },
  } as UserProps);

  const handleZipCodeChange = async () => {
    try {
      setCoordinatesLoading(true);
      const { data } = await getAddressByZipCode(zipCode.replace(/-/g, ''));
      const response = await getCoordinates(zipCode.replace(/-/g, ''));

      setForm((prev) => ({
        ...prev,
        address: {
          neighborhood: data.bairro,
          number: '',
          complement: '',
          city: data.localidade,
          state: data.uf,
          street: data.logradouro,
          zipCode: zipCode,
          latitude: Number(response.data[0].lat),
          longitude: Number(response.data[0].lon),
        },
      }));
    } catch (error) {
      console.log(error);
      toaster.create({
        description: 'Erro ao buscar endereço',
        type: 'error',
      });
    } finally {
      setCoordinatesLoading(false);
    }
  };

  return (
    <>
      <Stack gap="1rem">
        <Field.Root
          required
          width="50%"
          disabled={coordinatesLoading}
          invalid={Boolean(fieldError?.address?.zipCode)}
        >
          <Field.Label>CEP</Field.Label>
          <InputGroup startElement={<LuTag />}>
            <Input
              placeholder="00000-000"
              value={maskCEP(zipCode)}
              onBlur={handleZipCodeChange}
              onChange={(e) => setZipCode(maskCEP(e.target.value))}
            />
          </InputGroup>
        </Field.Root>
        <Field.Root required invalid={Boolean(fieldError?.address?.street)}>
          <Field.Label>Endereço</Field.Label>
          <InputGroup startElement={<LuMapPin />}>
            <Input
              value={form.address.street}
              placeholder="Insira seu endereço"
              disabled={coordinatesLoading}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  address: { ...prev.address, street: e.target.value },
                }))
              }
            />
          </InputGroup>
        </Field.Root>
        <Grid gap="1rem" gridTemplateColumns="1fr 2fr">
          <Field.Root required invalid={Boolean(fieldError?.address?.number)}>
            <Field.Label>Número</Field.Label>
            <InputGroup startElement={<LuHash />}>
              <Input
                value={form.address.number}
                placeholder="0000"
                disabled={coordinatesLoading}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: { ...prev.address, number: e.target.value },
                  }))
                }
              />
            </InputGroup>
          </Field.Root>
          <Field.Root
            required
            invalid={Boolean(fieldError?.address?.complement)}
          >
            <Field.Label>Complemento</Field.Label>
            <InputGroup startElement={<LuChartNoAxesGantt />}>
              <Input
                value={form.address.complement}
                placeholder="Ex. apto 123"
                disabled={coordinatesLoading}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: { ...prev.address, complement: e.target.value },
                  }))
                }
              />
            </InputGroup>
            <Field.HelperText
              color={colors.error}
              display={fieldError?.companyName ? 'block' : 'none'}
            >
              Campo obrigatório.
            </Field.HelperText>
          </Field.Root>
        </Grid>

        <Grid gap="1rem" direction="column" gridTemplateColumns="2.75fr 1.25fr">
          <Field.Root required invalid={Boolean(fieldError?.address?.city)}>
            <Field.Label>Cidade</Field.Label>
            <InputGroup startElement={<LuMapPinned />}>
              <Input
                value={form.address.city}
                placeholder="Insira sua cidade"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: { ...prev.address, city: e.target.value },
                  }))
                }
              />
            </InputGroup>
          </Field.Root>

          <ResponsiveSelect
            label="Estado"
            required
            error={Boolean(fieldError?.address?.state)}
            icon={<LuMap />}
            placeholder="Estado"
            options={states}
            value={form.address.state}
            onChange={(selected: any) =>
              setForm((prev) => ({
                ...prev,
                address: { ...prev.address, state: selected.value },
              }))
            }
          />
        </Grid>
      </Stack>
      <Footer
        currentStep={currentStep}
        loading={submitLoading}
        onNext={(step) => onNext(step, { address: [form.address] })}
        onPrev={onPrev}
      />
    </>
  );
};
