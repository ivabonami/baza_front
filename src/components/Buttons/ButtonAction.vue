<template>
  <button class="base-button"
          :class="{active: $props.active}"
          @click="$emit('pressed', false)"
  >
    <div class="base-button_icon">
      <slot name="icon"/>
    </div>

    <span>
      <slot name="text" />
    </span>


  </button>
</template>

<script>
export default {
  name: "ButtonAction.vue",
  props: {
    active: false
  },
  data() {
    return {}
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.base-button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: none;

  .base-button_icon {
    margin-top: 4px;
  }

  span {
    color: var(--gray, #A8A8A8);
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: .15s ease;
  }

  &:hover {

    span {
      padding-left: 5px;
    }
  }
}
</style>