import {userInfo} from "../Store/userInfo.js";
import {uploadImage} from "./image.js";
import {signOut} from "./user.js";
import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {projectsStore} from "../Store/projectsStore.js";

export async function addProject(project) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    let projectToAdd = {
        name: project.name,
        description: project.description,
        projectId: project.projectId,
        reserve: project.reserve || null,
        minValueToExchange: project.minValueToExchange || null,
        categoryIds: project.categoryIds,
        links: project.links
    }

    if (project.reserve || project.minValueToExchange ) {
        projectToAdd.type = 'exchanger'
        projectToAdd.exchangeRate = 20
    }


    let avatar = await uploadImage(project.avatar)
    let banner = project.banner ? await uploadImage(project.banner) : null


    if (avatar === 'Invalid token' || banner === 'Invalid token') {
        refreshToken

        return {error: 'Невалидный токен, пожалуйста залогиньтесь заново.'}

    } else {
        projectToAdd.avatarFilePath = avatar.data.filePath
        project.banner ? projectToAdd.bannerFilePath = banner.data.filePath : null


        return await axios.post(`${apiUrl}/projects`, projectToAdd,{headers}).then(result => result).catch(error => error)
    }

}

export async function editProject(project, projectId) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    let projectToAdd = {
        name: project.name,
        description: project.description,
        projectId: project.projectId,
        reserve: project.reserve || null,
        minValueToExchange: project.minValueToExchange || null,
        categoryIds: project.categoryIds,
        links: project.links
    }

    if (project.reserve || project.minValueToExchange ) {
        projectToAdd.type = 'exchanger'
        projectToAdd.exchangeRate = 20
    }



    project.avatar ? projectToAdd.avatarFilePath = (await uploadImage(project.avatar)).data.filePath : projectToAdd.avatarFilePath = project.avatarFilePath
    project.banner ? projectToAdd.bannerFilePath = (await uploadImage(project.banner)).data.filePath : projectToAdd.bannerFilePath = project.bannerFilePath || null

    return await axios.put(`${apiUrl}/projects/${projectId}`, projectToAdd,{headers}).then(result => {

        let projectToReplace = projectsStore.projects.findIndex(item => item.id = projectId)

        result.data.updatedProject.userData = project.userData
        projectsStore.projects[projectToReplace] = result.data.updatedProject


    }).catch(error => error)

}