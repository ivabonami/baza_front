<template>
  <div class="wrapper">
    <project-card v-for="project of projects"
                  v-bind:project="project"


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
    },


  }
}
</script>

<style scoped lang="scss">

</style>