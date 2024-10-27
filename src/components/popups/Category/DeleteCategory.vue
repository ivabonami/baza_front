<template>
<div>
  <div>
    <DefaultHeader>
      Удалить {{ popup.category.name }}?
    </DefaultHeader>
    <p style="text-align: center; color: #5D599F">
      Вы уверены что хотите удалить категорию {{ popup.category.name }}
    </p>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          @click="() => {
            this.loading = true
            onDeleteCategory()
          }">
        <TheLoader v-if="loading"/>
        <span>Удалить</span>
      </ButtonPrimary>

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="closePopup()">
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
import inputText from "@/components/Inputs/InputText.vue";
import {popup} from "@/js/controllers/popupController.js";
import {addNotice} from "@/js/notifications.js";
import {categories} from "@/Stores/categories.js";
import {deleteCategory} from "@/API/categoriesController.js";

export default {
  components: {
    inputText,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    closePopup
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
      addNotice,
      popup,
      closePopup,
      loading: ref(false)
    }
  },
  methods: {
    onDeleteCategory() {
      categories.allCategories.splice(categories.allCategories.findIndex(item => item.id === popup.category.id), 1)

      deleteCategory(popup.category.id).then(() => {
        addNotice({name: 'Категория успешно удалена', type: 'success'})
      }).catch(error => {addNotice({name: 'Ошибка удаления', type: 'danger'})})
      closePopup()
    }


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