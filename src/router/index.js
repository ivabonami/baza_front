import { createRouter, createWebHistory } from 'vue-router'
import ProjectsList from "@/Pages/ProjectsList.vue";
import DEBUG from "@/components/DEBUG.vue";
import CategoriesEditor from "@/Pages/CategoriesEditor.vue";
import ProjectsChecker from "@/Pages/ProjectsChecker.vue";
import ReviewsChecker from "@/Pages/ReviewsChecker.vue";
import PayedProjectsController from "@/Pages/PayedProjectsController.vue";
import ProjectsFavorite from "@/Pages/ProjectsFavorite.vue";
import ProjectDetailed from "@/Pages/ProjectDetailed.vue";
import Guarantee from "@/Pages/static/Guarantee.vue";
import Advertisement from "@/Pages/static/Advertisement.vue";
import Contacts from "@/Pages/static/Contacts.vue";
import ErrorPage from "@/Pages/static/ErrorPage.vue";
import About from "@/Pages/static/About.vue";
import ProjectAdd from "@/components/Layout/Project/ProjectAdd.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectsList
    },{
      path: '/debug',
      name: 'debug',
      component: DEBUG
    },{
      path: '/categories-editor',
      name: 'CategoriesEditor',
      component: CategoriesEditor
    },{
      path: '/projects-checker',
      name: 'ProjectsChecker',
      component: ProjectsChecker
    },{
      path: '/favorite',
      name: 'Favorite',

      component: ProjectsFavorite
    },{
      path: '/reviews-checker',
      name: 'ReviewsChecker',
      component: ReviewsChecker
    },{
      path: '/payed-editor',
      name: 'PayedEditor',
      component: PayedProjectsController
    },{
      path: '/project/:id',
      name: 'ProjectDetailed',
      component: ProjectDetailed
    },{
      path: '/guarantee',
      name: 'guarantee',
      component: Guarantee
    },{
      path: '/advertisement',
      name: 'advertisement',
      component: Advertisement
    },{
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },{
      path: '/about',
      name: 'about',
      component: About
    },{
      path: '/:pathMatch(.*)*',
      name: '404',
      component: ErrorPage
    },{
      path: '/add-project',
      name: 'AddProject',
      component: ProjectAdd
    }
  ]
})

export default router
