<template>
  <label class="input-wrapper">
    <textarea
        v-model="inputData"
        :placeholder="$props.placeholder"
        @change="$emit('dataChanged', inputData)">
    </textarea>
  </label>

</template>

<script>

export default {
  name: "InputTextarea.vue",
  props: {
    placeholder: null
  },
  data() {
    return {
      inputData: null,
    }
  },

  methods: {

  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">

</style>