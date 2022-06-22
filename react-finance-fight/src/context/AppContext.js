import { createContext, useCallback, useState, useEffect } from "react";

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
        }return {}
    }

    const [user, setUser] = useState(getUserFromLS())

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
        setUser: (user1) => {setUser(user1); localStorage.setItem('user', JSON.stringify(user1))},
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