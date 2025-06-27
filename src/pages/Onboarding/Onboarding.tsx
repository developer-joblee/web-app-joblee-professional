import { OnboardingProvider } from './Onboarding.context';
import { OnboardingSteps } from './OnboardingSteps';

export const Onboarding = () => {
  return (
    <OnboardingProvider>
      <OnboardingSteps />
    </OnboardingProvider>
  );
};
