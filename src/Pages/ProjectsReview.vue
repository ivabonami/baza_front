<template>
  <div>
    <div class="wrapper">
      <h3 v-if="projects.length < 0">Проекты, требующие проверки: </h3>

      <div class="projects" >
        <div class="project" v-for="project of projects">
          <project-card
              :project="project"
              @projectChangePayedStatus="emit => {
                payedModal.projectId = project.id
                payedModal.projectName = project.name
                payedModal.status = emit
                payedModal.show = true

              }"
              @deleteProject="emit => {
                deleteModal.projectId = project.id
                deleteModal.projectName = project.name
                deleteModal.show = true
              }"
              @favoriteChanged="emit => {

                notice.show = true
                notice.color = 'green'
                notice.text = {success: 'Успешно!'}

              }"
              @showLinksModal="emit => {
                linksModal.show = true
                linksModal.data = project.links

              }"
          >

          </project-card>
          <div class="button">
            <button-action
                @click="() => {
                  modal.show = true
                  modal.project = project

                 }"
            >
              <template #text>
                <span class="text">Опубликовать</span>
              </template>
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="approve" width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
            </button-action>
          </div>
        </div>
      </div>


      <empty-store
          @click="this.$router.push('/')"
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
          Добавить
        </template>
      </empty-store>

      <base-loader v-show="loading" />


    </div>

    <popup-action
        v-if="modal.show === true"
        @closeModal="modal.show = false"
        @actionConfirmed="() => {
              this.loadingButton = true
              approveProject(modal.project).then(result => {
                const project = this.projects.findIndex(item => item.id === modal.project.id)
                this.projects.splice(project, 1)
                this.loadingButton = false
                modal.show = false
              })

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

    <popup-project-links
        v-if="linksModal.show"
        :modal="linksModal"
        :data="linksModal.data"
        @closeModal="linksModal.show = false"
    />

    <popup-delete
        @click.stop
        :modal="deleteModal"
        @closeModal="deleteModal.show = false"
        @deleteConfirmed="() => {
          removeProject(deleteModal.projectId).then(() => {
            this.projects.splice(this.projects.findIndex(item => item.id === payedModal.projectId), 1)
          })

          deleteModal.show = false
        }"

    >
      <template #header>
        Удалить проект?
      </template>
      <template #text>
        Вы действительно хотите удалить проект <b>{{ deleteModal.projectName }}</b>
      </template>
      <template #buttonConfirm>
        Да, удалить
      </template>
      <template #buttonSecondary>
        Отменить
      </template>
    </popup-delete>

    <popup-action
        v-if="payedModal.show === true"
        @closeModal="payedModal.show = false"
        @actionConfirmed="() => {
          changePayedStatus(payedModal.projectId, payedModal.status)
          this.projects.find(item => item.id === payedModal.projectId).payed = !this.projects.find(item => item.id === payedModal.projectId).payed
          payedModal.show = false
        }"
        :modal="payedModal"
    >
      <template #header>
      <span v-if="payedModal.status">
        Выделить проект?
      </span>

        <span v-else>
        Снять выделение с проекта?
      </span>

      </template>
      <template #text>
            <span v-if="payedModal.status">
        Вы собираетесь выделить проект <b>{{ payedModal.projectName }}</b>, подтвердите действие.
      </span>

        <span v-else>
        Вы собираетесь снять выделение с проекта <b>{{ payedModal.projectName }}</b>, подтвердите действие.
      </span>
      </template>
      <template #buttonConfirm>
      <span v-if="payedModal.status">
        Выделить
      </span>

        <span v-else>
        Снять
      </span>
      </template>
      <template #buttonSecondary>
        Отменить
      </template>
    </popup-action>


    <notice v-if="notice.show" :notice="notice" :errors="notice.text" @closeNotice="notice.show = false" />
  </div>

</template>

<script>
import projectCard from "../Blocks/ProjectCard.vue";
import emptyStore from "../Blocks/EmptyStore.vue";
import baseLoader from "../Layouts/BaseLoader.vue";
import buttonAction from "../components/Buttons/ButtonAction.vue";
import {approveProject, changePayedStatus, getProjects, removeProject} from "../API/projects.js";
import popupAction from "../components/Popups/PopupAction.vue";
import {projectsStore} from "../Store/projectsStore.js";
import {apiUrl} from "../assets/js/config.js";
import loaderSmall from "../components/Loaders/LoaderSmall.vue";
import notice from "../components/Popups/Notice.vue";
import popupDelete from "../components/Popups/PopupDelete.vue";
import popupProjectLinks from "../components/Popups/PopupProjectLinks.vue";


export default {
  name: "checkProjects.vue",
  emits: ['productAdded', 'productUpdated', 'reviewAdded',],
  data() {
    return {
      removeProject,
      changePayedStatus,
      projects: {},
      loading: true,
      approveProject,
      projectsStore,
      loadingButton: false,
      modal: {
        show: false,
        project: null
      },
      notice: {
        show: false,
        color: null,
        text: {}
      },
      linksModal: {
        show: false,
        data: null,
      },
      deleteModal: {
        show: false,
        projectId: null,
        projectName: null
      },

      payedModal: {
        show: false,
        status: false,
        projectId: null,
        projectName: null,
      },
    }
  },
  components: {
    loaderSmall,
    projectCard,
    emptyStore,
    baseLoader,
    buttonAction,
    popupAction,
    notice,
    popupDelete,
    popupProjectLinks

  },
  mounted() {
    this.getProjects()
  },
  methods: {
    getProjects () {
      getProjects('?isReviewed=false').then(result => {
        this.projects = result.data.projects
        this.loading = false
      })
    }
    //   const myHeaders = new Headers();
    //   myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    //   myHeaders.append("Content-Type", "application/json");
    //
    //   fetch(apiUrl +"projects/?isReviewed=false", {
    //     method: "GET",
    //     headers: myHeaders,
    //   })
    //       .then((response) => response.json())
    //       .then((result) => {
    //         this.projects = result.projects
    //         this.loading = false
    //       })
    //       .catch((error) => error);
    // },


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
      margin-bottom: 20px;
      padding: 10px 10px 10px 10px;
      border: 2px solid transparent;
      border-radius: 20px;
      transition: .15s ease;
      background-color: #fff;
      box-sizing: border-box;

      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;

      .button {
        margin-top: 10px;

      }
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