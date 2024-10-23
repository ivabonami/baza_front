<template>
  <div class="placeholder-edit">
    Удалить загрушку {{ data.text }}?

    <div class="buttons">
      <button-black
          :type="'button'"
          @buttonPressed="onDeletePlaceholder(data.id); "
          :style="'filled'">
        <div class="button-text">
          Удалить
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
import {deletePlaceholder, placeholders} from "@/API/placeholders.js";
import {projects} from "@/Stores/projectsStore.js";
import {useRoute} from "vue-router";


const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup'])

const route = useRoute()

function onDeletePlaceholder(placeholderId) {

  deletePlaceholder(placeholderId)
      .then(() => {
        if (route.path === '/payed-editor') {
          try {
            placeholders.categoryPlaceholders.splice(placeholders.categoryPlaceholders.findIndex(item => item.id === placeholderId), 1)
          } catch (e) { addNotice({name: 'Не удалось обновить позицию', type: 'warning'}) }
        } else {
          try {
            projects.splice(projects.findIndex(item => item.id === placeholderId && !item.type), 1)
          } catch (e) { addNotice({name: 'Не удалось обновить позицию', type: 'warning'}) }
        }
      })
      .catch(error => {
        addNotice({name: 'Не удалось удалить заглушку', type: 'danger'})
      })

  emits('closePopup')
}

</script>

<style scoped lang="scss">
.placeholder-edit {
  .buttons {
    display: flex;
    margin-top: 20px;
    gap: 10px;
  }
}
</style>