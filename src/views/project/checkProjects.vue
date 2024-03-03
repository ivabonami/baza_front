<template>
  <div class="wrapper">
    <project-card v-for="project of projects"
                  v-bind:projectId="project.id"
                  v-bind:projectName="project.name"
                  v-bind:projectDescription="project.description"
                  v-bind:projectCreateDate="project.createdAt"
                  v-bind:projectViews="project.viewCount"
                  v-bind:payed="project.payed"
                  v-bind:projectRating="project.ratingAvg"
                  v-bind:avatar="project.avatarFilePath"
                  v-bind:reviewed="false"
                  v-bind:descriptionType="'textApprove'"

    >


    </project-card>
  </div>

</template>

<script>
import projectCard from "./ProjectCard.vue";
export default {
  name: "checkProjects.vue",
  data() {
    return {
      projects: {}
    }
  },
  components: {projectCard},
  mounted() {
    this.getProjects()
  },
  methods: {
    getProjects () {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      myHeaders.append("Content-Type", "application/json");

      fetch("http://62.113.96.171:3000/projects/?isReviewed=false", {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            this.projects = result.projects
          })
          .catch((error) => {console.error(error)});
    }
  }
}
</script>

<style scoped lang="scss">

</style>