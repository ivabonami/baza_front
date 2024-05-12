<template>
  <div class="row">
    <h2>Результаты для запроса: {{this.$route.query.q}}</h2>
    <div class="projects" v-for="project of projects">

      <project-card
          v-bind:project="project">

      </project-card>
    </div>
  </div>
</template>

<script>
import ProjectCard from "../TemplateParts/Cards/ProjectCard.vue";
import {useFetch} from "../../assets/js/fetchRequest.js";

export default {
  name: "SearchPage.vue",

  data() {
    return {
      projects: [],
      query: this.$route.query.q
    }
  },
  components: {ProjectCard},
  methods: {
    searchProject (query) {
      useFetch(`projects?search=${query}`, 'GET')
          .then(result => {
            if (result.success === true) {
              this.projects = result.projects
            }
          })

    }
  },
  mounted() {

    this.searchProject(this.query)

  },
}
</script>

<style scoped lang="scss">
.row {
  .projects {
    display: flex;
    width: 100%;
  }
}
</style>