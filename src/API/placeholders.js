import axios from "axios";
import {api} from "@/API/apiurl.js";
import {userStore} from "@/Stores/userStore.js";
import {reactive} from "vue";
import {addNotice} from "@/js/notifications.js";
import {projects} from "@/Stores/projectsStore.js";
import router from "@/router/index.js";

export const placeholders = reactive({
    categoryId: null,
    categoryPlaceholders: []
})

export function getPlaceholders(categoryId) {
    let url = 'placeholders'

    categoryId ? url += '?categoryId=' + categoryId : url

    return axios.get(api.url + url, {timeout: 20000, headers: {
            'Authorization': `Bearer ${userStore.token}`
        }})
        .then(result => {
            placeholders.categoryPlaceholders = result.data.placeholders
        })
}

export function setPlaceholdersCount(placeholdersParams, categoryId) {
    let url = 'placeholder'

    let data = {
        placeholdersParams: placeholdersParams
    }
    categoryId ? data.categoryId = categoryId : null

    return axios.post(api.url + url, data,{timeout: 20000, headers: {
            'Authorization': `Bearer ${userStore.token}`
        }} )
}
export function deletePlaceholder(placeholderId) {
    let url = 'placeholder'

    const data = {
        placeholderId: placeholderId
    }

    return axios.delete(api.url + url, {data} )
}

export function linkProjectWithPlaceholder(placeholderId, projectId) {
    let url = 'placeholder/assign'

    return axios.post(api.url + url, {
        placeholderId: placeholderId,
        projectId: projectId
    }, {timeout: 20000} ).then(result => {
        const project = projects.find(item => item.id === projectId)
        const placeholder = projects.find(item => item.id === placeholderId)
        console.log(project, placeholder, projects)
        projects.splice(projects.indexOf(project), 1)
        placeholder.project = project
        addNotice({name: `Проект успешно отвязан`, type: 'success'})
    }).catch(error => {
        console.log(error)
        addNotice({name: `Не удалось отвязать проект`, type: 'danger'})
    })
}

export function unlinkProjectWithPlaceholder(placeholderId, projectId) {
    let url = 'placeholder/project'

    return axios.put(api.url + url, {
        placeholderId: '',
        projectId: projectId
    }, {timeout: 20000} ).then(result => {
        const placeholder = projects.find(item => item.id === placeholderId, 1)
        projects.push(placeholder.project)
        placeholder.project = null
        addNotice({name: `Проект успешно отвязан`, type: 'success'})
    }).catch(error => {
        addNotice({name: `Не удалось отвязать проект`, type: 'danger'})
    })
}

export function relinkProjectToPlaceholder(placeholderId, newProject) {
    let url = 'placeholder/project'


    return axios.put(api.url + url, {
        placeholderId: placeholderId,
        projectId: newProject.id
    }, {timeout: 20000} )
        .then(result => {
            try {
                projects.find(item => item.id === newProject.placeholderId && item.project).project
                newProject.placeholderId = placeholderId
                projects.find(item => item.id === placeholderId && item.project).project = newProject
            } catch (error) {
                projects.splice(projects.findIndex(item => item.name === newProject.name), 1)
                projects.find(item => item.id === placeholderId && item.project).project = newProject
            }

            addNotice({name: `Проект успешно привязан`, type: 'success'})


        })
        .catch(error => {
            let message;
            console.log(error)

            if (error.response.data.message === "Specified placeholder already has an assigned project") {
                message = 'Проект уже привязан к другой заглушке'
            } else {
                message = 'Не удалось привязать заглушку'
            }
            addNotice({name: message, type: 'danger'})
        })


}

export function addPlaceholders(placeholdersParams) {
    let url = 'placeholder'

    return axios.post(api.url + url, placeholdersParams, {timeout: 20000} )
}


export function editPlaceholder(placeholdersParams) {
    let url = 'placeholder/edit'

    return axios.put(api.url + url, placeholdersParams, {timeout: 20000} )
}