import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppContextProvider from './context/AppContext';
import CssBaseline from '@mui/material/CssBaseline';
import CustomThemeProvider from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <AppContextProvider>
        <CssBaseline/>
        <App/>
      </AppContextProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
