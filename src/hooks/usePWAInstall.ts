/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  isStandalone: boolean;
  platform: string | null;
  canInstall: boolean;
  showIOSModal: boolean;
  canShowIOSInstructions: boolean; // Nova propriedade para iOS
}

export interface PWAInstallActions {
  showInstallPrompt: () => Promise<boolean>;
  dismissInstallPrompt: () => void;
  showIOSInstructions: () => void; // Nova ação para iOS
}

export function usePWAInstall(): PWAInstallState & PWAInstallActions {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<string | null>(null);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);

  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://'));

  // Detecta se é iOS e Safari
  const isIOSSafari =
    typeof window !== 'undefined' &&
    /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
    !(window.navigator as any).standalone &&
    /Safari/.test(window.navigator.userAgent) &&
    !/CriOS|FxiOS|OPiOS|mercury/.test(window.navigator.userAgent);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    let detectedPlatform = 'unknown';

    if (/android/.test(userAgent)) {
      detectedPlatform = 'android';
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      detectedPlatform = 'ios';
    } else if (/windows/.test(userAgent)) {
      detectedPlatform = 'windows';
    } else if (/mac/.test(userAgent)) {
      detectedPlatform = 'macos';
    } else if (/linux/.test(userAgent)) {
      detectedPlatform = 'linux';
    }

    setPlatform(detectedPlatform);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      setIsInstallable(true);

      console.log('PWA install prompt available');
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      console.log('PWA was installed');
    };

    // Só adiciona listeners se não for iOS Safari
    if (!isIOSSafari) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
    }

    // Check if app is already installed
    if (isStandalone) {
      setIsInstalled(true);
    }

    return () => {
      if (!isIOSSafari) {
        window.removeEventListener(
          'beforeinstallprompt',
          handleBeforeInstallPrompt,
        );
        window.removeEventListener('appinstalled', handleAppInstalled);
      }
    };
  }, [isStandalone, isIOSSafari]);

  const showInstallPrompt = async (): Promise<boolean> => {
    // Para iOS Safari, mostra instruções em vez do prompt
    if (isIOSSafari) {
      setShowIOSModal(true);
      return false;
    }

    if (!installPrompt) {
      console.log('No install prompt available');
      return false;
    }

    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsInstalled(true);
        setIsInstallable(false);
        setInstallPrompt(null);
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('Error showing install prompt:', error);
      return false;
    }
  };

  const dismissInstallPrompt = () => {
    setIsInstallable(false);
    setInstallPrompt(null);
    setShowIOSModal(false);
  };

  const showIOSInstructions = () => {
    setShowIOSModal(true);
  };

  // Para iOS: pode mostrar instruções se estiver no Safari e não instalado
  const canShowIOSInstructions = isIOSSafari && !isStandalone;

  // Para Android/outros: pode instalar se tiver prompt disponível
  const canInstall =
    (isInstallable && !isInstalled && !isStandalone) || canShowIOSInstructions;

  return {
    isInstallable: isInstallable || canShowIOSInstructions,
    isInstalled,
    isStandalone,
    platform,
    canInstall,
    showIOSModal,
    canShowIOSInstructions,
    showInstallPrompt,
    dismissInstallPrompt,
    showIOSInstructions,
  };
}
