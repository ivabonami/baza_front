import config from "../config.js";
import axios from "axios";
import {modalSetting} from "../modal.js";
import {userInfo} from "../../../Store/userInfo.js";

export async function useFetch(path, method, requestBody) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    if (method === "GET") {

        return axios.get(config.api.url + path, {headers}).then(response => response.data)
            .catch(error => {
                modalSetting.show = true
                modalSetting.type = 'error'
                modalSetting.headline = 'Ошибка'
                if (error.response.data.message === 'Invalid token')  {
                    modalSetting.description = 'Невалидный токен'

                }
            })

    } else if (method === 'POST'){
        return axios.post(config.api.url + path, requestBody, {headers}).then(response => response.data)
            .catch(error => {
                if ( error.response.data.message === "Invalid credentials" ) {
                    return error.response.data.message
                } else if ( error.response.data.message === 'User not found') {
                    return error.response.data.message
                } else if ( error.response.data.message === 'Username and password are required') {
                    return error.response.data.message
                } else if ( error.response.data.message === 'Username already exists') {
                    return error.response.data.message
                }
                else {
                    modalSetting.show = true
                    modalSetting.type = 'error'
                    modalSetting.headline = 'Ошибка'

                    modalSetting.description = error.response
                    error.response.data.message === 'This user already rated this project.' ? modalSetting.description = `Вы уже оставляли отзыв, возможно он еще не опубликован` : ''

                }
               })
    }
    else if (method === 'PUT'){
        return axios.put(config.api.url + path, requestBody, {headers}).then(response => response.data)
            .catch(error => {
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