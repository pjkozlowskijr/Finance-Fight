// //////////////////////////////
// LIGHT THEME
// //////////////////////////////

import { createTheme } from '@mui/material/styles';

export const themeOptions = {
    palette: {
      type: 'light',
      mode: 'light',
      primary: {
        main: '#0a6b6b',
      },
      secondary: {
        main: '#e6651d',
      },
      error: {
        main: '#c73618',
      },
      background: {
        default: '#e0e0e0',
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