/* eslint-disable @typescript-eslint/no-explicit-any */
import { Steps } from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';
import { defaultColor } from '@/theme';
import { useOnboarding } from '../Onboarding.context';

type StepperProps = {
  steps: { index: number; icon: any }[];
  children: React.ReactNode;
};

export const Stepper = ({ steps, children }: StepperProps) => {
  const { currentStep } = useOnboarding();

  return (
    <Steps.Root step={currentStep} count={steps.length} size="sm">
      <Steps.List>
        {steps.map((step, index) => {
          const itemColors =
            step.index === currentStep ? defaultColor[900] : 'gray.300';

          return (
            <Steps.Item key={index} index={index}>
              <Steps.Indicator
                color={itemColors}
                borderColor={itemColors}
                background={
                  step.index < currentStep ? defaultColor[900] : 'white'
                }
              >
                <Steps.Status
                  incomplete={step.icon({ active: step.index === currentStep })}
                  complete={
                    <LuCheck
                      color={
                        step.index < currentStep ? 'white' : defaultColor[900]
                      }
                    />
                  }
                />
              </Steps.Indicator>
              <Steps.Separator />
            </Steps.Item>
          );
        })}
      </Steps.List>

      {steps.map((_, index) => (
        <Steps.Content key={index} index={index}>
          {children}
        </Steps.Content>
      ))}
    </Steps.Root>
  );
};
