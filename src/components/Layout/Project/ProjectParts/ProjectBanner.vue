<template>
  <div class="project-banner">
    <the-loader v-if="!loading.loaded" />
    <img :src="api.url + banner"
         v-show="loading.loaded"
         alt="Баннер проекта"
         @load="loading.loaded = true">
  </div>
</template>
<script setup>
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import {api} from "@/API/apiurl.js";
import {reactive} from "vue";
const props = defineProps({
  banner: null
})

const loading = reactive({
  loaded: false
})
</script>
<style scoped lang="scss">
.project-banner {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  }
}
</style>