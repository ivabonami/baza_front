import {api} from "@/API/apiurl.js";
import axios from "axios";
import {addNotice} from "@/js/notifications.js";
import {favoriteProjects} from "@/Stores/favoriteProjects.js";
import {userStore} from "@/Stores/userStore.js";

export async function getProjects(options) {
    let urlOptions = 'projects?';
    console.log(options)
    for (const option in options) {
        if (options[option]) {
            urlOptions += `${option}=${options[option]}&`
        }

    }
    urlOptions = urlOptions.substring(0, urlOptions.length - 1)

    return axios.get(api.url + urlOptions, {timeout: 60000}).then(result => {
        if (result.data.projects.length <= 0 && !options.offset) {
            addNotice({name: `В этой категории еще нет проектов`, type: 'warning'})
        }
        return result.data
    })
        .catch(err =>  {
            if (err.code === "ERR_BAD_REQUEST") {
                addNotice({name: "Запроса не существует, проверьте правильность путей", type: 'danger'})
            } else if( err.code === "ECONNABORTED") {
                addNotice({name: "Таймаут соединения", type: 'danger'})
            } else {
                addNotice({name: "Непредвиденная ошибка, обратитесь к администратору. " + err.message, type: 'danger'})
            }
        })
}

export function getProject(id) {
    return axios.get(api.url + 'projects/' + id)
}

export function getFavoriteProjects(options) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    axios.get(`${api.url}user/project`, {headers}).then(result => {
        favoriteProjects.projects.splice(0, favoriteProjects.projects.length)
        for (let project of result.data.projects) {
            favoriteProjects.projects.push(project)
        }

    })


}