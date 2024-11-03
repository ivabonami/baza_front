import axios from "axios";
import {api} from "@/API/apiurl.js";
import {adsBanners} from "@/Stores/adsBannersStore.js";
import {addNotice} from "@/js/notifications.js";
import {userStore} from "@/Stores/userStore.js";

export function getAdsBanners() {

    return axios.get(api.url + 'advBanners')
        .then(result => {
            adsBanners.large = result.data.banners.large
            adsBanners.small = result.data.banners.small
        })
        .catch(error => {
            addNotice({name: 'Не могу получить список платных баннеров', type: 'warning'})
        })
}

export function addAdsBanner(path, link, type) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    return axios.post(api.url + 'advBanner', {path: path, link: link, type: type}, {headers})
        .then(result => {
            if (type === 'large') {
                adsBanners.large.push(result.data.banner)
            } else {
                adsBanners.small.push(result.data.banner)
            }
            addNotice({name: 'Баннер успешно добавлен', type: 'success'})
        })
        .catch(error => {
            addNotice({name: 'Не могу добавить рекламный баннер', type: 'warning'})
        })
}

export function editAdsBanner(id, path, link, type, oldType) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };


    return axios.put(api.url + 'advBanner/' + id, {path: path, link: link, type: type}, {headers})
        .then(result => {

            if (type !== oldType) {
                try {
                    const banner = adsBanners[oldType].find(item => item.id === id)
                    adsBanners[oldType].splice(adsBanners[oldType].findIndex(item => item.id === id), 1)
                    adsBanners[type].push(banner)
                } catch (e) {
                    addNotice({name: "Не получилось реактивно поменять баннеры, перезагрузите страницу"})
                }
            }


            addNotice({name: 'Баннер успешно изменен', type: 'success'})
        })
        .catch(error => {
            addNotice({name: 'Не могу отредактировать рекламный баннер', type: 'warning'})
        })
}

export function removeAdsBanner(id, type) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    return axios.delete(api.url + 'advBanner/' + id, {headers})
        .then(result => {
            try {
                adsBanners[type].splice(adsBanners[type].findIndex(item => item.id === id), 1)
            } catch (e) {
                addNotice({name: 'Не могу реактивно удалить баннер, перезагрузите страницу', type: 'warning'})
            }
            addNotice({name: 'Баннер удален', type: 'success'})
        })
        .catch(error => {
            addNotice({name: 'Не могу удалить рекламный баннер', type: 'danger'})
        })
}