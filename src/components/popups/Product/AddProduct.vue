<template>
  <div class="add-product">
    <div class="inputs">
      <input-file style="margin-bottom: 20px; max-width: 200px" @data-changed="emit => product.avatarFilePath = emit" >
        Загрузите изображение товара или услуги, рекомендованный размер 512х512px, до 5мб.
      </input-file>
      <input-text style="margin-bottom: 20px;" :placeholder="'Название товара или услуги'" @data-changed="emit => product.name = emit"/>
      <input-textarea style="margin-bottom: 20px; height: 250px; width: 100%; min-width: 300px;" :placeholder="'Описание товара или услуги'" @data-changed="emit => product.description = emit"/>

    </div>

    <div class="buttons">
      <button-black
          :type="'button'"
          @click="onAddProduct(product)"
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
import InputTextarea from "@/components/Inputs/InputTextarea.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {reactive} from "vue";
import {addNotice} from "@/js/notifications.js";
import {addProduct} from "@/API/productsController.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['productAdded', 'closePopup'])

const product = reactive({
  name: '',
  avatarFilePath: '',
  description: '',
  projectId: null
})

const onAddProduct = (product) => {
  if (product.name.length <= 0) {
    addNotice({name: 'Введите название товара или услуги', type: 'danger'})
  } else if (product.description <= 0) {
    addNotice({name: 'Введите описание товара или услуги', type: 'danger'})
  } else if (product.avatarFilePath <= 0 ) {
    addNotice({name: 'Загрузите аватар товара или услуги', type: 'danger'})
  } else {
    product.projectId = props.data
    addProduct(product).then(() => {
      emits('productAdded', product)
      emits('closePopup')
    })
  }
}


</script>

<style scoped lang="scss">
.add-product {
  width: 100%;
  max-width: 450px;
  min-width: 300px;
}
</style>