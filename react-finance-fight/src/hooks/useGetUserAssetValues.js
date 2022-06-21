import { CancelToken } from 'apisauce'
import { useContext, useEffect, useState } from 'react'
import apiUser from '../api/apiUser'
import { AppContext } from '../context/AppContext'

export default function useGetUserAssetValues() {
    const [updatedValues, setUpdatedValues] = useState
    ()
    const {user} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token){
                (async () => {
                    console.log('running')
                    const response = await apiUser.useGetUserAssetValues(user.token, source.token)
                    console.log(response)
                    setUpdatedValues(response)
                    console.log('done')
                })()
            }
            return () => {source.cancel()}
        },
        [setUpdatedValues, user]
    )
    return updatedValues
}
