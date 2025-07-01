/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import type { UserProps } from '@/types';
import { useGlobal } from '@/hooks/useGlobal';
import { steps } from './Onboarding.constants';
import { formatErrorResponse, validate } from '@/utils/zod-validation';
import {
  AddressSchema,
  PersonalSchema,
  ProfileSchema,
} from './Onboarding.schema';
import { toaster } from '@/components/ui/toaster';

// eslint-disable-next-line react-refresh/only-export-components
export const OnboardingContext = React.createContext({
  user: {} as UserProps,
  setUser: {} as React.Dispatch<React.SetStateAction<UserProps>>,
  currentStep: 0,
  setCurrentStep: {} as React.Dispatch<React.SetStateAction<number>>,
  error: {} as Record<keyof UserProps, boolean>,
  setError: {} as React.Dispatch<
    React.SetStateAction<Record<keyof UserProps, boolean>>
  >,
  setSubmitLoading: {} as React.Dispatch<React.SetStateAction<boolean>>,
  submitLoading: false,
  fieldError: {} as Record<keyof UserProps, boolean>,
  setFieldError: {} as React.Dispatch<
    React.SetStateAction<Record<keyof UserProps, boolean>>
  >,
  onPrev: {} as (step: number) => void,
  onNext: {} as (step: number, form: UserProps) => void,
});

interface OnboardingProviderProps {
  children: React.ReactNode;
}

const zodSchemas: Record<number, any> = {
  0: PersonalSchema,
  1: AddressSchema,
  2: ProfileSchema,
};

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const { user: globalUser, globalLoading } = useGlobal();
  const [fieldError, setFieldError] = useState(
    {} as Record<keyof UserProps, boolean>,
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState({} as Record<keyof UserProps, boolean>);

  const handleSubmit = () => {
    console.log(user);
    // navigate('/');
  };

  const onPrev = (step: number) => {
    setCurrentStep(step - 1);
  };

  const onNext = async (step: number, form: UserProps) => {
    console.log(form);
    if (step === steps.length - 1) {
      handleSubmit();
      return;
    }

    try {
      const payload = { ...user, ...form };
      setFieldError({} as Record<keyof UserProps, boolean>);
      setSubmitLoading(true);
      await validate(zodSchemas[step], payload);
      setCurrentStep(step + 1);
    } catch (error: any) {
      setFieldError(formatErrorResponse(error.zodError));
      toaster.create({
        description: 'Preencha os campos obrigatórios',
        type: 'error',
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const [user, setUser] = useState<UserProps>({
    fullName: globalUser?.fullName || '',
    companyName: '',
    email: globalUser?.email || '',
    phoneNumber: '',
    portfolioPhotos: [],
    profilePhoto: '',
    description: '',
    services: [],
    cognitoUserId: '',
    isProfileCompleted: false,
    address: {
      neighborhood: '',
      number: '',
      city: '',
      state: '',
      street: '',
      zipCode: '',
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      email: globalUser?.email || '',
      fullName: globalUser?.fullName || '',
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalLoading]);

  return (
    <OnboardingContext.Provider
      value={{
        user,
        error,
        fieldError,
        currentStep,
        submitLoading,
        onPrev,
        onNext,
        setUser,
        setError,
        setFieldError,
        setCurrentStep,
        setSubmitLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
