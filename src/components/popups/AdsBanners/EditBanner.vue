<template>
  <div class="add-banner">
    <div class="inputs">
      <input-text style="margin-bottom: 20px;"
                  :placeholder="'Ссылка'"
                  :input-data-prop="editedBanner.link"
                  @data-changed="emit => editedBanner.link = emit"/>
      <input-file style="margin-bottom: 20px;"
                  :data="editedBanner.path"
                  @data-changed="emit => editedBanner.path = emit">
        Загрузите гифку рекламаного баннера.<br/>Желательно перед заливом ее сжать в онлайн сервисе.
      </input-file>
    </div>

    <div class="banner-size" style="margin-bottom: 20px;">
      <div class="size-select " :class="{selected: editedBanner.type === 'large'}" @click="editedBanner.type = 'large'">
        <p>Большой</p>
      </div>
      <div class="size-select " :class="{selected: editedBanner.type === 'small'}" @click="editedBanner.type = 'small'">
        <p>Маленький</p>
      </div>
    </div>
    <div class="buttons">
      <button-black
          :type="'button'"
          @click="onEditBanner(editedBanner)"
          :style="'filled'">
        <div class="button-text">
          Изменить
        </div>
      </button-black>
    </div>

  </div>
</template>

<script setup>
import InputText from "@/components/Inputs/InputText.vue";
import InputFile from "@/components/Inputs/InputFile.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {editAdsBanner} from "@/API/adsBanners.js";
import {ref} from "vue";

const props = defineProps({
  bannerData: null
})

const editedBanner = ref({
  id: props.bannerData.id,
  link: props.bannerData.link,
  path: props.bannerData.path,
  type: props.bannerData.type
})
const emits = defineEmits(['closePopup'])

const onEditBanner = (banner) => {
  editAdsBanner(banner.id, banner.path, banner.link, banner.type, props.bannerData.type)
      .then(() => emits('closePopup'))
}

</script>

<style scoped lang="scss">
.add-banner {
  max-width: 450px;
  .banner-size {
    display: flex;
    gap: 10px;
    width: 100%;

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