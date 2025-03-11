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
`

export const Logo = styled.span`
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 700;
    gap: 0.5rem;
    
    img {
        height: 2.5rem;
    }
`

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.875rem;
`

export const NotificationButton = styled.button`
    all: unset;
    width: 2.25rem;
    height: 2.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: background ease-in-out 0.1s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.accent};
    }
`