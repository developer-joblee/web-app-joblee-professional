import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@/routes/routes';
import { Authentication } from '@/pages/Authentication/Authentication';
import { publicRoutes } from './publicRoutes';
import { useStorage } from '@/hooks/useStorage';
import { Layout } from '@/Layout/Layout';
import { useEffect, type ReactNode } from 'react';
import { PWAUpdatePrompt } from '@/components/ui/pwa-update-prompt';
import { PWAInstallButton } from '@/components/ui/pwa-install-button';
import { PWANotificationTester } from '@/components/ui/pwa-notification-tester';
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
  const handleUpdateAvailable = () => {
    console.log('PWA update available');
  };

  const handleUpdateApplied = () => {
    console.log('PWA update applied');
  };

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
      <PWAUpdatePrompt
        onUpdateAvailable={handleUpdateAvailable}
        onUpdateApplied={handleUpdateApplied}
      />
      <PWAInstallButton />
      <PWANotificationTester />
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
