import { useContext, useEffect } from "react";
import { CancelToken } from "apisauce";
import apiLeague from '../api/apiAsset';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to delete league
// //////////////////////////////

export default function useDeleteLeague(id){
    const {user} = useContext(AppContext)

    useEffect(
        () => {
            const source = CancelToken.source()
            if (id){
                (async () => {
                    const response = await apiLeague.deleteLeague(user.token, id, source.token)
                    if (response){
                        console.log('League deleted')
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