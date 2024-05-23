import config from "./config.js";
import axios from "axios";
import {modalSetting} from "./modal.js";
import {refreshToken, signOut} from "./userService.js";


export function useFetch(path, method, requestBody) {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    if (method === "GET") {
        return axios.get(config.api.url + path, {headers}).then(response => response.data)
            .catch(error => {
                modalSetting.show = true
                modalSetting.type = 'error'
                modalSetting.headline = 'Ошибка'
                modalSetting.description = `Произошла техническая или какая-то другая ошибка. Пожалуйста, повторите действие позже и, по возможности,
            сообщите администратору о проблеме. Код ошибки: ${error}`
            })

    } else if (method === 'POST'){
        return axios.post(config.api.url + path, requestBody, {headers}).then(response => response.data)
            .catch(error => {
                modalSetting.show = true
                modalSetting.type = 'error'
                modalSetting.headline = 'Ошибка'

                error.response.status === 401 ? modalSetting.description = `Вы не авторизованы!` : modalSetting.description = `Произошла техническая или какая-то другая ошибка. Пожалуйста, повторите действие позже и, по возможности, 
            сообщите администратору о проблеме. Код ошибки: ${error}`
                error.response.data.message === 'This user already rated this project.' ? modalSetting.description = `Вы уже оставляли отзыв, возможно он еще не опубликован` : ''
            })
    }
    else if (method === 'PUT'){
        return axios.put(config.api.url + path, requestBody, {headers}).then(response => response.data)
            .catch(error => {

                console.log('err', )
                error.response.status === 401 ? refreshToken() : null
                modalSetting.show = true
                modalSetting.type = 'error'
                modalSetting.headline = 'Ошибка'
                modalSetting.description = `Произошла техническая или какая-то другая ошибка. Пожалуйста, повторите действие позже и, по возможности,
            сообщите администратору о проблеме. Код ошибки: ${error}`
            })
    }
    else if (method === 'DELETE'){
        return axios.delete(config.api.url + path, {
            headers: headers,
            data: {requestBody}
        }).then(response => response.data)
            .catch(error => {
                modalSetting.show = true
                modalSetting.type = 'error'
                modalSetting.headline = 'Ошибка'

                error.response.status === 401 ? modalSetting.description = `Вы не авторизованы!` : modalSetting.description = `Произошла техническая или какая-то другая ошибка. Пожалуйста, повторите действие позже и, по возможности, 
            сообщите администратору о проблеме. Код ошибки: ${error}`
            })
    }

}