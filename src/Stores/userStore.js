import {reactive} from "vue";
import { jwtDecode } from "jwt-decode";

export const userStore = reactive({
    token: null,
    username: null,
    role: null
})

export function setUserData(data) {
    for (let prop in data) {
        localStorage.setItem(prop, data[prop])
        userStore[prop] = data[prop]
        userStore.role = jwtDecode(userStore.token).role
    }

}

export function signOut() {
    localStorage.clear()
    userStore.token = null
    userStore.username = null
}
export function checkUserData(token, username) {
    if (localStorage.getItem('token') !== token || localStorage.getItem('username') !== username) {
        signOut()

    } else {
        try {
            setUserData({username: localStorage.getItem('username'), token: localStorage.getItem('token') })
        } catch (err) {
            signOut()
        }
    }
}