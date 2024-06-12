import {userInfo} from "../Store/userInfo.js";
import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {refreshToken} from "./user.js";

export function uploadImage (file) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    const formData = new FormData();
    formData.append("image-upload", file );

    return axios.post(`${apiUrl}/image-upload`, formData, {headers}).then(result => {
        refreshToken().then(result => result).catch(error => error)
        return result
    }).catch((error) => {
        refreshToken().then(result => result).catch(error => error)
        return error.response.data.message
    })
}