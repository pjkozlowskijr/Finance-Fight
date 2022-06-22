import { createContext, useCallback, useState } from "react";

// //////////////////////////////
// APP CONTEXT
// //////////////////////////////

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    // Context for USER
    const getUserFromLS = () => {
        let user = localStorage.getItem('user')
        if (user?.token){
            return JSON.parse(user)
        }return {}
    }

    const [user, setUser] = useState(getUserFromLS())

    const setUserInfo = useCallback(() => {
        localStorage.setItem('user', JSON.stringify(user))
        }, [user]
    )

    // Context for ALERTS
    const [alert, setAlert] = useState({})
    
    const [symbol, setSymbol] = useState()

    const [asset, setAsset] = useState()

    const [assetType, setAssetType] = useState('stock')

    const [quantity, setQuantity] = useState(10);

    const [users, setUsers] = useState()

    const [open, setOpen] = useState(false);
  
    // Values passed to children
    const values = {
        user,
        setUser,
        setUserInfo,
        getUserFromLS,
        alert, 
        setAlert,
        symbol,
        setSymbol,
        asset,
        setAsset,
        assetType,
        setAssetType,
        quantity,
        setQuantity,
        users,
        setUsers,
        open,
        setOpen
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider