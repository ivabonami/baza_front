import {userInfo} from "../Store/userInfo.js";
import {uploadImage} from "./image.js";
import {signOut} from "./user.js";
import axios from "axios";
import {apiUrl} from "../assets/js/config.js";

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

    let avatar = await uploadImage(project.avatar)
    let banner = project.banner ? await uploadImage(project.banner) : null


    if (avatar === 'Invalid token' || banner === 'Invalid token') {
        signOut()

        console.log(avatar)
        console.log(banner)
        return {error: 'Невалидный токен, пожалуйста залогиньтесь заново.'}

    } else {
        projectToAdd.avatarFilePath = avatar.data.filePath
        project.banner ? projectToAdd.bannerFilePath = banner.data.filePath : null


        console.log(projectToAdd)

        return await axios.post(`${apiUrl}/projects`, projectToAdd,{headers}).then(result => result).catch(error => error)
    }

}