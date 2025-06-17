import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider.tsx';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/Global.context.tsx';
import { config } from './theme.ts';
import { config as awsConfig } from './aws-exports.ts';
import { AuthProvider } from './context/Auth.context.tsx';
import { Amplify } from 'aws-amplify';
import { AppRoutes } from './routes/index.tsx';
import './index.css';

export const system = createSystem(defaultConfig, config);

Amplify.configure(awsConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <Provider defaultTheme="light">
            <ChakraProvider value={system}>
              <AppRoutes />
            </ChakraProvider>
          </Provider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>,
);
