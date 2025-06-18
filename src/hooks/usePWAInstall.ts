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
}

export interface PWAInstallActions {
  showInstallPrompt: () => Promise<boolean>;
  dismissInstallPrompt: () => void;
}

export function usePWAInstall(): PWAInstallState & PWAInstallActions {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<string | null>(null);

  // Check if app is running in standalone mode
  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://'));

  // Detect platform
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

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      setIsInstallable(true);

      console.log('PWA install prompt available');
    };

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed
    if (isStandalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isStandalone]);

  const showInstallPrompt = async (): Promise<boolean> => {
    if (!installPrompt) {
      console.log('No install prompt available');
      return false;
    }

    try {
      // Show the install prompt
      await installPrompt.prompt();

      // Wait for the user's choice
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
  };

  // Determine if we can show install option
  const canInstall = isInstallable && !isInstalled && !isStandalone;

  return {
    isInstallable,
    isInstalled,
    isStandalone,
    platform,
    canInstall,
    showInstallPrompt,
    dismissInstallPrompt,
  };
}
