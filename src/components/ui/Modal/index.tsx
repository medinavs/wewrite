import {
  CancelButton,
  ConfirmButton,
  Description,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Title,
} from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  showCloseButton = true,
  showConfirmButton = true,
}: ModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    if (!onConfirm) onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    if (!onCancel) onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <Title>{title}</Title>
          {showCloseButton && (
            <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
          )}
        </ModalHeader>
        <ModalBody>
          {description && <Description>{description}</Description>}
          {children}
        </ModalBody>
        <ModalFooter>
          {onCancel && (
            <CancelButton onClick={handleCancel}>{cancelLabel}</CancelButton>
          )}
          {showConfirmButton && (
            <ConfirmButton onClick={handleConfirm}>
              {confirmLabel}
            </ConfirmButton>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
