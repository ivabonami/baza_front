<template>
  <div class="popup"
       v-if="modal.show"
       :class="{show: modal.show}">

    <div class="popup_header">
      <slot name="header"></slot>
    </div>

    <div class="popup_body">
      <InputRating
          :input="inputs.reviewRating"
          :error="inputs.errors"
          :data="inputs.reviewRating.data"
          @data="emit => data.rating = emit"
          @returnedError="emit => emit"
      >

      </InputRating>

      <input-textarea
          :input="inputs.reviewComment"
          :data="inputs.reviewComment.data"
          @returnedData="emit => data.comment = emit"
          @returnedError="emit => emit"
      />
    </div>


    <div class="popup_buttons" >
      <div class="popup_buttons_button">
        <button-primary
            v-show="!loading"
            @close="() => {
              onReviewAdd(this.$props.mode)

            }"
        >
          <template #default>
            <slot name="buttonConfirm"></slot>
          </template>
        </button-primary>

        <loader-small v-show="loading" />
      </div>

      <div class="popup_buttons_button">
        <button-secondary-gray
            @pressed="() => {
              closeModal()
            }"
        >
          <template #default>
            <slot name="buttonSecondary"></slot>
          </template>
        </button-secondary-gray>

      </div>


    </div>


    <div class="popup_close" @click="closeModal()">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>

  <div class="backdrop"
       @click="closeModal()"
       :class="{show: modal.show}"></div>

  <notice v-if="notice.show" :notice="notice"
          @closeNotice="notice.show = false"
  />

</template>

<script>
import ButtonPrimary from "../Buttons/ButtonPrimary.vue";
import ButtonSecondaryGray from "../Buttons/ButtonSecondaryGray.vue";
import inputTextarea from "../Inputs/InputTextarea.vue";
import notice from "./Notice.vue";
import {checkInputData} from "../../assets/js/fieldDataController.js";
import loaderSmall from "../Loaders/LoaderSmall.vue";
import {api} from "./../../assets/js/config.js";
import ButtonAction from "../Buttons/ButtonAction.vue";
import InputRating from "../Inputs/InputRating.vue";
import {addReview, editReview} from "../../API/reviews.js";
import {userInfo} from "../../Store/userInfo.js";

export default {
  name: "PopupReviewController.vue",
  emits: ['reviewEdit', 'closeModal', 'reviewAdded'],
  props: {
    modal: {
      show: true,
      data: null
    },
    options: {
      buttonConfirmText: null,
      product: null
    },
    dataReview: {
      userData: {}
    },
    mode: null,
    projectId: null

  },

  data() {
    return {
      data: {
        rating: null,
        comment: null,
        projectId: null,
      },
      notice: {
        show: false,
        color: null,
        text: {}
      },
      checkInputData,
      loading: false,

      inputs: {

        reviewComment: {
          name: 'Отзыв',
          placeholder: 'Что вы думаете об этом проекте? Необязательное поле.',
          min: 0,
          max: 65535,
          data: ''
        },
        reviewRating: {
          name: 'Ваша оценка',
          placeholder: 'от 1 до 5',
          min: 1,
          max: 5,
          data: ''
        },



      },
      errors: {},
      api
    }
  },
  components: {
    ButtonPrimary,
    ButtonSecondaryGray,
    inputTextarea,
    notice,
    loaderSmall,
    ButtonAction,
    InputRating,
  },
  watch: {
    dataReview: (newVal, oldVal) => {
      this.inputs.reviewRating.data = this.$props.dataReview.rating
      this.data.rating = this.inputs.reviewRating.data
      this.inputs.reviewComment.data = this.$props.dataReview.comment
      this.data.comment = this.inputs.reviewComment.data

    }
  },
  mounted() {
    if (this.$props.dataReview) {
      this.inputs.reviewRating.data = this.$props.dataReview.rating
      this.data.rating = this.inputs.reviewRating.data
      this.inputs.reviewComment.data = this.$props.dataReview.comment
      this.data.comment = this.inputs.reviewComment.data
    }


    if (this.$props.modal.show === true) {
      document.body.style.overflow = 'hidden hidden'
      window.addEventListener('keydown', (e) => {
        e.key === 'Escape' ? this.closeModal() : null
      })
    } else {
      document.body.style.overflow = 'hidden scroll'
    }




  },
  methods: {
    onReviewAdd(mode) {
      this.data.projectId = this.$props.projectId
      this.loading = true


      if (this.data.rating <= 0) {
        this.notice.show = true
        this.notice.text.ratingError = 'Вам нужно выбрать оценку от 1 до 5'
      } else {
        this.notice.show = false
        delete this.notice.text.ratingError

        if (mode === "add") {
          addReview(this.data).then(result => {
            if (result.response.status === 400) {

              this.notice.show = true
              if (result.response.data.message === "This user already rated this project.") {
                this.notice.text.fetchError = "Вы уже оставляли отзыв к проекту, дождитесь проверки модератора"
              } else if (result.response.data.message === "Error creating review SequelizeValidationError: notNull Violation: Review.rating cannot be null") {
                this.notice.text.fetchError = "Вы не указали рейтинг проекта"
              } else if (result.response.data.message === "Cannot leave review now. Please, authorize or wait 24 hours after you have left the last review"){

                let firstDate = new Date().getHours() + ":" + new Date().getMinutes();
                let secondDate = new Date(result.response.data.allowedDate).getHours() + ":" + new Date(result.response.data.allowedDate).getMinutes();

                let getDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
                let different = (getDate(secondDate) - getDate(firstDate));
                let differentRes, hours, minuts;
                if(different > 0) {
                  differentRes = different;
                  hours = Math.floor((differentRes % 86400000) / 3600000);
                  minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
                } else {
                  differentRes = Math.abs((getDate(firstDate) - getDate(secondDate)));
                  hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
                  minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
                }
                let results = hours > 0 ? hours + ' ч и ' + minuts + ' мин' : minuts + ' мин';
                this.notice.text.fetchError = `К сожалению вы превысили лимит на анонимные отзывы в сутки, попробуйте через ${results} или выполните вход или зарегистрируйтесь`

                if (!userInfo.token) {
                  this.$emit('userRegistration', `К сожалению вы превысили лимит на анонимные отзывы в сутки, попробуйте через ${results} или выполните вход или зарегистрируйтесь`)
                }
              } else {
                this.notice.text.fetchError = result.response.data.message
              }

              this.loading = false

            } else {
              this.notice.show = false
              this.closeModal()
              this.loading = false
            }

          }).catch(error => {
            this.notice.show = false
            this.$emit('reviewAdded', this.data)
            this.loading = false
            this.closeModal()
          })
        } else {
          this.data.ProjectId = this.$props.dataReview.ProjectId
          this.data.id = this.$props.dataReview.id

          editReview(this.data).then(result => {
            this.notice.show = false
            this.closeModal()
            this.$emit('reviewAdded', this.data)
          })
        }


      }


    },

    closeModal() {
      this.$emit('closeModal', true)

      document.body.style.overflow = 'hidden scroll'
    },

  }
}
</script>

<style scoped lang="scss">

.popup {
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  background: #FFF;
  padding: 15px;
  position: fixed;
  z-index: 51;
  width: 300px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  scale: 0;
  transition: .15s ease;

  visibility: hidden;
  opacity: 0;

  &.show {
    scale: 1;
    visibility: visible;
    opacity: 1;
  }

  .popup_icon {
    margin-bottom: 20px;
  }

  .popup_header {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
  }
  .popup_text {
    color: var(--gray, #A8A8A8);
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
    word-wrap: break-word;
  }
  .popup_buttons {
    display: flex;
    width: 100%;
    gap: 10px;
  }
  .popup_close {
    position: absolute;
    right: 14px;
    top: 14px;
    cursor: pointer;
  }
  .popup_body_image {
    width: 100%;

    img {
      width: 100%;
      border-radius: 10px;
    }
  }
}

.backdrop {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  height: 100%;
  width: 100%;
  z-index: 50;

  background: rgba(217, 217, 217, 0.60);
  backdrop-filter: blur(3px);

  visibility: hidden;
  opacity: 0;


  &.show {
    visibility: visible;
    opacity: 1;
  }
}
@media screen and (max-width: 768px){
  .popup {
    width: 70%;
    flex-wrap: wrap;
    max-height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 10px;
    .popup_body {
      width: 100%;
      .popup_image {
        width: 140px;
      }
      .popup_header {
        font-size: 14px;
      }
      .popup_text {
        font-size: 12px;
      }
    }
  }
}
</style>
