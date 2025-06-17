import { defineConfig } from '@chakra-ui/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const semanticTokens = {
  colors: {
    'bg.disabled': {
      value: '#6e767c',
    },
    'fg.disabled': {
      value: '#6e767c',
    },
    'button.disabled': {
      value: '#6e767c',
    },
    'border.disabled': {
      value: '#6e767c',
    },
  },
};

export const defaultColor: any = { 400: '#4b41bd', 900: '#6759ff' };

export const config = defineConfig({
  theme: {
    tokens: {
      colors: { gray: defaultColor },
    },
    semanticTokens,
  },
});
