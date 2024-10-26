<template>
  <div class="header-auth">

    <button-header-menu
        v-if="userStore.username"
        data-dropdown="adminMenu"
        @click="userMenu.show = true">
      <div class="button-content">
        {{ userStore.username }}
      </div>
    </button-header-menu>

    <button-header-menu
        @click="authPopup.show = true; component = 'SignIn'; authPopup.headline = 'Авторизация'"
        v-else-if="!userStore.username" >
      <div class="button-content">
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 7L14 11M14 11L10 15M14 11H1M1.33782 6C3.06687 3.01099 6.29859 1 10 1C15.5228 1 20 5.47715 20 11C20 16.5228 15.5228 21 10 21C6.29859 21 3.06687 18.989 1.33782 16" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        Авторизоваться
      </div>
    </button-header-menu>

    <dropdown-box :selector="'adminMenu'"
                  v-if="userMenu.show"
                  @closeDropdown="userMenu.show = false" >
      <user-menu @close-menu="userMenu.show = false"
                 @add-banner="onAddBanner()"
                 @sign-out="onSignOut()"
      />
    </dropdown-box>

    <Teleport to="body" v-if="authPopup.show">
      <the-baza-popup
          :headline="authPopup.headline"
          @closePopup="authPopup.show = false"
      >
        <auth-controller :setComponent="component" @closePopup="authPopup.show = false"/>
      </the-baza-popup>
    </Teleport>

    <Teleport to="body" v-if="addBanner.show">
      <the-baza-popup
          :headline="addBanner.headline"
          @closePopup="addBanner.show = false"
      >
        <add-banner @close-popup="addBanner.show = false" />
      </the-baza-popup>
    </Teleport>



  </div>
</template>

<script setup>
import ButtonHeaderMenu from "@/components/Layout/TemplateParts/HeaderParts/ButtonHeaderMenu.vue"
import {userStore} from "@/Stores/userStore.js";
import DropdownBox from "@/components/ReUsable/DropdownBox.vue";
import UserMenu from "@/components/Layout/TemplateParts/HeaderParts/UserMenu.vue"
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";
import AuthController from '@/components/popups/controllers/Auth/AuthController.vue'
import AddBanner from '@/components/popups/AdsBanners/AddBanner.vue'


import {reactive, ref} from "vue";

const userMenu = ref({
  show: false
})

let component = ref(String)

const authPopup = reactive({
  show: false,
  headline: 'Выполните действие'
})

const addBanner = reactive({
  show: false,
  headline: 'Добавить рекламный баннер'
})

const onSignOut = () => {
  component = 'SignOut'
  authPopup.show = true
  authPopup.headline = 'Выйти?'
}

const onAddBanner = () => {
  component = 'AddBanner'
  addBanner.show = true
}
</script>

<style scoped lang="scss">
.header-auth {
  display: flex;
  gap: 5px;
  padding: 5px;
  box-sizing: border-box;

  .button-content {
    svg {
      path {
        stroke: #FFFFFF;
      }
    }
  }
}
</style>