import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../../views/pages/HomeView.vue";
import GuaranteeView from "../../views/pages/GuaranteeView.vue";
import AdvertisementView from "../../views/pages/AdvertisementView.vue";
import AboutProjectView from "../../views/pages/AboutProjectView.vue";
import ContactsView from "../../views/pages/ContactsView.vue";
import MarketsView from "../../views/sidebar/MarketsView.vue";
import ExchangersView from "../../views/sidebar/ExchangersView.vue";
import ShopsPawView from "../../views/sidebar/ShopsPawView.vue";
import SellersView from "../../views/sidebar/SellersView.vue";
import ForumsView from "../../views/sidebar/ForumsView.vue";

import pageView from "../../views/PageView.vue";

import ProjectsView from "../../views/project/ProjectsView.vue";

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
            component: AboutProjectView,
            meta: {
                transition: 'slide-fade',
                mode: 'in-out'
            }
        },
        {
            path: '/advertisement',
            name: 'Advertisement',
            component: AdvertisementView,
            meta: {
                transition: 'slide-fade',
                mode: 'in-out'
            }
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
          path: '/project/:id',
          component: ProjectsView,
            meta: {
                transition: 's1',
                mode: 'in-out'
            },

            children: [
                {
                    path: 'description'

                },{
                    path: 'services'
                },{
                    path: 'reviews'
                },
            ]
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
