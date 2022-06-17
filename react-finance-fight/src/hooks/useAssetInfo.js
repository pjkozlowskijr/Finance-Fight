import { useEffect, useState } from "react";
import apiAsset from '../api/apiAsset';
import { CancelToken } from "apisauce";

// //////////////////////////////
// Hook to get asset info
// //////////////////////////////

export default function useAssetInfo(type, symbol){
    const [asset, setAsset] = useState({})
    useEffect(
        () => {
            const source = CancelToken.source()
            if (symbol && type){
                (async () => {
                const response = await apiAsset.getAssetInfo(type, symbol, source.token)
                })()
                setAsset(response)
            }
            return () => {source.cancel()}
        },
        [symbol, type]
    )
    return asset
}