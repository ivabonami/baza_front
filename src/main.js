import './assets/styles/main.css'
import {createApp, watch} from "vue";
import App from './App.vue'

import { router } from "./assets/js/router.js";
import VScrollLock from 'v-scroll-lock'
createApp(App)
    .use(router, VScrollLock)
    .mount('#app')
