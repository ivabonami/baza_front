<template>
  <div style="width: 100%">
    <button class="button primary" :disabled="props.disabled" v-if="props.type === 'button'">
      <slot />
    </button>

    <a href="#" class="button primary" v-else-if="props.type === 'link'">
      <slot />
    </a>

  </div>
</template>

<script setup>
  import {watch} from "vue";

  const props = defineProps({
    disabled: false,
    type: 'button'
  })

  watch(() => props.disabled, (e) => {
    console.log(e)
  })

</script>

<style scoped lang="scss">
.button {
  background: #7773FB;
  box-sizing: border-box;

  &:disabled {
    opacity: .5;
  }

}
a {
  padding: 0 10px;
  width: 100%;
}
</style>