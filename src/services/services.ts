import axios from 'axios';
import { api } from './api';
import type { AxiosResponse } from 'axios';
import type { UserProps } from '@/types';

export const getAddressByZipCode = (
  zipCode: string,
): Promise<AxiosResponse> => {
  const url = `https://viacep.com.br/ws/${zipCode}/json/`;
  return axios.get(url);
};

export const getCoordinates = (zipCode: string): Promise<AxiosResponse> => {
  const parameters = {
    postalcode: zipCode,
    country: 'Brazil',
    format: 'json',
  };

  const url = `https://nominatim.openstreetmap.org/search`;
  return axios.get(url, {
    params: parameters,
    headers: { 'User-Agent': 'CEPtoCoordinatesApp/1.0' },
  });
};

export const postUser = (payload: UserProps): Promise<AxiosResponse> => {
  return api.post('/professionals', payload);
};

export const getUser = (id: string): Promise<AxiosResponse> => {
  return api.get(`${import.meta.env.VITE_API_BASE_URL}/professionals/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getCategories = (): Promise<AxiosResponse> => {
  return api.get('/categories');
};

export const getProfessionalList = (): Promise<AxiosResponse> => {
  return api.get(`/professionals`);
};

export const getPresignedUrl = (
  id: string,
  imageType: 'portfolio' | 'profile-picture',
): Promise<AxiosResponse> => {
  return api.get(`/upload/presigned-url/professional`, {
    params: {
      id,
      imageType,
    },
  });
};
