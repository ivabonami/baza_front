import './assets/styles/main.css'
import {createApp, watch} from "vue";
import App from './App.vue'

import { router } from "./assets/js/router.js";

createApp(App)
    .use(router)
    .mount('#app')
