import { z } from 'zod';

export const PersonalSchema = z.object({
  fullName: z.string().min(3, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phoneNumber: z.string().min(10, 'Telefone é obrigatório'),
  companyName: z.string().min(3, 'Nome da empresa/nome social é obrigatório'),
});

export const AddressSchema = z.object({
  address: z.object({
    neighborhood: z.string().min(3, 'Bairro é obrigatório'),
    number: z.string().min(1, 'Número é obrigatório'),
    city: z.string().min(3, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório'),
    street: z.string().min(3, 'Rua é obrigatória'),
    zipCode: z.string().min(8, 'CEP é obrigatório'),
  }),
});

export const ProfileSchema = z.object({
  description: z.string().min(3, 'Descrição é obrigatória'),
  services: z.array(z.string()).min(1, 'Pelo menos um serviço é obrigatório'),
});
