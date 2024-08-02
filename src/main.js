// import './assets/styles/main.css'
import './assets/styles/styles.css'

import {createApp, watch} from "vue";
import App from './App.vue'

import { router } from "./Router/router.js";

createApp(App)
    .use(router)
    .mount('#app')
