<template>
  <div class="wrapper">
    <h3 v-if="projects.length < 0">Проекты, требующие проверки: </h3>
    <project-card v-for="project of projects"

                  v-bind:project="project"
                  v-on:projectUpdated="() => {
                    this.getProjects()
                    this.getProjects()
                  }"

    >


    </project-card>

    <div class="no-projects" v-if="projects.length >= 0">

      <h3>Нет непроверенных проектов</h3>
      <img src="../assets/images/cat%20sleep.png" alt="">
    </div>
  </div>

</template>

<script>
import projectCard from "../Blocks/ProjectCard.vue";
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
.no-projects {
  margin-top: 10px;
  display: flex;
  gap: 1%;
  flex-wrap: wrap;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  h3 {
    width: 100%;
  }

  img {
    width: 20%;
    display: inline-block;
  }
  span {

    flex-basis: 100%;
  }

  span {


  }
}
</style>