import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiLeague from '../api/apiLeague';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to create league
// //////////////////////////////

export default function useCreateLeague(data){
    const {user} = useContext(AppContext)

    useEffect(
        () => {
            const source = CancelToken.source()
            if (data?.name){
                (async () => {
                    const response = await apiLeague.createLeague(user.token, data, source.token)
                    if (response){
                        console.log('League created')
                    }else if(response === false && response !== undefined){
                        console.log('Unexpected error')
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [data]
    )
}