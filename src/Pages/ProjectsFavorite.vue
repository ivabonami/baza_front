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
              @favoriteChanged="emit => removeFromList(emit)"
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

    favoriteProjects.length <= 0 ? getFavoriteProjects() : null
  },
  created() {

  },




  methods: {



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
        width: 47%;
      }
    }

  }

}
</style>