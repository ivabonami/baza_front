<template>
<div>
  <div>
    <DefaultHeader>
      Удалить карточку услуги?
    </DefaultHeader>
    <p style="text-align: center; color: #5D599F">
      Вы уверены что хотите удалить услугу {{ popup.product.name }}?
    </p>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          @click="() => {
            this.loading = true
            deleteProduct(popup.product)
            closePopup()
          }">
        <TheLoader v-if="loading"/>
        <span>Удалить</span>
      </ButtonPrimary>

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="$emit('changeState', 'ProductInfo')">
        <span>Отмена</span>
      </ButtonSecondary>



    </div>


  </div>

</div>
</template>

<script>
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import projectIcon from '@/assets/icons/projectIcon.svg'
import lockIcon from '@/assets/icons/lock-icon.svg'
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup} from "@/js/controllers/popupController.js";
import {popup} from "@/js/controllers/popupController.js";
import {deleteProduct} from "@/API/productsController.js";

export default {
  components: {
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    closePopup,

  },
  data() {
    return {
      projectIcon,
      lockIcon,
      projectId: null,
      data: {
        username: null,
        password: null
      },
      deleteProduct,
      popup,
      closePopup,
      loading: ref(false)
    }
  },
  methods: {

  }
}



</script>

<style scoped lang="scss">
.buttons-group {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
}
</style>