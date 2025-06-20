import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const {
    signInLoading,
    signOutLoading,
    registerLoading,
    cachedCredentials,
    forgotPasswordLoading,
    setCachedCredentials,
    handleSignUp,
    handleSignIn,
    handleConfirmSignUp,
    handleForgotPassword,
  } = useAuth();

  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    fullName: false,
    code: false,
  });

  return {
    error,
    signInLoading,
    signOutLoading,
    registerLoading,
    confirmPassword,
    cachedCredentials,
    forgotPasswordLoading,
    navigate,
    setError,
    handleSignUp,
    handleSignIn,
    setConfirmPassword,
    handleConfirmSignUp,
    handleForgotPassword,
    setCachedCredentials,
  };
};
