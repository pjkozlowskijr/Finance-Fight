import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import apiAsset from '../api/apiAsset';

// //////////////////////////////
// Hook to sell asset
// //////////////////////////////

export default function useSellAsset(saleInfo){
    const {user, setAlert} = useContext(AppContext)
    console.log(saleInfo)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (saleInfo?.data?.key){
                (async () => {
                    console.log('trying to sell')
                    const response = await apiAsset.sellAsset(user.token, saleInfo.type, saleInfo.symbol, quantity, source.token)
                    if (response){
                        setAlert({msg: `You just sold ${quantity} ${symbol.toUpperCase()}`, cat: 'success'})
                    }else if (response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, symbol, setAlert]
    )
}