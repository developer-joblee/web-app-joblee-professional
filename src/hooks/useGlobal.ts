import { useContext } from 'react';
import { GlobalContext } from '../context/Global.context';

export const useGlobal = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }

  return context;
};
