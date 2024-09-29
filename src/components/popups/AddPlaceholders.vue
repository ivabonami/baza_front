<template>
<div>
  <div>
    <DefaultHeader>
      Добавить заглушку
    </DefaultHeader>
    <div class="placeholder-add">
      <input-text
          class="mb15"
          :data="{
                placeholder: 'Надпись в заглушке',
                icon: nameIcon
              }"
          @keydown.enter="() => {
              this.loading = true
              this.addPlaceholder()
              }"
          @textData="emit => this.placeholder.text = emit" />

      <input-select-option
          class="mb15"
          :data="{
                placeholder: 'Цвет',
                icon: colorIcon,
                name: 'Выберите цвет'
              }"
          @textData="emit => this.placeholder.style = emit" />

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
      nameIcon,
      colorIcon,
      projectId: null,
      data: {
        username: null,
        password: null
      },
      placeholder: {
        style: null,
        text: null
      },
      closePopup,
      loading: ref(false)
    }
  },
  methods: {
    addPlaceholder() {

      const placeholderParams = []
      placeholderParams.push(this.placeholder)

      addPlaceholders(placeholderParams)
          .then(result => {
            addNotice({name: 'Заглушка успешно добавлена', type: 'success'})
            this.loading = false

            for (let placeholder of result.data.placeholders) {
              placeholders.categoryPlaceholders.push(placeholder)
            }
          })
          .catch(error => {
            addNotice({name: 'Ошибка, соси бибу', type: 'danger'})
            this.loading = false
          })
    }

  }
}



</script>

<style scoped lang="scss">
.placeholder-add {
  display: flex;
  gap: 10px;
}
.buttons-group {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
}
</style>