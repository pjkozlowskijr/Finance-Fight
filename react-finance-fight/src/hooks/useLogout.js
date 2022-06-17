import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser';

// //////////////////////////////
// Hook to logout user
// //////////////////////////////

export default function Logout(logoutUser){
    const {setUserInfo, setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && logoutUser?.key){
                (async () => {
                    const response = await apiUser.logout(user.token, source.token)
                    if (response){
                        setUserInfo({})
                        setAlert({msg: 'You are now logged out.', cat: 'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, logoutUser?.key, setUserInfo, setAlert]
    )
}