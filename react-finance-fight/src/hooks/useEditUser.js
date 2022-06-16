import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { CancelToken } from "apisauce";
import { AppContext } from '../context/AppContext';

// //////////////////////////////
// Hook to edit user profile
// //////////////////////////////

export default function useEditUser(data){
    const {user} = useContext(AppContext)
    
    useEffect(
        () => {
            let response
            const source = CancelToken.source()
            if (user?.token && data?.first_name){
                (async () => {
                    response = await apiUser.editUser(user.token, data, source.token)
                    if (response){
                        console.log('User edited')
                    }else{
                        console.log('An unexpected error occured.')
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, data]
    )
}