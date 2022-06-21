import { useState, useEffect, useContext } from "react";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser';
import { AppContext } from '../context/AppContext'

export default function useGetAllUsers() {
    const {users, setUsers} = useContext(AppContext)
    
    useEffect(
        () => {
            const source = CancelToken.source();
            (async () => {
                console.log('running')
                const response = await apiUser.getAllUsers(source.token)
                console.log(response)
                setUsers(response)
            })()
            return () => {source.cancel()}
        },
        [setUsers]
    )
    return users
}
