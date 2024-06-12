import {reactive} from "vue";

export const staticPages = reactive(
    [{
            name: "Гарант",
            path: '/guarantee'
    },{
        name: "Реклама",
        path: '/advertisement'
    },{
        name: "Контакты",
        path: '/contacts'
    }]
)