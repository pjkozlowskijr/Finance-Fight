// //////////////////////////////
// DARK THEME
// //////////////////////////////

import { createTheme } from '@mui/material/styles';

export const themeOptions = {
    palette: {
      type: 'dark',
      mode: 'dark',
      primary: {
        main: '#163d49',
      },
      secondary: {
        main: '#b33c06',
      },
      error: {
        main: '#c73618',
      },
      background: {
        default: '#303030',
        paper: '#616161',
      },
    },
    typography: {
      fontFamily: 'Source Sans Pro',
    },
    props: {
      MuiList: {
        dense: true,
      },
      MuiMenuItem: {
        dense: true,
      },
      MuiTable: {
        size: 'small',
      },
    },
  };

const theme = createTheme(themeOptions);
export default theme