<template>
  <button class="base-button" :class="$props.style || 'filled'" @click="$emit('close', true)">
    <span>
      <slot></slot>
    </span>

  </button>
</template>

<script>
export default {
  name: "ButtonPrimary.vue",
  props: ['style'],
  data() {
    return {}
  },
  components: {},
  mounted() {

  },
}
</script>

<style scoped lang="scss">
.base-button {
  padding: 9px 13px;
  border-radius: 10px;
  width: 100%;

  span {
    color: #000;
    text-align: center;
    font-family: "PT Sans Caption";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 3px 6px 0px rgba(255, 199, 0, 0.3);
  }

  &.red {
    background-color: #9A2929;
    border: 2px solid var(--yellow, #9A2929);
    span {
      color: white;
    }
  }

  &.filled {
    background-color: #FFC700;
    border: 2px solid var(--yellow, #FFC700);
  }

  &.outline {
    background-color: transparent;
    border: 2px solid var(--yellow, #FFC700);
  }

}

</style>