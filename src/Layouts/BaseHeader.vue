<template>
  <div class="row" style="position: relative">
    <div class="d-flex justify-between align-center">
      <div class="left">
        <router-link to="/" class="logo" @click="clearCategories()">
          <img src="../assets/images/logo.png" alt="">
        </router-link>

        <input-search />

      </div>
      <div class="right">
        <menu-header />

        <icons-menu />

        <div class="auth">
          <button-auth
              @confirmed="popup.auth.show = !popup.auth.show"
              v-if="!userInfo.token || userInfo.token === ''"
              :style="'filled'">
            <template #text>
              <span>Войти</span>
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.65304 14.9507C4.1397 13.8042 5.27594 13 6.6 13H11.4C12.7241 13 13.8603 13.8042 14.347 14.9507M12.2 7C12.2 8.76731 10.7673 10.2 9 10.2C7.23269 10.2 5.8 8.76731 5.8 7C5.8 5.23269 7.23269 3.8 9 3.8C10.7673 3.8 12.2 5.23269 12.2 7ZM17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#126DF7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </button-auth>

          <button-auth
              @confirmed="dropdown.show = !dropdown.show"
              v-else
              :username="userInfo.username"
              :style="'filled'">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg"  v-if="!dropdown.show" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.65304 14.9507C4.1397 13.8042 5.27594 13 6.6 13H11.4C12.7241 13 13.8603 13.8042 14.347 14.9507M12.2 7C12.2 8.76731 10.7673 10.2 9 10.2C7.23269 10.2 5.8 8.76731 5.8 7C5.8 5.23269 7.23269 3.8 9 3.8C10.7673 3.8 12.2 5.23269 12.2 7ZM17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#126DF7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12" fill="none">
                <path d="M10 1L1 10M1 1L10 10" stroke="#126DF7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </button-auth>
        </div>



        <dropdown-menu
            @signOut="() => {
              modal.show = true
            }"
            @isOpen="emit => dropdown.show = emit"
            v-show="dropdown.show"
            :dropdown="dropdown" />
      </div>

      <popup-auth
          v-if="popup.auth.show === true"
          @closeModal="popup.auth.show = false"
          v-bind:modal="popup.auth">

      </popup-auth>


    </div>

    <popup-action
        v-if="modal.show === true"
        @closeModal="modal.show = false"
        @actionConfirmed="() => {
          signOut()
          this.modal.show = false
        }"
        :modal="modal"
    >
      <template #header>
        Выйти?
      </template>
      <template #text>
        Вы собиратесь выйти из аккаунта, подтвердите действие.
      </template>
      <template #buttonConfirm>
        Выйти
      </template>
      <template #buttonSecondary>
        Отменить
      </template>
    </popup-action>
  </div>
</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import {userInfo} from "../Store/userInfo.js";
import {staticPages} from "../Store/staticPages.js";
import {signOut} from "../API/user.js";

import popupAuth from "../components/Popups/PopupAuth.vue";
import buttonAuth from "../components/Buttons/ButtonAuth.vue";
import dropdownMenu from "../Blocks/Menus/MenuDropdown.vue";
import iconsMenu from "../Blocks/Menus/MenuIcons.vue";
import menuHeader from "../Blocks/Menus/MenuHeader.vue";
import inputSearch from "../components/Inputs/InputSearch.vue";
import popupAction from "../components/Popups/PopupAction.vue";
import {ref} from "vue";

export default {
  name: "BazaHeader.vue",
  components: {
    popupAuth,
    buttonAuth,
    dropdownMenu,
    iconsMenu,
    menuHeader,
    inputSearch,
    popupAction
  },

  data() {
    return {
      popup: {
        auth: {
          show: false,
          signUp: true
        }
      },

      dropdown: {
        show: false
      },
      modal: {
        show: ref(false)
      },

      staticPages,
      userInfo,
      signOut
    }
  },
  directives: {
    tippy: directive,
  },

  mounted() {
    userInfo.role === 'admin' ? this.isAdmin = true : this.isAdmin = false

  },
  methods: {
    clearCategories() {
      if (this.$route.path === '/' && this.$route.query.clear !== 'true' ) {
        this.$router.replace('/?clear=true')
      } else {
        this.$router.replace('/')
      }

    }
  }
}
</script>

<style scoped lang="scss">

.left, .right {
  display: flex;
  gap: 20px;
  align-items: center;
}
.left {
  width: 50%;
  justify-content: start;
}
.right {
  position: relative;
  width: 50%;
  justify-content: right;
}
@media screen and (max-width: 960px) {
  .right {
    gap: 0;
  }
  .icons-menu {
    order: 1;
  }
  .auth {
    order: 2;
  }
}
@media screen and (max-width: 500px){
  .search {
    display: none;
  }
  .left {
    width: 32%;
    img {
      width: 100%;
    }
  }
  .right {

    width: 65%;
  }
  .nav {
    button {
      margin-left: 5px;
      padding: 5px;
      overflow: hidden;
      width: 80px;
    }
    a {
      margin-left: 5px;
      font-size: 12px;

    }
    .favorites {
      margin-left: 5px;
    }
  }

}

@media screen and (max-width: 768px){
  .search {
    display: none;
  }

}

</style>