/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [passwordLevel, setPasswordLevel] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    'Confirmar senha obrigatória.',
  );

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

  const canSubmit = () => {
    return (
      cachedCredentials.username &&
      cachedCredentials.password &&
      cachedCredentials.fullName &&
      confirmPassword === cachedCredentials.password &&
      passwordLevel === 5 &&
      acceptedTerms
    );
  };

  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    fullName: false,
    code: false,
  });

  const checkPasswordStrength = () => {
    const atLeastOneLowerCase = /^(?=.*[a-z])/;
    const atLeastOneUpperCase = /^(?=.*[A-Z])/;
    const atLeastOneNumber = /^(?=.*\d)/;
    const atLeastOneSpecialCharacter = /^(?=.*[@$!%*?&])/;
    const atLeastEightCharacters = /^.{8,}$/;

    const levels = {
      1: atLeastOneLowerCase.test(cachedCredentials.password),
      2: atLeastOneUpperCase.test(cachedCredentials.password),
      3: atLeastOneNumber.test(cachedCredentials.password),
      4: atLeastOneSpecialCharacter.test(cachedCredentials.password),
      5: atLeastEightCharacters.test(cachedCredentials.password),
    };

    const levelAmount = Object.values(levels).filter((level) => level).length;

    setPasswordLevel(levelAmount);
  };

  useEffect(() => {
    checkPasswordStrength();
  }, [cachedCredentials.password]);

  useEffect(() => {
    if (confirmPassword !== cachedCredentials.password) {
      setConfirmPasswordError('Senhas não coincidem.');
      setError((prevError) => ({
        ...prevError,
        confirmPassword: true,
      }));

      return;
    }

    setConfirmPasswordError('Confirmar senha obrigatória.');
    setError((prevError) => ({
      ...prevError,
      confirmPassword: false,
    }));
  }, [confirmPassword]);

  return {
    error,
    passwordLevel,
    signInLoading,
    signOutLoading,
    registerLoading,
    confirmPassword,
    cachedCredentials,
    confirmPasswordError,
    forgotPasswordLoading,
    navigate,
    setError,
    canSubmit,
    handleSignUp,
    handleSignIn,
    setAcceptedTerms,
    setConfirmPassword,
    handleConfirmSignUp,
    handleForgotPassword,
    setCachedCredentials,
  };
};
