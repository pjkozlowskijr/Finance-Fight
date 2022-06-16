import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import apiAsset from '../api/apiAsset';

// //////////////////////////////
// Hook to sell asset
// //////////////////////////////

export default function useSellAsset(id){
    const {user} = useContext(AppContext)

    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && id){
                (async () => {
                    const response = await apiAsset.sellAsset(user.token, id, source.token)
                    if (response){
                        console.log('Asset sold')
                    } else if (response === false && response !== undefined){
                        console.log('Unexpected error')
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user.token, id]
    )
}