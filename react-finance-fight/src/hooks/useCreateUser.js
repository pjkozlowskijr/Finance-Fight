import { CancelToken } from 'apisauce';
import { useEffect } from 'react';
import apiUser from '../api/apiUser';

// //////////////////////////////
// Hook to create user
// //////////////////////////////

export default function useCreateUser(data){
    useEffect(
        () => {
            const source = CancelToken.source()
            if (data?.email){
                (async () => {
                    const response = await apiUser.createUser(data, source.token)
                    if (response){
                        console.log(`User ${data.email} created.`)
                    }else if(response === false && response !== undefined){
                        console.log('An unexpected error occured.')
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [data]
    )
}