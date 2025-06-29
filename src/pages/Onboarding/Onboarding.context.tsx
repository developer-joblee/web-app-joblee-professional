import React, { useState } from 'react';
import type { UserProps } from '@/types';

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
});

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState({} as Record<keyof UserProps, boolean>);

  const [user, setUser] = useState<UserProps>({
    name: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    portfolioPhotos: [],
    profilePhoto: '',
    description: '',
    services: [],
    cognitoUserId: '',
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

  return (
    <OnboardingContext.Provider
      value={{ user, setUser, currentStep, setCurrentStep, error, setError }}
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
