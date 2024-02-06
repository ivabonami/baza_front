import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../../views/pages/HomeView.vue";
import GuaranteeView from "../../views/pages/GuaranteeView.vue";
import AdvertisementView from "../../views/pages/AdvertisementView.vue";
import AboutProjectView from "../../views/pages/AboutProjectView.vue";
import ContactsView from "../../views/pages/ContactsView.vue";
import SignInView from "../../views/pages/SignInView.vue";
import CatalogView from "../../views/sidebar/CatalogView.vue";
import MarketsView from "../../views/sidebar/MarketsView.vue";
import ExchangersView from "../../views/sidebar/ExchangersView.vue";
import ShopsPawView from "../../views/sidebar/ShopsPawView.vue";
import SellersView from "../../views/sidebar/SellersView.vue";
import ForumsView from "../../views/sidebar/ForumsView.vue";

import pageView from "../../views/PageView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/page',
            name: 'Page',
            component: pageView,
            children: [
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
            ]
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
