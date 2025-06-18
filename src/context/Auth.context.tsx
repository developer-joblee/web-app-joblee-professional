import React, { useState } from 'react';
import { toaster } from '@/components/ui/toaster';
import { confirmSignUp, signIn, signUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext({
  isLoading: false,
  signInLoading: false,
  registerLoading: false,
  cachedCredentials: {} as RegisterCredentials,
  setCachedCredentials: {} as React.Dispatch<
    React.SetStateAction<RegisterCredentials>
  >,
  setLoading: {} as React.Dispatch<React.SetStateAction<boolean>>,
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
  const [isLoading, setLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

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
      const { isSignedIn, nextStep } = await signIn(credentials);
      console.log(isSignedIn, nextStep);
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
        navigate('@/pages/Authentication/CodeVerify');
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
      await confirmSignUp({
        username: cachedCredentials.username || '',
        confirmationCode: credentials.code || '',
      });

      // await postUser({
      //   fullName: registeredUser?.fullName || '',
      //   email: registeredUser?.username || '',
      //   userId: registeredUser?.userId || '',
      // });

      navigate('@/pages/Onboard/RegisterDone');
    } catch (error) {
      handleError(error as Error, 'Houve um erro ao confirmar o registro');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      console.log('handleSignOut');
    } catch (error) {
      handleError(error as Error, 'Houve um erro ao sair da sessão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        signInLoading,
        registerLoading,
        cachedCredentials,
        setLoading,
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
