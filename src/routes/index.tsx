import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@/routes/routes';
import { Authentication } from '@/pages/Authentication/Authentication';
import { publicRoutes } from './publicRoutes';
import { useStorage } from '@/hooks/useStorage';
import { Layout } from '@/Layout/Layout';
import { useEffect, type ReactNode } from 'react';
import { PWAInstallButton } from '@/components/ui/pwa-install-button';
import { messaging, getToken } from '../firebase/firebase';
import '@/App.css';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { getStorage } = useStorage();

  const checkLogged = () => {
    const token = getStorage('idToken');
    return !!token;
  };

  if (!checkLogged()) return <Navigate to="/login" replace />;

  return children;
};

export const AppRoutes = () => {
  const isIOSSafari = () => {
    if (typeof window === 'undefined') return false;

    const userAgent = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isSafari =
      /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS|OPiOS/.test(userAgent);

    return isIOS && isSafari;
  };

  const isFCMSupported = () => {
    return (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'Notification' in window &&
      'PushManager' in window &&
      !isIOSSafari()
    );
  };

  useEffect(() => {
    if (!isFCMSupported()) {
      console.log('FCM não suportado neste dispositivo');
      return;
    }

    if (!messaging) {
      console.error('Firebase messaging não inicializado');
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
        })
          .then((currentToken: string) => {
            if (currentToken) {
              console.log('FCM Token:', currentToken);
            } else {
              console.warn('Sem token de registro');
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar o token', error);
          });
      }
    });
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
      <PWAInstallButton />
      {/* <PWAUpdatePrompt
        onUpdateAvailable={handleUpdateAvailable}
        onUpdateApplied={handleUpdateApplied}
      /> */}
      {/*
      <PWANotification /> */}
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
