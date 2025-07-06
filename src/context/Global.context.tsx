/* eslint-disable react-hooks/exhaustive-deps */
import type { ModalProps } from '@/components/ui/modal';
import React, { useEffect, useState } from 'react';
import type { UserProps } from '@/types';
import { getUser } from '@/services/services';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@aws-amplify/auth';
import { publicRoutes } from '@/routes/publicRoutes';
import type { TabsProps } from '@/components/ui/responsive-nav-menu';

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = React.createContext({
  globalError: false,
  user: {} as UserProps,
  setUser: {} as React.Dispatch<React.SetStateAction<UserProps>>,
  logged: false,
  setLogged: {} as React.Dispatch<React.SetStateAction<boolean>>,
  globalLoading: false,
  setGlobalLoading: {} as React.Dispatch<React.SetStateAction<boolean>>,
  modalSettings: {} as ModalProps,
  setModalSettings: {} as React.Dispatch<React.SetStateAction<ModalProps>>,
  fetchUser: {} as (path?: string) => void,
  path: '' as string,
  currentTab: '' as TabsProps,
  setCurrentTab: {} as React.Dispatch<React.SetStateAction<TabsProps>>,
});

const publicPaths = publicRoutes
  .map((route) => route.path)
  .filter((path) => path !== '/onboarding');

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<TabsProps>('home');
  const path = useLocation().pathname;
  const { pathname } = useLocation();
  const [user, setUser] = useState({} as UserProps);
  const [globalError, setGlobalError] = useState(false);
  const [logged, setLogged] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [modalSettings, setModalSettings] = useState<ModalProps>({
    open: false,
    title: '',
    placement: 'center',
    content: null,
    onClose: () => {},
    footer: {
      primaryButton: {
        label: '',
        onClick: () => {},
      },
      secondaryButton: {
        label: '',
        onClick: () => {},
      },
    },
  });

  const fetchUser = async (path?: string) => {
    if (publicPaths.includes(pathname)) return;

    try {
      setGlobalError(false);
      setGlobalLoading(true);
      const { userId } = await getCurrentUser();
      const { data } = await getUser(userId);
      setUser({ ...data.content });

      if (path) {
        navigate(path);
        return;
      }

      const isProfileCompleted = Boolean(data?.content?.isProfileCompleted);
      navigate(isProfileCompleted ? '/' : '/onboarding');
    } catch (error) {
      console.log(error);
      setGlobalError(true);
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        path,
        logged,
        globalError,
        globalLoading,
        modalSettings,
        currentTab,
        setCurrentTab,
        setUser,
        setLogged,
        fetchUser,
        setGlobalLoading,
        setModalSettings,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
