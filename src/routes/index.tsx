/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@/routes/routes';
import { Authentication } from '@/pages/Authentication/Authentication';
import { publicRoutes } from './publicRoutes';
import { Layout } from '@/Layout/Layout';
import { useEffect, type ReactNode } from 'react';
// import { PWAInstallButton } from '@/components/ui/pwa-install-button';
import { NotificationPermissionPrompt } from '@/components/ui/notification-permission-prompt';
import { useStorage } from '@/hooks/useStorage';
import { useGlobal } from '@/hooks/useGlobal';
import { ErrorFallback } from '@/components/error-fallback';
import { Spinner, Stack } from '@chakra-ui/react';
import '@/App.css';

const colors: any = { 400: '#4b41bd', 900: '#6759ff' };

const changeThemeVars = () => {
  document.documentElement.style.setProperty(
    '--chakra-colors-gray-900',
    colors[900],
  );
  document.documentElement.style.setProperty(
    '--chakra-colors-gray-400',
    colors[400],
  );
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { globalError, globalLoading } = useGlobal();
  const { getStorage } = useStorage();

  const checkLogged = () => {
    const token = getStorage('idToken');
    return !!token;
  };

  if (!checkLogged()) return <Navigate to="/login" replace />;

  if (globalLoading)
    return (
      <Stack
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="lg" />
      </Stack>
    );

  if (globalError) return <ErrorFallback />;

  return children;
};

export const AppRoutes = () => {
  const isIOS = () => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  };

  // Detecta se a PWA está instalada (standalone mode)
  const isPWAInstalled = () => {
    const windowObject: any = window || {};
    return (
      windowObject?.navigator.standalone === true ||
      windowObject?.matchMedia('(display-mode: standalone)').matches
    );
  };

  // Verifica suporte completo ao FCM
  const isFCMSupported = () => {
    // Verificação de segurança para Safari iOS
    const hasNotificationAPI =
      typeof window !== 'undefined' && 'Notification' in window;

    const hasBasicSupport =
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      hasNotificationAPI &&
      'PushManager' in window;

    // No iOS, só funciona se a PWA estiver instalada
    if (isIOS()) {
      return hasBasicSupport && isPWAInstalled();
    }

    return hasBasicSupport;
  };

  // Verifica se deve mostrar aviso para instalar PWA no iOS
  const shouldShowIOSInstallPrompt = () => {
    return isIOS() && !isPWAInstalled();
  };

  useEffect(() => {
    changeThemeVars();
    // Log básico para debug - sem solicitar permissões automaticamente
    console.log('=== FCM Debug Info ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Is iOS:', isIOS());
    console.log('Is PWA Installed:', isPWAInstalled());
    console.log('FCM Supported:', isFCMSupported());
    console.log(
      'Should Show iOS Install Prompt:',
      shouldShowIOSInstallPrompt(),
    );
    console.log(
      'Notification Permission:',
      typeof window !== 'undefined' && 'Notification' in window
        ? Notification.permission
        : 'não suportado',
    );
  }, []);

  useEffect(() => {
    const preventDoubleTapZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventDoubleTapZoom, {
      passive: false,
    });

    return () => {
      document.removeEventListener('touchstart', preventDoubleTapZoom);
    };
  }, []);

  return (
    <>
      {/* <PWAInstallButton /> */}
      <NotificationPermissionPrompt />

      {/* Aviso específico para iOS
      {shouldShowIOSInstallPrompt() && isIOS() && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#007AFF',
            color: 'white',
            padding: '8px 16px',
            fontSize: '14px',
            textAlign: 'center',
            zIndex: 9999,
          }}
        >
          📱 Para receber notificações no iOS, instale o app na tela inicial
        </div>
      )} */}

      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={
              <Authentication>
                <route.component />
              </Authentication>
            }
          />
        ))}

        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={
              <PrivateRoute>
                <Layout>
                  <route.component />
                </Layout>
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </>
  );
};
