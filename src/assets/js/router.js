import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../../views/HomeView.vue";
import GuaranteeView from "../../views/GuaranteeView.vue";
import AdvertisementView from "../../views/AdvertisementView.vue";
import AboutProjectView from "../../views/AboutProjectView.vue";
import ContactsView from "../../views/ContactsView.vue";
import SignInView from "../../views/SignInView.vue";
import AdminView from "../../views/admin/AdminView.vue";
import CatalogView from "../../views/sidebar/CatalogView.vue";
import MarketsView from "../../views/sidebar/MarketsView.vue";
import ExchangersView from "../../views/sidebar/ExchangersView.vue";
import ShopsPawView from "../../views/sidebar/ShopsPawView.vue";
import SellersView from "../../views/sidebar/SellersView.vue";
import ForumsView from "../../views/sidebar/ForumsView.vue";
import AdminPageView from "../../views/admin/AdminPageView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/about-project',
            name: 'About project',
            component: AboutProjectView
        },
        {
            path: '/advertisement',
            name: 'Advertisement',
            component: AdvertisementView
        },
        {
            path: '/guarantee',
            name: 'Guarantee',
            component: GuaranteeView
        },
        {
            path: '/contacts',
            name: 'Contacts',
            component: ContactsView
        },
        {
            path: '/sign-in',
            name: 'Sign in',
            component: AdminView
        },{
            path: '/admin',
            name: 'Admin',
            component: AdminPageView
        },

        {
            path: '/catalog',
            name: 'Catalog',
            component: CatalogView
        },
        {
            path: '/markets',
            name: 'Markets',
            component: MarketsView
        },
        {
            path: '/exchangers',
            name: 'Exchangers',
            component: ExchangersView
        },
        {
            path: '/shops-paw',
            name: 'Shops Paw',
            component: ShopsPawView
        },
        {
            path: '/sellers',
            name: 'Sellers',
            component: SellersView
        },
        {
            path: '/forums',
            name: 'Forums',
            component: ForumsView
        },

    ]
})

export {
    router
}
