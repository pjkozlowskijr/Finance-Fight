// //////////////////////////////
// Hook to get all users
// //////////////////////////////

import { CancelToken } from "apisauce";
import { useContext, useEffect } from "react";
import apiUser from '../api/apiUser';
import { AppContext } from '../context/AppContext';

export default function useGetAllUsers() {
    const {users, setUsers} = useContext(AppContext);
    
    useEffect(
        () => {
            const source = CancelToken.source();
            (async () => {
                const response = await apiUser.getAllUsers(source.token);
                setUsers(response.users)
                console.log(response)
            })()
            return () => {source.cancel()}
        },
        []
    )
    return users
}
