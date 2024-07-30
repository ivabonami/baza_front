<template>
  <div class="projects-wrapper" >
    <div class="projectsList" >
      <h3>Ваши любимые проекты</h3>

      <empty-store
          :show-button="true"
          :show-button-for-users="false"
          @buttonPressed="this.$router.push('/')"
          v-if="favoriteProjects.length <= 0">
        <template #header>
          Вы еще не добавили проектов в избранное
        </template>
        <template #text>
          добавьте нужные проекты в избранное, что бы находить их быстрее
        </template>
        <template #buttonText>
          Посмотреть проекты
        </template>
      </empty-store>

      <div class="projects">
        <div class="project" v-for="project of favoriteProjects">
          <project-card
              :project="project"
              :favoritePage="true"
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
              @favoriteChanged="emit => changeFavoriteStatus(project.id, emit)"
              @showLinksModal="emit => {
                linksModal.show = true
                linksModal.data = project.links

              }"
          >

          </project-card>

        </div>
      </div>

    </div>

<!--    <popup-project-links-->
<!--        v-if="linksModal.show"-->
<!--        :modal="linksModal"-->
<!--        :data="linksModal.data"-->
<!--        @closeModal="linksModal.show = false"-->
<!--    />-->

    <popup-delete
        @click.stop
        :modal="deleteModal"
        @closeModal="deleteModal.show = false"
        @deleteConfirmed="() => {
          favoriteProjects.splice(favoriteProjects.findIndex(item => item.id === deleteModal.projectId), 1)
          removeProject(deleteModal.projectId)
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

          let payed = favoriteProjects.find(item => item.id === payedModal.projectId).payed
          favoriteProjects.find(item => item.id === payedModal.projectId).payed = !favoriteProjects.find(item => item.id === payedModal.projectId).payed
          changePayedStatus(payedModal.projectId, payedModal.status)
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

  </div>

</template>

<script>
import recommended from "../Blocks/ProductsCarousel.vue";
import projectCard from "../Blocks/ProjectCard.vue";
import { Waypoint } from "vue-waypoint";
import loader from "../Layouts/BaseLoader.vue";
import emptyStore from "../Blocks/EmptyStore.vue";

import {favoriteProjects} from "../Store/favoriteProjects.js";
import {changePayedStatus, getFavoriteProjects, removeProject} from "../API/projects.js";
import {projectsStore} from "../Store/projectsStore.js";
import popupDelete from "../components/Popups/PopupDelete.vue";
import popupAction from "../components/Popups/PopupAction.vue";

export default {
  name: "FavoriteProjects.vue",
  components: {
    recommended,
    projectCard,
    Waypoint,
    loader,
    popupAction,
    popupDelete,

    emptyStore},
  emits: ['updated', 'projectDeleted'],

  data () {
    return {
      deleteModal: {
        show: false,
        projectId: null,
        projectName: null
      },
      changePayedStatus,
      removeProject,
      payedModal: {
        show: false,
        status: false,
        projectId: null,
        projectName: null,
      },
      favoriteProjects

    }
  },

  watch: {
    favoriteProjects: function (newVal, oldVal) {

    }
  },

  mounted() {

    getFavoriteProjects()
  },
  created() {

  },




  methods: {
    changeStatus(projectId) {
      projectsStore.projects.find(item => item.id === projectId).favorite = 0
    }


  }
}
</script>

<style scoped lang="scss">
.projects-wrapper {

  width: 100%;
  padding-top: 30px;


  h3 {
    width: 100%;
    margin-bottom: 10px;
  }
  .projects {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;

    .project {
      width: 24%;
      box-sizing: border-box;
      margin-bottom: 20px;
      padding: 10px;
      border: 2px solid transparent;
      border-radius: 20px;
      transition: .15s ease;
      background-color: #fff;

      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;

      &.payed {
        background: linear-gradient(#fff, #fff 0) padding-box,
        linear-gradient( to bottom , #1254FF 70%, #CAA0FF) border-box;
      }

      &:hover {
        border-color: #191B2A;

        &.payed {
          border: 2px solid var(--Linear, #031e59);

        }

      }
    }
  }

}
@media screen and (max-width: 768px){

  .projects-wrapper {
    .projects {
      .project {
        width: 47%;
      }
    }

  }

}
</style>