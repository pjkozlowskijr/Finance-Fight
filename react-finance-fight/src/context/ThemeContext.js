// //////////////////////////////
// THEME CONTEXT
// //////////////////////////////

import { ThemeProvider } from '@mui/material/styles';
import { createContext, useState } from 'react';
import getTheme from '../themes/Base';

export const ThemeContext = createContext({
    currentTheme: 'lightTheme',
    setTheme: null
})

const CustomThemeProvider = ({children}) => {
    const currentTheme = localStorage.getItem('appTheme') || 'lightTheme'
    const [themeName, _setThemeName] = useState(currentTheme)
    const theme = getTheme (themeName)

    const setThemeName = (name) => {
        localStorage.setItem('appTheme', name)
        _setThemeName(name)
    }

    const values = {
        currentTheme: themeName,
        setTheme: setThemeName
    }

    return(
        <ThemeContext.Provider value={values}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default CustomThemeProvider