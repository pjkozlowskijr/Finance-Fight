import { CancelToken } from 'apisauce';
import { useEffect } from 'react';
import apiUser from '../api/apiUser';

// //////////////////////////////
// Hook to create user
// //////////////////////////////

export default function useCreateUser(data) {
    useEffect(
        () => {
            let response
            const source = CancelToken.source();
            if (data?.first_name){
                (async () => {
                    response = await apiUser.createUser(data, source.token)
                    if (response){
                        console.log(`User ${data.email} created.`)
                    }else{
                        console.log('An unexpected error occured.')
                    }
                })()
            }
        },
        [data]
    )
}