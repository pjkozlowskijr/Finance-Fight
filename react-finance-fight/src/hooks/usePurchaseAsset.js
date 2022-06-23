// //////////////////////////////
// Hook to purchase asset
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiAsset from '../api/apiAsset';
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

export default function usePurchaseAsset(purchaseInfo){
    const {user, setAlert} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(
        () => {
            const source = CancelToken.source();
            if (purchaseInfo?.data?.key){
                (async () => {
                    const response = await apiAsset.purchaseAsset(user.token, purchaseInfo.type, purchaseInfo.quantity, purchaseInfo.data, source.token);
                    if (response){
                        window.location.reload()
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