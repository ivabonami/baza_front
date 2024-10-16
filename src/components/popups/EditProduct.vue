<template>
<div>
  <div>
    <DefaultHeader>
      Изменить {{popup.product.name}}
    </DefaultHeader>
    <div class="placeholder-add">
      <div class="image">
        <input-file style="width: 200px" :data="popup.product.avatarFilePath" @dataChanged="emit => popup.product.avatarFilePath = emit">
          Загрузите баннер профиля вашего проекта в размере 1600x220px или оставьте поле пустым
        </input-file>
      </div>
      <div class="edit">
        <input-text
            class="mb15 h30"
            :data="{
                placeholder: 'Надпись',
                icon: nameIcon
              }"
            @keydown.enter="() => {
              this.loading = true

              }"
            :inputDataProp="popup.product.name"
            @dataChanged="emit => popup.product.name = emit" />



        <input-textarea
            style="height: 300px"
            class="mb15 h30"
            :data="{
                placeholder: 'Надпись',
                icon: nameIcon
              }"
            @keydown.enter="() => {
              this.loading = true

              }"
            :inputDataProp="popup.product.description"
            @dataChanged="emit => popup.product.description = emit" />
      </div>





    </div>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          :link="'https://t.me/bitmafia_bot'"
          @click="() => {
            this.loading = true
            this.onEditProduct()
          }">
        <div class="button-content">
          <TheLoader v-if="loading"/>
          <span>Изменить</span>
        </div>

      </ButtonPrimary>

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="closePopup()">
        <div class="button-content">
          <span>Отмена</span>
        </div>

      </ButtonSecondary>



    </div>


  </div>

</div>
</template>

<script>
import InputFile from "@/components/Inputs/InputFile.vue";


import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import nameIcon from '@/assets/icons/icon-edit-4.svg'
import colorIcon from '@/assets/icons/icon-color.svg'
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import inputText from "@/components/Inputs/InputText.vue";
import inputSelectOption from "@/components/Inputs/InputSelectOption.vue";
import {placeholderColors} from "@/js/placeholderColors.js";
import InputTextarea from "@/components/Inputs/InputTextarea.vue";
import {updateProduct} from "@/API/productsController.js";
import {addNotice} from "@/js/notifications.js";

export default {
  components: {
    InputTextarea,
    inputText,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    inputSelectOption,
    InputFile
  },
  data() {
    return {
      nameIcon,
      colorIcon,
      popup,
      projectId: null,
      data: {
        username: null,
        password: null
      },
      allCats: [],
      closePopup,
      placeholderColors,
      loading: ref(false)
    }
  },
  methods: {

    onEditProduct() {
      updateProduct(popup.product).then(() => {
        addNotice({name: 'Карточка продукта успешно отредактирована', type: 'success'})
        closePopup()

      })
    }
  },
  mounted() {

  }
}



</script>

<style scoped lang="scss">
.placeholder-add {
  display: flex;
  gap: 15px;
  width: 100%;

  .image {
    width: 35%;
    height: 35%;
  }
  .edit {
    width: 65%;
  }
}
.buttons-group {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
}
.h30 {
  height: 50px;
}

@media screen and (max-width: 500px){
  .placeholder-add {
    flex-wrap: wrap;
    max-height: 60vh;
    overflow: hidden auto;
    .image {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .edit {
      width: 100%;
    }
  }
}
</style>