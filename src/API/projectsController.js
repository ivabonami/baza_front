import {api} from "@/API/apiurl.js";
import axios from "axios";
import {addNotice} from "@/js/notifications.js";

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
        addNotice({name: `Получено проектов: ${result.data.projects.length}`, type: 'success'})
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