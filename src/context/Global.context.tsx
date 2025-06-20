import type { ModalProps } from '@/components/ui/modal';
import React, { useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = React.createContext({
  logged: false,
  setLogged: {} as React.Dispatch<React.SetStateAction<boolean>>,
  modalSettings: {} as ModalProps,
  setModalSettings: {} as React.Dispatch<React.SetStateAction<ModalProps>>,
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [logged, setLogged] = useState(false);
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

  return (
    <GlobalContext.Provider
      value={{ logged, modalSettings, setLogged, setModalSettings }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
