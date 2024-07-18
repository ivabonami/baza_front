import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {setInfo, userInfo} from "../Store/userInfo.js";
import {useFetch} from "../assets/js/controllers/requestsControl.js";

export function signIn(data) {
    return axios.post(`${apiUrl}login`, data).then(result => result).catch(err => err)
}

export function signUp(data) {
    return axios.post(`${apiUrl}signup`, data)
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

    axios.post(`${apiUrl}refresh`, {"token": userInfo.token}, {headers})
        .then(result => {
            console.log(result)
            localStorage.setItem('token', result.data.token)
            setInfo(result.data.token, localStorage.getItem('username') )
        })
        .catch(e => signOut())

}

userInfo.expired && Math.round(Date.now() / 1000) + 3600 > userInfo.expired ? refreshToken() : null