import { reactive } from 'vue'
import {getCategories} from "../API/categories.js";

export const categoriesStore = reactive({
    categories: null,
    exchanger: null,
})

getCategories().then(result => {
    categoriesStore.categories = result.data.categories
    categoriesStore.exchanger = result.data.categories.find(item => item.name === "Обменники")
})