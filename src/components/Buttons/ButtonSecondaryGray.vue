<template>
  <button class="button secondary"
          :class="$props.style"
          @click="$emit('buttonPressed', false)"
  >
      <span>
        <slot></slot>
      </span>
  </button>
</template>

<script>

export default {
  name: "ButtonPrimary.vue",
  props: {
    style: 'outlined',
    username: 'USER'
  },

  data() {
    return {}
  },

  components: {},
  mounted() {

  },
}
</script>

<style scoped lang="scss">
.secondary {
  width: 100%;
  background: #f6f6f6;
  color: #191B2A;
  box-sizing: border-box;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 100%;

  &:disabled {
    opacity: .5;
  }

  &:hover {
    color: #FFFFFF;
    background-color: #7773fb;
  }

}

</style>