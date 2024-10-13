<template>
  <select @change="selectData(selected)" v-model='selected' v-show="$props.data.data">
    <option v-for="data of $props.data.data" @click="console.log(123)" :value="data">
      {{ data.name }}
    </option>
  </select>
</template>

<script>
import InlineSvg from 'vue-inline-svg';
import {ref} from "vue";
import dropdownBox from "@/components/ReUsable/DropdownBox.vue";

export default {
  name: 'InputSelectOption.vue',
  components: {
    InlineSvg,
    dropdownBox
  },

  props:{
    data: {

    },
    selector: ref(String)
  },
  data () {
    return {
      inputData: ref(''),
      active: false,
      dropdown: {
        show: false
      },
      selected: this.$props.data.data[0]
    }
  },
  methods: {
    selectData(data) {
      this.selected = data
      this.$emit('dataChanged', this.selected)
    }
  },
  watch: {
    data: function () {
      this.selected = this.$props.data.data[0]
    }
  },
  mounted() {
    this.selected = this.$props.data.data[0]
  }

}
</script>

<style scoped lang="scss">
select {
  width: 100%;
  height: 50px;
}
</style>