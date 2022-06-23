// //////////////////////////////
// Hook to login user
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

export default function useLogin(loginCreds, setLoginCreds, setError){
    const {setAlert, setUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(
        () => {
            const source = CancelToken.source();
            if (loginCreds.email && loginCreds.password){
                const login = async (cancelToken) => {
                    const response = await apiUser.login(loginCreds.email, loginCreds.password, cancelToken);
                    if (response?.user?.token){
                        setAlert({msg: 'You are now logged in. Happy investing!', cat:'success'})
                        setUser(response.user)
                        setLoginCreds({})
                        navigate('/profile')
                    }else{
                        setError(response.error)
                    }
                }
                login(source.token)
            }
            return () => {source.cancel()}
        },
        [loginCreds, setLoginCreds, setError, setAlert]
    )
}