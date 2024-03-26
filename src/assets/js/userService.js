import VueJwtDecode from "vue-jwt-decode";
import {reactive} from "vue";
import {router} from "./router.js";
import config from "./config.js";

export const userInfo = reactive(
    {
        token: localStorage.getItem('token') || null,
        username: localStorage.getItem('username') || null,
        expired: localStorage.getItem('expired') || null,
        role: localStorage.getItem('role') || null
    }

)
export const isAdmin = () => {
    return userInfo.role === 'admin'
}
export function signOut() {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('expired')
    router.go()
}
export function refreshToken () {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${userInfo.token}`);

    const raw = JSON.stringify({
        "token": userInfo.token
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,

    };

    fetch(`${config.api.url}refresh`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            userInfo.token = result.token
            localStorage.setItem('token', result.token)
        })
        .catch((error) => console.error(error));
}


localStorage.getItem('token') !== null ? userInfo.expired = VueJwtDecode.decode(localStorage.getItem('token')).exp : localStorage.setItem('expired',  null)

localStorage.setItem('expired', userInfo.expired || null)
