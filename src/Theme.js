import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    primary: {
      50: '#ECECEE',
      100: '#C5C6CB',
      200: '#9EA1A9',
      300: '#7D818C',
      400: '#5C616F',
      500: '#3C4252',
      600: '#353A48',
      700: '#2D323E',
      800: '#262933',
      900: '#1E2129',
      A100: '#C5C6CB',
      A200: '#9EA1A9',
      A400: '#5C616F',
      A700: '#2D323E',
      main: '#6b7280',
      light: '#7D818C',
      dark: '#2D323E',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Nunito', 'Helvetica', 'Arial', 'serif'].join(','),
  },
  button: {
    fontFamily: 'Nunito,Helvetica,Arial,serif',
    fontWeight: 600,
    fontSize: '1.4rem',
    lineHeight: 1.75,
    textTransform: 'initial',
  },
});
