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

export const CardTitle = styled.h2`
  font-size: 1.5rem;
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

export const EditorContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
`;

export const Timer = styled.div`
  border-radius: 0.375rem;
  padding: 0.125rem 0.725rem;
  font-size: 0.8rem;
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

export const CharacterCounterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CharacterCounterText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CharacterLimitText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CircularProgress = styled.svg.attrs({
  height: "20",
  width: "20",
  viewBox: "0 0 20 20",
})`
  flex-shrink: 0;
`;

export const CircleBackground = styled.circle.attrs({
  r: "10",
  cx: "10",
  cy: "10",
})`
  fill: #e9ecef;
`;

interface CircleProgressProps {
  percentage: number;
}

export const CircleProgress = styled.circle.attrs<CircleProgressProps>(
  ({ percentage }) => ({
    r: "5",
    cx: "10",
    cy: "10",
    fill: "transparent",
    strokeWidth: "10",
    strokeDasharray: `calc(${percentage} * 31.4 / 100) 31.4`,
    transform: "rotate(-90) translate(-20)",
  })
)`
  stroke: ${({ percentage, theme }) =>
    percentage > 90 ? "#ef4444" : percentage > 75 ? "#f97316" : "#a855f7"};
`;

export const CircleCenter = styled.circle.attrs({
  r: "6",
  cx: "10",
  cy: "10",
})`
  fill: white;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
