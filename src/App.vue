<script setup>
import {popup} from "@/js/controllers/popupController.js";
import {defineAsyncComponent, reactive} from "vue";
import {notifications} from "@/js/notifications.js";
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import {RouterView, useRoute, useRouter} from 'vue-router'
import DefaultHeader from "@/core/template/header/DefaultHeader.vue";
import PopupModule from "@/core/layout/popup/PopupModule.vue";
import {popupSettings} from "@/core/layout/popup/popupSettings.js";
import BaseHeader from "@/components/Layout/TemplateParts/BaseHeader.vue";
import ButtonBack from "@/components/Buttons/ButtonBack.vue";

const BaseFooter = defineAsyncComponent({
  loader: () => import("@/components/Layout/TemplateParts/BaseFooter.vue"),
})

const TheNotifications = defineAsyncComponent({
  loader: () => import("@/components/Blocks/TheNotifications.vue"),
})

const PayedBanners = defineAsyncComponent({
  loader: () => import("@/components/Blocks/PayedBanners.vue"),
})

const YandexMetrica = defineAsyncComponent({
  loader: () => import("@/components/Blocks/YandexMetrica.vue"),
})


const route = useRoute()
const router = useRouter()

let scrollTopButton = reactive({show: false})

function scrollToTop() {
  document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
}

function handleScroll() {
  window.scrollY > 200 ? scrollTopButton.show = true : scrollTopButton.show = false
}
window.addEventListener('scroll', handleScroll);

</script>

<template>
    <base-header />
    <payed-banners  v-if="route.path === '/'" />

  <base-layout>
    <template #main>
        <button-back v-if="route.name !== 'home'" />
      <RouterView />
    </template>
  </base-layout>

    <footer>
        <base-footer />
    </footer>

  <yandex-metrica />

  <TheNotifications v-if="notifications.length > 0" />

  <div class="scroll-to-top-wrapper">
    <div class="scroll-to-top" v-show="scrollTopButton.show" ref="scrollToTop" @click="scrollToTop">
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7L7 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
  </div>

    <popup-module v-if="popupSettings.isVisible" />

</template>

<style scoped lang="scss">
.scroll-to-top-wrapper {
  max-width: 1400px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  height: 0;
  right: 0;
  left: 0;
  z-index: 30;
  position: fixed;
  bottom: 80px;
  display: flex;
  justify-content: end;
}

.scroll-to-top {
  box-sizing: border-box;
  transition: .3s ease;
  border: 1px solid black;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  position: relative;


  svg {
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    width: 25px;
    position: absolute;
    left: 65%;
    top: 60%;
    translate: -50% -50%;


    path {
      stroke: black;
      background-color: #FFC700;
      border-radius: 10px;
    }
  }

}
</style>
