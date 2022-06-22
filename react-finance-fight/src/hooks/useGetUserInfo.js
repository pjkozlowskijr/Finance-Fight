import { useContext, useEffect, useState } from "react";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to get user info
// //////////////////////////////

export default function useGetUserInfo(){
    const {user, setUser} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token){
                (async () => {
                    var response = await apiUser.getUserInfo(user.token, source.token)
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