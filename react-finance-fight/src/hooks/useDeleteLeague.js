import { useContext, useEffect } from "react";
import { CancelToken } from "apisauce";
import apiLeague from '../api/apiAsset';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to delete league
// //////////////////////////////

export default function useDeleteLeague(id){
    const {user, setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (id){
                (async () => {
                    const response = await apiLeague.deleteLeague(user.token, id, source.token)
                    if (response){
                        setAlert({msg: `League deleted successfully.`, cat: 'success'})
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