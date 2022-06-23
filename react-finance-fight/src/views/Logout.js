// //////////////////////////////
// LOGOUT
// //////////////////////////////

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useLogout from '../hooks/useLogout';

export default function Logout() {
  const {user} = useContext(AppContext);
  
  useLogout(user);

  return (
    <Navigate to='/login'/>
  )
}
