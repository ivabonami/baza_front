<template>
  <button class="button back" @click="router.back()">
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    Назад
  </button>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter()
</script>

<style scoped lang="scss">

.button {
  background-color: transparent;
  color: #191B2A;
  width: fit-content;

  svg {
    width: 12px;
    height: 12px;
    path {
      stroke: #191B2A;
      stroke-width: 2px;
    }
  }

  &:hover {
    background-color: #e7e7e7;
    color: #5D599F;

    svg {
      path {
        stroke: #5D599F;
      }
    }
  }
}

</style>