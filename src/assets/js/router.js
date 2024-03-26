import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../../views/pages/HomeView.vue";
import GuaranteeView from "../../views/pages/GuaranteeView.vue";
import AdvertisementView from "../../views/pages/AdvertisementView.vue";
import AboutProjectView from "../../views/pages/AboutProjectView.vue";
import ContactsView from "../../views/pages/ContactsView.vue";

import ProjectsView from "../../views/project/ProjectsView.vue";
import ServicesCard from "../../views/project/project_parts/ServicesCard.vue";
import ProjectDescription from "../../views/project/ProjectDescription.vue";
import addProject from "../../views/addItems/AddProject.vue";
import addService from "../../views/addItems/AddService.vue";
import addCategory from "../../views/addItems/addCategory.vue";
import allProjectsWithSort from "../../views/pages/AllProjectsWithSort.vue";
import checkProjects from "../../views/project/checkProjects.vue";

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
                    path: 'description',
                    component: ProjectDescription
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
