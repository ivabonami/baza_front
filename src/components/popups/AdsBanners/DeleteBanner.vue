<template>
  <div class="delete-banner">

    <div class="banner">
      <img :src="api.url + bannerData.path" alt="">
    </div>


    <div class="buttons">
      <button-black
          :type="'button'"
          @click="onDeleteBanner(bannerData)"
          :style="'filled'">
        <div class="button-text">
          Удалить
        </div>
      </button-black>

      <button-secondary
          :type="'button'"
          @click="emits('closePopup')"
          :style="'filled'">
        <div class="button-text">
          Отмена
        </div>
      </button-secondary>
    </div>

  </div>


</template>

<script setup>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {removeAdsBanner} from "@/API/adsBanners.js";
import {api} from "@/API/apiurl.js";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";


const props = defineProps({
  bannerData: null
})

const emits = defineEmits(['closePopup'])

const onDeleteBanner = (banner) => {

  removeAdsBanner(banner.id, banner.type).then(() => {
    emits('closePopup')
  })
}


</script>

<style scoped lang="scss">
.delete-banner {

  .banner {
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
  }
  img {
    width: 100%;
    border-radius: 30px;
  }

  .buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
}
</style>