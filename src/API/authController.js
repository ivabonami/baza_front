import axios from "axios";
import {api} from "@/API/apiurl.js";
import {setUserData, signOut} from "@/Stores/userStore.js";
import {addNotice} from "@/js/notifications.js";


export function signIn(data) {

    return axios.post(api.url + 'login', data, {timeout: 10000})
    
}
export function signUp(data) {
    try {
        return axios.post(api.url + 'signup', data, {timeout: 10000}).then(() => {
            try {
                signIn(data).then(() => {
                    addNotice({name: 'Вы успешно зарегистрировались и авторизовались', type: 'success'})
                })
            } catch (e) {
                addNotice({name: 'Вы успешно зарегистрировались', type: 'success'})
            }

        }).catch(err => {
            let message;
            if (err.response.data.message === 'Username already exists') {
                message = 'Пользователь с таким имененм уже зарегистрирован'
            } else {
                message = 'Ошибка регистрации'
            }

            addNotice({name: message, type: 'danger'})
        })
    } catch (err) {
        return err
    }
}