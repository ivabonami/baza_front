<template>
  <div class="placeholder-edit">
    Still in progress, placeholder data: <br>
    Text: {{ placeholderData.text }}<br>
    Style: {{ placeholderData.style }}<br>
    Pos: {{ placeholderData.position }}
  </div>
</template>

<script setup>
import {projects} from "@/Stores/projectsStore.js";

const props = defineProps({
  data: null
})

const placeholderData = projects.find(item => item.id === props.data)

</script>

<style scoped lang="scss">

</style>