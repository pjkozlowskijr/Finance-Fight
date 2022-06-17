import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import apiAsset from '../api/apiAsset';

// //////////////////////////////
// Hook to sell asset
// //////////////////////////////

export default function useSellAsset(id){
    const {user, setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && id){
                (async () => {
                    const response = await apiAsset.sellAsset(user.token, id, source.token)
                    if (response){
                        setAlert({msg: 'Asset sold successfully.', cat: 'success'})
                    } else if (response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user.token, id, setAlert]
    )
}