import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@/routes/routes';
import { Authentication } from '@/pages/Authentication/Authentication';
import { publicRoutes } from './publicRoutes';
import { useStorage } from '@/hooks/useStorage';
import { Layout } from '@/Layout/Layout';
import { useEffect, useState, type ReactNode } from 'react';
// import { PWAUpdatePrompt } from '@/components/ui/pwa-update-prompt';
import { PWAInstallButton } from '@/components/ui/pwa-install-button';
// import { PWANotification } from '@/components/ui/pwa-notification';
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
  const [token, setToken] = useState<string | null>(null);
  console.log(token);
  // const handleUpdateAvailable = () => {
  //   alert('PWA update available');
  // };

  // const handleUpdateApplied = () => {
  //   console.log('PWA update applied');
  // };

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
        })
          .then((currentToken: string) => {
            if (currentToken) {
              setToken(currentToken);
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
