import VueJwtDecode from "vue-jwt-decode";
import {reactive} from "vue";
import {router} from "./router.js";
import config from "./config.js";
import {useFetch} from "./fetchRequest.js";

let token = null
localStorage.getItem('token') !== null ? token = VueJwtDecode.decode(localStorage.getItem('token')) : token = null

export const userInfo = reactive(
    {
        token: localStorage.getItem('token') || null,
        username: localStorage.getItem('username') || null,
        expired: token ? token.exp : null,
        role: token ? token.role : null,

        searchQuery: ''
    }
)
export function signOut() {
    localStorage.clear()
    router.push('/')
    router.go()
}

console.log(token)
userInfo.token === 'undefined' ? signOut() : ''

userInfo.expired > Math.floor(Date.now() / 1000) && userInfo.expired !== null ? refreshToken() : ''

export function refreshToken () {
    if (token !== null) {
        useFetch('refresh', "POST", {"token": userInfo.token})
            .then(result => {
                console.log(result.status)
                localStorage.setItem("token", result.token)
            })
            .catch(err => signOut())
    }
}

