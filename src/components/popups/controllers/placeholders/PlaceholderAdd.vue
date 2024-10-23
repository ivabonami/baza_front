<template>
  <div class="placeholder-edit">
    <div class="form">
      <input-text
          style="margin-bottom: 10px;"
          :data="{ placeholder: 'Надпись в заглушке' }"
          @keydown.enter="onEditPlaceholder(placeholder)"
          @dataChanged="emit => placeholder.text = emit" />


      <input-select-options
          style="width: 50%;"
          :input-data="{
            selected: setSelected('Фиолетовый'),
            items: setNames(placeholderColors)
          }"
          @dataChanged="emit => placeholder.style = placeholderColors.find(item => item.name === emit).value" />

      <input-select-options
          style="width: 50%;"
          :input-data="{
            selected: (placeholders.categoryPlaceholders.length + 1),
            items: (placeholders.categoryPlaceholders.length + 1)
          }"
          @dataChanged="emit => placeholder.position = emit - 1" />

      Props: {{ props }}
      <input-select-options
          style="width: 50%;"
          :input-data="{
            selected: 0,
            items: setNames(placeholders.categories)
          }"
          @dataChanged="emit => placeholder.position = emit - 1" />
    </div>



    <div class="buttons">
      <button-black
          :type="'button'"
          @buttonPressed="onEditPlaceholder(placeholder)"
          :style="'filled'">
        <div class="button-text">
          Изменить
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
import {editPlaceholder, getPlaceholders, placeholders} from "@/API/placeholders.js";
import {useRoute} from "vue-router";
import {projects} from "@/Stores/projectsStore.js";

const route = useRoute()

getPlaceholders(route.query.categoryIds || null)

function setNames(data) {
  let names = [];
  for (const name of data) {
    names.push(name.name)
  }
  return names
}


function setNewColor(color) {
  placeholder.color = placeholderColors.find(item => item.name === color).value
}
function setNewCategory(category) {
  placeholder.categoryId = placeholderColors.find(item => item.category === category).id
}


function setSelected(color) {
    try {
      return placeholderColors.find(item => item.value === color).name
    } catch (e) {
      return placeholderColors[0]
    }
}

const props = defineProps({
  categoryId: null
})

const emits = defineEmits(['closePopup'])

const placeholder = props.data



function onEditPlaceholder(placeholder) {
  emits('closePopup')
  editPlaceholder({
    placeholderId: placeholder.id,
    text: placeholder.text,
    style: placeholder.style,
    position: placeholder.position
  }).then(() => {

    if (route.path === '/payed-editor') {
      try {
        placeholders.categoryPlaceholders.splice(placeholders.categoryPlaceholders.findIndex(item => item.id === placeholder.id), 1)
        placeholders.categoryPlaceholders.splice(placeholder.position, 0, placeholder)
      } catch (e) { addNotice({name: 'Не удалось обновить позицию', type: 'warning'}) }

    } else {
      try {
        projects.splice(projects.findIndex(item => item.id === placeholder.id && !item.type), 1)
        projects.splice(placeholder.position, 0, placeholder)
      } catch (e) { addNotice({name: 'Не удалось обновить позицию', type: 'warning'}) }
    }
    addNotice({name: 'Заглушка изменена успешно', type: 'success'})
  }).catch(err => {
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