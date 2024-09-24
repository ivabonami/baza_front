<template>
  <label class="input-wrapper"
         :class="{active: active || inputData}"
         @focus="active = true"
  >

    <InlineSvg :src="data.icon" />
    <input type="text"
           :name="data.name"
           autocomplete
           :placeholder="data.placeholder"
           v-model="inputData"
           @input="$emit('textData', inputData)"
    >
  </label>
</template>

<script>
import {ref} from "vue";
import InlineSvg from 'vue-inline-svg';

export default {
  components: {
    InlineSvg
  },

  props:{
    data: {

    }
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

</style>