/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, type LazyExoticComponent } from 'react';
import { User } from '@/assets/icons/user';
import { Map } from '@/assets/icons/map';
import { defaultColor } from '@/theme';
import { COLORS } from '@/constants/styles';
import { Briefcase } from '@/assets/icons/briefcase';
import { ShieldTick } from '@/assets/icons/shield-tick';

export const componentsByStep: Record<number, LazyExoticComponent<any>> = {
  0: lazy(() =>
    import('./forms/PersonalInformation').then(({ PersonalInformation }) => ({
      default: PersonalInformation,
    })),
  ),
  1: lazy(() =>
    import('./forms/AddressInformation').then(({ AddressInformation }) => ({
      default: AddressInformation,
    })),
  ),
  2: lazy(() =>
    import('./forms/CompanyInformation').then(({ CompanyInformation }) => ({
      default: CompanyInformation,
    })),
  ),
  3: lazy(() =>
    import('./forms/AllowDevices').then(({ AllowDevices }) => ({
      default: AllowDevices,
    })),
  ),
};

export const steps = [
  {
    title: 'Precisamos de algumas informações para finalizar seu cadastro.',
    subtitle: 'Preencha os campos abaixo para continuar.',
    icon: ({ active, size }: { active: boolean; size: number }) => (
      <User color={active ? defaultColor[900] : COLORS.TITLE} size={size} />
    ),
    description: 'Personal Information',
    index: 0,
  },
  {
    title: 'Agora precisamos saber sua localização.',
    subtitle:
      'O endereço será utilizado para que os seus clientes encontrem você.',
    icon: ({ active, size }: { active: boolean; size: number }) => (
      <Map color={active ? defaultColor[900] : COLORS.TITLE} size={size} />
    ),
    description: 'Address Information',
    index: 1,
  },
  {
    title: 'Agora precisamos de informações sobre sua empresa.',
    subtitle:
      'Aqui você pode adicionar a descrição e as fotos que irão compor o seu portfolio.',
    icon: ({ active, size }: { active: boolean; size: number }) => (
      <Briefcase
        color={active ? defaultColor[900] : COLORS.TITLE}
        size={size}
      />
    ),
    description: 'Company Information',
    index: 2,
  },
  {
    title: 'Autorizar notificações',
    subtitle:
      'Precisamos que habilite as notificações para que possamos enviar as informações de contato de novos clientes e orçamentos.',
    icon: ({ active, size }: { active: boolean; size: number }) => (
      <ShieldTick
        color={active ? defaultColor[900] : COLORS.TITLE}
        size={size}
      />
    ),
    description: 'Allow Devices',
    index: 3,
  },
];

export const states = [
  { label: 'AC', value: 'AC' },
  { label: 'AL', value: 'AL' },
  { label: 'AP', value: 'AP' },
  { label: 'AM', value: 'AM' },
  { label: 'BA', value: 'BA' },
  { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' },
  { label: 'ES', value: 'ES' },
  { label: 'GO', value: 'GO' },
  { label: 'MA', value: 'MA' },
  { label: 'MT', value: 'MT' },
  { label: 'MS', value: 'MS' },
  { label: 'MG', value: 'MG' },
  { label: 'PA', value: 'PA' },
  { label: 'PB', value: 'PB' },
  { label: 'PR', value: 'PR' },
  { label: 'PE', value: 'PE' },
  { label: 'PI', value: 'PI' },
  { label: 'RJ', value: 'RJ' },
  { label: 'RN', value: 'RN' },
  { label: 'RS', value: 'RS' },
  { label: 'RO', value: 'RO' },
  { label: 'RR', value: 'RR' },
  { label: 'SC', value: 'SC' },
  { label: 'SP', value: 'SP' },
  { label: 'SE', value: 'SE' },
  { label: 'TO', value: 'TO' },
];
