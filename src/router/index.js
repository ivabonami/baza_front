import { createRouter, createWebHistory } from 'vue-router'
import ProjectsList from "@/Pages/ProjectsList.vue";
import DEBUG from "@/components/DEBUG.vue";
import CategoriesEditor from "@/Pages/CategoriesEditor.vue";
import ProjectsChecker from "@/Pages/ProjectsChecker.vue";
import ReviewsChecker from "@/Pages/ReviewsChecker.vue";
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
      path: '/reviews-checker',
      name: 'ReviewsChecker',
      component: ReviewsChecker
    },{
      path: '/payed-editor',
      name: 'PayedEditor',

    }
  ]
})

export default router
