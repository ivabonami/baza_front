<template>
<div>
  <div>
    <DefaultHeader>

    </DefaultHeader>
    <div class="placeholder-add">
      <div class="image">
        <input-file style="width: 200px" @dataChanged="emit => product.avatarFilePath = emit">
          Загрузите баннер профиля вашего проекта в размере 500х500px
        </input-file>
      </div>
      <div class="edit">
        <input-text
            class="mb15 h30"
            :data="{
                placeholder: 'Название услуги/товара',
                icon: nameIcon
              }"
            @keydown.enter="() => {
              this.loading = true

              }"
            :input-data-prop="this.product.name"
            @dataChanged="emit => product.name = emit" />

        <input-textarea
            style="height: 200px"
            class="mb15 h30"
            :placeholder="'описание'"
            @keydown.enter="() => {
              this.loading = true

              }"
            @dataChanged="emit => product.description = emit" />
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
          <span>Добавить</span>
        </div>

      </ButtonPrimary>

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="$emit('changeState', 'ProductInfo')">
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
import {addProduct} from "@/API/productsController.js";
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
      product: {
        name: null,
        description: null,
        avatarFilePath: null,
        projectId: popup.projectId
      },
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

      if (!this.product.name) {
        addNotice({name: 'Введите имя', type: 'warning'})

      } else if (!this.product.avatarFilePath) {
        addNotice({name: 'Загрузите изображение', type: 'warning'})
      } else if (!this.product.description || this.product.description.length < 20) {
        addNotice({name: 'Введите описание, оно должно быть более 20 символов', type: 'warning'})
      } else {
        addProduct(this.product).then(() => {
          addNotice({name: 'Карточка продукта успешно добавлена', type: 'success'})
          closePopup()

        })
      }
      this.loading = false
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

    .image {
      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
    }
    .edit {
      width: 100%;
    }
    .h30 {
      height: 40px;
    }
  }
}
</style>