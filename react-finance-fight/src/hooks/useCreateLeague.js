import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiLeague from '../api/apiLeague';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to create league
// //////////////////////////////

export default function useCreateLeague(data){
    const {user, setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (data?.name){
                (async () => {
                    const response = await apiLeague.createLeague(user.token, data, source.token)
                    if (response){
                        setAlert({msg: `League "${data.name}" created successfully.`, cat: 'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [data, setAlert]
    )
}