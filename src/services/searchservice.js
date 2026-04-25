import axiosinstance from "../apis/axiosinstance"
import {API_ENDPOINTS} from "../contsants/endpoints"

export const searchSuggestionsApi = async (data) => {
    
    return await axiosinstance.post(API_ENDPOINTS.SEARCH_SUGGESTIONS, data);
}