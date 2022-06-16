import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import apiAsset from '../api/apiAsset';

// //////////////////////////////
// Hook to purchase asset
// //////////////////////////////

export default function usePurchaseAsset(data){
    const {user} = useContext(AppContext)

    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && data){
                (async () => {
                    const response = await apiAsset.purchaseAsset(user.token, data, source.token)
                    if (response){
                        console.log('Asset purchased')
                    } else if (response === false && response !== undefined){
                        console.log('Unexpected error')
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user.token, data]
    )
}