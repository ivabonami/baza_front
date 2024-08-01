// import './assets/styles/main.css'
import Vue3TouchEvents from "vue3-touch-events";
import './assets/styles/styles.css'

import {createApp, watch} from "vue";
import App from './App.vue'

import { router } from "./Router/router.js";

createApp(App)
    .use(router, Vue3TouchEvents)
    .mount('#app')
