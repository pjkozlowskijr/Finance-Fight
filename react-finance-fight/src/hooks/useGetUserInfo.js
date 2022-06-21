import { useContext, useEffect, useState } from "react";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to get user info
// //////////////////////////////

export default function useGetUserInfo(){
    const {user, setUserInfo} = useContext(AppContext)
    const [updatedUser, setUpdatedUser] = useState({})
    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token){
                (async () => {
                    console.log('trying')
                    var response = await apiUser.getUserInfo(user.token, source.token)
                    console.log(response.user)
                    if (response){
                        setUpdatedUser(response.user)
                        setUserInfo(response.user)
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [setUserInfo, user]
        
    )
    return updatedUser
}