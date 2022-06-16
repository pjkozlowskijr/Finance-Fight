import { useEffect } from "react";
import apiUser from '../api/apiUser';
import { CancelToken } from "apisauce";

// //////////////////////////////
// Hook to login user
// //////////////////////////////

export default function useLogin(loginCreds, setLoginCreds, setError, setUserInfo){
    useEffect(
        () => {
            const source = CancelToken.source()
            if (loginCreds.email && loginCreds.password){
                const login = async (cancelToken) => {
                    const response = await apiUser.login(loginCreds.email, loginCreds.password, cancelToken)
                    if (response.user?.token){
                        console.log('Logged in')
                        setUserInfo(response.user)
                        setLoginCreds({})
                    }
                    setError(response.error)
                }
                login(source.token)
            }
            return () => {source.cancel()}
        },
        [loginCreds, setLoginCreds, setError, setUserInfo]
    )
}