import {reactive} from "vue";

export const adminMenu = reactive([
    {
        name: 'Редактор категорий',
        icon: null,
        link: '/categories-editor',
        color: 'black'
    },{
        name: 'Проверить проекты',
        icon: null,
        link: '/projects-checker',
        color: 'black'
    },{
        name: 'Проверить отзывы',
        icon: null,
        link: '/reviews-checker',
        color: 'black'
    },{
        name: 'Редактор платных мест',
        icon: null,
        link: '/payed-editor',
        color: 'black'
    },
])