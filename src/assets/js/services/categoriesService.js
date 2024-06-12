
import {useFetch} from "../controllers/requestsControl.js";

import { reactive } from 'vue'

export const store = reactive({
    categories: null,
    exchanger: null,
})



useFetch('categories', "GET")
    .then(result => {
        store.categories = result.categories

        for (let category of result.categories) {
            if (category.name === 'Обменники') {
                store.exchanger = category.id
            }
        }
    })