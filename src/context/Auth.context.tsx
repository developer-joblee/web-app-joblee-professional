/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { toaster } from '@/components/ui/toaster';
import {
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '@/hooks/useStorage';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext({
  signInLoading: false,
  registerLoading: false,
  signOutLoading: false,
  cachedCredentials: {} as RegisterCredentials,
  setCachedCredentials: {} as React.Dispatch<
    React.SetStateAction<RegisterCredentials>
  >,
  handleSignIn: {} as (credentials: UserCredentials) => void,
  handleSignUp: {} as (credentials: RegisterCredentials) => void,
  handleConfirmSignUp: {} as (credentials: ConfirmCredentials) => void,
  handleSignOut: {} as () => void,
});

type UserCredentials = {
  username: string;
  password: string;
};

type ConfirmCredentials = UserCredentials & {
  code: string;
};

type RegisterCredentials = ConfirmCredentials & {
  fullName: string;
  userId: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { setStorage, removeKeyStorage } = useStorage();
  const [signInLoading, setSignInLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  const [cachedCredentials, setCachedCredentials] =
    useState<RegisterCredentials>({
      username: '',
      password: '',
      fullName: '',
      userId: '',
      code: '',
    });

  const handleError = (error: Error, message: string) => {
    console.error(error);
    toaster.create({
      description: message,
      type: 'error',
    });
  };

  const handleSignIn = async (credentials: UserCredentials) => {
    setSignInLoading(true);
    try {
      const { nextStep } = await signIn(credentials);

      if (nextStep?.signInStep === 'DONE') {
        const { userId } = await getCurrentUser();
        const { tokens }: any = await fetchAuthSession();

        setStorage('idToken', tokens.idToken.toString());
        setCachedCredentials({ ...cachedCredentials, userId });
        navigate('/');
        return;
      }
    } catch (error) {
      handleError(error as Error, 'Houve um erro ao iniciar sessão');
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUp = async (credentials: RegisterCredentials) => {
    try {
      setRegisterLoading(true);
      const response = await signUp(credentials);
      setCachedCredentials({ ...credentials, userId: response.userId || '' });

      if (response?.nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
        navigate('/code-verify');
        return;
      }
    } catch (error) {
      handleError(error as Error, 'Houve um erro ao se registrar');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleConfirmSignUp = async (credentials: ConfirmCredentials) => {
    try {
      setRegisterLoading(true);
      /* TODO: Type confirmSignUp */
      const { isSignUpComplete, nextStep }: any = await confirmSignUp({
        username: credentials.username || '',
        confirmationCode: credentials.code || '',
      });

      console.log(isSignUpComplete, nextStep);

      if (isSignUpComplete) {
        handleSignIn({
          username: credentials.username || '',
          password: credentials.password || '',
        });
      }

      // await postUser({
      //   fullName: registeredUser?.fullName || '',
      //   email: registeredUser?.username || '',
      //   userId: registeredUser?.userId || '',
      // });

      // navigate('/');
    } catch (error) {
      handleError(error as Error, 'Houve um erro ao confirmar o registro');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleSignOut = async () => {
    setSignOutLoading(true);
    try {
      await signOut();
      removeKeyStorage('idToken');
      navigate('/login');
    } catch (error) {
      handleError(error as Error, 'Houve um erro ao sair da sessão');
    } finally {
      setSignOutLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signInLoading,
        signOutLoading,
        registerLoading,
        cachedCredentials,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        handleConfirmSignUp,
        setCachedCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
