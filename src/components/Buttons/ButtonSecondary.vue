<template>
  <button class="base-button"
          @click="$emit('pressed', false)"
  >
      <span>
        <slot></slot>
      </span>
  </button>
</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

export default {
  name: "ButtonPrimary.vue",
  props: {
    style: 'filled',
    username: 'USER'
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
  padding: 7px 13px;
  width: auto;
  max-width: 120px;
  text-overflow: clip;
  overflow: hidden;
  position: relative;
  z-index: 16;
  border-radius: 10px;
  background: var(--lightgray, #F2F5F7);

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