<template>
  <div class="search-project">
    <div class="search-project-input">
      <input-search @project-selected="emit => {
        props.data.project ? relinkProjectToPlaceholder(props.data.id, emit) : linkProjectWithPlaceholder(props.data.id, emit)
        emits('closePopup')
      }"/>
    </div>

  </div>
</template>

<script setup>
import InputSearch from "@/components/Inputs/InputSearch.vue";
import {relinkProjectToPlaceholder, linkProjectWithPlaceholder} from "@/API/placeholders.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup'])

</script>

<style scoped lang="scss">
.search-project {
  height: 100%;
  width: 60vw;
  box-sizing: border-box;

  .search-project-input {
    position: absolute;
    width: 90%;
    left: 5%;
    right: 0;
  }
}

@media screen and (max-width: 500px){
  .search-project {
    width: 90vw;
  }
}

</style>