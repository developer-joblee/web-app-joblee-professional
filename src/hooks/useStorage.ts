const useStorage = () => {
  const prefix = 'joblee';

  const setStorage = (key: string, value: string) => {
    sessionStorage.setItem(`${prefix}:${key}`, value);
  };

  const getStorage = (key: string) => {
    return sessionStorage.getItem(`${prefix}:${key}`) || '';
  };

  const removeKeyStorage = (key: string) => {
    sessionStorage.removeItem(`${prefix}:${key}`);
  };

  return {
    setStorage,
    getStorage,
    removeKeyStorage,
  };
};

export { useStorage };
