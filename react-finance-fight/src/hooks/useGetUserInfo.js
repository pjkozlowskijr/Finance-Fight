// //////////////////////////////
// Hook to get user info
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";

export default function useGetUserInfo(){
    const {user, setUser} = useContext(AppContext);
    
    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token){
                (async () => {
                    const response = await apiUser.getUserInfo(user.token, source.token);
                    if (response){
                        setUser(response.user)
                    }
                })()
            }
            return () => {source.cancel()}
        },
        []  
    )
    return user
}