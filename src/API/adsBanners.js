import axios from "axios";
import {api} from "@/API/apiurl.js";
import {adsBanners} from "@/Stores/adsBannersStore.js";
import {addNotice} from "@/js/notifications.js";

export function getAdsBanners() {

    return axios.get(api.url + 'advBanners')
        .then(result => {
            for (const banner of result.data.banners) {
                adsBanners.push(banner)
            }
        })
        .catch(error => {
            addNotice({name: 'Не могу получить список платных баннеров', type: 'warning'})
        })
}

export function addAdsBanner(path, link, type) {

    return axios.post(api.url + 'advBanners', {path: path, link: link, type: type})
        .then(result => {
            adsBanners.push(result.data.banner)
        })
        .catch(error => {
            addNotice({name: 'Не могу добавить рекламный баннер', type: 'warning'})
        })
}

export function editAdsBanner(id, path, link, type) {

    return axios.put(api.url + 'advBanners', {id: id, path: path, link: link, type: type})
        .then(result => {
            adsBanners.find(item => item.id === id).type = result.data.banner.type
            adsBanners.find(item => item.id === id).link = result.data.banner.link
            adsBanners.find(item => item.id === id).path = result.data.banner.path
        })
        .catch(error => {
            addNotice({name: 'Не могу отредактировать рекламный баннер', type: 'warning'})
        })
}

export function removeAdsBanner(id) {

    return axios.delete(api.url + 'advBanners/' + id)
        .then(result => {
            try {
                adsBanners.splice(adsBanners.findIndex(item => item.id === id), 1)
            } catch (e) {  }
        })
        .catch(error => {
            addNotice({name: 'Не могу удалить рекламный баннер', type: 'warning'})
        })
}