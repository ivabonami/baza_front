import axios from "axios";
import {api} from "@/API/apiurl.js";
import {userStore} from "@/Stores/userStore.js";
import {productsStore} from "@/Stores/productsStore.js";
import {addNotice} from "@/js/notifications.js";


export function getProducts(options) {

    let link = `?`

    if (options) {
        for (let option in options) {
            link += `${option}=${options[option]}&`
        }
    }

    link = link.slice(0, -1)
    return axios.get(`${api.url}products${link}`).then(result => result).catch(error => error)

}

export async function addProduct(product) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    return axios.post(`${api.url}products`, product,{headers}).then(result => result).catch(error => error)

}

export async function updateProduct(product) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    return axios.put(`${api.url}products/${product.id}`, product,{headers})
        .then(result => result)
        .catch(error => error)


}

export async function deleteProduct(product) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    productsStore.products.splice(productsStore.products.findIndex(item => item.id === product.id), 1)
    return axios.delete(`${api.url}products/${product.id}`,{headers})
        .then(result => {
            addNotice({name: `Услуга ${product.name} удалена успешно`, type: 'success'})
        })
        .catch(error => {
            addNotice({name: `Произошла ошибка`, type: 'danger'})
        })


}