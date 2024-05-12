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

export function refreshToken () {
    useFetch('refresh', "POST", {"token": userInfo.token})
        .then(result => {
            console.log(result)
            localStorage.setItem("token", result.token)
        })

}