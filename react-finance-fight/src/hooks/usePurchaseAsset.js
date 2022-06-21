import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import apiAsset from '../api/apiAsset';

// //////////////////////////////
// Hook to purchase asset
// //////////////////////////////

export default function usePurchaseAsset(type, quantity, data){
    const {user, setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            console.log('trying to run')
            if (user?.token && data?.key){
                (async () => {
                    const response = await apiAsset.purchaseAsset(user.token, type, quantity, data, source.token)
                    if (response){
                        setAlert({msg: `You purchased some ${data.symbol.toUpperCase()}!`, cat: 'success'})
                    } else if (response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [data.key]
    )
}