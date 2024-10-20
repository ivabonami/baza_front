<template>
  <label class="input-wrapper">
    <input type="text"
           v-model="inputData"
           :placeholder="$props.placeholder || $props.data.placeholder"
           @change="$emit('dataChanged', inputData)"
           @input="$emit('dataChanged', inputData)"
    >
  </label>
</template>

<script>

export default {
  components: {},
  props:{
    placeholder: null,
    data: {},
    inputDataProp: null
  },
  data () {
    return {
      inputData: null
    }
  },
  watch: {
    inputDataProp: function () {
      this.inputData = this.$props.inputDataProp
    }
  },
  mounted() {
    this.inputData = this.$props.inputDataProp
  }
}

</script>

<style scoped>
.input-wrapper {
  height: 40px;
}
</style>