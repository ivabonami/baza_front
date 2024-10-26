<template >
  <div class="project-wrapper">

    {{ compiledInfo }}

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

        <project-info-description :data="compiledInfo.project" />
      </div>


    </div>






<!--    <div class="project-products" v-if="projectProductsStore.length > 0">-->
<!--      <div class="products-navigation">-->
<!--        <button-black-->
<!--            v-if="userStore.username === project.userData.username || userStore.role === 'admin'"-->
<!--            :type="'button'"-->
<!--            style="width: auto"-->
<!--            @click="() => {-->
<!--              popup.show = true-->
<!--              popup.component = 'addProduct'-->
<!--              popup.projectId = project.id-->
<!--            }"-->
<!--            :style="'outline'">-->
<!--          <div class="button-content" style="align-items: center; display:flex; gap: 10px;">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.96642 0.518847C8.12694 -0.172949 9.58202 -0.172949 10.7426 0.518847L15.5989 3.41371C16.6887 4.06339 17.3545 5.22611 17.3545 6.47992V12.5201C17.3545 13.7739 16.6887 14.9366 15.5989 15.5863L10.7425 18.4812C9.58202 19.1729 8.12694 19.1729 6.96642 18.4812L2.11013 15.5863C1.02024 14.9366 0.354492 13.7739 0.354492 12.5201V6.47992C0.354492 5.22611 1.02024 4.06339 2.11013 3.41371L6.96642 0.518847ZM10.0701 1.61092C9.3229 1.16551 8.38607 1.16551 7.63888 1.61092L2.78259 4.50578C2.52127 4.66156 2.29783 4.86313 2.12031 5.09645L8.67352 9.00287C8.7848 9.06922 8.92433 9.06922 9.03562 9.00287L15.5887 5.09653C15.4112 4.86315 15.1877 4.66156 14.9264 4.50578L10.0701 1.61092ZM1.65225 6.47992C1.65225 6.4243 1.65429 6.36898 1.65831 6.314L8.00106 10.0949C8.06742 10.1345 8.13587 10.169 8.20595 10.1986V17.6332C8.00947 17.5776 7.8187 17.4963 7.63888 17.3891L2.78259 14.4942C2.08088 14.0759 1.65225 13.3273 1.65225 12.5201V6.47992ZM9.50371 17.6331C9.69994 17.5775 9.89049 17.4961 10.0701 17.3891L14.9264 14.4942C15.6281 14.0759 16.0567 13.3273 16.0567 12.5201V6.47992C16.0567 6.42433 16.0547 6.36903 16.0507 6.3141L9.70808 10.0949C9.64189 10.1344 9.57359 10.1689 9.50371 10.1984V17.6331Z" fill="white"/>-->
<!--            </svg>-->
<!--            Добавить-->
<!--          </div>-->
<!--        </button-black>-->
<!--        <p>Витрина проекта</p>-->
<!--      </div>-->
<!--      <div class="product" v-for="item of projectProductsStore">-->
<!--        <ProductCard :item="item" :isEditable="userStore.role === 'admin'"  @click="() => {-->
<!--          popup.show = true-->
<!--          popup.component = 'ProductInfo'-->
<!--          popup.product = item-->
<!--          popup.editProductCard = userStore.username === project.userData.username || userStore.role === 'admin'-->
<!--        }"/>-->

<!--      </div>-->

<!--      <Waypoint v-if="hasMore"-->
<!--                @change="way => {-->
<!--                  if (way.going === 'IN') {-->
<!--                    onGetProducts()-->
<!--                  }-->
<!--              }">-->
<!--        <button-black-->
<!--            :type="'button'"-->
<!--            @click="onGetProducts()"-->
<!--            :style="'outline'">-->
<!--          <div class="button-content">-->
<!--            Еще-->
<!--          </div>-->
<!--        </button-black>-->

<!--      </Waypoint>-->
<!--    </div>-->
<!--    <div class="project-reviews">-->
<!--      <ProjectReviews :id="project.id" :project="project"/>-->
<!--    </div>-->


  </div>
</template>
<script setup>
import {getProject} from "@/API/projectsController.js";
import {addNotice} from "@/js/notifications.js";
import ProjectStatsItem from "@/components/Layout/Project/ProjectStatsItem.vue";
import iconStar from "@/assets/icons/icon-star.svg";
import iconView from "@/assets/icons/icon-views.svg";
import iconReview from "@/assets/icons/icon-review.svg";
import {getProducts} from "@/API/productsController.js";
import {onMounted, reactive, watch} from "vue";
import {useRoute} from "vue-router";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ProjectBanner from "@/components/Layout/Project/ProjectParts/ProjectBanner.vue";
import ProjectAvatar from "@/components/Layout/Project/ProjectParts/ProjectAvatar.vue";
import ProjectInfoDescription from "@/components/Layout/Project/ProjectParts/ProjectInfoDescription.vue";

const props = defineProps({
  id: reactive(null)
})

const compiledInfo = reactive({
  project: null,
  products: null,
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

const normalizeDescription = (text) => {

}

const onGetProject = () => {
  loading.loaded = false
  getProject(route.path.replace('/project/', ''))
      .then(result => {
        compiledInfo.project = result.data.project

        setStats(result.data.project)

        console.log(compiledInfo.project.description.length)
        loading.loaded = true
        getProducts()
      } )
      .catch(error =>  addNotice({name: 'Не удалось получить данные по проекту', type: 'danger'}))
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