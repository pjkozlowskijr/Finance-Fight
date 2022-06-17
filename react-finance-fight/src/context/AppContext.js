import { createContext, useState } from "react";

// //////////////////////////////
// APP CONTEXT
// //////////////////////////////

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    // Context for USER
    const getUserFromLS = () => {
        let user = localStorage.getItem('user')
        if (user){
            return JSON.parse(user)
        }
    }

    const [user, setUser] = useState(getUserFromLS())

    const setUserInfo = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    // Context for ALERTS
    const [alert, setAlert] = useState({})
    
    const [symbol, setSymbol] = useState()

    // Values passed to children
    const values = {
        user,
        setUserInfo,
        alert, 
        setAlert,
        symbol,
        setSymbol
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider