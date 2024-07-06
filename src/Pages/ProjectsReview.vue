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
        <button-action
            @click="() => {
              modal.show = true
              modal.project = project

             }"
        >
          <template #text>
            Опубликовать
          </template>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="approve" width="58" height="58" viewBox="0 0 58 58" fill="none">
              <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </button-action>
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

  <popup-action
      v-if="modal.show === true"
      @closeModal="modal.show = false"
      @actionConfirmed="() => {
              approveProject(modal.project)
              this.projects.splice(this.projects.find(item => item.id === modal.project.id), 1)
      }"
      :modal="modal"
  >
    <template #header>
      Опубликовать?
    </template>
    <template #text>
      Вы собиратесь опубликовать проект <b>{{ modal.project.name }}</b>
    </template>
    <template #buttonConfirm>
      Опубликовать
    </template>
    <template #buttonSecondary>
      Закрыть
    </template>
  </popup-action>

</template>

<script>
import projectCard from "../Blocks/ProjectCard.vue";
import emptyStore from "../Blocks/EmptyStore.vue";
import baseLoader from "../Layouts/BaseLoader.vue";
import buttonAction from "../components/Buttons/ButtonAction.vue";
import {approveProject} from "../API/projects.js";
import popupAction from "../components/Popups/PopupAction.vue";


export default {
  name: "checkProjects.vue",
  data() {
    return {
      projects: {},
      loading: true,
      approveProject,
      modal: {
        show: false,
        project: null
      }
    }
  },
  components: {
    projectCard,
    emptyStore,
    baseLoader,
    buttonAction,
    popupAction

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

.approve {

  width: 15px;
  height: 25px;

  path {
    stroke: #A8A8A8;
    stroke-width: 3px;
  }
}
</style>