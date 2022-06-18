import { useState, useEffect } from "react";
import { CancelToken } from "apisauce";
import apiLeague from '../api/apiLeague';

// //////////////////////////////
// Hook to get all leagues
// //////////////////////////////

export default function useGetLeagues(id=null){
    const [leagues, setLeagues] = useState({})

    useEffect(
        () => {
            const source = CancelToken.source()
            id ?
                (async () => {
                    const response = await apiLeague.getLeague(id, source.token)
                    setLeagues(response)
                })()
            :
                (async () => {
                    const response = await apiLeague.getAllLeagues(source.token)
                    setLeagues(response)
                })()
            return () => {source.cancel()}
        },
        [id]
    )
    return leagues
}