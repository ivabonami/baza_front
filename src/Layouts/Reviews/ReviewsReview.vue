<template>
<h2>Проверка отзывов</h2>

  <div class="reviews">
    <div class="review" v-for="review of reviews">
      <div class="review-header">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.3163 18.4384C4.92462 17.0052 6.34492 16 8 16H14C15.6551 16 17.0754 17.0052 17.6837 18.4384M15 8.5C15 10.7091 13.2091 12.5 11 12.5C8.79086 12.5 7 10.7091 7 8.5C7 6.29086 8.79086 4.5 11 4.5C13.2091 4.5 15 6.29086 15 8.5ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        {{ review.userData.username }} // <a :href="review.projectLink">{{ review.projectName }}</a>

        <div class="review-rating">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.08141 0.504121C5.2159 0.218337 5.28315 0.0754451 5.37444 0.029791C5.45386 -0.00993033 5.54614 -0.00993033 5.62556 0.029791C5.71685 0.0754451 5.7841 0.218337 5.91859 0.504121L7.19452 3.21543C7.23423 3.29979 7.25408 3.34198 7.28309 3.37473C7.30878 3.40373 7.33959 3.42723 7.37381 3.44392C7.41246 3.46277 7.45684 3.46958 7.5456 3.48319L10.3997 3.92075C10.7002 3.96683 10.8505 3.98987 10.92 4.06686C10.9805 4.13385 11.009 4.22591 10.9975 4.31739C10.9842 4.42254 10.8755 4.53369 10.6579 4.75598L8.59341 6.86508C8.52906 6.93083 8.49688 6.9637 8.47612 7.00282C8.45773 7.03745 8.44594 7.0755 8.44139 7.11485C8.43625 7.15929 8.44384 7.20573 8.45903 7.2986L8.94615 10.2776C8.99753 10.5918 9.02321 10.7489 8.97494 10.8422C8.93293 10.9233 8.85827 10.9802 8.77174 10.997C8.67229 11.0163 8.53779 10.9421 8.26879 10.7937L5.71727 9.38632C5.63777 9.34247 5.59803 9.32054 5.55615 9.31192C5.51907 9.3043 5.48093 9.3043 5.44385 9.31192C5.40198 9.32054 5.36223 9.34247 5.28273 9.38632L2.73121 10.7937C2.46221 10.9421 2.32771 11.0163 2.22826 10.997C2.14173 10.9802 2.06707 10.9233 2.02506 10.8422C1.97679 10.7489 2.00248 10.5918 2.05385 10.2776L2.54097 7.2986C2.55616 7.20573 2.56375 7.15929 2.55861 7.11485C2.55406 7.0755 2.54227 7.03745 2.52388 7.00282C2.50312 6.9637 2.47094 6.93083 2.40659 6.86508L0.342133 4.75598C0.124546 4.53369 0.0157523 4.42254 0.00251347 4.31739C-0.00900502 4.22591 0.019451 4.13385 0.0799588 4.06686C0.149504 3.98987 0.299777 3.96683 0.600324 3.92075L3.4544 3.48319C3.54316 3.46958 3.58754 3.46277 3.62619 3.44392C3.66041 3.42723 3.69122 3.40373 3.71691 3.37473C3.74592 3.34198 3.76577 3.29979 3.80548 3.21543L5.08141 0.504121Z" fill="black"/>
          </svg>

          {{ review.rating}}
        </div>
      </div>
      <div class="review-body" v-if="review.comment !== ''">
        {{ review.comment }}
      </div>
      <div class="review-footer">
        <div class="date">
          {{ new Date(review.createdAt).toLocaleString('ru-ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour12: false
        }) }}
        </div>
        <div class="review-menu">

          <div class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Редактировать
          </div>

          <div class="delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M9.66667 3.8V3.24C9.66667 2.45593 9.66667 2.06389 9.52134 1.76441C9.39351 1.50099 9.18954 1.28681 8.93865 1.15259C8.65344 1 8.28007 1 7.53333 1H6.46667C5.71993 1 5.34656 1 5.06135 1.15259C4.81046 1.28681 4.60649 1.50099 4.47866 1.76441C4.33333 2.06389 4.33333 2.45593 4.33333 3.24V3.8M1 3.8H13M11.6667 3.8V11.64C11.6667 12.8161 11.6667 13.4042 11.4487 13.8534C11.2569 14.2485 10.951 14.5698 10.5746 14.7711C10.1468 15 9.58677 15 8.46667 15H5.53333C4.41323 15 3.85318 15 3.42535 14.7711C3.04903 14.5698 2.74307 14.2485 2.55132 13.8534C2.33333 13.4042 2.33333 12.8161 2.33333 11.64V3.8" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Удалить
          </div>

          <div class="eye" @click="approve(review)">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.42012 8.71318C1.28394 8.49754 1.21584 8.38972 1.17772 8.22342C1.14909 8.0985 1.14909 7.9015 1.17772 7.77658C1.21584 7.61028 1.28394 7.50246 1.42012 7.28682C2.54553 5.50484 5.8954 1 11.0004 1C16.1054 1 19.4553 5.50484 20.5807 7.28682C20.7169 7.50246 20.785 7.61028 20.8231 7.77658C20.8517 7.9015 20.8517 8.0985 20.8231 8.22342C20.785 8.38972 20.7169 8.49754 20.5807 8.71318C19.4553 10.4952 16.1054 15 11.0004 15C5.8954 15 2.54553 10.4952 1.42012 8.71318Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.0004 11C12.6573 11 14.0004 9.65685 14.0004 8C14.0004 6.34315 12.6573 5 11.0004 5C9.34355 5 8.0004 6.34315 8.0004 8C8.0004 9.65685 9.34355 11 11.0004 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Опубликовать
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useFetch} from "../../assets/js/controllers/requestsControl.js";
import {modalSetting} from "../../assets/js/modal.js";

export default {
  name: "CheckTestimonials.vue",
  data() {
    return {
      reviews: [],
      modalSetting

    }
  },
  components: {},
  mounted() {
    this.getReviews()

  },
  methods: {
    getReviews() {
      useFetch(`reviews?showNotReviewed=true`, 'GET')
          .then(result => {

            for (let review of result.reviews) {
              useFetch(`projects/${review.ProjectId}`, "GET")
                  .then(result => {
                    review.projectName = result.project.name
                    review.projectLink = `/project/${review.ProjectId}`
                    this.reviews.push(review)



                  })
            }


          })
    },


    approve(review) {


      useFetch(`reviews/${review.id}`, "PUT", {isReviewed: true})
          .then(result => {
            this.reviews.splice(this.reviews.find(item => item.id = review.id), 1)

            modalSetting.show = true
            modalSetting.headline = `Вы опубликовали отзыв!`
            modalSetting.description = `Вы успешно опубликовали отзыв пользователя ${review.userData.username} к проекту ${review.projectName}`
            modalSetting.type = 'ok'
            modalSetting.modalSize = 'small'
          })

    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 20px;
}
.reviews {
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  align-items: stretch;

  .review {
    width: 49%;
    margin-bottom: 20px;

    .review-header {
      display: flex;
      gap: 10px;
      align-items: center;
      color: #000;
      font-family: "PT Sans Caption";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      .review-rating {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-left: auto;
        color: #000;
        text-align: right;
        font-family: "PT Sans Caption";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
    .review-body {
      margin-top: 10px;
      color: #6B6B6B;
      font-family: "PT Sans Caption";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .review-footer {
      display: flex;
      gap: 20px;
      align-items: center;
      margin-top: 10px;
      border-top: 1px solid #D8D8D8;
      padding-top: 10px;

      .date {
        color: #6B6B6B;
        font-family: "PT Sans Caption";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 20%;
      }
      .review-menu {
        display: flex;
        width: 80%;


        div {
          color: var(--gray, #A8A8A8);
          font-family: "PT Sans Caption";
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          display: flex;
          gap: 5px;
          align-items: center;
          cursor: pointer;

          transition: .3s ease;
          &.delete {
            margin-left: 20px;
          }



          &.eye {
            margin-left: auto;
          }

          svg {

            path {
              stroke: #A8A8A8;
              stroke-width: 1px;
              transition: .3s ease;
            }
          }
       &:hover {
         color: #6B6B6B;
           svg {
             path {
               stroke: #6B6B6B;
               stroke-width: 1px;
             }
           }
         }
        }
      }
    }
  }
}
</style>