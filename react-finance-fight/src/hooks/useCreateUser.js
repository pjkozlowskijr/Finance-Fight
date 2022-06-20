import { CancelToken } from 'apisauce';
import { useContext, useEffect } from 'react';
import apiUser from '../api/apiUser';
import { AppContext } from '../context/AppContext';

// //////////////////////////////
// Hook to create user
// //////////////////////////////

export default function useCreateUser(data){
    const {setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (data?.email){
                (async () => {
                    const response = await apiUser.createUser(data, source.token)
                    if (response){
                        setAlert({msg: `User ${data.email} created successfully.`, cat: 'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }else if(response === 422){
                        setAlert({msg: 'That email is already in use.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [data, setAlert]
    )
}