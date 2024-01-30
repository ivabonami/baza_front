import './assets/styles/main.css'
import { createApp } from "vue";
import App from './App.vue'

//router
import { router } from "./assets/js/router.js";
router.afterEach((to, from) => {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

createApp(App).use(router).mount('#app')

