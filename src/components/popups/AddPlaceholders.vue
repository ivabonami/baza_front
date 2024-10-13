<template>
<div>
  <div>
    <DefaultHeader>
      Добавить заглушку
    </DefaultHeader>
    <div class="placeholder-add">
      <input-text
          class="mb15 h30"
          :data="{
                placeholder: 'Надпись',
                icon: nameIcon
              }"
          @keydown.enter="() => {
              this.loading = true
              this.addPlaceholder()
              }"
          @dataChanged="emit => this.placeholder.placeholdersParams[0].text = emit" />

      <input-select-option
          class="mb15"
          :data="{
                placeholder: 'Цвет',
                icon: colorIcon,
                name: 'Цвет',
                data: placeholderColors
              }"
          :selector="'color'"
          @dataChanged="emit => this.placeholder.placeholdersParams[0].style = emit.value" />

      <input-select-option
          class="mb15"
          :data="{
                placeholder: 'Категория',
                icon: colorIcon,
                name: 'Категория',
                data: allCats
              }"
          :selector="'category'"
          @dataChanged="emit => this.placeholder.categoryId = emit.id" />

    </div>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          :link="'https://t.me/bitmafia_bot'"
          @click="() => {
            this.loading = true
            this.addPlaceholder()
          }">
        <TheLoader v-if="loading"/>
        <span>Добавить заглушку</span>
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
import nameIcon from '@/assets/icons/icon-edit-4.svg'
import colorIcon from '@/assets/icons/icon-color.svg'
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup} from "@/js/controllers/popupController.js";
import inputText from "@/components/Inputs/InputText.vue";
import inputSelectOption from "@/components/Inputs/InputSelectOption.vue";
import {addPlaceholders, linkProjectWithPlaceholder, placeholders} from "@/API/placeholders.js";
import {addNotice} from "@/js/notifications.js";
import {categories} from "@/Stores/categories.js";
import {placeholderColors} from "@/js/placeholderColors.js";

export default {
  components: {
    inputText,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    inputSelectOption
  },
  data() {
    return {
      placeholderColors,
      nameIcon,
      colorIcon,
      projectId: null,
      data: {
        username: null,
        password: null
      },
      placeholder: {
        placeholdersParams: [{
          style: 'background: linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255) 0px) padding-box padding-box, linear-gradient(-45deg, rgb(116, 58, 213), rgb(213, 58, 157)) border-box border-box;',
          text: null
        }],
        categoryId: 3
      },
      allCats: [],
      closePopup,
      loading: ref(false)
    }
  },
  methods: {
    addPlaceholder() {

      addPlaceholders(this.placeholder)
          .then(result => {
            addNotice({name: 'Заглушка успешно добавлена', type: 'success'})
            this.loading = false

            for (let placeholder of result.data.placeholders) {
              if (this.placeholder.categoryId === placeholders.categoryId) {
                placeholders.categoryPlaceholders.push(placeholder)
              }

            }
          })
          .catch(error => {
            addNotice({name: 'Ошибка, соси бибу', type: 'danger'})
            this.loading = false
          })
    }

  },
  mounted() {
    this.allCats = categories.allCategories
    this.allCats.push({
      name: 'Главная'
    })
  },
  beforeUnmount() {
    this.allCats.splice(this.allCats.findIndex(item => item.name === 'Главная'))
  }
}



</script>

<style scoped lang="scss">
.placeholder-add {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;


}
.buttons-group {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
}
.h30 {
  height: 50px;
}
</style>