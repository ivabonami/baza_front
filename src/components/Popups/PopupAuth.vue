<template>
  <div class="popup" :class="{show: modal.show}">
    <div class="popup_icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
        <path d="M10.954 49.0837C12.5965 45.214 16.4313 42.5 20.9 42.5H37.1C41.5687 42.5 45.4035 45.2141 47.046 49.0837M39.8 22.25C39.8 28.2147 34.9647 33.05 29 33.05C23.0353 33.05 18.2 28.2147 18.2 22.25C18.2 16.2853 23.0353 11.45 29 11.45C34.9647 11.45 39.8 16.2853 39.8 22.25ZM56 29C56 43.9117 43.9117 56 29 56C14.0883 56 2 43.9117 2 29C2 14.0883 14.0883 2 29 2C43.9117 2 56 14.0883 56 29Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div class="popup_header">
      <span v-if="modal.type === true">Регистрация на BAZA</span>
      <span v-else>Войти на BAZA</span>
    </div>

    <sign-up
        @errors="emit => {
          this.notice.show = true
          this.notice.text = emit
        }"
        @closePopup="closeModal()"
        @success="() => {
          this.modal.show = false
          closeModal()
        }"
        v-if="modal.type === true" />
    <sign-in
        @errors="emit => {
          this.notice.show = true
          this.notice.text = emit
        }"
        @closePopup="closeModal()"
        @success="() => {
          this.modal.show = false
          closeModal()
        }"
        v-else
    />

    <div class="popup_auth_switch" @click="console.log(errors)">
      <span v-if="modal.type === true">Есть аккаунт? <span @click="modal.type = !modal.type">Войти</span></span>
      <span v-else>Нет аккаунта? <span @click="modal.type = !modal.type">Зарегистрироваться</span></span>
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

  <notice :notice="notice"
          @closeNotice="emit => notice.show = emit"
  />
</template>

<script>
import ButtonPrimary from "../Buttons/ButtonPrimary.vue";
import signIn from "../Forms/SignIn.vue";
import signUp from "../Forms/SignUp.vue";
import notice from "./Notice.vue";



export default {
  name: "Popup.vue",
  props: ['modal'],

  data() {
    return {
      modal: {
        show: false
      },
      notice: {
        show: false,
        color: null,
        text: {}
      },
    }
  },
  components: {ButtonPrimary, signIn, signUp, notice},

  mounted() {
    this.modal = this.$props.modal

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
    closeModal() {
      this.modal.show = false
      this.$emit('closeModal', true)
      document.body.style.overflow = 'hidden scroll'
    }
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

  .popup_button {

  }
  .popup_close {
    position: absolute;
    right: 14px;
    top: 14px;
    cursor: pointer;
  }
  .popup_auth_switch {
    margin-top: 10px;

    span {
      color: var(--gray, #A8A8A8);
      font-family: "PT Sans Caption";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      transition: .15s ease;

      span {
        cursor: pointer;
        text-decoration-line: underline;

        &:hover {
          color: black;
        }
      }
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

</style>
