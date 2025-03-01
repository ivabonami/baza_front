<template>

  <button class="button button-header">
    <slot />
  </button>

</template>

<script setup>

const props = defineProps({

})
</script>

<style scoped lang="scss">
.button {
  &.button-header {
    width: 100%;
    background: #191B2A;
    color: #F8F7FC;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &:disabled {
      opacity: .5;
    }
  }
  &:hover {
    background-color: #474a6c;
  }
}
</style>