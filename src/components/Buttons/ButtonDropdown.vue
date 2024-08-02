<template>
  <button class="base-button"
          :class="$props.style || 'filled'"
          @click="$emit('signOut', true)">
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
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: flex;
    gap: 5px;
    align-items: center;
  }

  &:hover {
    transform: translateY(-2px);
  }

}
@media screen and (max-width: 500px){
  .base-button {
    gap: 5px;
    svg {

    }
  }
}
</style>