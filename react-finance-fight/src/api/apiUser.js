import apiClientNoAuth from './clientNoAuth';
import apiClientBasicAuth from './clientBasicAuth';
import apiClientTokenAuth from './clientTokenAuth';

// //////////////////////////////
// USER APIs
// //////////////////////////////

const endpointLogin = '/login'
const endpointLogout = '/logout'
const endpointPPD = '/user'

// Create user account
const createUser = async (data, cancelToken) => {
    const response = await apiClientNoAuth(cancelToken).post(endpointPPD, data);
    return response.ok
}

// User login to receive token
const login = async (email, password, cancelToken) => {
    let error
    let user

    const response = await apiClientBasicAuth(email, password, cancelToken).get(endpointLogin);
    if (response.ok){
        user = response.data
    }else if (response.status === 401){
        error = 'Invalid email/password combination.'
    }else{
        error = 'An unexpected error has occured.'
    };
    return{
        error,
        user
    }
}

// User logs out
const logout = async (token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpointLogout)
    return response.ok
}

// Edit user profile
const editUser = async (token, data, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).put(endpointPPD, data);
    return response.ok
}

// Delete user profile
const deleteUser = async (token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpointPPD);
    return response.ok
}

const apis = {
    createUser,
    login,
    logout,
    editUser,
    deleteUser
}

export default apis