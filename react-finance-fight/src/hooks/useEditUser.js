import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { CancelToken } from "apisauce";
import { AppContext } from '../context/AppContext';

// //////////////////////////////
// Hook to edit user profile
// //////////////////////////////

export default function useEditUser(data){
    const {user, setAlert, setUserInfo, getUserFromLS} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && data?.first_name){
                (async () => {
                    const response = await apiUser.editUser(user.token, data, source.token)
                    if (response){
                        let editUser = getUserFromLS()
                        Object.keys(editUser).forEach(key => {
                            if (data.hasOwnProperty(key)){
                                editUser[key] = data[key]
                                }})
                        setUserInfo(editUser)
                        setAlert({msg: 'User profile edited successfully.', cat: 'success'})
                    }else if(response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, data, setAlert, getUserFromLS, setUserInfo]
    )
}