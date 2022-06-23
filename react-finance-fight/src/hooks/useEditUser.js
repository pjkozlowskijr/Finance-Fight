// //////////////////////////////
// Hook to edit user profile
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { AppContext } from '../context/AppContext';

export default function useEditUser(data){
    const {user, setAlert, setUserInfo, getUserFromLS} = useContext(AppContext);
    
    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token && data?.key){
                (async () => {
                    const response = await apiUser.editUser(user.token, data, source.token);
                    if (response){
                        let editUser = getUserFromLS();
                        Object.keys(editUser).forEach(key => {
                            if (data.hasOwnProperty(key)){
                                editUser[key] = data[key]
                                }});
                        setUserInfo(editUser)
                        setAlert({msg: 'Profile edited successfully.', cat: 'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [data.key]
    )
}