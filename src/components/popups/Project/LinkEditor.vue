<template>
  <div class="link-editor" v-if="props.linkToEdit">
    <div class="link-editor-inputs">
      <input-select-options
          style="width: 40%;"
          :input-data="{
            selected: props.linkToEdit.name,
            items: LinksNames
          }"
          @dataChanged="emit => newLink.name = emit" />

    <input-text
        :data="{
                placeholder: 'Надпись',
              }"
        @keydown.enter="() => {}"
        :inputDataProp="props.linkToEdit.link"
        @dataChanged="emit => newLink.link = emit" />
    </div>
    <div class="buttons-group">
      <button-black
          :type="'button'"
          @buttonPressed="emits('linkEdited', newLink)"
          :style="'filled'">
        <div class="button-text">
          Изменить ссылку
        </div>
      </button-black>

      <button-secondary-gray
          :type="'button'"
          @buttonPressed="emits('editAborted')"
          :style="'filled'">
        <div class="button-text">
          Отменить
        </div>
      </button-secondary-gray>
    </div>
  </div>
</template>

<script setup>
import InputText from "@/components/Inputs/InputText.vue";
import ButtonBlack from '@/components/Buttons/ButtonBlack.vue'
import ButtonSecondaryGray from "@/components/Buttons/ButtonSecondaryGray.vue";
import InputSelectOptions from "@/components/Inputs/InputSelectOptions.vue";
import {LinksNames} from "@/Stores/LinksNames.js";
import {ref} from "vue";

const props = defineProps({
  linkToEdit: {
    name: null,
    link: null
  }
})

const newLink = {
  name: props.linkToEdit.name,
  link: props.linkToEdit.link
}

const emits = defineEmits(['linkEdited', 'editAborted'])


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