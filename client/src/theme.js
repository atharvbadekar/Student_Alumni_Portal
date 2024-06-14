import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...{
            padding: theme.spacing(2),
            borderWidth: "3px",
          },
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "",
      },
    },
  },
  palette: {
    primary: {
      main: '#007bff', // Your primary color (blue)
    },
    secondary: {
      main: '#ffc107', // Your secondary color (amber)
    },
    tertiary: {
      main: '#f44336', // Tertiary color for accents (red)
    },
    background: {
      default: '#f5f5f5', // Light background
    },
  },
});

export default theme;
