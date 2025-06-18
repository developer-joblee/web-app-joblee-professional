import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@/routes/routes';
import { Authentication } from '@/pages/Authentication/Authentication';
import { publicRoutes } from './publicRoutes';
import { useStorage } from '@/hooks/useStorage';
import { Layout } from '@/Layout/Layout';
import { type ReactNode } from 'react';
import { PWAUpdatePrompt } from '@/components/ui/pwa-update-prompt';
import '@/App.css';
import { PWAInstallButton } from '@/components/ui/pwa-install-button';

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
  return (
    <>
      <PWAUpdatePrompt
        onUpdateAvailable={handleUpdateAvailable}
        onUpdateApplied={handleUpdateApplied}
      />
      <PWAInstallButton />
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
