import styled from "styled-components";

export const Container = styled.div`
  width: 320px;
  height: 220px;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.cardForeground};
  background-color: white;
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease-in-out;

  :hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
`;

export const Title = styled.h3`
  font-weight: 600;
  letter-spacing: -0.01562em;
  font-size: 1.125rem;
`;

export const Content = styled.div`
  padding: 1.5rem;
  padding-top: 0;
  flex-grow: 1;
  overflow: hidden;
`;

export const Text = styled.p`
  font-size: 0.875rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Footer = styled.footer`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarsContainer = styled.div`
  display: flex;
  margin-right: -0.5rem;

  > * {
    margin-right: 0.5rem;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ExpandButton = styled.button`
  all: unset;
  margin-bottom: 0.5rem;
`;

export const VotersContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 8px;
`;
