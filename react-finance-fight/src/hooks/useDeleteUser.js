import { useContext, useEffect } from "react";
import { CancelToken } from "apisauce";
import apiUser from '../api/apiUser';
import { AppContext } from "../context/AppContext";

// //////////////////////////////
// Hook to delete user
// //////////////////////////////

export default function useDeleteUser(deleteUser){
    const {user, setAlert} = useContext(AppContext)
    useEffect(
        () => {
            const source = CancelToken.source()
            if (user?.token && deleteUser?.key){
                (async () => {
                    const response = await apiUser.deleteUser(user.token, source.token)
                    if (response){
                        setAlert({msg: 'Account deleted successfully.', cat: 'success'})
                        localStorage.clear()
                    }else if (response === false && response !== undefined){
                        setAlert({msg: 'There was an unexpected error. Please try again.', cat: 'error'})
                    }
                })()
            }
            return () => {source.cancel()}
        },
        [user?.token, deleteUser, setAlert]
    )
}