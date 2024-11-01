import axios from "axios";
import {api} from "@/API/apiurl.js";
import {userStore} from "@/Stores/userStore.js";
import {reactive} from "vue";
import {addNotice} from "@/js/notifications.js";
import {projects} from "@/Stores/projectsStore.js";
import {getProject} from "@/API/projectsController.js";

export const placeholders = reactive({
    categoryPlaceholders: [],
    categories: []
})

export function getPlaceholders(categoryId) {
    let url = 'placeholders'

    categoryId ? url += '?categoryId=' + categoryId : url

    return axios.get(api.url + url, {timeout: 20000, headers: {
            'Authorization': `Bearer ${userStore.token}`
        }})
        .then(result => result.data.placeholders)
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

export function linkProjectWithPlaceholder(placeholderId, project) {
    let url = 'placeholder/assign'

    return axios.post(api.url + url, {
        placeholderId: placeholderId,
        projectId: project.id
    }, {timeout: 20000} ).then(() => {

        projects.findIndex(item => item.id === project.id) ? projects.splice(projects.findIndex(item => item.id === project.id), 1) : null

        getProject(project.id).then(result => {
            try {
                projects.find(item => item.id === placeholderId && !item.type).project = result.data.project
            } catch (e) {
                placeholders.categoryPlaceholders.find(item => item.id === placeholderId && item.project).project = result.data.project
            }

        })

        addNotice({name: `Проект успешно привязан`, type: 'success'})
    }).catch(() => {
        addNotice({name: `Не удалось отвязать проект`, type: 'danger'})
    })
}

export function unlinkProjectWithPlaceholder(placeholderId, projectId) {
    let url = 'placeholder/project'

    return axios.put(api.url + url, {
        placeholderId: '',
        projectId: projectId
    }, {timeout: 20000} ).then(() => {
        try {
            projects.find(item => item.id === placeholderId).project = null
        } catch (e) {
            placeholders.categoryPlaceholders.find(item => item.id === placeholderId).project = null
        }

        addNotice({name: `Проект успешно отвязан`, type: 'success'})
    }).catch(() => {
        addNotice({name: `Не удалось отвязать проект`, type: 'danger'})
    })
}

export function relinkProjectToPlaceholder(placeholderId, newProject) {
    let url = 'placeholder/project'

    console.log('relink')
    return axios.put(api.url + url, {
        placeholderId: placeholderId,
        projectId: newProject.id
    }, {timeout: 20000} )
        .then(() => {
            try {
                projects.find(item => item.id === newProject.placeholderId && item.project).project
                newProject.placeholderId = placeholderId
                projects.find(item => item.id === placeholderId && item.project).project = newProject
            } catch (error) {
                getProject(newProject.id).then(result => {
                    try {
                        projects.find(item => item.id === placeholderId && item.project).project = result.data.project
                    } catch (e) {
                        placeholders.categoryPlaceholders.find(item => item.id === placeholderId && item.project).project = result.data.project
                    }
                })
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

export function addPlaceholders(placeholdersParams, categoryId) {
    let url = 'placeholder'

    return axios.post(api.url + url, {placeholdersParams: [placeholdersParams], categoryId: categoryId}, {timeout: 20000} )
        .then(() => addNotice({name: 'Успешно', type: 'success'}))
        .catch(() => addNotice({name: 'Не могу добавить заглушку', type: 'danger'}))
}


export function editPlaceholder(placeholdersParams) {
    let url = 'placeholder/edit'

    return axios.put(api.url + url, placeholdersParams, {timeout: 20000} )
}