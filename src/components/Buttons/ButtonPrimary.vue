<template>
  <button class="button primary" :disabled="props.disabled">
    <slot />
  </button>
</template>

<script setup>
  import {watch} from "vue";

  const props = defineProps({
    disabled: false
  })

  watch(() => props.disabled, (e) => {
    console.log(e)
  })

</script>

<style scoped lang="scss">
.button {
  background: #7773FB;

  &:disabled {
    opacity: .5;
  }

}
</style>