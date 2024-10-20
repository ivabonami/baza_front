<template>
  <select @change="selectData($event.target.value)" v-if="$props.inputData">
    <option v-for="item of $props.inputData.items" :selected="inputData.selected === item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script>
import {ref} from "vue";

export default {
  name: 'InputSelectOptions.vue',
  props:{
    inputData: {
      placeholder: ref(String),
      selected: ref(Boolean),
      items: ref(Object)
    }

  },
  data () {
    return {

    }
  },
  methods: {
    selectData(data) {
      this.$emit('dataChanged', data)
    }
  },

}
</script>

<style scoped lang="scss">
select {
  width: 100%;
  color: #191B2A;

  option {
    color: #191B2A;
  }
}
</style>