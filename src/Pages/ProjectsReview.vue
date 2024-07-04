<template>
  <div class="wrapper">
    <h3 v-if="projects.length < 0">Проекты, требующие проверки: </h3>

    <div class="projects" >
      <div class="project" v-for="project of projects">
        <project-card
            v-bind:project="project"
            v-on:projectUpdated="() => {
                    this.getProjects()
                    this.getProjects()
                  }"
        >

        </project-card>
      </div>
    </div>


    <empty-store
        :show-button="true"
        :show-button-for-users="false"
        v-show="!loading && projects.length <= 0">
      <template #header>
        В этом проекте, пока что, отстутствуют товары и услуги
      </template>
      <template #text>
        ожидайте обновлений
      </template>
      <template #buttonText>
        Добавить услугу
      </template>
    </empty-store>

    <base-loader v-show="loading" />


  </div>

</template>

<script>
import projectCard from "../Blocks/ProjectCard.vue";
import emptyStore from "../Blocks/EmptyStore.vue";
import baseLoader from "../Layouts/BaseLoader.vue";


export default {
  name: "checkProjects.vue",
  data() {
    return {
      projects: {},
      loading: true
    }
  },
  components: {
    projectCard,
    emptyStore,
    baseLoader
  },
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
            this.loading = false
          })
          .catch((error) => {console.error(error)});
    },


  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .projects {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;

    .project {
      width: 24%;
    }
  }

}
@media screen and (max-width: 1024px){
  .wrapper {
    padding: 10px;
    .projects {
      .project {
        width: 32%;
      }
    }

  }
}

@media screen and (max-width: 500px){
  .wrapper {
    .projects {
      .project {
        width: 48%;
      }
    }

  }
}
</style>