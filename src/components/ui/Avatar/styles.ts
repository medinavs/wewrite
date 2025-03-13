import { Avatar } from "radix-ui";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
`

export const Button = styled.button<{ size: "sm" | "lg" }>`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ size }) => size === "lg" ? "8rem" : "2rem"};
    height: ${({ size }) => size === "lg" ? "8rem" : "2rem"};
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: ${({ size }) => (size === "lg" ? "none" : "pointer")};
    transition: opacity ease-in-out 0.1s;

    &:hover {
        opacity: 0.85;
    }
`

export const AvatarRoot = styled(Avatar.Root)`
    display: inline-flex;
	align-items: center;
	justify-content: center;
    overflow: hidden;
	border-radius: 100%;
	background-color: ${({ theme }) => theme.colors.secondary};
`

export const AvatarImage = styled(Avatar.Image) <{ size: "sm" | "lg" }>`
    width: ${({ size }) => size === "lg" ? "8rem" : "2rem"};
	height: ${({ size }) => size === "lg" ? "8rem" : "2rem"};
	object-fit: cover;
    overflow: hidden;
`

export const AvatarFallback = styled(Avatar.Fallback) <{ size: "sm" | "lg" }>`
    width: ${({ size }) => size === "lg" ? "8rem" : "2rem"};
    height: ${({ size }) => size === "lg" ? "8rem" : "2rem"};
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	color: ${({ theme }) => theme.colors.secondary};
	font-size: 15px;
	line-height: 1;
	font-weight: 500;
`