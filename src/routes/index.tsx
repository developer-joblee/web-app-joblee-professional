/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // Detecta se é iOS
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
    const hasBasicSupport =
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'Notification' in window &&
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
    // Log para debug
    console.log('=== FCM Debug Info ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Is iOS:', isIOS());
    console.log('Is PWA Installed:', isPWAInstalled());
    console.log('FCM Supported:', isFCMSupported());
    console.log(
      'Should Show iOS Install Prompt:',
      shouldShowIOSInstallPrompt(),
    );

    // Se for iOS sem PWA instalada, mostrar aviso
    if (shouldShowIOSInstallPrompt()) {
      console.log(
        '⚠️ iOS detectado: Para receber notificações, instale o app na tela inicial',
      );
      return;
    }

    // Se FCM não for suportado, sair
    if (!isFCMSupported()) {
      console.log('❌ FCM não suportado neste dispositivo/configuração');
      return;
    }

    // Se messaging não estiver inicializado, sair
    if (!messaging) {
      console.error('❌ Firebase messaging não inicializado');
      return;
    }

    // Solicitar permissão e obter token
    const setupFCM = async () => {
      try {
        const permission = await Notification.requestPermission();
        console.log('📝 Permissão de notificação:', permission);

        if (permission === 'granted') {
          const currentToken = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
          });

          if (currentToken) {
            console.log('✅ FCM Token obtido:', currentToken);
            // Aqui você pode enviar o token para seu backend
            // sendTokenToServer(currentToken);
          } else {
            console.warn('⚠️ Sem token de registro disponível');
          }
        } else {
          console.warn('⚠️ Permissão de notificação negada');
        }
      } catch (error) {
        console.error('❌ Erro ao configurar FCM:', error);
      }
    };

    setupFCM();
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

      {/* Aviso específico para iOS */}
      {shouldShowIOSInstallPrompt() && (
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
      )}

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
