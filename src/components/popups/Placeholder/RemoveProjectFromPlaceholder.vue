<template>
  <div class="project-remove">
    <p>Вы действительно хотите убрать проект {{ data.name }} из заглушки?</p>

    <div class="buttons">
      <button-black
          :type="'button'"
          @buttonPressed="unlinkProjectWithPlaceholder(data.placeholderId, data.id); emits('closePopup')"
          :style="'filled'">
        <div class="button-text">
          Убрать
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
import {unlinkProjectWithPlaceholder} from "@/API/placeholders.js";


const props = defineProps({
  data: null
})
const emits = defineEmits(['closePopup'])
</script>

<style scoped lang="scss">
.project-remove {
  width: 100%;
  max-width: 550px;

  p {
    margin-bottom: 20px;
  }
  .buttons {
    display: flex;
    gap: 10px;
  }
}
</style>