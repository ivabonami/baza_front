<template>
  <div class="placeholder-edit">
    Удалить загрушку {{ data.text }}?

    <div class="buttons">
      <button-black
          :type="'button'"
          @buttonPressed="deletePlaceholder(data.id); emits('closePopup')"
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
import {deletePlaceholder} from "@/API/placeholders.js";


const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup'])

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