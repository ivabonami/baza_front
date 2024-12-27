<template>
  <div class="link-editor">
    <div class="link-editor-inputs">
    <input-text
        :data="{}"
        :input-data-prop="data.dailyViewsIncrement"
        @keydown.enter="emits('dailyViewsIncrementChanged', data.dailyViewsIncrement)"
        @dataChanged="emit => data.dailyViewsIncrement = emit" />
    </div>

    <div class="buttons-group">
      <button-black
          :type="'button'"
          @buttonPressed="emits('dailyViewsIncrementChanged', data.dailyViewsIncrement)"
          :style="'filled'">
        <div class="button-text">
          Сохранить
        </div>
      </button-black>

    </div>
  </div>
</template>

<script setup>
import InputText from "@/components/Inputs/InputText.vue";
import ButtonBlack from '@/components/Buttons/ButtonBlack.vue'

const props = defineProps(['data'])

const emits = defineEmits(['linkEdited', 'closePopup'])


</script>

<style scoped lang="scss">

.buttons-group {
  display: flex;
  align-items: center;
  width: 100%;
}
.link-editor {
  .link-editor-inputs {
    display: flex;
    gap: 5px;
  }
}

</style>