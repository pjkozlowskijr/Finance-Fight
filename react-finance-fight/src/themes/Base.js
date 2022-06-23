// //////////////////////////////
// THEME BASE
// //////////////////////////////

import lightTheme from './LightTheme';
import darkTheme from './DarkTheme';

const themes={
    lightTheme,
    darkTheme
};

export default function getTheme(theme){
    return themes[theme]
}