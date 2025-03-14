import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
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
  margin-bottom: 3rem;
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
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
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

export const ParticipantsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
  }
`;

export const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export const ParticipantName = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

export const WritersCount = styled.div`
  border-radius: 0.375rem;
  border: 1px solid transparent;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondaryForeground};

  &:focus-visible {
    outline: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary}80;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ExitButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
  height: 1.25rem;
  padding: 0.5rem 1.98rem;
  gap: 0.5rem;

  background-color: #f87171;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #ef4444;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;

  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
`;
