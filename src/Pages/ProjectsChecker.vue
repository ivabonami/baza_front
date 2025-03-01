<template>
  <div>
    <div class="wrapper">
      <h2 class="heading2">Проекты, требующие проверки: </h2>

      <div class="projects" >
        <div class="project" v-for="project of pageOptions.project" :key="project" v-show="project.avatarFilePath">
            <div class="project-card" >
                <project-card
                        :project="project"
                />
                <AdminMenu @click.prevent

                           :advanced-menu="true"
                           :placeholder-menu="false"
                           :project="project"
                           :placeholderId="null"
                />

                <div class="button">
                    <button-black style=" height: 40px;" @buttonPressed="onApproveProject(project)" :type="'button'">
                        <div class="button-content">
                            <svg xmlns="http://www.w3.org/2000/svg" class="approve" width="58" height="58" viewBox="0 0 58 58" fill="none">
                                <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span class="text">Опубликовать</span>
                        </div>
                    </button-black>

                    <button-secondary style=" height: 40px;"  :type="'button'" @buttonPressed="onDeleteProject(project)">
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
      </div>


      <Waypoint v-if="pageOptions.hasMore"
                @change="way => {
                  if (way.going === 'IN') {
                    onGetProjects(requestOptions)
                  }
              }">
        <button-black
            :type="'button'"
            @click="onGetProjects(requestOptions)"
            :style="'outline'">
          <div class="button-content">
            Еще
          </div>
        </button-black>

      </Waypoint>

      <empty-store
          :show-button="false"
          :show-button-for-users="false"
          v-if="!pageOptions.loading && pageOptions.project.length <= 0">
        <template #header>
          НЕТУ!!!
        </template>
        <template #text>
          ожидайте обновлений
        </template>
      </empty-store>

      <the-loader v-show="pageOptions.loading" />


    </div>


  </div>

</template>
<script setup>
import ProjectCard from "@/components/Layout/Project/ProjectCard.vue";
import EmptyStore from "@/components/Blocks/EmptyStore.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {approveProject, deleteProject, getProjects} from "@/API/projectsController.js";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue"
import {userStore} from "@/Stores/userStore.js";

import {Waypoint} from "vue-waypoint";
import AdminMenu from "@/components/Menus/AdminMenu.vue";
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {addNotice} from "@/js/notifications.js";

const emits = defineEmits(['productAdded', 'productUpdated', 'reviewAdded'])

const requestOptions = {
    limit: 16,
    offset: 0,
    "isReviewed": "false",
},
    router = useRouter()

const pageOptions = reactive({
    project: [],
    loading: false,
    hasMore: true
})


const onGetProjects = (options) => {
    getProjects(options).then(result => {

        if(result.projects.length < requestOptions.limit) {
            pageOptions.hasMore = false
        }

        for (const project of result.projects) {
            if (project.avatarFilePath) {
                pageOptions.project.push(project)
            }
        }

        options.offset += options.limit

    })
}

function onApproveProject(project) {
    approveProject(project).then(result => {
        pageOptions.project.splice(pageOptions.project.findIndex(item => item.id === project.id), 1)
    })
}

function onDeleteProject(project) {
    deleteProject(project).then(result => {
        pageOptions.project.splice(pageOptions.project.findIndex(item => item.id === project.id), 1)
    })
}

onMounted(() => {
    if (userStore.role !== 'admin') {
        router.push('/')
        addNotice({name: "У вас нет прав на просмотр этой страницы", type: 'danger'})
    }

})



</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .projects {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    position: relative;

    .project {
      width: 24%;
      position: relative;

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
        width: 100%;
        margin-bottom: 30px;
        .project-wrapper {
          margin-bottom: 0;
        }
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