<template>
  <label class="input-wrapper"
         @click="dropdown.show = !dropdown.show"
         data-dropdown="selectOptions"
         :class="{active: active || inputData}"
         @focus="active = true"
  >

    <inline-svg :src="data.icon" />
    <span class="name" v-if="selectedColor">
      {{ selectedColor.name }}
    </span>

    <span class="name" v-if="!selectedColor">
      {{ $props.data.name }}
    </span>
<!--    <input type="text"-->
<!--           :name="data.name"-->
<!--           autocomplete-->
<!--           :placeholder="data.placeholder"-->
<!--           v-model="inputData"-->
<!--           @input="$emit('textData', inputData)"-->
<!--    >-->
    <dropdownBox v-if="dropdown.show === true"
                 :selector="'selectOptions'"
                 @closeDropdown="dropdown.show = false"
    >
      <div class="colors">
        <div class="color" v-for="color of colors" @click="selectColor(color)">
          {{ color.name }}
          <svg data-v-c7770d1f="" width="18" height="13" viewBox="0 0 18 13" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path data-v-c7770d1f="" d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"></path>
          </svg>
        </div>
      </div>
    </dropdownBox>
  </label>
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

    }
  },
  data () {
    return {
      inputData: ref(''),
      active: false,
      dropdown: {
        show: false
      },
      colors: [
        {
          name: 'Сине-фиолетовый градиент',
          value: 'background: linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255) 0px) padding-box padding-box, linear-gradient(-45deg, rgb(116, 58, 213), rgb(213, 58, 157)) border-box border-box;'
        }
      ],
      selectedColor: null
    }
  },
  methods: {
    selectColor(color) {
      this.selectedColor = color
      this.$emit('textData', color.value)
    }
  }

}
</script>

<style scoped lang="scss">
.input-wrapper {
  padding: 13px 10px;
  box-sizing: border-box;
  position: relative;

  span {
    color: #B3B4C9;
    font-size: 16px;
    font-style: normal;
  }
  .colors {
    width: 350px;

    .color {

      &.active {

      }
    }

  }
}
</style>