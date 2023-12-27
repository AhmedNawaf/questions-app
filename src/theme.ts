import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: '"Cairo", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#80604D',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#00962a',
    },

    warning: {
      main: red.A400,
    },
    background: {
      default: '#f2f2f2',
      // title: '#f4f7f9'
    },
  },
});

export default theme;
