import axios from 'axios';
import type { AxiosResponse } from 'axios';

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
