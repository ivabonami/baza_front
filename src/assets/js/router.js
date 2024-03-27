import {createRouter, createWebHistory} from "vue-router";

import GuaranteeView from "../../components/pages/Guarantee.vue";
import AdvertisementView from "../../components/pages/Advertisement.vue";
import AboutProjectView from "../../components/pages/About.vue";
import ContactsView from "../../components/pages/Contacts.vue";
import ProjectsView from "../../components/pages/ProjectDetailed.vue";
import ServicesCard from "../../components/TemplateParts/Cards/ServicesCard.vue";
import addProject from "../../components/Controllers/ProjectControllers/ProjectController_Add.vue";
import addService from "../../components/Controllers/ProductControllers/ProductController_Add.vue";
import addCategory from "../../components/Controllers/CategoryControllers/CategoryController.vue";
import allProjectsWithSort from "../../components/pages/Projects.vue";
import checkProjects from "../../components/pages/CheckProjects.vue";

const router = createRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
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
            path: '/projects-list/:id',
            name: 'New projects view',
            component: allProjectsWithSort
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
                    path: 'services',
                    component: ServicesCard
                },{
                    path: 'add-service',
                    component: addService
                },
            ]
        },
        {
            path: '/add-project',
            component: addProject
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
