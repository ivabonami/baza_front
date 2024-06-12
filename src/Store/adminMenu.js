import {reactive} from "vue";
import iconList from './../assets/icons/icon-list.svg'
import iconPlus from './../assets/icons/icon-plus.svg'
import iconLeave from './../assets/icons/icon-leave.svg'
import iconQuestion from './../assets/icons/icon-question.svg'
import iconHearth from './../assets/icons/icon-hearth.svg'

export const adminMenu = reactive(
    [{
        name: "Менеджер категорий",
        path: '/category-control',
        icon: iconList,
        auth: true
    },{
        name: "Проверить проекты",
        path: '/check-projects',
        icon: iconPlus,
        auth: true
    },{
        name: "Проверить отзывы",
        path: '/check-testimonials',
        icon: iconQuestion,
        auth: true
    }]
)

export const userMenu = reactive(
    [{
        name: "Любимые",
        path: '/favorite',
        icon: iconHearth,
        auth: true
    },{
        name: "Добавить проект",
        path: '/add-project',
        icon: iconPlus,
        auth: false
    }]
)