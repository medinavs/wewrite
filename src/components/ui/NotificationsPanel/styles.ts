import { Dialog } from "radix-ui";
import styled from "styled-components";

export const DrawerRoot = styled(Dialog.Root)``;

export const DrawerTrigger = styled(Dialog.Trigger)``;

export const DrawerClose = styled(Dialog.Close)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  outline: none;

  :hover {
    opacity: 1;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring), 0 0 0 4px var(--ring-offset-background);
  }

  [data-state="open"] {
    background-color: var(--secondary);
  }
`;

export const DrawerPortal = styled(Dialog.Portal)``;

export const DrawerOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);

  [data-state="open"] {
    animation: fade-in-0 0.2s;
  }

  [data-state="closed"] {
    animation: fade-out-0 0.2s;
  }
`;

export const DrawerContent = styled(Dialog.Content)`
  position: fixed;
  z-index: 50;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 75%;
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  [data-state="open"] {
    animation: slide-in-from-right 0.3s;
  }

  [data-state="closed"] {
    animation: slide-out-to-right 0.3s;
  }
`;
