import { EditorContent } from "@tiptap/react";
import { Dialog } from "radix-ui";
import styled, { keyframes } from "styled-components";

export const Container = styled.div``;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const overlayShow = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    color: ${({ theme }) => theme.colors.destructive};
  }
`;

export const DialogTitle = styled(Dialog.Title)``;

export const DialogDescription = styled(Dialog.Description)``;

export const DialogClose = styled(Dialog.Close)``;

export const DialogContent = styled(Dialog.Content)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  :focus {
    outline: none;
  }
`;

export const Editor = styled(EditorContent)`
  height: 50vh;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  padding: 0.5rem;

  .ProseMirror {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
`;
