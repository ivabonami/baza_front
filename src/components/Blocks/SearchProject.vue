<template>
  <div class="search-project">
    <div class="search-project-input">
      <input-search @project-selected="emit => {
        relinkProjectToPlaceholder(props.data, emit)
        emits('closePopup')
      }"/>
    </div>

  </div>
</template>

<script setup>
import InputSearch from "@/components/Inputs/InputSearch.vue";
import {relinkProjectToPlaceholder} from "@/API/placeholders.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup'])

</script>

<style scoped lang="scss">
.search-project {
  .search-project-input {
    position: relative;
  }
}

</style>