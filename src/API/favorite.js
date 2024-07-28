import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {authHeader, userInfo} from "../Store/userInfo.js";
import {favoriteProjects} from "../Store/favoriteProjects.js";
import {projectsStore} from "../Store/projectsStore.js";

export function addFavorite(projectId) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    return axios.post(`${apiUrl}user/project/${projectId}`, {},{headers})
}

export function removeFavorite(projectId) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    projectsStore.projects.find(item => item.id === projectId) ? projectsStore.projects.find(item => item.id === projectId).favorite = 0 : null
    favoriteProjects.splice(favoriteProjects.findIndex(item => item.id === projectId), 1)

    return axios.delete(`${apiUrl}user/project/${projectId}`, {headers})
}
