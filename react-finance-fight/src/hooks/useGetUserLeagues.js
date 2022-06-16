import { useState, useEffect, useContext } from "react";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser';
import { AppContext } from '../context/AppContext'

// //////////////////////////////
// Hook to get all user leagues
// //////////////////////////////

export default function useGetUserLeagues(){
    const {user} = useContext(AppContext)
    const [leagues, setLeagues] = useState({})

    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token){
                (async () => {
                    const response = await apiUser.getUserLeagues(user.token, source.token)
                    setLeagues(response)
                })()
            }
            return () => {source.cancel()}
        },
        [user.token]
    )
    return leagues
}