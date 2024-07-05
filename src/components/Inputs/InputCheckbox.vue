<template>

  <div class="checkbox-flex">
    <div class="checkbox"
         :class="{selected: selected}"
         @click="() => {
      this.selected = !selected
      this.$emit('checkboxChanged', selected)

    }">
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.468079" width="20.3515" height="20" rx="5" />
        <path d="M5.55597 9.75L9.08634 14L15.7317 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="checkbox" >
        {{ $props.input.data }}
      </span>

    </div>
  </div>


</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {checkInputData} from "../../assets/js/fieldDataController.js";
import {categoriesStore} from "../../Store/categories.js";

export default {
  name: "InputCategories.vue",
  props: {
    input: {
      name: null,
      placeholder: null,
      tooltip: null,
      min: 0,
      max: 255,

    },
    error: null,
    data: null
  },
  data() {
    return {
      selected: false,
      checkInputData,
      error: false,
      categoriesStore
    }
  },

  watch: {
    data: function (newVal, oldVal) {
      this.setData()
    },
    error: function (newVal, oldVal) {

    }

  },

  directives: {
    tippy: directive,
  },

  components: {},

  methods: {
    setData () {
      this.$props.input.data ? this.selectedCategories = this.$props.input.data : null
      this.selected = this.$props.input.checked
    },
    checkField(value) {

      this.selectedCategories.indexOf(value.id) < 0 ? this.selectedCategories.push(value.id) : this.selectedCategories.splice(this.selectedCategories.indexOf(value.id), 1)
      this.$emit('data', this.selectedCategories)

      this.selectedCategories.includes(categoriesStore.exchanger.id) ? this.$emit('exchangerSelected', true) : this.$emit('exchangerSelected', false)
    }
  },

  mounted() {
    this.setData()

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


.checkbox-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

}
.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
  justify-content: left;

  .category {
    width: 100%;

  }
  svg {
    margin-right: 10px;
    rect {
      stroke: #6B6B6B;
      stroke-width: 1px;
    }
    path {
      stroke-width: 0;
    }
  }

  &.selected {
    svg {
      rect {
        fill: #FFC700;
        stroke-width: 0;
      }
      path {
        stroke-width: 2;
      }
    }
  }
  span {
    padding-left: 30px;
    display: flex;
    align-items: center;


  }


  svg {

    width: 20px;
    top: 0;
    left: 0;
    position: absolute;

    path {
      stroke: #000;
    }


  }

}
</style>