import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import apiLeague from '../api/apiLeague';

// //////////////////////////////
// Hook to leave league
// //////////////////////////////

export default function useLeaveLeague(id){
    const {user, setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && id){
                (async () => {
                    const response = await apiLeague.leaveLeague(user.token, id, source.token)
                    if (response){
                        setAlert({msg: 'Left league successfully.', cat: 'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user.token, id, setAlert]
    )
}