import './assets/styles/main.css'
import { createApp } from "vue";
import App from './App.vue'
import loader from "vue3-ui-preloader";

//router
import { router } from "./assets/js/router.js";

createApp(App)
    .use(router)
    .component('loader', loader)
    .mount('#app')

