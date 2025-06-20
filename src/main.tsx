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
import { Modal } from './components/ui/modal.tsx';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './firebase-exports.ts';

export const system = createSystem(defaultConfig, config);

Amplify.configure(awsConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.debug(analytics);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch((err) => {
      console.error('Erro ao registrar Service Worker:', err);
    });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <Provider defaultTheme="light">
            <ChakraProvider value={system}>
              <Modal />
              <AppRoutes />
            </ChakraProvider>
          </Provider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>,
);
