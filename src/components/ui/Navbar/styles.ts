import { DropdownMenu } from "radix-ui";
import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 2rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Logo = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  gap: 0.5rem;

  img {
    height: 2.5rem;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;

export const MenuButton = styled.button`
  all: unset;
`;

export const DropdownMenuContent = styled(DropdownMenu.Content)`
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.popover};
  color: ${({ theme }) => theme.colors.popoverForeground};
  padding: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;

export const DropdownMenuPortal = styled(DropdownMenu.Portal)``;

export const DropdownMenuItem = styled(DropdownMenu.Item)`
  position: relative;
  display: flex;
  user-select: none;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;

  :focus {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  .inset {
    padding-left: 2rem;
  }
`;

export const DropdownMenuSeparator = styled(DropdownMenu.Separator)`
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.muted};
`;
