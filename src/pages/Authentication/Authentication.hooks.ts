import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const { cachedCredentials, setCachedCredentials, handleSignUp } = useAuth();

  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    fullName: false,
  });

  return {
    error,
    confirmPassword,
    cachedCredentials,
    navigate,
    setError,
    handleSignUp,
    setCachedCredentials,
    setConfirmPassword,
  };
};
