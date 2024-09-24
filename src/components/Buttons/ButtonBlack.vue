<template>
  <button class="button primary" @click="$emit('buttonPressed')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonBlack.vue'
}

</script>

<style scoped lang="scss">
.button {
  background: #191B2A;
  color: #F8F7FC;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:disabled {
    opacity: .5;
  }

}
</style>