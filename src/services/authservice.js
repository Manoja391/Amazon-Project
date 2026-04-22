// Authentication related API calls

import axiosinstance from "../apis/axiosinstance"
import {API_ENDPOINTS} from "../contsants/endpoints"

export const signupAPi = async (data) => {
    
    return await axiosinstance.post(API_ENDPOINTS.SIGNUP, data);
}

export const signinAPi = async (data) => {

    return await axiosinstance.post(API_ENDPOINTS.SIGNIN, data);
 
}

export const resetPasswordApi = async (data) => {

    return await axiosinstance.post(API_ENDPOINTS.FORGOT_PASSWORD, data);
 
}

