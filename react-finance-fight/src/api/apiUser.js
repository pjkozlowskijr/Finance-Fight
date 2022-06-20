import apiClientNoAuth from './ClientNoAuth';
import apiClientBasicAuth from './ClientBasicAuth';
import apiClientTokenAuth from './ClientTokenAuth';

// //////////////////////////////
// USER APIs
// //////////////////////////////

const endpointLogin = '/login'
const endpointLogout = '/logout'
const endpointUser = '/user'

// Create user account
const createUser = async (data, cancelToken) => {
    const response = await apiClientNoAuth(cancelToken).post(endpointUser, data);
    return response.data
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
    return response.data
}

// Edit user profile
const editUser = async (token, data, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).put(endpointUser, data);
    return response.data
}

// Delete user profile
const deleteUser = async (token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpointUser);
    return response.data
}

// Get user assets
const getUserAssets = async (token, cancelToken) => {
    let error
    let assets

    const response = await apiClientTokenAuth(token, cancelToken).get(endpointUser+'/assets');
    if (response.ok){
        assets = response.data
    }else{
        error = 'An unexpected error has occured.'
    }
    return{
        error,
        assets
    }
}

const getUserInfo = async (token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).get(endpointUser)
    return response.data
}

const apis = {
    createUser,
    login,
    logout,
    editUser,
    deleteUser,
    getUserAssets,
    getUserInfo
}

export default apis