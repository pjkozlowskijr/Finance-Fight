import apiClientNoAuth from './clientNoAuth';
import apiClientTokenAuth from './clientTokenAuth';

// //////////////////////////////
// LEAGUE APIs
// //////////////////////////////

const endpoint = '/league'

// Create league
const createLeague = async (token, data, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, data);
    return response.ok
}

// Delete league
const deleteLeague = async (token, id, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+id);
    return response.ok
}

// Get all leagues
const getAllLeagues = async (cancelToken) => {
    let error
    let leagues

    const response = await apiClientNoAuth(cancelToken).get(endpoint);
    if (response.ok){
        leagues = response.data
    }else{
        error = 'An unexpected error has occured.'
    };
    return{
        error,
        leagues
    }
}

// Get single league
const getLeague = async (id, cancelToken) => {
    let error
    let league

    const response = await apiClientNoAuth(cancelToken).get(endpoint+'/'+id);
    if (response.ok){
        league = response.data
    }else{
        error = 'An unexpected error has occured.'
    };
    return{
        error,
        league
    }
}

// Join a league
const joinLeague = async (token, id, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint+'/join/'+id);
    return response.ok
}

// Leave a league
const leaveLeague = async (token, id, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/leave/'+id);
    return response.ok
}

const apis = {
    createLeague,
    deleteLeague,
    joinLeague,
    leaveLeague,
    getAllLeagues,
    getLeague
}

export default apis