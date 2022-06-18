import { useContext, useEffect } from "react";
import apiAsset from '../api/apiAsset';
import { CancelToken } from "apisauce";
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to get asset info
// //////////////////////////////

export default function useAssetInfo(type, symbol){
    const {setSymbol, setAsset} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (symbol && type){
                (async () => {
                const response = await apiAsset.getAssetInfo(type, symbol, source.token)
                console.log(response.asset)
                setAsset(response.asset)
                setSymbol('')
                })()
            }
            return () => {source.cancel()}
        },
        [symbol, type, setSymbol, setAsset]
    )
}