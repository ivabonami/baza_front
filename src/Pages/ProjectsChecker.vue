<template>
  <div>
    <div class="wrapper">
      <h2 class="heading2">Проекты, требующие проверки: </h2>

      <div class="projects" >
        <div class="project" v-for="project of projects">
          <project-card
              v-if="project"
              :project="project"
          />

          <div class="button">
            <button-black style=" height: 40px;" @buttonPressed="approveProject(project)" :type="'button'">
              <div class="button-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="approve" width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text">Опубликовать</span>
              </div>
            </button-black>

            <button-secondary style=" height: 40px;"  :type="'button'" @buttonPressed="onDisapproveProject(project)">
              <div class="button-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="approve" width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text">Удалить</span>
              </div>
            </button-secondary>
          </div>
        </div>
      </div>


      <Waypoint v-if="hasMore"
                @change="way => {
                  if (way.going === 'IN') {
                    onGetProjects(this.requestOptions)
                  }
              }">
        <button-black
            :type="'button'"
            @click="onGetProjects(this.requestOptions)"
            :style="'outline'">
          <div class="button-content">
            Еще
          </div>
        </button-black>

      </Waypoint>

      <empty-store
          @click="this.$router.push('/')"
          :show-button="false"
          :show-button-for-users="false"
          v-show="!loading && projects.length <= 0">
        <template #header>
          НЕТУ!!!
        </template>
        <template #text>
          ожидайте обновлений
        </template>
      </empty-store>

      <the-loader v-show="loading" />


    </div>


  </div>

</template>

<script>
import ProjectCard from "@/components/Layout/Project/ProjectCard.vue";
import emptyStore from "@/components/Blocks/EmptyStore.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {approveProject, disapproveProject, getProjects} from "@/API/projectsController.js";
import {projects} from "@/Stores/projectsStore.js";
import ButtonBlackOutline from "@/components/Buttons/ButtonBlackOutline.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue"
import {popup} from "@/js/controllers/popupController.js";

import {userStore} from "@/Stores/userStore.js";
import {addNotice} from "@/js/notifications.js";
import {Waypoint} from "vue-waypoint";
export default {
  name: "checkProjects.vue",
  emits: ['productAdded', 'productUpdated', 'reviewAdded',],
  data() {
    return {
      projects,
      loading: true,
      requestOptions: {
        limit: 16,
        offset: 0,
        "isReviewed": "false",
      },
      hasMore: true,
      approveProject,
      disapproveProject

    }
  },
  components: {
    emptyStore,
    ProjectCard,
    ButtonBlack,
    TheLoader,
    ButtonSecondary,
    Waypoint

  },
  beforeUnmount() {
    projects.splice(0, projects.length)
  },
  mounted() {


    if (userStore.role !== 'admin') {
      addNotice({name: 'У вас нет прав для просмотра этой страницы', type: 'danger'})
      this.$router.replace('/')
    } else {

    }
  },
  methods: {
    onDisapproveProject(project) {
      popup.show = true
      popup.project = project
      popup.component = 'DeleteProject'

    },
    onGetProjects (options) {
      getProjects(options).then(result => {

        if (result.projects.length < this.requestOptions.limit) {
          this.hasMore =  false
        } else {
          this.hasMore = true
        }

        for (const project of result.projects) {
          if( project.type ) {
            projects.push(project)
          }
        }
        this.requestOptions.offset = this.requestOptions.offset + this.requestOptions.limit
        this.loading = false
      })
    }

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
.button-content {
  height: 15px;
  align-items: center;
  gap: 5px;
  display: flex;
  span {
    font-size: 12px;
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
    box-sizing: border-box;
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