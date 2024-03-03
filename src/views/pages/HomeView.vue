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
                  v-bind:payed="project.payed"
                  v-bind:projectRating="project.ratingAvg"
                  v-bind:avatar="project.avatarFilePath"
                  >


    </project-card>


  </div>

</template>

<script>
import recommended from "../../components/page components/Recommended.vue";
import projectCard from "../project/ProjectCard.vue";
import ProjectsSortFilter from "../../components/page components/ProjectsSortFilter.vue";
import ModalWindowBackdrop from "../../components/page components/ModalWindowBackdrop.vue";

export default {
  name: "HomeView.vue",
  components: { recommended, ProjectsSortFilter, ModalWindowBackdrop, projectCard },
  data() {
    return {
      projects: {},
    }
  },
  mounted() {
    this.getAllProjects()
  },
  methods: {
    getAllProjects() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch("http://62.113.96.171:3000/projects", {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            this.projects = result.projects;
          })
          .catch((error) => {console.error(error)});
    }
  }

}
</script>

<style scoped lang="scss">


</style>