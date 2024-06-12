<template>
  <button class="base-button"
          data-dropdown="dropdown"
          :class="$props.style || 'filled'"
          @click="$emit('confirmed', false)"
  >
      <span data-dropdown="dropdown">{{ $props.username || "Войти" }}</span>
      <slot name="icon" />

  </button>
</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {ref} from "vue";

export default {
  name: "ButtonPrimary.vue",
  props: {
    style: 'filled',
    username: ref(String)
  },

  data() {
    return {}
  },
  directives: {
    tippy: directive,
  },
  components: {},
  mounted() {

  },
}
</script>

<style scoped lang="scss">
.base-button {
  border-radius: 10px;
  padding: 9px 13px;
  width: auto;
  max-width: 120px;
  text-overflow: clip;
  overflow: hidden;
  position: relative;
  z-index: 16;
  background-color: #f8f8f8;

  display: flex;
  align-items: center;
  justify-content: end;
  border: 1px solid transparent;
  opacity: .8;
  gap: 10px;

  span {
    color: #126DF7;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    max-width: 60px;
    display:inline-block;
    text-align: start;
    position: relative;
    box-sizing: border-box;
    gap: 5px;
    align-items: center;

    svg {
      position: absolute;
      right: 0;
    }
  }

  &:hover {
    opacity: 1;
    border-color: #F2F5F7;
    background-color: #f3f3f3;
  }

}

</style>