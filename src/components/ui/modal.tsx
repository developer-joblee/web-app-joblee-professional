/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobal } from '@/hooks/useGlobal';
import { Button, CloseButton, Dialog, Portal, Show } from '@chakra-ui/react';

export type ModalProps = {
  onClose?: () => void;
  placement?: 'top' | 'bottom' | 'center';
  open?: boolean;
  title?: string;
  content?: any;
  footer?: {
    primaryButton?: {
      label: string;
      onClick: () => void;
    };
    secondaryButton?: {
      label: string;
      onClick: () => void;
    };
  };
};

export const Modal = () => {
  const { modalSettings } = useGlobal();
  if (!modalSettings.open) return null;

  return (
    <Dialog.Root
      open={modalSettings.open}
      placement={modalSettings.placement || 'center'}
      onOpenChange={modalSettings.onClose}
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Show when={Boolean(modalSettings.title)} fallback={null}>
              <Dialog.Header>
                <Dialog.Title>{modalSettings.title}</Dialog.Title>
              </Dialog.Header>
            </Show>
            <Dialog.Body>{modalSettings.content}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  display={
                    modalSettings.footer?.secondaryButton ? 'block' : 'none'
                  }
                  variant="outline"
                  onClick={modalSettings.footer?.secondaryButton?.onClick}
                >
                  {modalSettings.footer?.secondaryButton?.label}
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  display={
                    modalSettings.footer?.primaryButton ? 'block' : 'none'
                  }
                  variant="solid"
                  onClick={modalSettings.footer?.primaryButton?.onClick}
                >
                  {modalSettings.footer?.primaryButton?.label}
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={modalSettings.onClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
