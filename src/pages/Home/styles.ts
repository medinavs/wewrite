import { Tabs } from "radix-ui";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 80rem;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const SubTitle = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`;

export const CardsContainer = styled.div`
  width: 100%;
  max-width: 1055px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const NewStoryButton = styled.button`
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

export const StoriesContainer = styled.div`
  width: 100%;
`;

export const TabListContainer = styled(Tabs.List)`
  display: inline-flex;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.muted};
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 28rem;
`;

export const TabTrigger = styled(Tabs.Trigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  flex: 1;
  gap: 0.5rem;

  outline: none;
  box-shadow: ${({ theme }) => theme.colors.ring};

  &:focus-visible {
    outline: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state="active"] {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`;

export const StoryCardsContainer = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-top: 0;

  &:focus-visible {
    outline: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`;

export const StorysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
