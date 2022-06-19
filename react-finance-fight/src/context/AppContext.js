import { createContext, useState } from "react";
import { randomInt } from "../helpers";

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

    const [asset, setAsset] = useState()

    const [assetType, setAssetType] = useState('stock')
  
    // Values passed to children
    const values = {
        user,
        setUserInfo,
        getUserFromLS,
        alert, 
        setAlert,
        symbol,
        setSymbol,
        asset,
        setAsset,
        assetType,
        setAssetType
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider