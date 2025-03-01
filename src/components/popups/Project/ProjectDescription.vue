<template>
<div class="project-description">
  {{ data.description }}

</div>
</template>

<script setup>
const props = defineProps({
  data: null,
})

</script>

<style scoped lang="scss">
.project-description {
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-word;
  color: #191B2A;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 154.183%; /* 21.586px */
  white-space: pre-wrap;
}

</style>