// //////////////////////////////
// API CLIENT - NO AUTH
// //////////////////////////////

import { create } from "apisauce";

const apiClient = (cancelToken) => create(
    {
        baseURL: window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' ? 'http://127.0.0.1:5000' : '',
        cancelToken
    }
);

export default apiClient