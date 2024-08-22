// import './assets/styles/main.css'
import './assets/styles/styles.css'
import { initYandexMetrika } from 'yandex-metrika-vue3';
import {createApp, watch} from "vue";
import App from './App.vue'

import { router } from "./Router/router.js";

createApp(App)
    .use(router, initYandexMetrika, {
        id: 97936104,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
    })
    .mount('#app')
