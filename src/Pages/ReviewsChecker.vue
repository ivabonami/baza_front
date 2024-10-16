<template>
  <div>
    <h2 class="heading2">Неопубликованные отзывы</h2>
    <div class="check-reviews">
      <the-loader v-if="loading" />
      <empty-store
          :show-button="true"
          :show-button-for-users="false"
          @buttonPressed="this.$router.push('/')"
          v-else-if="!loading && reviewsStore.length <= 0">
        <template #header>
          Нет непроверенных отзывов!
        </template>
        <template #text>
          вы проверили все отзывы, непроверенных нет!
        </template>
        <template #buttonText>
        <span>
          На главную страницу
        </span>

        </template>
      </empty-store>

      <div class="project-reviews_items"
           v-else
      >
        <div class="project-reviews_items_item"
             v-for="review of reviewsStore"
        >
          <div class="project-reviews_items_item_heading">
            <div class="info">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4.3163 18.4384C4.92462 17.0052 6.34492 16 8 16H14C15.6551 16 17.0754 17.0052 17.6837 18.4384M15 8.5C15 10.7091 13.2091 12.5 11 12.5C8.79086 12.5 7 10.7091 7 8.5C7 6.29086 8.79086 4.5 11 4.5C13.2091 4.5 15 6.29086 15 8.5ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>
            от <b>{{ review.userData ? review.userData.username : review.anonId }}</b> к проекту <a class="linkToProject" :href="'/project/' + review.ProjectId"> {{ review.ProjectId }} </a>

          </span>
            </div>
            <div class="rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.08141 0.504121C5.2159 0.218337 5.28315 0.0754451 5.37444 0.029791C5.45386 -0.00993033 5.54614 -0.00993033 5.62556 0.029791C5.71685 0.0754451 5.7841 0.218337 5.91859 0.504121L7.19452 3.21543C7.23423 3.29979 7.25408 3.34198 7.28309 3.37473C7.30878 3.40373 7.33959 3.42723 7.37381 3.44392C7.41246 3.46277 7.45684 3.46958 7.5456 3.48319L10.3997 3.92075C10.7002 3.96683 10.8505 3.98987 10.92 4.06686C10.9805 4.13385 11.009 4.22591 10.9975 4.31739C10.9842 4.42254 10.8755 4.53369 10.6579 4.75598L8.59341 6.86508C8.52906 6.93083 8.49688 6.9637 8.47612 7.00282C8.45773 7.03745 8.44594 7.0755 8.44139 7.11485C8.43625 7.15929 8.44384 7.20573 8.45903 7.2986L8.94615 10.2776C8.99753 10.5918 9.02321 10.7489 8.97494 10.8422C8.93293 10.9233 8.85827 10.9802 8.77174 10.997C8.67229 11.0163 8.53779 10.9421 8.26879 10.7937L5.71727 9.38632C5.63777 9.34247 5.59803 9.32054 5.55615 9.31192C5.51907 9.3043 5.48093 9.3043 5.44385 9.31192C5.40198 9.32054 5.36223 9.34247 5.28273 9.38632L2.73121 10.7937C2.46221 10.9421 2.32771 11.0163 2.22826 10.997C2.14173 10.9802 2.06707 10.9233 2.02506 10.8422C1.97679 10.7489 2.00248 10.5918 2.05385 10.2776L2.54097 7.2986C2.55616 7.20573 2.56375 7.15929 2.55861 7.11485C2.55406 7.0755 2.54227 7.03745 2.52388 7.00282C2.50312 6.9637 2.47094 6.93083 2.40659 6.86508L0.342133 4.75598C0.124546 4.53369 0.0157523 4.42254 0.00251347 4.31739C-0.00900502 4.22591 0.019451 4.13385 0.0799588 4.06686C0.149504 3.98987 0.299777 3.96683 0.600324 3.92075L3.4544 3.48319C3.54316 3.46958 3.58754 3.46277 3.62619 3.44392C3.66041 3.42723 3.69122 3.40373 3.71691 3.37473C3.74592 3.34198 3.76577 3.29979 3.80548 3.21543L5.08141 0.504121Z" fill="black"/>
              </svg>
              {{ review.rating }}
            </div>

            <div class="menu">
              <span @click="onReviewApprove(review)">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10.2593 5.0713H6.85112V1.6631C6.85112 1.19277 6.47025 0.811035 5.99905 0.811035C5.52786 0.811035 5.14698 1.19277 5.14698 1.6631V5.0713H1.73879C1.26759 5.0713 0.886719 5.45303 0.886719 5.92337C0.886719 6.39371 1.26759 6.77544 1.73879 6.77544H5.14698V10.1836C5.14698 10.654 5.52786 11.0357 5.99905 11.0357C6.47025 11.0357 6.85112 10.654 6.85112 10.1836V6.77544H10.2593C10.7305 6.77544 11.1114 6.39371 11.1114 5.92337C11.1114 5.45303 10.7305 5.0713 10.2593 5.0713Z" fill="#191B2A"/>
                </svg>
                одобрить
              </span>
              <span @click="onDeleteReview(review)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                  <path d="M9.66667 3.8V3.24C9.66667 2.45593 9.66667 2.06389 9.52134 1.76441C9.39351 1.50099 9.18954 1.28681 8.93865 1.15259C8.65344 1 8.28007 1 7.53333 1H6.46667C5.71993 1 5.34656 1 5.06135 1.15259C4.81046 1.28681 4.60649 1.50099 4.47866 1.76441C4.33333 2.06389 4.33333 2.45593 4.33333 3.24V3.8M1 3.8H13M11.6667 3.8V11.64C11.6667 12.8161 11.6667 13.4042 11.4487 13.8534C11.2569 14.2485 10.951 14.5698 10.5746 14.7711C10.1468 15 9.58677 15 8.46667 15H5.53333C4.41323 15 3.85318 15 3.42535 14.7711C3.04903 14.5698 2.74307 14.2485 2.55132 13.8534C2.33333 13.4042 2.33333 12.8161 2.33333 11.64V3.8" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                удалить</span>
            </div>

          </div>

          <div class="project-reviews_items_item_body" v-if="review.comment">
            {{ review.comment }}
          </div>

          <div class="menu" v-if="userStore.role === 'admin'">


          </div>

        </div>
      </div>
    </div>

    <div class="mt20">
      <Waypoint v-if="!hideLoadMore"

                @change="way => {
                  if (way.going === 'IN') {
                    onReviewsLoad()
                  }
              }">

        <button-primary
            @click="onReviewsLoad()"
            :style="'outline'">
          <template #default>
            Загрузить еще
          </template>
        </button-primary>

      </Waypoint>
    </div>
  </div>

</template>

<script>
import {approveReview, deleteReview, showNotReviewed} from "@/API/reviews.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue"
import {userStore} from "@/Stores/userStore.js";
import emptyStore from "@/components/Blocks/EmptyStore.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import buttonPrimary from "../components/Buttons/ButtonPrimary.vue";
import {Waypoint} from "vue-waypoint";
import {popup} from "@/js/controllers/popupController.js";
import {reviewsStore} from "@/Stores/reviewsStore.js";
import {addNotice} from "@/js/notifications.js";

export default {
  name: "ReviewsCheck.vue",
  data() {
    return {
      loading: false,
      userStore,
      modalAction: {
        show: false,
        review: {}
      },
      reviewsStore,
      hideLoadMore: false,
      notice: {
        show: false,
        color: null,
        text: {}
      },
      options: {
        limit: 10,
        offset: 0,
      },
      deleteReview

    }
  },

  components: {
    Waypoint,
    ButtonBlack,
    TheLoader,
    emptyStore,
    buttonPrimary
  },

  methods: {
    onDeleteReview(review) {

      deleteReview(review).then(result => {
        reviewsStore.splice(reviewsStore.findIndex(item => item.id === review.id), 1)
        addNotice({name: 'Отзыв удален', type: 'success'})
      })
    },
    onReviewsLoad() {
      showNotReviewed(this.options).then(result => {
        for (const review of result.data.reviews) {
          reviewsStore.push(review)
        }

        this.loading = false

        if (result.data.reviews.length < this.options.limit) {
          this.hideLoadMore = true
        } else {
          this.hideLoadMore = false
        }
      })

      this.options.offset = this.options.offset + this.options.limit
    },
    onReviewApprove(review) {
      popup.show = true
      popup.component = 'ApproveReview'
      popup.review = review
    }
  },

  mounted() {

    if (userStore.role !== 'admin') {
      addNotice({name: 'У вас нет прав для просмотра этой страницы', type: 'danger'})
      this.$router.replace('/')
    }
  }

}
</script>

<style scoped lang="scss">
.mt20 {
  margin-top: 20px;
}
.project-reviews_items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .project-reviews_items_item {
    width: 100%;
    border-radius: 20px;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    padding: 15px;

    .project-reviews_items_item_body {
      word-break: break-word;
    }
    .project-reviews_items_item_heading {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      gap: 30px;

      .info {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #000;

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

      }
      .rating {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        color: #000;
        text-align: right;

        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

      }
    }

    .menu {
      display: flex;
      gap: 10px;
      margin-left: auto;


      span {
        cursor: pointer;
        color: #B3B4C9;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: .3s ease;

        svg {
          path {
            background-color: #70718c;
            stroke: #70718c;
          }
        }

        &:hover {
          color: #191B2A;
        }
      }




      button:nth-child(3) {
        margin-left: auto;
      }
    }

  }
}
.approve {
  width: 15px;
  height: 15px;

  path {
    stroke: #A8A8A8;
    stroke-width: 3px;
  }
}
@media screen and (max-width: 500px){
  .project-reviews_items {
    .project-reviews_items_item {
      width: 100%;
    }
  }
}
</style>