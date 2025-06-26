/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const multiGet = () => {
  const prefix = 'CognitoIdentityServiceProvider';
  const cognitokeys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key: string = localStorage.key(i) || '';
    if (
      key.startsWith(prefix) &&
      (key.endsWith('idToken') || key.endsWith('refreshToken'))
    ) {
      cognitokeys.push(key);
    }
  }

  const tokens: any = {};

  cognitokeys.forEach((key) => {
    if (key.includes('idToken')) {
      tokens.idToken = localStorage.getItem(key);
    }
    if (key.includes('refreshToken')) {
      tokens.refreshToken = localStorage.getItem(key);
    }
  });

  return tokens;
};

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const tokens = multiGet();

      if (tokens.idToken || tokens.refreshToken) {
        config.headers.Authorization = `Bearer ${tokens.idToken || tokens.refreshToken}`;
      }
    } catch (error) {
      console.error('Erro ao buscar token de autenticação:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.error(JSON.stringify(error));

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { tokens }: any = await fetchAuthSession();
        const token = tokens?.idToken.toString();

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Erro ao renovar token:', refreshError);
        await signOut();
      }
    }

    return Promise.reject(error);
  },
);
