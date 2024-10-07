<script setup>
import {popup} from "@/js/controllers/popupController.js";
import {defineAsyncComponent, reactive, shallowRef} from "vue";
import {notifications} from "@/js/notifications.js";
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { RouterLink, RouterView } from 'vue-router'

const ThePopup = defineAsyncComponent({
  loader: () => import("@/components/popups/ThePopup.vue"),
  delay: 200,
  timeout: 3000
})

const BaseHeader = defineAsyncComponent({
  loader: () => import("@/components/Layout/TemplateParts/BaseHeader.vue"),
  delay: 200,
  timeout: 3000
})

const BaseFooter = defineAsyncComponent({
  loader: () => import("@/components/Layout/TemplateParts/BaseFooter.vue"),
  delay: 200,
  timeout: 3000
})

const TheNotifications = defineAsyncComponent({
  loader: () => import("@/components/Blocks/TheNotifications.vue"),
  delay: 200,
  timeout: 3000
})

const PayedBanners = defineAsyncComponent({
  loader: () => import("@/components/Blocks/PayedBanners.vue"),
  delay: 200,
  timeout: 3000
})

const YandexMetrica = defineAsyncComponent({
  loader: () => import("@/components/Blocks/YandexMetrica.vue"),
  delay: 200,
  timeout: 3000
})

import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

const { x, y } = useMouse()

</script>

<template>
  <base-layout>
    <template #header>
      <base-header />
      <payed-banners />
    </template>

    <template #main>
      <RouterView />
    </template>

    <template #footer>
      <base-footer />
    </template>

  </base-layout>

  <ThePopup v-if="popup.show" />

  <yandex-metrica />

  <TheNotifications v-if="notifications.length > 0" />

</template>

<style scoped>

</style>
