import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {userInfo} from "../Store/userInfo.js";
import {uploadImage} from "./image.js";
import {signOut} from "./user.js";


export function getProducts(options) {

    let link = `?`

    if (options) {
        for (let option in options) {
            link += `${option}=${options[option]}&`
        }
    }

    link = link.slice(0, -1)
    return axios.get(`${apiUrl}/products${link}`).then(result => result).catch(error => error)

}

export async function addProduct(product) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    let image = await uploadImage(product.file)

    if (image === 'Invalid token') {
        refreshToken
        return {error: 'Невалидный токен, пожалуйста залогиньтесь заново.'}
    } else {
        return await axios.post(`${apiUrl}/products`, {
            name: product.name,
            description: product.description,
            avatarFilePath: image.data.filePath,
            projectId: product.projectId
        },{headers}).then(result => result).catch(error => error)
    }


}

export async function updateProduct(product) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    let image = product.file ? await (await uploadImage(product.file)).data.filePath : product.avatarFilePath


    if (image === 'Invalid token') {
        refreshToken
        return {error: 'Невалидный токен, пожалуйста залогиньтесь заново.'}
    } else {
        return await axios.put(`${apiUrl}/products/${product.id}`, {
            name: product.name,
            description: product.description,
            avatarFilePath: image,
            projectId: product.projectId
        },{headers}).then(result => result).catch(error => error)
    }


}

export async function deleteProduct(product) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    return await axios.delete(`${apiUrl}/products/${product.id}`,{headers}).then(result => result).catch(error => error)


}