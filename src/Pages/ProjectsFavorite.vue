<template>
  <div class="projects-wrapper" :class="{fadeAnimate: this.projectCardAnimate}" >
    <div class="projectsList" >
      <h3>Ваши любимые проекты</h3>

      <div class="projects">
        <div class="project" v-for="project of projects">
          <project-card

              v-if="loaded === true || projects.length > 0"
              ref='fadeAnimate'
              v-bind:project="project"
              v-bind:favorite="true"
              v-on:favoriteRemoved="(emit) => {
                          console.log(this.projects.indexOf(project))
                          removeFromList(this.projects.indexOf(project))

                        }"
              v-on:updated="(emit) => {

                this.$refs.currentSort.scrollIntoView({ behavior: 'smooth', block: 'start'})
                this.projects = this.projects.slice(this.projects.length, this.projects.length)
                this.getOffset = 0

                this.getProjects(this.activeSort, this.getOffset, this.getLimit)

               }"
          >

          </project-card>
        </div>
      </div>






    </div>








  </div>

</template>

<script>
import recommended from "../Blocks/ProductsCarousel.vue";
import projectCard from "../Blocks/ProjectCard.vue";
import { ref, defineComponent } from "vue";
import { Waypoint } from "vue-waypoint";
import vClickOutside from 'click-outside-vue3'
import AnimateHeight from 'vue-animate-height';

import 'vue-loading-overlay/dist/css/index.css';
import loader from "../Layouts/BaseLoader.vue";
import {store} from "../assets/js/services/categoriesService.js";
import config from "../assets/js/config.js";
import {useFetch} from "../assets/js/controllers/requestsControl.js";

export default {
  name: "FavoriteProjects.vue",
  components: {recommended, projectCard, Waypoint, loader, AnimateHeight},
  emits: ['updated', 'projectDeleted'],

  data () {
    return {

      projects: [],

    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  setup () {

  },

  mounted() {
    this.height = 1250
    this.getProjects(this.activeSort, this.getOffset, this.getLimit, false, false)
    this.loaded === true ? this.handleScroll() : ''
  },
  created() {
    this.isLoading = true
  },
  updated() {

    this.isLoading = false
  },



  methods: {

    removeFromList(index) {
      this.projects.splice(1, 1)
    },

    getProjects (sort, offset, limit) {

      useFetch(`user/project`, "GET")
          .then(result => {

            this.projects = result.projects
          })
    },

  }
}
</script>

<style scoped lang="scss">
.projects-wrapper {

  width: 100%;
  padding: 10px;


  h3 {
    width: 100%;
    margin-bottom: 10px;
  }
  .projects {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    .project {
      width: 24%;
    }
  }

}
@media screen and (max-width: 768px){

  .projects-wrapper {
    .projects {
      .project {
        width: 48%;
      }
    }

  }

}
</style>