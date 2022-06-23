import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppContextProvider from './context/AppContext';
import CustomThemeProvider from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <AppContextProvider>
          <CssBaseline/>
          <App/>
        </AppContextProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
