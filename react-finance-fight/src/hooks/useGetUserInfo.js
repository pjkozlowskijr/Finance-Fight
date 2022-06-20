import { useContext, useEffect } from "react";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to get user info
// //////////////////////////////

export default function useGetUserInfo(){
    const {user, setUserInfo} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            console.log('trying')
            if (user?.token){
                (async () => {
                    const response = await apiUser.getUserInfo(user.token, source.token)
                    if (response.user){
                        console.log(response.user)
                        setUserInfo(response.user)
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, setUserInfo]
    )
}