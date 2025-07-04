/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import type { UserProps } from '@/types';
import { steps } from './Onboarding.constants';
import { formatErrorResponse, validate } from '@/utils/zod-validation';
import { toaster } from '@/components/ui/toaster';
import { useStorage } from '@/hooks/useStorage';
import { decodeJWT } from '@aws-amplify/core';
import { useGlobal } from '@/hooks/useGlobal';
import { useNavigate } from 'react-router-dom';
import { getCategories, putUser } from '@/services/services';
import { sanitize } from '@/utils/sanitize';
import {
  AddressSchema,
  PersonalSchema,
  ProfileSchema,
} from './Onboarding.schema';

// eslint-disable-next-line react-refresh/only-export-components
export const OnboardingContext = React.createContext({
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
  categoriesLoading: false,
  fetchCategories: {} as () => void,
  onPrev: {} as (step: number) => void,
  onNext: {} as (step: number, form: UserProps) => void,
  categories: {} as CategoriesProps[],
  setCategories: {} as React.Dispatch<React.SetStateAction<CategoriesProps[]>>,
});

interface CategoriesPropsRaw {
  id: string;
  name: string;
  synonyms: string[];
}

interface CategoriesProps {
  label: string;
  value: string;
}

interface OnboardingProviderProps {
  children: React.ReactNode;
}

const zodSchemas: Record<number, any> = {
  0: PersonalSchema,
  1: AddressSchema,
  2: ProfileSchema,
};

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const { getStorage } = useStorage();
  const navigate = useNavigate();
  const { user, setUser } = useGlobal();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [error, setError] = useState({} as Record<keyof UserProps, boolean>);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [fieldError, setFieldError] = useState(
    {} as Record<keyof UserProps, boolean>,
  );

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      console.log(user);
      await putUser(
        sanitize({
          ...user,
          isProfileCompleted: true,
          rating: undefined,
          services: undefined,
          professionalSettings: { allowRenegotiation: true },
        }),
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const onPrev = (step: number) => {
    setCurrentStep(step - 1);
  };

  const onNext = async (step: number, form: UserProps) => {
    const idToken = getStorage('idToken');
    const { payload: decodedToken } = decodeJWT(idToken);

    if (step === steps.length - 1) {
      handleSubmit();
      return;
    }

    try {
      const payload = { ...user, ...form, email: decodedToken.email };

      setFieldError({} as Record<keyof UserProps, boolean>);
      setSubmitLoading(true);
      await validate(zodSchemas[step], payload);
      setUser({ ...payload } as UserProps);
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

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const { data } = await getCategories();
      const categoriesMapped = data.content.map((item: CategoriesPropsRaw) => ({
        label: item.name,
        value: item.id,
      }));
      console.log(categoriesMapped);
      setCategories(categoriesMapped);
    } catch (error) {
      console.log(error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        error,
        fieldError,
        categories,
        currentStep,
        submitLoading,
        categoriesLoading,
        onPrev,
        onNext,
        setError,
        setCategories,
        setFieldError,
        setCurrentStep,
        fetchCategories,
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
