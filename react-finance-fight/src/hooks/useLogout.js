// //////////////////////////////
// Hook to logout user
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";

export default function Logout(user){
    const {setUser, setAlert} = useContext(AppContext);
    
    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token){
                (async () => {
                    const response = await apiUser.logout(user.token, source.token);
                    if (response){
                        setUser({})
                        setAlert({msg: 'You are now logged out.', cat: 'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, setUser, setAlert]
    )
}