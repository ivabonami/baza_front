import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {userInfo} from "../Store/userInfo.js";
import {projectsStore} from "../Store/projectsStore.js";
import {favoriteProjects} from "../Store/favoriteProjects.js";

export function getProjects(options) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    return axios.get(`${apiUrl}projects${options}`, {headers})

}

export function getProjectInfo(projectId) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    return axios.get(`${apiUrl}projects/${projectId}`, {headers})
}

export function changePayedStatus(projectId, status) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    const project = projectsStore.projects.find(item => item.id === projectId)
    project.payed = status

    projectsStore.projects.splice(projectsStore.projects.findIndex(item => item.id === projectId), 1)
    status === true ? projectsStore.projects.unshift(project) : projectsStore.projects.push(project)

    return axios.put(`${apiUrl}projects/${projectId}`, {payed: status},{headers})
}

export function approveProject(project) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    project.isReviewed = true
    return axios.put(`${apiUrl}projects/${project.id}`, {isReviewed: true},{headers})
}


export function removeProject(projectId, options, offset) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    projectsStore.projects.splice(projectsStore.projects.findIndex(item => item.id === projectId), 1)
    options ? options = options.replace(/limit=[0-9]/i, 'limit=1') : null
    options ? options = options.replace(/offset=[0-9]/i, `offset=${offset}`) : null
    getProjects(options).then(result => projectsStore.projects.push(result.data.projects[0]))


    return axios.delete(`${apiUrl}projects/${projectId}`, {headers})
}

export function getFavoriteProjects(options) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    axios.get(`${apiUrl}user/project`, {headers}).then(result => {
        for (let project of result.data.projects) {
            favoriteProjects.push(project)
        }

    })


}