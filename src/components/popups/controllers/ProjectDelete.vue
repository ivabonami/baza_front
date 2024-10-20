<template>
  <div class="delete-project">

    <p>Вы собираетесь удалить проект <b>{{ data.name }}</b>!</p>
    <div class="buttons-group">
      <button-black
          :type="'button'"
          @buttonPressed="deleteProject(data); emits('closePopup')"
          :style="'filled'">
        <div class="button-text">
          Удалить
        </div>
      </button-black>

      <button-secondary-gray
          :type="'button'"
          @buttonPressed="emits('closePopup')"
          :style="'filled'">
        <div class="button-text">
          Отменить
        </div>
      </button-secondary-gray>
    </div>
  </div>
</template>

<script setup>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import ButtonSecondaryGray from "@/components/Buttons/ButtonSecondaryGray.vue";
import {deleteProject} from "@/API/projectsController.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup'])
</script>

<style scoped lang="scss">

</style>