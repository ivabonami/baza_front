import VueJwtDecode from "vue-jwt-decode";
import {useFetch} from "../controllers/requestsControl.js";
import {userInfo} from "../../../Store/userInfo.js";
import axios from "axios";
import {apiUrl} from "../config.js";

export function signOut() {
    localStorage.clear()
    userInfo.token = null
    userInfo.expired = null
    userInfo.role = null
    userInfo.username = ''
}


export function refreshToken() {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    axios.post(`${apiUrl}/refresh`, {"token": userInfo.token}, {headers})
        .then(r => {
            if (r.status === 200) {
                localStorage.setItem("token", r.data.token)
                userInfo.token = r.data.token
            } else {
                signOut()
            }
        })
        .catch(e => signOut())

}