// //////////////////////////////
// Hook to get asset info
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiAsset from '../api/apiAsset';
import { AppContext } from "../context/AppContext";

export default function useAssetInfo(type, symbol){
    const {setSymbol, setAsset} = useContext(AppContext);
    
    useEffect(
        () => {
            const source = CancelToken.source();
            if (symbol && type){
                (async () => {
                const response = await apiAsset.getAssetInfo(type, symbol, source.token);
                setAsset(response.asset)
                setSymbol('')
                })()
            }
            return () => {source.cancel()}
        },
        [symbol, type, setSymbol, setAsset]
    )
}