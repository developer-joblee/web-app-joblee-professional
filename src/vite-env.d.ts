/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (
      registration: ServiceWorkerRegistration | undefined,
    ) => void;
    onRegisterError?: (error: any) => void;
  }

  export function registerSW(
    options?: RegisterSWOptions,
  ): (reloadPage?: boolean) => Promise<void>;
}

declare module 'virtual:pwa-register/react' {
  import type { Dispatch, SetStateAction } from 'react';
  import type { RegisterSWOptions } from 'virtual:pwa-register';

  export interface UseRegisterSWOptions extends RegisterSWOptions {
    onRegisteredSW?: (
      swUrl: string,
      r: ServiceWorkerRegistration | undefined,
    ) => void;
    onRegisterError?: (error: any) => void;
  }

  export function useRegisterSW(options?: UseRegisterSWOptions): {
    needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
    offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
