import VueJwtDecode from "vue-jwt-decode";
import {useFetch} from "../controllers/requestsControl.js";
import {userInfo} from "../../../Store/userInfo.js";

export function getToken() {
    try {

        userInfo.token = localStorage.getItem('token') || null
        userInfo.expired = VueJwtDecode.decode(userInfo.token).exp || null
        userInfo.role = VueJwtDecode.decode(userInfo.token).role || null
        userInfo.username = localStorage.getItem('username') || null

    } catch (e) {
        signOut()

    }
}
getToken()

export function signOut() {
    localStorage.clear()
    userInfo.token = null
    userInfo.expired = null
    userInfo.role = null
    userInfo.username = ''
}

export function refreshToken () {
    try {
        useFetch('refresh', "POST", {"token": userInfo.token})
            .then(result => {
                localStorage.setItem("token", result.token)
                getToken()
            })
    } catch (e) {
        signOut()
    }

}

