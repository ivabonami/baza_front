<template >
  <div class="project" v-if="project">
    <div class="project-banner" v-if="project.bannerFilePath">
      <img :src="api.url + project.bannerFilePath" alt="">
    </div>
    <div class="project-info">
      <div class="favorite-wrapper" v-if="userStore.token" >
        <button class="favorite"
                :class="{'in-favorite': project.favorite === 1}"
                @click="onFavorite(project.id, project.name)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.6188 14.7186C20.5594 16.0029 15.9 19.8467 13.4766 21.8154C12.6141 22.5186 11.3813 22.5186 10.5188 21.8154C8.09531 19.8467 3.44063 16.0029 2.37656 14.7186C0.754688 12.7639 0 10.9029 0 8.87793C0 6.8998 0.675 5.08105 1.90313 3.7498C3.15 2.40449 4.85156 1.65918 6.70313 1.65918C8.09063 1.65918 9.35625 2.0998 10.4719 2.9623C11.0531 3.41699 11.5688 3.95137 11.9953 4.55605C12.4266 3.95605 12.9375 3.41699 13.5188 2.9623C14.6344 2.09512 15.9047 1.65918 17.2922 1.65918C19.1484 1.65918 20.85 2.40449 22.0922 3.7498C23.3156 5.08105 23.9953 6.89512 23.9953 8.87793C24 10.9029 23.2453 12.7639 21.6188 14.7186Z" fill="#D9D6E6"/>
          </svg>
        </button>
      </div>

      <div class="project-info-stats">
        <img :src="api.url + project.avatarFilePath" alt="">
        <div class="project-info-stats_stats" v-if="stats">
          <ProjectStatsItem v-for="stat of stats"
                            v-show="stat.data"
                            :key="stat"
                            :data="stat"/>
        </div>
      </div>
      <div class="project-info-description">

        <div class="project-info-stats_name">
          {{ project.name }}
        </div>
        <div class="project-info-description_text">
          <p>
            {{ project.description }}
          </p>
        </div>
        <div class="project-info-description_links">
          <div>
            <project-link-item :data="link"
                               v-for="(link, index) of project.links"
                               :key="link"
                               @click.stop
            >
            </project-link-item>
          </div>
        </div>

        <div class="exchanger_stats">
          <div class="exchanger_stat min-value-to-exchange" v-if="project.minValueToExchange">

            <div class="stat-ex">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z" stroke="#191B2A" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.minValueToExchange }}
            </div>
            <div class="desc-ex">
              мин. обмен
            </div>
          </div>
          <div class="exchanger_stat reserve" v-if="project.reserve">
            <div class="stat-ex">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                <path d="M7.05 2.11111C7.05 2.72476 5.69566 3.22222 4.025 3.22222C2.35434 3.22222 1 2.72476 1 2.11111M7.05 2.11111C7.05 1.49746 5.69566 1 4.025 1C2.35434 1 1 1.49746 1 2.11111M7.05 2.11111V4.58731C6.37817 4.7911 5.95 5.09941 5.95 5.44444M1 2.11111V8.77778C1 9.39143 2.35434 9.88889 4.025 9.88889C4.7563 9.88889 5.42698 9.79357 5.95 9.63492V5.44444M1 4.33333C1 4.94698 2.35434 5.44444 4.025 5.44444C4.7563 5.44444 5.42698 5.34913 5.95 5.19047M1 6.55556C1 7.16921 2.35434 7.66667 4.025 7.66667C4.7563 7.66667 5.42698 7.57135 5.95 7.41269M12 5.44444C12 6.05809 10.6457 6.55556 8.975 6.55556C7.30434 6.55556 5.95 6.05809 5.95 5.44444M12 5.44444C12 4.83079 10.6457 4.33333 8.975 4.33333C7.30434 4.33333 5.95 4.83079 5.95 5.44444M12 5.44444V9.88889C12 10.5025 10.6457 11 8.975 11C7.30434 11 5.95 10.5025 5.95 9.88889V5.44444M12 7.66667C12 8.28032 10.6457 8.77778 8.975 8.77778C7.30434 8.77778 5.95 8.28032 5.95 7.66667" stroke="#191B2A" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.reserve }}
            </div>
            <div class="desc-ex">
              резерв
            </div>
          </div>

          <div class="menu-item" style="margin-left: auto " v-if="userStore.username === project.userData.username || userStore.role === 'admin'">
            <router-link :to="this.$route.path + '/edit'">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1.27237 12.5486C1.30565 12.2491 1.32229 12.0994 1.3676 11.9594C1.4078 11.8352 1.4646 11.7171 1.53646 11.6081C1.61745 11.4853 1.72399 11.3787 1.93707 11.1656L11.5027 1.60005C12.3027 0.799984 13.5999 0.799985 14.4 1.60005C15.2 2.40011 15.2 3.69727 14.4 4.49734L4.83436 14.0629C4.62127 14.276 4.51473 14.3826 4.39191 14.4635C4.28295 14.5354 4.16477 14.5922 4.04059 14.6324C3.90062 14.6777 3.75087 14.6943 3.45137 14.7276L1 15L1.27237 12.5486Z" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              редактировать
            </router-link>
          </div>
        </div>


      </div>
    </div>

    <div class="project-products" v-if="productsStore.products.length > 0">
      <div class="products-navigation">
        <button-black
            v-if="userStore.username === project.userData.username || userStore.role === 'admin'"
            :type="'button'"
            style="width: auto"
            @click="() => {
              popup.show = true
              popup.component = 'addProduct'
              popup.projectId = project.id
            }"
            :style="'outline'">
          <div class="button-content" style="align-items: center; display:flex; gap: 10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.96642 0.518847C8.12694 -0.172949 9.58202 -0.172949 10.7426 0.518847L15.5989 3.41371C16.6887 4.06339 17.3545 5.22611 17.3545 6.47992V12.5201C17.3545 13.7739 16.6887 14.9366 15.5989 15.5863L10.7425 18.4812C9.58202 19.1729 8.12694 19.1729 6.96642 18.4812L2.11013 15.5863C1.02024 14.9366 0.354492 13.7739 0.354492 12.5201V6.47992C0.354492 5.22611 1.02024 4.06339 2.11013 3.41371L6.96642 0.518847ZM10.0701 1.61092C9.3229 1.16551 8.38607 1.16551 7.63888 1.61092L2.78259 4.50578C2.52127 4.66156 2.29783 4.86313 2.12031 5.09645L8.67352 9.00287C8.7848 9.06922 8.92433 9.06922 9.03562 9.00287L15.5887 5.09653C15.4112 4.86315 15.1877 4.66156 14.9264 4.50578L10.0701 1.61092ZM1.65225 6.47992C1.65225 6.4243 1.65429 6.36898 1.65831 6.314L8.00106 10.0949C8.06742 10.1345 8.13587 10.169 8.20595 10.1986V17.6332C8.00947 17.5776 7.8187 17.4963 7.63888 17.3891L2.78259 14.4942C2.08088 14.0759 1.65225 13.3273 1.65225 12.5201V6.47992ZM9.50371 17.6331C9.69994 17.5775 9.89049 17.4961 10.0701 17.3891L14.9264 14.4942C15.6281 14.0759 16.0567 13.3273 16.0567 12.5201V6.47992C16.0567 6.42433 16.0547 6.36903 16.0507 6.3141L9.70808 10.0949C9.64189 10.1344 9.57359 10.1689 9.50371 10.1984V17.6331Z" fill="white"/>
            </svg>
            Добавить
          </div>
        </button-black>
        <p>Витрина проекта</p>
      </div>
      <div class="product" v-for="item of productsStore.products">
        <ProductCard :item="item" :isEditable="userStore.role === 'admin'"  @click="() => {
          popup.show = true
          popup.component = 'ProductInfo'
          popup.product = item
          popup.editProductCard = userStore.username === project.userData.username || userStore.role === 'admin'
        }"/>

      </div>

      <Waypoint v-if="hasMore"
                @change="way => {
                  if (way.going === 'IN') {
                    onGetProducts()
                  }
              }">
        <button-black
            :type="'button'"
            @click="onGetProducts()"
            :style="'outline'">
          <div class="button-content">
            Еще
          </div>
        </button-black>

      </Waypoint>
    </div>
    <div class="project-reviews">
      <ProjectReviews :id="project.id" :project="project"/>
    </div>


  </div>
</template>
<script>
import {getProject} from "@/API/projectsController.js";
import {addNotice} from "@/js/notifications.js";
import {api} from "@/API/apiurl.js";
import ProjectStatsItem from "@/components/Layout/Project/ProjectStatsItem.vue";
import ProjectLinkItem from "@/components/Layout/Project/ProjectLinkItem.vue";
import ProjectReviews from "@/components/Layout/Project/ProjectReviews.vue";
import iconStar from "@/assets/icons/icon-star.svg";
import iconView from "@/assets/icons/icon-views.svg";
import iconReview from "@/assets/icons/icon-review.svg";
import iconMoney from "@/assets/icons/icon-money.svg";
import {addFavorite, removeFavorite} from "@/API/favoriteController.js";
import {userStore} from "@/Stores/userStore.js";
import ProductCard from "@/components/Layout/Product/ProductCard.vue";
import {getProducts} from "@/API/productsController.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {Waypoint} from "vue-waypoint";
import {popup} from "@/js/controllers/popupController.js";
import {productsStore} from "@/Stores/productsStore.js";


export default {
  name: "ProjectDetailed.vue",
  components: {
    ProjectReviews,
    ProjectStatsItem,
    ProjectLinkItem,
    ProductCard,
    ButtonBlack,
    Waypoint
  },

  data() {
    return {
      project: null,
      api,
      stats: {},
      productsStore,
      userStore,
      products: [],
      requestOptions: {
        projectId: null,
        limit: 10,
        offset: 0
      },
      popup,
      hasMore: true
    }
  },
  methods: {
    onFavorite(id, name) {


      this.project.favorite === 0 ? this.project.favorite = 1 : this.project.favorite = 0

      if (this.project.favorite === 1) {
        addFavorite(id, name).then((result) => result)

      } else {
        removeFavorite(id, name).then(() => this.project.favorite = 0)
      }

    },
    onGetProducts() {
      this.requestOptions.projectId = this.project.id
      getProducts(this.requestOptions).then(result => {
        for (let product of result.data.products) {
          productsStore.products.push(product)
        }
        this.hasMore = result.data.products.length >= this.requestOptions.limit;
        this.requestOptions.offset = this.requestOptions.offset + this.requestOptions.limit
      })
    },
    onGetProject(id) {
      getProject(id)
          .then(result => {
            this.project = result.data.project
            this.onGetProducts()
            this.stats = {
              rating: {
                icon: iconStar,
                data: this.project.ratingAvg
              },
              views: {
                icon: iconView,
                data: this.project.viewCount
              },
              reviews: {
                icon: iconReview,
                data: this.project.reviewsCount
              },
            }
          })
          .catch(error => {
            addNotice({name: error.response.data.message, type: 'danger'})
          })
    }
  },
  watch: {
    '$route': function () {
      this.onGetProject(this.$route.path.replace('/project/', ''))
    }
  },
  mounted() {

    this.onGetProject(this.$route.path.replace('/project/', ''))


  },
  beforeUnmount() {
    productsStore.products.splice(0, productsStore.products.length)
  }
}
</script>

<style scoped lang="scss">
.menu-item {

  a {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #B3B4C9;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.exchanger_stats {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  .exchanger_stat {
    display: flex;
    flex-wrap: wrap;

    .stat-ex {
      color: #191B2A;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 125% */
      margin-bottom: -5px;
    }
    .desc-ex {
      width: 100%;
      color: var(--gray, #A8A8A8);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
    }
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

  .project-banner {
    width: 100%;
    img {
      border-radius: 20px;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .project-info {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    position: relative;
    align-items: start;


    .favorite-wrapper {
      top: 8%;
      border-radius: 0 20px 20px 0;
      padding: 5px 3px 3px 0;
      position: absolute;
      left: 0;
      background-color: #FFFFFF;

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &.in-favorite {
          svg {
            path {
              fill: #FB5A50;
            }
          }

          &:hover {
            svg {
              path {
                fill: #d2635d;
              }
            }
          }
        }
      }
    }

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

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }

      .project-info-stats_name {
        margin-top: -5px;
        width: 100%;
        color: #191B2A;
        text-align: left;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }



    }
  }
}
.links {
  width: 100%;
}
.project-info-stats_stats {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff;
  width: 100%;
  padding: 3px 8px;
  border-radius: 20px;

}
.project-info-description_links {
  margin-top: 10px;
  div {
    gap: 10px;
    display: flex;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 992px){
  .project {
    .project-info {

      .favorite-wrapper {
        top: 4%;
        left: 0px;
      }

      .project-info-description {
        width: 70%;
      }
      .project-info-stats {
        width: 30%;

        .project-info-stats_stats {
          gap: 15px;
        }
        .project-info-stats_name {

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
      .favorite-wrapper {
        left: 0%;
      }
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
        .project-info-stats_name {

        }
      }
    }
  }

}
</style>