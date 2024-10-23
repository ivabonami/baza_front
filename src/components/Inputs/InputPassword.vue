<template>
  <label class="input-wrapper"
         :class="{active: active || inputData}"
         @focus="active = true"
  >

    <input type="password"
           autocomplete
           :placeholder="placeholder"
           v-model="inputData"
           @input="$emit('passwordData', inputData)"
    >
  </label>
</template>

<script>
import {ref} from "vue";
import InlineSvg from 'vue-inline-svg';

export default {
  name: 'InputPassword.vue',
  components: {
    InlineSvg
  },

  props:{
    placeholder: null
  },
  data () {
    return {
      inputData: ref(''),
      active: false
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  height: 40px;
}
</style>