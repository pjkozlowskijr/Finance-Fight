// /////////////////////////////////////
// Hook to get all current user's assets
// /////////////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect, useState } from "react";
import apiUser from '../api/apiUser';
import { AppContext } from '../context/AppContext';

export default function useGetUserAssets(){
    const {user} = useContext(AppContext);
    const [assets, setAssets] = useState({});

    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token){
                (async () => {
                    const response = await apiUser.getUserAssets(user.token, source.token);
                    setAssets(response)
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token]
    )
    return assets
}