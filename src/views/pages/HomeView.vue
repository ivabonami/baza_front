<template>
  <div class="projects-wrapper">
    <all-projects-with-sort>

    </all-projects-with-sort>
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
import ModalWindowBackdrop from "../../components/page components/ModalWindowBackdrop.vue";
import allProjectsWithSort from "./AllProjectsWithSort.vue";


export default {
  name: "HomeView.vue",
  components: { recommended, allProjectsWithSort, ModalWindowBackdrop, projectCard },
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