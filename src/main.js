// import './assets/styles/main.css'
import './assets/styles/styles.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'


import {createApp, watch} from "vue";
import App from './App.vue'

import { router } from "./Router/router.js";
import VScrollLock from 'v-scroll-lock'

createApp(App)
    .use(router, VScrollLock, PrimeVue)
    .mount('#app')
