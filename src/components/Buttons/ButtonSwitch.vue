<template>
  <button class="base-button"
          :class="{active: $props.active}"
          @click="$emit('pressed', true)">
    <div class="image">
      <slot name="icon"/>
    </div>
    <span>
      <slot name="text"/>
    </span>

  </button>
</template>

<script>
export default {
  name: "ButtonSwitch.vue",
  props: ['active'],
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
  width: auto;
  display: flex;
  gap: 5px;

  span {
    color: #000;
    text-align: center;
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:hover {
    background-color: #e1e1e1;
  }

  &.active {
    background-color: #dcdcdc;
    cursor: default;
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