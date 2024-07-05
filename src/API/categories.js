import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {categoriesStore} from "../Store/categories.js";
import {userInfo} from "../Store/userInfo.js";
import {store} from "../assets/js/services/categoriesService.js";

export function getCategories() {
    return axios.get(`${apiUrl}/categories`)
}


export function editCategory(id, name) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    categoriesStore.categories.find(item => item.id === id).name = name
    return axios.put(`${apiUrl}/categories/${id}`, {name: name}, {headers})
}

export function addCategory(name, front) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    return axios.post(`${apiUrl}/categories/`, {name: name, allowShopfront: front}, {headers}).then(result => getCategories())
}

export function deleteCategory(id) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    categoriesStore.categories.splice(categoriesStore.categories.findIndex(item => item.id === id), 1)

    return axios.delete(`${apiUrl}/categories/${id}`, {headers})
}