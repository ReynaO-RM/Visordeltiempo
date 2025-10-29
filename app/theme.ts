// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1e3a8a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9333ea",
      light: "#c084fc",
      dark: "#581c87",
      contrastText: "#ffffff",
    },
    success: {
      main: "#16a34a",
    },
    error: {
      main: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
    },
    info: {
      main: "#0ea5e9",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
});
