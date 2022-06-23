// ////////////////////////////////////////////////
// Hook to get current user's current asset values
// ////////////////////////////////////////////////

import { CancelToken } from 'apisauce'
import { useContext, useEffect, useState } from 'react'
import apiUser from '../api/apiUser'
import { AppContext } from '../context/AppContext'

export default function useGetUserAssetValues() {
    const [updatedValues, setUpdatedValues] = useState();
    const {user} = useContext(AppContext);

    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token){
                (async () => {
                    const response = await apiUser.getUserAssetValues(user.token, source.token);
                    setUpdatedValues(response)
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, setUpdatedValues]
    )
    return updatedValues
}
