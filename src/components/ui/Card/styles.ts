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
    cursor: pointer;

    :hover {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); 
    }
`

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 1.5rem;
    padding-bottom: 0.5rem;
`

export const CardTitle = styled.h3`
    font-weight: 600;
    letter-spacing: -0.01562em;
    font-size: 1.125rem;
`

export const TimeStamp = styled.p`
    color: ${({ theme }) => theme.colors.mutedForeground};
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    gap: 0.25rem;
`

export const CardContent = styled.div`
    padding: 1rem 1.5rem;
    flex-grow: 1;
    overflow: hidden;
`

export const Text = styled.p`
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

export const CardFooter = styled.footer`
    padding: 1.5rem;
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const UsersList = styled.div`
    display: flex;
    margin-right: -0.5rem;

     > * {
            margin-right: 0.5rem;
    }
`

export const UserCount = styled.div`
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
`