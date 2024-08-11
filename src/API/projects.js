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

    if (projectsStore.projects.find(item => item.id === projectId)) {
        const project = projectsStore.projects.find(item => item.id === projectId) || null

        project.payed = status

        const lastPayed = projectsStore.projects.filter(item => item.payed === true).length
        projectsStore.projects.splice(projectsStore.projects.findIndex(item => item.id === projectId), 1)

        status === true ? projectsStore.projects.splice(lastPayed - 1, 0, project) : projectsStore.projects.push(project)
    }


    return axios.put(`${apiUrl}projects/${projectId}`, {payed: status},{headers})
}

export function approveProject(project) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    project.isReviewed = true
    return axios.put(`${apiUrl}projects/${project.id}`, {isReviewed: true},{headers})
}

export function disapproveProject(project) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    project.isReviewed = false
    return axios.put(`${apiUrl}projects/${project.id}`, {isReviewed: false},{headers})
}


export function removeProject(projectId, options, offset) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    if ( projectsStore.projects.findIndex(item => item.id === projectId) ) {
        projectsStore.projects.splice(projectsStore.projects.findIndex(item => item.id === projectId), 1)
        // options ? options = options.replace(/limit=[0-9]/i, 'limit=1') : null
        // options ? options = options.replace(/offset=[0-9]/i, `offset=${parseInt(offset)}`) : null
        // getProjects(options).then(result => projectsStore.projects.push(result.data.projects[0]))
    }


    return axios.delete(`${apiUrl}projects/${projectId}`, {headers})
}

export function getFavoriteProjects(options) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    axios.get(`${apiUrl}user/project`, {headers}).then(result => {
        favoriteProjects.splice(0, favoriteProjects.length)
        for (let project of result.data.projects) {
            favoriteProjects.push(project)
        }

    })


}