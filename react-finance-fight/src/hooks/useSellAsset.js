// //////////////////////////////
// Hook to sell asset
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiAsset from '../api/apiAsset';
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

export default function useSellAsset(saleInfo){
    const {user, setAlert} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(
        () => {
            const source = CancelToken.source();
            if (saleInfo?.data?.key){
                (async () => {
                    const response = await apiAsset.sellAsset(user.token, saleInfo.type, saleInfo.symbol, saleInfo.quantity, source.token);
                    if (response){
                        window.location.reload()
                        setAlert({msg: `You just sold ${saleInfo.quantity} ${saleInfo.symbol.toUpperCase()}.`, cat: 'success'})
                    }else if (response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [saleInfo, setAlert]
    )
}