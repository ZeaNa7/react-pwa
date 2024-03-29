import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        variant: 'contained',
      },
      styleOverrides: {
        outlined: true,
      },
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#000',
    },
  },
});
