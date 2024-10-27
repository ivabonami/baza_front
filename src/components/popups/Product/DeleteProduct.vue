<template>
  <div class="delete-product" >
    <p>Вы собираетесь удалить товар/услугу <b>{{ props.data.name }}</b>, подтвердите действие</p>

    <div class="buttons">
      <button-black
          style="margin-top: 20px;"
          :type="'button'"
          @click="onDeleteProduct()"
          :style="'filled'">
        <div class="button-text">
          Удалить
        </div>
      </button-black>

      <button-secondary
          style="margin-top: 20px;"
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
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {deleteProduct} from "@/API/productsController.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup', 'productDeleted'])

const onDeleteProduct = () => {
  deleteProduct(props.data).then(() => {
    emits('productDeleted', props.data)
    emits('closePopup')
  })
}
</script>

<style scoped lang="scss">
.delete-product {
  max-width: 550px;

  p {
    color: #9a2929;
    font-size: 20px;
  }
}
.buttons {
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
}

</style>