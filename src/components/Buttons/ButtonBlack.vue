<template>

  <div style="width: 100%;">
    <button @click="$emit('buttonPressed')" class="button primary" :disabled="props.disabled" v-if="props.type === 'button'">
      <slot />
    </button>

    <a :href="props.link" class="button primary" v-else-if="props.type === 'link'" target="_blank">
      <slot />
    </a>

  </div>
</template>

<script setup>

const props = defineProps({
  disabled: false,
  type: 'button',
  link: null
})
</script>

<style scoped lang="scss">
.button {
  width: 100%;
  background: #191B2A;
  color: #F8F7FC;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    background-color: #474a6c;
  }

  &:disabled {
    opacity: .5;
  }

}
</style>