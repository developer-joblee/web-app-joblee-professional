import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider.tsx';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/Global.context.tsx';
import { config as awsConfig } from './aws-exports.ts';
import { AuthProvider } from './context/Auth.context.tsx';
import { Amplify } from 'aws-amplify';
import { AppRoutes } from './routes/index.tsx';
import { Modal } from './components/ui/modal.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/error-fallback.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import './index.css';

Amplify.configure(awsConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <BrowserRouter>
          <GlobalProvider>
            <AuthProvider>
              <Provider defaultTheme="light">
                <Toaster />
                <Modal />
                <AppRoutes />
              </Provider>
            </AuthProvider>
          </GlobalProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </ChakraProvider>
  </StrictMode>,
);
