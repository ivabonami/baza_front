import axios from "axios";
import {api} from "@/API/apiurl.js";
import {userStore} from "@/Stores/userStore.js";
import {addNotice} from "@/js/notifications.js";
import {projects} from "@/Stores/projectsStore.js";

export function addFavorite(id, name) {
    return axios.post(api.url + 'user/project/' + id, {}, {timeout: 20000, headers: {
            'Authorization': `Bearer ${userStore.token}`
        }}).then(result => {
            addNotice({name: `Проект ${name} успешно добавлен в избранное!`, type: 'success'})
        })
        .catch(error => {
            addNotice({name: `Ошибка`, type: 'danger'})
        })
}

export function removeFavorite(id, name) {

    return axios.delete(api.url + 'user/project/' + id, {timeout: 60000, headers: {
            'Authorization': `Bearer ${userStore.token}`
        }}).then(result => {

            addNotice({name: `Проект ${name} успешно удален из избранного!`, type: 'warning'})
            return result
        })
        .catch(error => {
            addNotice({name: `Ошибка`, type: 'danger'})
        })
}