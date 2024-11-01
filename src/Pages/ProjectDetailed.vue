<template >
  <div class="project-wrapper">
    <the-loader v-if="!loading.loaded" />
    <div class="project" v-if="loading.loaded">
      <project-banner v-if="compiledInfo.project.bannerFilePath" :banner="compiledInfo.project.bannerFilePath" />

      <div class="project-info">


        <div class="project-info-stats">
          <project-avatar v-if="compiledInfo.project.avatarFilePath"
                          @favorite-changed="emit => compiledInfo.project.favorite = emit"
                          :data="{
                            favorite: compiledInfo.project.favorite,
                            name: compiledInfo.project.name,
                            id: compiledInfo.project.id,
                            avatar: compiledInfo.project.avatarFilePath
                          }" />

          <div class="project-info-stats_stats" v-if="compiledInfo.stats">
            <ProjectStatsItem v-for="stat of compiledInfo.stats"
                              v-show="stat.data"
                              :key="stat.name"
                              :data="stat"/>
          </div>
        </div>

        <project-info-description :data="compiledInfo.project" :username="compiledInfo.project.userData.username" />
      </div>


    </div>


    <div class="project-products" v-if="compiledInfo.project">
      <project-products-list :project-id="compiledInfo.project.id" :is-editable="userStore.role === 'admin' || compiledInfo.project.userData.username === userStore.username"/>
    </div>

    <div class="project-reviews" v-if="compiledInfo.project">
      <project-reviews :project-id="compiledInfo.project.id"
                       :reviews-count="compiledInfo.project.reviewsCount"
                       @review-count-changed="compiledInfo.project.reviewsCount += -1 "/>
    </div>



  </div>
</template>
<script setup>
import {getProject} from "@/API/projectsController.js";
import {addNotice} from "@/js/notifications.js";
import ProjectStatsItem from "@/components/Layout/Project/ProjectStatsItem.vue";
import iconStar from "@/assets/icons/icon-star.svg";
import iconView from "@/assets/icons/icon-views.svg";
import iconReview from "@/assets/icons/icon-review.svg";
import {onMounted, reactive, watch} from "vue";
import {useRoute} from "vue-router";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ProjectBanner from "@/components/Layout/Project/ProjectParts/ProjectBanner.vue";
import ProjectAvatar from "@/components/Layout/Project/ProjectParts/ProjectAvatar.vue";
import ProjectInfoDescription from "@/components/Layout/Project/ProjectParts/ProjectInfoDescription.vue";
import ProjectProductsList from "@/components/Layout/Project/ProjectParts/ProjectProductsList.vue";
import ProjectReviews from "@/components/Layout/Project/ProjectParts/ProjectReviews.vue";
import {userStore} from "@/Stores/userStore.js";


const props = defineProps({
  id: reactive(null)
})

const compiledInfo = reactive({
  project: null,
  reviews: null,
  stats: {
    viewCount: {
      icon: iconView,
      data: null
    },
    reviewsCount: {
      icon: iconReview,
      data: null
    },
    ratingAvg: {
      icon: iconStar,
      data: null
    }
  }
})
const loading = reactive({
  loaded: false
})
const route = useRoute()

const setStats = (project) => {
  if (project.viewCount) {
    compiledInfo.stats.viewCount.data = project.viewCount
  } else {
    compiledInfo.stats.viewCount.data = null
  }

  if (project.reviewsCount) {
    compiledInfo.stats.reviewsCount.data = project.reviewsCount
  } else {
    compiledInfo.stats.reviewsCount.data = null
  }

  if (project.ratingAvg) {
    compiledInfo.stats.ratingAvg.data = project.ratingAvg
  } else {
    compiledInfo.stats.ratingAvg.data = null
  }
}


const onGetProject = () => {
  loading.loaded = false
  getProject(route.path.replace('/project/', ''))
      .then(result => {
        compiledInfo.project = result.data.project
        setStats(result.data.project)
        loading.loaded = true
      } )
      .catch(() =>  addNotice({name: 'Не удалось получить данные по проекту', type: 'danger'}))
}

onMounted(() => onGetProject())
watch(props, () => onGetProject())


</script>

<style scoped lang="scss">
.more-toggle {
  cursor: pointer;
  display: block;
  margin-top: 5px;
  transition: .3s ease;
  color: #7c7c7c;
  border-bottom: 1px solid rgba(124, 124, 124, 0.38);
  width: fit-content;
  &:hover {
    color: #191B2A;
  }

  &:hover {
    color: #5D599F;
  }
}
.project {
  width: 100%;

  .project-products {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 30px;
    margin-bottom: 20px;
    .products-navigation {
      width: 100%;
      border-radius: 20px;
      background: #FFF;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      gap: 10px;
      padding: 10px;
      align-items: center;
      box-sizing: border-box;
      height: 70px;

      p {
        width: fit-content;
        display: block;
        white-space: nowrap;
        color: #B3B4C9;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
    .product {
      width: 19%;
    }
  }

  .project-info {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    position: relative;
    align-items: start;


    .project-info-stats, .project-info-description {
      border-radius: 20px;
      background: #FFF;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
      padding: 20px;
      box-sizing: border-box;
      color: #191B2A;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      height: 240px;
      display: block;
      line-height: 154.183%; /* 21.586px */

      h4 {
        color: #B3B4C9;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 10px;
        margin-bottom: 5px;
      }

    }
    .project-info-stats {
      width: 17%;
      justify-content: center;
      flex-wrap: wrap;
      display: flex;
      padding: 5px;



      img {
        border-radius: 18px;
        width: 100%;
        aspect-ratio: 1 / 1;

      }


    }
    .project-info-description {
      width: 85%;


    }
  }
}
.links {
  width: 100%;
}
.project-info-stats_stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff;
  width: 100%;
  padding: 3px 8px;
  border-radius: 20px;

}

@media screen and (max-width: 992px){
  .project {
    .project-info {

      .project-info-description {
        width: 70%;
      }
      .project-info-stats {
        width: 30%;

        .project-info-stats_stats {
          gap: 15px;
        }
      }
    }
  }
}

@media screen and (max-width: 500px){
  .project {
    .project-products {
      .product {
        width: 47%;
        box-sizing: border-box;
      }
    }
    .project-info {
      flex-wrap: wrap;

      .project-info-stats, .project-info-description {
        width: 100%;
        height: auto;

      }
      .project-info-stats {
        width: 100%;
        margin: 0 auto  ;
        img {
          width: 100%;
        }
      }
    }
  }

}
</style>