<template>
  <button class="button secondary" :disabled="props.disabled" @click="$emit('buttonPressed', true)">
    <slot />
  </button>
</template>

<script setup>
  import {watch} from "vue";

  const props = defineProps({
    disabled: false
  })

  watch(() => props.disabled, (e) => {

  })

</script>

<style scoped lang="scss">
.button {
  background: #f8f7fc;
  border: 1px solid transparent;
  box-sizing: border-box;
  color: #575757;

  &:disabled {
    opacity: .5;
  }

}

@media screen and (max-width: 500px) {
  .button {
    width: 100%;
  }
}
</style>