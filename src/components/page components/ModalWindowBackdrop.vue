<template>
  <div class="modal">
    <div class="modal-header">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"
        v-if="$props.iconType === 'user'">
          <g clip-path="url(#clip0_374_2476)">
            <path d="M0 30.8V25.2C0.0896 24.8948 0.21 24.5952 0.2604 24.2816C2.1224 13.0984 8.3524 5.4768 18.9812 1.554C21.056 0.7868 23.31 0.504 25.48 0H30.52C30.8784 0.0868 31.234 0.2072 31.5952 0.2576C43.2208 1.8228 52.4664 10.1472 55.202 21.5432C55.5156 22.8452 55.734 24.1668 55.9972 25.48V30.8C55.8992 31.15 55.7704 31.4972 55.7116 31.8528C53.8468 42.798 47.7652 50.3468 37.408 54.334C35.3024 55.1432 33.0064 55.4568 30.8 56H24.92C24.5644 55.9048 24.2144 55.776 23.8504 55.72C12.418 53.9756 3.1668 45.3404 0.6636 34.0648C0.4256 32.9812 0.2212 31.8892 0 30.8ZM26.012 32.2756C23.1084 31.4468 20.6024 30.0468 18.8776 27.496C17.122 24.8976 16.4948 22.0612 17.1192 18.9728C18.1048 14.0896 22.302 10.4048 27.1908 10.1248C32.3876 9.8252 36.9656 12.8772 38.5056 17.71C39.5192 20.8992 39.2168 23.9792 37.5088 26.8744C35.8064 29.764 33.1716 31.43 29.9656 32.3232C38.0128 33.3424 43.8816 37.4472 47.824 44.4052C55.9412 35.1848 56.518 18.8692 45.1276 8.6772C34.3252 -0.9884 17.388 0.2744 8.1312 11.4856C-1.5176 23.1728 2.0132 38.1024 8.2684 44.3464C12.0596 37.2484 18.0908 33.4628 26.012 32.2728V32.2756Z" fill="rgb(0, 115, 236)"/>
          </g>
          <defs>
            <clipPath id="clip0_374_2476">
              <rect width="56" height="56" fill="white"/>
            </clipPath>
          </defs>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none"
             v-if="$props.iconType === 'warning'">
          <g clip-path="url(#clip0_380_7664)">
            <path d="M26.8089 0C28.2705 0 29.7295 0 31.1911 0C31.4772 0.0721778 31.7608 0.172711 32.0521 0.211378C44.129 1.84569 52.2593 8.43964 56.4353 19.8308C57.2473 22.0503 57.4922 24.476 58 26.8089V31.1911C57.9252 31.5185 57.8144 31.8433 57.7809 32.1758C56.6364 43.5309 48.4313 53.4812 37.4448 56.7008C35.4084 57.2963 33.2791 57.5747 31.1911 58H26.8089C26.5202 57.9278 26.2366 57.8196 25.9453 57.7912C14.0515 56.5874 4.02907 48.0343 1.01564 36.4524C0.567111 34.7278 0.332533 32.9466 0 31.1911C0 29.7295 0 28.2705 0 26.8089C0.0747556 26.4815 0.172711 26.1593 0.219111 25.8293C1.85084 14.0927 8.18444 6.02169 19.2302 1.7864C21.6327 0.866133 24.2749 0.577422 26.8089 0ZM3.35111 28.8685C3.35369 43.2628 14.6882 54.6412 29.0284 54.6489C43.1881 54.654 54.6515 43.2061 54.6489 29.0619C54.6489 14.8428 43.2577 3.35369 29.1572 3.35111C14.8377 3.34853 3.34853 14.7114 3.35111 28.8685Z" fill="#C8716B"/>
            <path d="M29.0079 13.2653C29.8225 13.4999 30.668 13.6623 31.4439 13.9871C32.3719 14.3763 32.756 15.1857 32.6761 16.1833C32.3409 20.416 31.9981 24.6487 31.6527 28.8815C31.5135 30.5905 31.3537 32.2996 31.2093 34.0086C31.0985 35.3388 30.3793 36.0477 29.0775 36.0915C27.7293 36.1379 26.9173 35.4316 26.7936 34.0422C26.2986 28.5309 25.7934 23.0222 25.3397 17.5083C25.0922 14.4975 26.1001 13.4019 29.0079 13.2627V13.2653Z" fill="#C8716B"/>
            <path d="M28.7914 44.5957C27.2138 44.49 25.9172 43.0052 26.0409 41.4482C26.1672 39.8629 27.6546 38.5611 29.1987 38.69C30.7737 38.8189 32.0806 40.3217 31.9595 41.8581C31.8332 43.4408 30.3767 44.7013 28.794 44.5957H28.7914Z" fill="#C8716B"/>
          </g>
          <defs>
            <clipPath id="clip0_380_7664">
              <rect width="58" height="58" fill="white"/>
            </clipPath>
          </defs>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none"
             v-if="$props.iconType === 'ok'">
          <path d="M19 38C29.4934 38 38 29.4934 38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38Z" fill="#8ABE23"/>
          <path d="M15.2786 27.8305C15.1737 27.7507 15.0855 27.6996 15.0159 27.6301C12.594 25.2109 10.1757 22.7898 7.75279 20.3725C7.53472 20.1544 7.58019 19.9902 7.77878 19.7953C8.44969 19.1346 9.12061 18.4739 9.77389 17.7955C10.0133 17.5468 10.1738 17.583 10.3993 17.8104C11.8859 19.3109 13.3827 20.8012 14.8767 22.2943C15.2767 22.6933 15.2776 22.6933 15.6831 22.2887C19.6056 18.3662 23.5281 14.4437 27.4515 10.5212C27.9192 10.0535 27.9202 10.0535 28.3767 10.5092C28.9892 11.1207 29.5924 11.7406 30.2159 12.34C30.4572 12.572 30.4461 12.7326 30.2122 12.9646C25.3312 17.8364 20.4556 22.7137 15.5783 27.5883C15.4911 27.6764 15.3862 27.7451 15.2786 27.8305Z" fill="white"/>
        </svg>

      </div>
      <div class="close"
           ref="modalBackdrop"
           @click="$emit('changeModal', false)">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M1 1L23.1778 23.1778M23.1778 1L1 23.1778" stroke="black"/>
        </svg>
      </div>


    </div>
    <div class="h2"
         v-if="$props.descriptionType !== ''">
      {{ $props.heading }}
    </div>


    <div class="modal-body">
      <div class="text"
           v-if="$props.descriptionType === 'text' || $props.descriptionType === 'textApprove'">
        {{ $props.description }}

      </div>

      <div class="confirm"
           v-if="$props.confirmAction === true">

        <div class="buttons">
          <button class="btn confirm"
                  :class="{ approve: $props.descriptionType === 'textApprove'}"
                  title="Действие безвозвратно!!!!"
                  @click="() => {
                    $emit('confirmAction', true)
                    $emit('changeModal', false)

                  }">
            <span v-if="$props.descriptionType === 'textApprove'">Опубликовать</span>
            <span v-else-if="$props.exit === true">Выйти</span>
            <span v-else>Удалить</span>

          </button>

          <button class="btn cancel"
                  @click="() => {
                    $emit('confirmAction', false)
                    $emit('changeModal', false)
                  }">
            <span v-if="$props.descriptionType === 'textApprove'">Отмена</span>
            <span v-else-if="$props.exit === true">Остаться</span>
            <span v-else>Не удалять</span>
          </button>
        </div>
      </div>

      <div class="confirm"
           v-if="$props.close === true">

        <div class="buttons">

          <button class="btn btn-secondary"
                  @click="() => {
                    $emit('changeModal', false)
                  }">
            <span>Закрыть</span>
          </button>
        </div>
      </div>


      <div class="form"
           v-if="$props.descriptionType === 'sign-in'">
        <div class="signin">
          <sign-in-view></sign-in-view>
        </div>
      </div>
    </div>
  </div>

  <div class="backdrop"
         @click="$emit('changeModal', false)"> </div>

</template>

<script>
import signInView from "../../views/pages/SignInView.vue";

export default {
  name: "ModalWindowBackdrop.vue",
  components: {signInView},

  props: ['close', 'iconType', 'exit', 'heading', 'descriptionType', "description", "show", 'confirmAction', 'textApprove'],

  data (props) {
    return {
      modalShow: props.show,
      forceReload: true
    }
  },

  setup(props) {

  },

  methods: {
    changeModal () {
      this.modalShow = !this.modalShow
    },

  }
}
</script>

<style scoped lang="scss">
.confirm {
  .buttons {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    .confirm {
      background-color: #C8716B;
      color: #fff;
      &:hover {
        background-color: #a41f1f;
      }

      &.approve {
        background-color: #85c86b;
        color: #fff;
        &:hover {
          background-color: #3168b9;
        }
      }


    }
    .cancel {

    }
  }

}
.backdrop {
  position: fixed;
  background-color: rgba(108, 122, 255, 0.25);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  overflow: hidden;
}
.modal {
  position: fixed;
  z-index: 25;
  background-color: #fff;
  border-radius: 5px;
  width: 300px;

  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .modal-header {
    display: flex;

    .icon {
      svg {
        width: 38px;
        height: 38px;
      }
    }
  }
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .h2 {
    color: #000;

    font-family: 'Gilroy-Bold', sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 800;
    margin-top: 20px;
    line-height: 1;
  }
  .modal-body {
    margin-top: 20px;
    .text {
      color: #000;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

    }
  }
}

</style>