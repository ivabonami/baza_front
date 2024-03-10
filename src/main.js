import './assets/styles/main.css'
import {createApp, watch} from "vue";
import App from './App.vue'
import loader from "vue3-ui-preloader";
import {createStore}  from 'vuex'

//router
import { router } from "./assets/js/router.js";

const store = createStore({
    state () {
        return {
            count: 0
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

createApp(App)
    .use(router, store )
    .component('loader', loader)
    .mount('#app')
