import {reactive} from "vue";
import guarantee from '/src/assets/icons/icon-shield.svg'
import chart from '/src/assets/icons/icon-chart.svg'
import contacts from '/src/assets/icons/icon-contacts.svg'
import hearth from '/src/assets/icons/icon-hearth.svg'
import plus from '/src/assets/icons/icon-plus.svg'

export const staticPages = reactive(
    [{
            name: "Гарант",
            path: '/guarantee',
        icon: guarantee,
        needAuth: false
    },{
        name: "Реклама",
        path: '/advertisement',
        icon: chart,
        needAuth: false
    },{
        name: "Контакты",
        path: '/contacts',
        icon: contacts,
        needAuth: false
    },{
        name: "Избранное",
        path: '/favorite',
        icon: hearth,
        needAuth: true
    },{
        name: "Разместить",
        path: '/add-project',
        icon: plus,
        needAuth: false
    }]
)