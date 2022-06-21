import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppContextProvider from './context/AppContext';
import CssBaseline from '@mui/material/CssBaseline';
import CustomThemeProvider from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

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
