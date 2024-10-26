<template>
  <div class="stat">
    <inline-svg class="stat-icon" v-if="data.icon" :src="data.icon" />
    <span>{{ data.data }}</span>

  </div>
</template>

<script setup>

import {ref} from "vue";

const props = defineProps({
  data: ref({
    icon: null,
    data: null,
  })
})

</script>

<style scoped lang="scss">

.stat {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 3px;

  svg {
    max-width: 13px;
    position: relative;
    top: 0px;
  }
  span {
    color: #1E1E1E;
    font-size: 12px;
    font-weight: 400;
  }
}

</style>