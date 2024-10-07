<template>
  <label class="input-wrapper">
    <inline-svg :src="$props.data.icon" v-if="$props.data"/>
    <input type="text"
           v-model="inputData"
           :placeholder="$props.placeholder || $props.data.placeholder"
           @change="$emit('dataChanged', inputData)"
    >
  </label>
</template>

<script>

export default {
  components: {},


  props:{
    placeholder: null,
    data: {}
  },
  data () {
    return {
      inputData: null
    }
  }
}

</script>

<style scoped>

</style>