import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import apiLeague from '../api/apiLeague';

// //////////////////////////////
// Hook to join league
// //////////////////////////////

export default function useJoinLeague(id){
    const {user} = useContext(AppContext)

    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && id){
                (async () => {
                    const response = await apiLeague.joinLeague(user.token, id, source.token)
                    if (response){
                        console.log('Joined league')
                    }else if(response === false && response !== undefined){
                        console.log('Unexpected error')
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user.token, id]
    )
}