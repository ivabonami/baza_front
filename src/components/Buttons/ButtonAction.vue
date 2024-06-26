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
  margin-bottom: 5px;

  .base-button_icon {

  }

  span {
    color: var(--gray, #A8A8A8);
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: .15s ease;
    padding-right: 6px;
    padding-left: 0;
  }

  &:hover {

    span {
      padding-right: 0;
      padding-left: 6px;
    }
  }
}
</style>