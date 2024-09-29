import {reactive} from "vue";
import iconCategory from '@/assets/icons/icon-category-manager.svg'
import iconCheck from '@/assets/icons/icon-check.svg'
import iconCheckMessage from '@/assets/icons/icon-check-message.svg'
import iconDollar from '@/assets/icons/icon-dollar.svg'



export const adminMenu = reactive([
    {
        name: 'Редактор категорий',
        icon: iconCategory,
        link: '/categories-editor',
        color: 'black'
    },{
        name: 'Проверить проекты',
        icon: iconCheck,
        link: '/projects-checker',
        color: 'black'
    },{
        name: 'Проверить отзывы',
        icon: iconCheckMessage,
        link: '/reviews-checker',
        color: 'black'
    },{
        name: 'Редактор платных мест',
        icon: iconDollar,
        link: '/payed-editor',
        color: 'black'
    },
])