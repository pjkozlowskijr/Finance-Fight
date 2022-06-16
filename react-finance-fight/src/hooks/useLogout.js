import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser'

// //////////////////////////////
// Hook to logout user
// //////////////////////////////

export default function Logout(logoutUser){
    const {setUserInfo} = useContext(AppContext)

    useEffect(
        () => {
            let response
            const source = CancelToken.source()
            if (user?.token && logoutUser?.key){
                (async () => {
                    response = await apiUser.logout(user.token, source.token)
                    if (response){
                        setUserInfo({})
                        console.log('Logged out')
                    }else{
                        console.log('An unexpected error occured.')
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, logoutUser?.key, setUserInfo]
    )
}