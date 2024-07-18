import {reactive} from "vue";
import VueJwtDecode from "vue-jwt-decode";

export const userInfo = reactive(
    {
        token: null,
        username: '',
        expired: null,
        role: null,

        searchQuery: ''
    }
)
export const authHeader = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
};

export function setInfo(token, username) {
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
        try {
                userInfo.token = token
                userInfo.username = username
                userInfo.expired = VueJwtDecode.decode(userInfo.token).exp
                userInfo.role = VueJwtDecode.decode(userInfo.token).role


        } catch (e) {
                return e
        }
}

localStorage.getItem('token') ? setInfo(localStorage.getItem('token'), localStorage.getItem('username')) : null
