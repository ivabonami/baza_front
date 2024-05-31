import { reactive } from 'vue'

export const highlight = reactive({
    id: null
})

import {useFetch} from "./fetchRequest.js";
import {modalSetting} from "./modal.js";


export const editProduct = reactive({
    product: {
        name: '',
        image: '',
        description: '',
        id: ''
    }
})