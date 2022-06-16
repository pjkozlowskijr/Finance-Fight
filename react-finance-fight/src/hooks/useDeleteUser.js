import { useContext, useEffect } from "react";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to delete user
// //////////////////////////////

export default function useDeleteUser(deleteUser){
    const {user} = useContext(AppContext)

    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && deleteUser?.key){
                (async () => {
                    const response = await apiUser.deleteUser(user.token, source.token)
                    if (response){
                        console.log('User deleted')
                        localStorage.clear()
                    }else if (response === false && response !== undefined){
                        console.log('An unexpected error occured')
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, deleteUser]
    )
}