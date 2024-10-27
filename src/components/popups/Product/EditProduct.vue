<template>
  <div class="add-product">
    <div class="inputs">
      <input-file style="margin-bottom: 20px;"
                  :data="data.avatarFilePath"
                  @data-changed="emit => product.avatarFilePath = emit">
        Загрузите изображение товара или услуги, рекомендованный размер 512х512px, до 5мб.
      </input-file>

      <input-text :input-data-prop="data.name"
                  style="margin-bottom: 20px;"
                  :placeholder="'Название товара или услуги'"
                  @data-changed="emit => product.name = emit"/>

      <input-textarea style="margin-bottom: 20px;"
                      :input-data-prop="data.description"
                      :placeholder="'Описание товара или услуги'"
                      @data-changed="emit => product.description = emit"/>

    </div>

    <div class="buttons">
      <button-black
          :type="'button'"
          @click="onEditProduct(product)"
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
import InputTextarea from "@/components/Inputs/InputTextarea.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {onMounted, reactive} from "vue";
import {addNotice} from "@/js/notifications.js";
import {updateProduct} from "@/API/productsController.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['productUpdated', 'closePopup'])

const product = reactive({
  name: props.data.name,
  id: props.data.id,
  avatarFilePath: props.data.avatarFilePath,
  description: props.data.description,
  projectId: props.data.ProjectId
})


const onEditProduct = (product) => {
  if (product.name.length <= 0) {
    addNotice({name: 'Введите название товара или услуги', type: 'danger'})
  } else if (product.description <= 0) {
    addNotice({name: 'Введите описание товара или услуги', type: 'danger'})
  } else if (product.avatarFilePath <= 0 ) {
    addNotice({name: 'Загрузите аватар товара или услуги', type: 'danger'})
  } else {
    product.projectId = props.data
    updateProduct(product).then(() => {
      emits('productUpdated', product)
      emits('closePopup')
    })
  }
}



</script>

<style scoped lang="scss">

</style>