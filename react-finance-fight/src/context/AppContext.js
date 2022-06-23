// //////////////////////////////
// APP CONTEXT
// //////////////////////////////

import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    // Single user state
    const getUserFromLS = () => {
        let user = localStorage.getItem('user')
        if (user){
            return JSON.parse(user)
        }return {}
    };
    const [user, setUser] = useState(getUserFromLS());
    
    // Alerts state
    const [alert, setAlert] = useState({});
    
    // Asset symbol state
    const [symbol, setSymbol] = useState();

    // Asset object state
    const [asset, setAsset] = useState();

    // Asset type state (search form)
    const [assetType, setAssetType] = useState('stock');

    // Asset quantity state (quantity slider in modals)
    const [quantity, setQuantity] = useState(10);

    // All users state
    const [users, setUsers] = useState();

    // Open/close state for navbar
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
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider