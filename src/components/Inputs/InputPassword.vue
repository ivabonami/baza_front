<template>
 <div>
   <label :for="$props.input.name">
     <slot name="labelName"></slot>
     <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: $props.input.tooltip, theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
       <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>
   </label>
   <input type="password"
          :tabindex="tabindex"
          :class="this.$props.error"
          :maxlength="$props.input.max"
          :minlength="$props.input.min"
          v-model="inputData"
          @input="$emit('returnData', inputData)"
          :id="$props.input.name"
          :placeholder="$props.input.placeholder">
 </div>
</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

export default {
  name: "InputPassword.vue",
  emits: ['returnData'],
  props: ['input', 'error', 'tabindex'],
  data() {
    return {
      inputData: null,
    }
  },

  directives: {
    tippy: directive,
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
label {
  color: #000;
  font-family: "PT Sans Caption";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: 5px;
}

input {
  color: var(--gray-2, #000);
  font-family: "PT Sans Caption";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #D8D8D8;
  }

  &.error {
    border-color: #9A2929;
  }
}
</style>