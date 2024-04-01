<template>
  <div class="links justify-between" v-on:click="this.$emit('mobileClick', false)">

    <router-link to="/about-project"
                 class="link"
                 v-slot="{isActive, isExactActive}">О проекте</router-link>
    <router-link to="/advertisement" class="link">Реклама</router-link>
    <router-link to="/guarantee" class="link">Гарант</router-link>
    <router-link to="/contacts" class="link">Контакты</router-link>



    <button class="btn btn-outlined"
            v-on:click.stop
            v-on:click="() => {
              this.showModal = !showModal
              this.modal = {
                iconType: 'user',
                descriptionType: 'sign-in'
              }

            }"
            v-if="userInfo.username === null"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 20" fill="none">
        <path d="M26.4973 10.4865C26.449 10.8435 26.4118 11.2035 26.3515 11.5585C25.8477 14.485 24.3271 16.7427 21.827 18.3277C19.8679 19.5697 17.7088 20.0323 15.4179 19.7376C12.5004 19.3615 10.1954 17.9254 8.50389 15.5178C8.10464 14.9496 8.22733 14.2306 8.76134 13.8394C9.30842 13.4381 10.0375 13.5387 10.4509 14.12C11.2373 15.2242 12.2138 16.0951 13.4367 16.6884C16.5673 18.209 20.4744 17.2566 22.5591 14.4719C23.7156 12.9262 24.2466 11.1874 24.0435 9.27867C23.7559 6.58046 22.3992 4.52186 19.9534 3.33416C17.045 1.9212 14.2744 2.3114 11.7743 4.36095C11.2685 4.77528 10.8742 5.33041 10.4519 5.84029C10.0587 6.31396 9.50352 6.48492 8.97856 6.2506C8.28465 5.94085 8.0453 5.11922 8.47674 4.46654C8.94437 3.75755 9.50553 3.12699 10.1451 2.56784C11.6416 1.26047 13.3753 0.464988 15.3414 0.206531C17.1848 -0.0358355 18.9699 0.216587 20.6695 0.985924C22.6496 1.88198 24.1742 3.28689 25.2432 5.17554C25.9442 6.41452 26.3485 7.75005 26.4551 9.17307C26.4621 9.2666 26.4842 9.35812 26.4993 9.45064V10.4855L26.4973 10.4865Z" fill="transparent"/>
        <path d="M15.1483 11.1693H14.7692C10.302 11.1693 5.83582 11.1693 1.36864 11.1693C0.638527 11.1693 0.182959 10.8495 0.0331144 10.2361C-0.137849 9.54114 0.374036 8.83215 1.08806 8.77784C1.21679 8.76778 1.34652 8.76879 1.47625 8.76879C5.91728 8.76879 10.3583 8.76879 14.7983 8.76879H15.1453C15.0447 8.66018 14.9864 8.5938 14.9251 8.53045C14.4645 8.06482 13.9918 7.61026 13.5453 7.13056C13.2023 6.76349 13.1591 6.24858 13.3874 5.80609C13.6127 5.36963 14.0733 5.08402 14.557 5.17151C14.8295 5.22079 15.1302 5.35253 15.3253 5.5416C16.5382 6.71823 17.7289 7.91799 18.9166 9.12077C19.4023 9.61255 19.4013 10.3246 18.9145 10.8173C17.7269 12.0201 16.5321 13.2159 15.3293 14.4025C14.8104 14.9144 14.0682 14.9094 13.5936 14.4227C13.1159 13.9329 13.135 13.2138 13.6489 12.6859C14.0702 12.2534 14.5017 11.8311 14.9281 11.4036C14.9874 11.3443 15.0437 11.281 15.1483 11.1683V11.1693Z" fill="transparent"/>
      </svg>
      Войти
    </button>
    <div class="loggined" v-else v-on:click.stop>
      <div class="username">
        {{ userInfo.username.slice(0, 2) }}
      </div>

      <svg xmlns="http://www.w3.org/2000/svg"
           width="20" height="23" viewBox="0 0 20 23"
           fill="none"
           v-on:click="() => {
             this.showModal = !showModal
              this.modal = {
                iconType: 'warning',
                heading: `Вы собираетесь выйти из аккаунта`,
                description: `Вы уверены что хотите это сделать?`,
                descriptionType: 'text',
                exit: true,
                close: false,
                confirm: true
              }
           }"
      >
        <g clip-path="url(#clip0_374_5108)">
          <path d="M14.5361 4.58419H12.3134V2.31297H2.27149V20.6832H12.304V18.4077H14.5372C14.5372 18.6066 14.5377 18.8001 14.5372 18.9941C14.5346 19.6047 14.5435 20.2159 14.5257 20.8261C14.4921 21.9719 13.556 22.9588 12.4396 22.976C10.7025 23.003 8.96539 22.99 7.22774 22.9911C5.61268 22.9922 3.99709 22.9588 2.38254 22.9981C1.03465 23.0321 -0.00521891 21.9282 1.97057e-05 20.542C0.0241174 14.4883 0.00944922 8.43459 0.0110208 2.38035C0.0110208 1.00058 0.956592 0.00726143 2.29192 0.00456658C5.60953 -0.00244003 8.92663 -0.00190106 12.2442 0.00456658C13.3946 0.00672246 14.2842 0.741877 14.4927 1.8597C14.5477 2.1556 14.5314 2.46766 14.534 2.77218C14.5398 3.37151 14.5356 3.97031 14.5356 4.58365L14.5361 4.58419Z" fill="transparent"/>
          <path d="M14.5362 17.1399V13.8091H6.73376V9.19171H14.5262V5.86572C16.3555 7.75589 18.1891 9.65091 19.9995 11.5227C18.2273 13.3445 16.3859 15.2379 14.5362 17.1394V17.1399Z" fill="transparent"/>
        </g>
        <defs>
          <clipPath id="clip0_374_5108">
            <rect width="20" height="23" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>


  <modal-window-backdrop
      v-if="showModal === true"
      v-on:changeModal="(emitShowModal) => {this.showModal = emitShowModal}"
      v-bind:icon-type="this.modal.iconType"
      v-bind:descriptionType="this.modal.descriptionType"
      v-bind:heading="this.modal.heading"
      v-bind:description="this.modal.description"
      v-bind:close="this.modal.close"
      v-bind:confirmAction="this.modal.confirm"
      v-bind:exit="this.modal.exit"
      ref="modal"
      tabindex="0"
      v-on:confirmAction="(emit)=> {

        emit === true ? signOut() : this.showModal = false
      }"

  >

  </modal-window-backdrop>

</template>

<script>
import modalWindowBackdrop from "../Page Parts/Modal.vue";
import {signOut, userInfo, refreshToken} from "../../../assets/js/userService.js";
import {watch} from "vue";
import {store} from "../../../assets/js/store.js";
export default {
  name: "TopMenu.vue",
  components: { modalWindowBackdrop },

  emits: ['changeModal'],

  setup() {
  },

  mounted() {

  },
  methods: {
  },

  data () {
    return {
      showModal: this.$emit.showModal,
      isAdmin: false,
      modal: {},
      showSidebar: false,
      signOut, userInfo, refreshToken
    }
  },
}
</script>

<style scoped lang="scss">
.btn {

}
.link {
  color: #000000;
}
.loggined {
  text-align: right;
  display: flex;
  align-items: center;
  margin-left: 20px;
  transition: .3s ease;
  cursor: default;

  svg {
    cursor: pointer;
    path {
      fill: #0a58ca;
    }
  }
  .username {
    cursor: default;

  }

  svg {
    transition: .3s ease;
    position: relative;
    &:hover {

      transform: translateX(5px)

    }
  }



  .username {
    color: var(--new-dark, transparent);
    text-align: right;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 10px;

    text-transform: uppercase;
    background-color: #0a58ca;
    padding: 8px;
    border-radius: 30px;
    color: #fff;
    font-weight: 600;
  }
}

</style>