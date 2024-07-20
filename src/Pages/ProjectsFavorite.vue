<template>
  <div class="projects-wrapper" >
    <div class="projectsList" >
      <h3>Ваши любимые проекты</h3>

      <empty-store
          :show-button="true"
          :show-button-for-users="false"
          @buttonPressed="this.$router.push('/')"
          v-if="favoriteProjects.length <= 0">
        <template #header>
          Вы еще не добавили проектов в избранное
        </template>
        <template #text>
          добавьте нужные проекты в избранное, что бы находить их быстрее
        </template>
        <template #buttonText>
          Посмотреть проекты
        </template>
      </empty-store>

      <div class="projects">
        <div class="project" v-for="project of favoriteProjects">
          <project-card
              :project="project"
              @favoriteChanged="emit => changeStatus(emit)"
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
import { Waypoint } from "vue-waypoint";
import loader from "../Layouts/BaseLoader.vue";
import emptyStore from "../Blocks/EmptyStore.vue";

import {favoriteProjects} from "../Store/favoriteProjects.js";
import {getFavoriteProjects} from "../API/projects.js";
import {projectsStore} from "../Store/projectsStore.js";

export default {
  name: "FavoriteProjects.vue",
  components: {
    recommended,
    projectCard,
    Waypoint,
    loader,
    emptyStore},
  emits: ['updated', 'projectDeleted'],

  data () {
    return {

      favoriteProjects

    }
  },

  watch: {
    favoriteProjects: function (newVal, oldVal) {

    }
  },

  mounted() {

    getFavoriteProjects()
  },
  created() {

  },




  methods: {
    changeStatus(projectId) {
      console.log(projectsStore.projects.find(item => item.id === projectId))
      projectsStore.projects.find(item => item.id === projectId).favorite = 0
    }


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
      box-sizing: border-box;
      margin-bottom: 20px;
      padding: 10px;
      border: 2px solid transparent;
      border-radius: 20px;
      transition: .15s ease;
      background-color: #fff;

      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;

      &.payed {
        background: linear-gradient(#fff, #fff 0) padding-box,
        linear-gradient( to bottom , #1254FF 70%, #CAA0FF) border-box;
      }

      &:hover {
        border-color: #191B2A;

        &.payed {
          border: 2px solid var(--Linear, #031e59);

        }

      }
    }
  }

}
@media screen and (max-width: 768px){

  .projects-wrapper {
    .projects {
      .project {
        width: 47%;
      }
    }

  }

}
</style>