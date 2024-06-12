import axios from "axios";
import {apiUrl} from "../assets/js/config.js";

export function getCategories() {
    return axios.get(`${apiUrl}/categories`)
}