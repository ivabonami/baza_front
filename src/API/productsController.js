import axios from "axios";

export function getProducts() {
    return axios(api.url + 'products')
}