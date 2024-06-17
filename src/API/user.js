import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {userInfo} from "../Store/userInfo.js";
import {useFetch} from "../assets/js/controllers/requestsControl.js";
import {getToken} from "../assets/js/services/userService.js";

export function signIn(data) {
    return axios.post(`${apiUrl}/login`, data)
}

export function signUp(data) {
    return axios.post(`${apiUrl}/signup`, data)
}

export function signOut() {
    localStorage.clear()

    userInfo.username = null
    userInfo.token = null
    userInfo.role = null
    userInfo.expired = null

}

export function refreshToken() {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    return axios.post(`${apiUrl}/refresh`, {"token": userInfo.token}, {headers}).then(result => {
        localStorage.setItem('token', result.token)
    })
        .catch(error => {
            signOut()
        })

}
userInfo.expired && Math.round(Date.now() / 1000) + 3600 > userInfo.expired ? refreshToken() : null

// 1718306653