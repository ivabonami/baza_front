<template>
  <div>
    <div class="check-reviews">
      <loader-small v-if="loading" />
      <empty-store
          :show-button="true"
          :show-button-for-users="false"
          @buttonPressed="this.$router.push('/')"
          v-else-if="!loading && reviews.length <= 0">
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
             v-for="review of reviews"
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

          </div>

          <div class="project-reviews_items_item_body" v-if="review.comment">
            {{ review.comment }}
          </div>

          <div class="menu" v-if="userInfo.role === 'admin'">
            <button-action
                @click="() => {
                this.modalAction.show = true
                this.modalAction.review = review
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

            <button-action
                @click="() => {
                modalDelete.show = true
                modalDelete.review = review
               }"
            >
              <template #text>
                Удалить
              </template>
              <template #icon>
                <svg data-v-76b04a54="" xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" style="width: 15px; height: 15px;"><path data-v-76b04a54="" d="M6.77778 2.8V2.44C6.77778 1.93595 6.77778 1.68393 6.68089 1.49141C6.59567 1.32206 6.45969 1.18438 6.29244 1.09809C6.10229 1 5.85338 1 5.35556 1H4.64444C4.14662 1 3.89771 1 3.70756 1.09809C3.54031 1.18438 3.40433 1.32206 3.31911 1.49141C3.22222 1.68393 3.22222 1.93595 3.22222 2.44V2.8M1 2.8H9M8.11111 2.8V7.84C8.11111 8.59607 8.11111 8.97411 7.96579 9.26289C7.83796 9.51691 7.63398 9.72343 7.3831 9.85286C7.09788 10 6.72451 10 5.97778 10H4.02222C3.27549 10 2.90212 10 2.6169 9.85286C2.36602 9.72343 2.16204 9.51691 2.03421 9.26289C1.88889 8.97411 1.88889 8.59607 1.88889 7.84V2.8" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </template>
            </button-action>

            <!--        <button-action-->
            <!--            @click="() => { onDisapproveReview(review) }"-->
            <!--        >-->
            <!--          <template #text>-->
            <!--            Снять с публикации-->
            <!--          </template>-->
            <!--          <template #icon>-->
            <!--            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 10 9" fill="none">-->
            <!--              <path d="M4.48905 1.81368C4.65419 1.79031 4.82454 1.77778 5 1.77778C7.07432 1.77778 8.43548 3.52966 8.89277 4.22265C8.94812 4.30653 8.97579 4.34847 8.99128 4.41315C9.00291 4.46173 9.00291 4.53837 8.99126 4.58695C8.97576 4.65163 8.9479 4.69384 8.89216 4.77828C8.77032 4.96284 8.58456 5.22221 8.33846 5.50351M2.85615 2.44474C1.97763 3.01511 1.38122 3.80754 1.10762 4.22205C1.05202 4.30628 1.02423 4.3484 1.00873 4.41308C0.997094 4.46165 0.997089 4.53828 1.00872 4.58686C1.02421 4.65154 1.05188 4.69348 1.10722 4.77735C1.56451 5.47034 2.92567 7.22222 5 7.22222C5.8364 7.22222 6.55685 6.9374 7.14885 6.55201M1.34301 1L8.65699 8M4.13804 3.67504C3.91744 3.88617 3.781 4.17783 3.781 4.5C3.781 5.14433 4.32677 5.66667 5 5.66667C5.33662 5.66667 5.64136 5.53608 5.86196 5.32496" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>-->
            <!--            </svg>-->
            <!--          </template>-->
            <!--        </button-action>-->
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

        <button-black
            @click="onReviewsLoad()"
            :style="'outline'">
          <template #default>
            Загрузить еще
          </template>
        </button-black>

      </Waypoint>
    </div>

  </div>

</template>

<script>
import {approveReview, deleteReview, showNotReviewed} from "../API/reviews.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {userStore} from "@/Stores/userStore.js";
import {api} from "@/API/apiurl.js";
import emptyStore from "@/components/Blocks/EmptyStore.vue";
import {Waypoint} from "vue-waypoint";

export default {
  name: "ReviewsCheck.vue",
  data() {
    return {
      loading: false,
      reviews: [],
      userStore,
      approveReview,
      deleteReview,
      modalAction: {
        show: false,
        review: {}
      },
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
      modalDelete: {
        show: false,
        review: {}
      },
      api
    }
  },

  components: {
    Waypoint,
    ButtonBlack,
    emptyStore,
  },

  methods: {
    onReviewsLoad() {
      showNotReviewed(this.options).then(result => {
        for (const review of result.data.reviews) {
          this.reviews.push(review)
        }

        this.loading = false

        if (result.data.reviews.length < this.options.limit) {
          this.hideLoadMore = true
        } else {
          this.hideLoadMore = false
        }
      })

      this.options.offset = this.options.offset + this.options.limit
    }
  },

  mounted() {


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
      .info {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #000;
        font-family: "PT Sans Caption";
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
        font-family: "PT Sans Caption";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

      }
    }

    .menu {
      display: flex;
      width: 100%;
      gap: 10px;
      margin-top: 10px;

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