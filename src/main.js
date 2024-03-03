import './assets/styles/main.css'
import { createApp } from "vue";
import App from './App.vue'

//router
import { router } from "./assets/js/router.js";

createApp(App).use(router).mount('#app')
