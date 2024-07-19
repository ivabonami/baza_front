import { reactive } from 'vue'
import {getCategories} from "../API/categories.js";

export const categoriesStore = reactive({
    categories: null,
    exchanger: null,
})

getCategories()