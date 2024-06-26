import {createRouter, createWebHistory} from "vue-router";

import GuaranteeView from "../Pages/Static/Guarantee.vue";
import AdvertisementView from "../Pages/Static/Advertisement.vue";
import AboutProjectView from "../Pages/Static/About.vue";
import ContactsView from "../Pages/Static/Contacts.vue";
import ProjectsView from "../Pages/ProjectDetailed.vue";
import ServicesCard from "../Blocks/ProductCard.vue";
import addProject from "../Blocks/Controllers/ProjectAdd.vue";
import addCategory from "../Blocks/Controllers/CategoryController.vue";
import allProjectsWithSort from "../Pages/ProjectsCollection.vue";
import checkProjects from "../Pages/ProjectsReview.vue";
import favoriteProjects from "../Pages/ProjectsFavorite.vue";
import errorPage from "../Pages/Static/ErrorPage.vue";
import searchPage from "../Pages/ProjectsSearch.vue";
import project_Edit from "../Blocks/Controllers/ProjectEdit.vue";

const router = createRouter({

    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: allProjectsWithSort,
        },
        {
            path: '/about-project',
            name: 'About project',
            component: AboutProjectView,
        },
        {
            path: '/search',
            name: 'search',
            component: searchPage,
        },
        {
            path: '/advertisement',
            name: 'Advertisement',
            component: AdvertisementView,
        },
        {
            path: '/guarantee',
            name: 'Guarantee',
            component: GuaranteeView,
        },
        {
            path: '/contacts',
            name: 'Contacts',
            component: ContactsView
        },
        {
            path: "/:pathMatch(.*)*",
            name: 'ErrorView',
            component: errorPage
        },
        {
          path: '/project/:id',
          component: ProjectsView,
        },
        {
            path: '/add-project',
            component: addProject
        },
        {
            path: '/edit-project',
            name: 'ProjectEdit',
            component: project_Edit,
            props: true
        },

        {
            path: '/favorite',
            name: 'Favorite',
            component: favoriteProjects
        },
        {
          path: '/category-control',
          component: addCategory
        },
        {
            path: '/check-projects',
            component: checkProjects
        }

    ]
})

export {
    router
}
