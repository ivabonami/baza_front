<template>
  <div class="add-banner">
    <div class="inputs">
      <input-text />
      <input-file />
    </div>

    <div class="banner-size">
      <div class="size-select " :class="{selected: banner.type === 'large'}">
        Большой
      </div>
      <div class="size-select " :class="{selected: banner.type === 'small'}">
        Маленький
      </div>
    </div>
    <div class="buttons">
      <button-black
          :type="'button'"
          @buttonPressed=""
          :style="'filled'">
        <div class="button-text">
          Добавить
        </div>
      </button-black>
    </div>
  </div>
</template>

<script setup>
import InputText from "@/components/Inputs/InputText.vue";
import InputFile from "@/components/Inputs/InputFile.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {ref} from "vue";

const banner = ref({
  path: null,
  link: null,
  type: 'large'
})

</script>

<style scoped>

</style>