import axios from "axios"
import {API_CONFIG } from "../contsants/apis"

const axiosinstance = axios.create(
    {
        baseURL: API_CONFIG.BASE_URL,
        timeout: API_CONFIG.TIME_OUT
    }
)

axiosinstance.interceptors.request.use(
   (req) =>{
        const token = localStorage.getItem(API_CONFIG.TOKEN);
        if(token)
        {
            req.headers['API_CONFIG.AUTHORIZATION'] = `${API_CONFIG.BEARER} ${token}`;
        }
        return req;
    }
)

axiosinstance.interceptors.response.use(
    (res) => {
        if(res.headers[API_CONFIG.AUTHORIZATION]!= undefined) {
            localStorage.setItem(API_CONFIG.TOKEN, res.headers[API_CONFIG.AUTHORIZATION].split(' ')[1]);
        }
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosinstance;