import { EditorContent } from "@tiptap/react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  width: 100%;
  box-sizing: border-box;
`;

export const CardsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const AuthorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

`

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  font-weight: 700;
`;

export const ConfirmButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.2s;
  height: 1.25rem;
  padding: 0.5rem 1rem;
  gap: 0.5rem;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const EditorContainer = styled.div<{ readonly?: boolean }>`
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;

  ${(props) =>
    props.readonly &&
    `
    background-color: ${props.theme.colors.muted}10;
    cursor: default;
    
    .ProseMirror {
      cursor: default;
      user-select: text;
    }
        `}
`;

export const Timer = styled.div`
  border-radius: 0.375rem;
  padding: 0.225rem 0.725rem;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondaryForeground};
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3rem;
`;

export const Editor = styled(EditorContent)`
  width: 100%;
  height: 50vh;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  padding: 0.5rem;

  .ProseMirror {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    width: 100%;
    height: 50vh;
  }
`;

export const VoteButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;

export const VoteButton = styled(ConfirmButton)<{
  variant: "positive" | "negative";
}>`
  flex: 1;
  background-color: ${({ theme, variant }) =>
    variant === "positive" ? theme.colors.primary : "#f87171"};
  color: ${({ theme }) => theme.colors.primaryForeground};

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "positive" ? theme.colors.primary.concat("dd") : "#ef4444"};
  }
`;
