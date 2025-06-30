/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonGroup, Steps } from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';
import { defaultColor } from '@/theme';

type StepperProps = {
  currentStep: number;
  steps: { index: number; icon: any }[];
  children: React.ReactNode;
  onStepChange: (step: number) => void;
};

export const Stepper = ({
  steps,
  children,
  currentStep,
  onStepChange,
}: StepperProps) => {
  return (
    <Steps.Root
      step={currentStep}
      count={steps.length}
      size="sm"
      onStepChange={(e) => onStepChange(e.step)}
    >
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

      <ButtonGroup
        size="sm"
        mt={8}
        variant="outline"
        justifyContent="space-between"
      >
        <Steps.PrevTrigger asChild>
          <Button variant="outline">Anterior</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button variant="solid">Próximo</Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.Root>
  );
};
