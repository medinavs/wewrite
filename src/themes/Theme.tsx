import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

const theme: DefaultTheme = {
    colors: {
        background: "#ffffff",
        foreground: "#0a0a0a",

        card: "#ffffff",
        cardForeground: "#0a0a0a",

        popover: "#ffffff",
        popoverForeground: "#0a0a0a",

        primary: "#1a1d2e",
        primaryForeground: "#f6f8ff",

        secondary: "#eef1f8",
        secondaryForeground: "#1a1d2e",

        muted: "#eef1f8",
        mutedForeground: "#6c7380",

        accent: "#eef1f8",
        accentForeground: "#1a1d2e",

        destructive: "#d93e3e",
        destructiveForeground: "#f6f8ff",

        border: "#d1d6e0",
        input: "#d1d6e0",
        ring: "#0a0a0a",
    },
    borderRadius: "0.5rem",
};


interface ThemeProps {
    children: React.ReactNode;
}

const Theme: React.FC<ThemeProps> = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;