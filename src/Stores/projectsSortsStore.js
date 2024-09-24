import {reactive} from "vue";

export const projectsSortsStore =  reactive([{
    name: 'Высокий рейтинг',
    slug: 'highestRating'
},{
    name: 'Низкий рейтинг',
    slug: 'lowestRating'
}])