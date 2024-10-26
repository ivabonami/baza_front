<template>
  <div class="add-banner">
    <div class="inputs">
      <input-text style="margin-bottom: 20px;" :placeholder="'Ссылка'" @data-changed="emit => banner.link = emit"/>
      <input-file style="margin-bottom: 20px;" @data-changed="emit => banner.path = emit">
        Загрузите гифку рекламаного баннера.<br/>Желательно перед заливом ее сжать в онлайн сервисе.
      </input-file>
    </div>

    <div class="banner-size" style="margin-bottom: 20px;">
      <div class="size-select " :class="{selected: banner.type === 'large'}" @click="banner.type = 'large'">
        <p>Большой</p>
      </div>
      <div class="size-select " :class="{selected: banner.type === 'small'}" @click="banner.type = 'small'">
        <p>Маленький</p>
      </div>
    </div>
    <div class="buttons">
      <button-black
          :type="'button'"
          @click="onAddBanner(banner)"
          :style="'filled'">
        <div class="button-text">
          Добавить
        </div>
      </button-black>
    </div>

  </div>
</template>

<script setup>
import InputText from "@/components/Inputs/InputText.vue";
import InputFile from "@/components/Inputs/InputFile.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {ref} from "vue";
import {addAdsBanner} from "@/API/adsBanners.js";

const banner = ref({
  path: null,
  link: null,
  type: 'large'
})

const emits = defineEmits(['closePopup'])

const onAddBanner = (banner) => {
  addAdsBanner(banner.path, banner.link, banner.type).then(result => {
    emits('closePopup')
  })
}

</script>

<style lang="scss" scoped>
.add-banner {
  max-width: 450px;
  .banner-size {
    display: flex;
    gap: 10px;

    
    .size-select {
      width: 100%;
      text-align: center;
      align-items: center;
      height: 30px;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 20px;
      border: 1px solid #c7c7c7;
      cursor: pointer;
      transition: .3s ease;
      p {
        width: 100%;
      }

      &.selected {
        border-color: #5D599F;
        background-color: #5D599F;
        color: #FFFFFF;
      }
    }
  }
}
</style>