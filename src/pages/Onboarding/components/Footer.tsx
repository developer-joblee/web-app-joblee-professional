import { Button, ButtonGroup, Steps } from '@chakra-ui/react';
import { steps } from '../Onboarding.constants';

type FooterProps = {
  currentStep: number;
  loading: boolean;
  onNext: (step: number) => void;
  onPrev: (step: number) => void;
};

export const Footer = ({
  currentStep,
  loading,
  onNext,
  onPrev,
}: FooterProps) => {
  return (
    <Steps.Root>
      <ButtonGroup
        size="sm"
        mt={8}
        variant="outline"
        justifyContent="space-between"
      >
        <Steps.PrevTrigger asChild>
          <Button
            variant="outline"
            onClick={() => onPrev(currentStep)}
            disabled={loading}
          >
            Anterior
          </Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button
            variant="solid"
            onClick={() => onNext(currentStep)}
            loading={loading}
            disabled={loading}
          >
            {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.Root>
  );
};
