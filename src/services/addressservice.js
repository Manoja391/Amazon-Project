// Authentication related API calls

import axiosinstance from "../apis/axiosinstance"
import {API_ENDPOINTS} from "../contsants/endpoints"

export const addressAddApi = async (data) => {
 
    return await axiosinstance.post(API_ENDPOINTS.ADDRESS_ADD, data);
}

export const addressViewAPi = async (data) => {

    return await axiosinstance.post(API_ENDPOINTS.ADDRESS_VIEW, data);
 
}

export const addressDeleteApi = async (data) => {

    return await axiosinstance.delete(API_ENDPOINTS.ADDRESS_DELETE, data);
 
}

