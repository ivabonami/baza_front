<template>
  <div class="placeholder-edit">
    <div class="form">
      <input-text
          style="margin-bottom: 10px;"
          :placeholder="'Надпись в заглушке'"
          @dataChanged="emit => placeholder.text = emit" />


      <input-select-options
          style="width: 50%;"
          :input-data="{
            selected: setSelected('Фиолетовый'),
            items: setNames(placeholderColors)
          }"
          @dataChanged="emit => placeholder.style = placeholderColors.find(item => item.name === emit).value" />

      <input-select-options
          style="width: 50%; margin-top: 10px;"
          :input-data="{
            selected: props.category ? props.category.name : null,
            items: setNames(placeholders.categories)
          }"
          @dataChanged="emit => placeholder.categoryId = categories.allCategories.find(item => item.name === emit).id" />
    </div>



    <div class="buttons">
      <button-black
          :type="'button'"
          @buttonPressed="onAddPlaceholder(placeholder)"
          :style="'filled'">
        <div class="button-text">
          Добавить
        </div>
      </button-black>
      <button-secondary
          :type="'button'"
          @buttonPressed="emits('closePopup')"
          :style="'outline'">
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
import InputText from "@/components/Inputs/InputText.vue";
import InputSelectOptions from "@/components/Inputs/InputSelectOptions.vue";
import {placeholderColors} from "@/js/placeholderColors.js";
import {addPlaceholders, getPlaceholders, placeholders} from "@/API/placeholders.js";
import {useRoute} from "vue-router";
import {projects} from "@/Stores/projectsStore.js";
import {categories} from "@/Stores/categories.js";
import {addNotice} from "@/js/notifications.js";

const route = useRoute()
const props = defineProps({
  category: null
})

getPlaceholders(route.query.categoryIds || null)

function setNames(data) {
  let names = [];
  for (const name of data) {
    names.push(name.name)
  }
  return names
}


function setSelected(color) {
    try {
      return placeholderColors.find(item => item.value === color).name
    } catch (e) {
      return placeholderColors[0]
    }
}



const emits = defineEmits(['closePopup'])

const placeholder = {
  text: null,
  style: placeholderColors[0].value,
  categoryId: props.category ? props.category.id : null,
}


function onAddPlaceholder(placeholder) {
  emits('closePopup')
  addPlaceholders({
    text: placeholder.text,
    style: placeholder.style,
  }, placeholder.categoryId).then(() => {
    try {
      if (props.category && placeholder.categoryId === props.category.id) {
        placeholders.categoryPlaceholders.push(placeholder)
      } else if (!props.category && !placeholder.categoryId) {
        placeholders.categoryPlaceholders.push(placeholder)
      }

    } catch (e) {

      if (props.category && placeholder.categoryId === props.category.id) {
        projects.push(placeholder)
      } else if (!props.category && !placeholder.categoryId) {
        projects.push(placeholder)
      }
    }
    emits('closePopup')
  }).catch(err => {
    console.log(err)
    addNotice({name: 'Не удалось изменить заглушку', type: 'danger'})
  })
}

</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  margin-top: 20px;
  gap: 10px;
}
</style>