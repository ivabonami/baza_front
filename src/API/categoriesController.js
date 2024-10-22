import axios from "axios";
import {api} from "@/API/apiurl.js";
import {addNotice} from "@/js/notifications.js";
import {categories} from "@/Stores/categories.js";
import router from "@/router/index.js";

import marketplaceIcon from '@/assets/icons/menu-icons/marketplace.svg'
import forumsIcon from '@/assets/icons/menu-icons/forums.svg'
import exchangerIcon from '@/assets/icons/menu-icons/exchangers.svg'
import narcoIcon from '@/assets/icons/menu-icons/narco.svg'
import jobIcon from '@/assets/icons/menu-icons/job.svg'
import servicesIcon from '@/assets/icons/menu-icons/services.svg'
import designIcon from '@/assets/icons/menu-icons/design.svg'
import otherIcon from '@/assets/icons/menu-icons/other.svg'
import {userStore} from "@/Stores/userStore.js";
import {placeholders} from "@/API/placeholders.js";

export function getCategories() {
    axios.get(api.url + 'categories').then(result => {

        let allCategories = result.data.categories

        for (const category of allCategories){
            if (category.name.toLowerCase().includes('маркетплейс')) {
                category.icon = marketplaceIcon
            } else if (category.name.toLowerCase().includes('форум')) {
                category.icon = forumsIcon
            } else if (category.name.toLowerCase().includes('обменник')) {
                category.icon = exchangerIcon
                categories.exchangerCategory.push(category)
            } else if (category.name.toLowerCase().includes('магазин')) {
                category.icon = narcoIcon
            } else if (category.name.toLowerCase().includes('услуги')) {
                category.icon = servicesIcon
            } else if (category.name.toLowerCase().includes('дизайн')) {
                category.icon = designIcon
            } else {
                category.icon = otherIcon
            }
        }

        categories.allCategories = allCategories
        placeholders.categories = allCategories

    }).catch(error => {
        addNotice({name: 'Категории не были получены', type: 'danger'})
    })
}

export function changeCategory(id) {
    router.replace({ query: {categoryIds: id} })
}

export function editCategory(id, name) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    categories.allCategories.find(item => item.id === id).name = name
    return axios.put(`${api.url}categories/${id}`, {name: name}, {headers})
}

export function addCategory(name, front) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    return axios.post(`${api.url}categories/`, {name: name, allowShopfront: front}, {headers})
        .then(() => {
            getCategories()
            addNotice({name: 'Категория успешно добавлена', type: 'success'})
        })
        .catch(() => {
            addNotice({name: 'Не удалось добавить категорию', type: 'danger'})
        })
}

export function deleteCategory(id) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    categories.allCategories.splice(categories.allCategories.findIndex(item => item.id === id), 1)

    return axios.delete(`${api.url}categories/${id}`, {headers})
}