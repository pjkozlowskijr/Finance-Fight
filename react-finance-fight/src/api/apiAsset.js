import apiClientNoAuth from './ClientNoAuth';
import apiClientTokenAuth from './ClientTokenAuth';

// //////////////////////////////
// LEAGUE APIs
// //////////////////////////////

const endpoint = '/asset'

// Get asset information via API
const getAssetInfo = async (type, symbol, cancelToken) => {
    let error
    let asset

    const response = await apiClientNoAuth(cancelToken).get(endpoint+'/'+type+'/'+symbol);
    if (response.ok){
        asset = response.data
    }else{
        error = 'An unexpected error has occured.'
    };
    return{
        error,
        asset
    }
}

// User purchases an asset and adds to holdings
const purchaseAsset = async (token, data, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, data);
    return response.ok
}

// User sells an asset and removes from holdings
const sellAsset = async (token, id, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+id);
    return response.ok
}

const apis = {
    getAssetInfo,
    purchaseAsset,
    sellAsset
}

export default apis