import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { CancelToken } from "apisauce";
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to login user
// //////////////////////////////

export default function useLogin(loginCreds, setLoginCreds, setError, setUserInfo){
    const {setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (loginCreds.email && loginCreds.password){
                const login = async (cancelToken) => {
                    const response = await apiUser.login(loginCreds.email, loginCreds.password, cancelToken)
                    if (response.user?.token){
                        setAlert({msg: 'You are now logged in. Happy investing!', cat:'success'})
                        setUserInfo(response.user)
                        setLoginCreds({})
                    }
                    setError(response.error)
                }
                login(source.token)
            }
            return () => {source.cancel()}
        },
        [loginCreds, setLoginCreds, setError, setUserInfo, setAlert]
    )
}