/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom';
import { routes } from '@/routes/routes';
import { Authentication } from '@/pages/Authentication/Authentication';
import { publicRoutes } from './publicRoutes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '@/hooks/useStorage';
import { Layout } from '@/Layout/Layout';
import '@/App.css';

export const PageRoutes = () => {
  const navigate = useNavigate();
  const { getStorage } = useStorage();

  const checkLogged = () => {
    const token = getStorage('idToken');
    return !!token;
  };

  const fetchApp = async () => {
    const logged = checkLogged();
    if (logged) {
      navigate('/');
      return;
    }
  };

  useEffect(() => {
    fetchApp();
  }, []);

  return (
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
            <Layout>
              <route.component />
            </Layout>
          }
        />
      ))}
    </Routes>
  );
};
