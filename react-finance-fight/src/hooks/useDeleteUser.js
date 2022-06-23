// //////////////////////////////
// Hook to delete user
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

export default function useDeleteUser(deleteUser){
    const {user, setAlert,setUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(
        () => {
            const source = CancelToken.source();
            if (user?.token && deleteUser?.key){
                (async () => {
                    const response = await apiUser.deleteUser(user.token, source.token);
                    if (response){
                        setAlert({msg: "Account deleted successfully. We're sad to see you go.", cat: 'success'})
                        setUser({})
                        navigate('/')
                    }else if (response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, deleteUser, setAlert, navigate, setUser]
    )
}