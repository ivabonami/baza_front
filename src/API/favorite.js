import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {authHeader, userInfo} from "../Store/userInfo.js";

export function addFavorite(projectId) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    return axios.post(`${apiUrl}/user/project/${projectId}`, {},{headers})
}

export function removeFavorite(projectId) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    return axios.delete(`${apiUrl}/user/project/${projectId}`, {headers})
}
