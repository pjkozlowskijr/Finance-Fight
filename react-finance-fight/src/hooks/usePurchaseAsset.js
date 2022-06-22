import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import apiAsset from '../api/apiAsset';

// //////////////////////////////
// Hook to purchase asset
// //////////////////////////////

export default function usePurchaseAsset(purchaseInfo){
    const {user, setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (purchaseInfo?.data?.key){
                (async () => {
                    const response = await apiAsset.purchaseAsset(user.token, purchaseInfo.type, purchaseInfo.quantity, purchaseInfo.data, source.token)
                    if (response){
                        setAlert({msg: `You purchased some ${purchaseInfo.data.symbol.toUpperCase()}!`, cat: 'success'})
                    }else if (response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [purchaseInfo, setAlert]
    )
}