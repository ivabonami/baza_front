<template>

  <div class="wrapper">

    <recommended></recommended>
  </div>

  <div class="projects-wrapper">
    <projects-sort-filter>

    </projects-sort-filter>

    <project-card v-for="project of projects"
                  v-bind:projectId="project.id"
                  v-bind:projectName="project.name"
                  v-bind:projectDescription="project.description"
                  v-bind:projectCreateDate="project.createdAt"
                  v-bind:projectViews="project.viewCount"
                  v-bind:paid="project.paid">


    </project-card>

    <div class="empty" v-if="projects.length === 0">
      Категория пуста
    </div>


  </div>
</template>

<script>
import recommended from "../../components/page components/Recommended.vue";
import projectsSortFilter from "../../components/page components/ProjectsSortFilter.vue";
import projectCard from "../project/ProjectCard.vue";

export default {
  name: "AllProjectsWithSort.vue",
  components: {recommended, projectsSortFilter, projectCard},

  data () {
    return {
      category: {},
      projects: {}
    }
  },
  mounted() {
    this.getCategoryList()
  },

  methods: {
    getCategoryList() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch("http://62.113.96.171:3000/projects", {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            this.category = parseInt(this.$route.path.replace('/projects-list/', ''))
            this.projects = result.projects.filter( project => project.categories[0].id === this.category);

          })
          .catch((error) => {console.error(error)});
    },
  }
}
</script>

<style scoped>

</style>