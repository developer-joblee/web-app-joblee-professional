import React, { useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = React.createContext({
  logged: false,
  setLogged: {} as React.Dispatch<React.SetStateAction<boolean>>,
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [logged, setLogged] = useState(false);

  return (
    <GlobalContext.Provider value={{ logged, setLogged }}>
      {children}
    </GlobalContext.Provider>
  );
};
