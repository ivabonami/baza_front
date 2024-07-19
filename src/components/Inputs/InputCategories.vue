<template>
  <label>
    {{ $props.input.name }}
    <svg v-show="input.tooltip" xmlns="http://www.w3.org/2000/svg" v-tippy="{content: $props.input.tooltip, theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </label>
  <div class="categories-flex">
    <div class="category"
         v-for="category of categoriesStore.categories"
    >


      <div class="category-checkbox"  @click="checkField(category)"
      >
        <svg width="21" height="20"
             :class="{selected: this.selectedCategories.indexOf(category.id) >= 0}"
             viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.468079" width="20.3515" height="20" rx="5" fill="#FFC700"/>
          <path d="M5.55597 9.75L9.08634 14L15.7317 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      <span class="checkbox"  >
        {{ category.name }}
      </span>

      </div>

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
      selectedCategories: [],
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
    },
    checkField(value) {

      this.selectedCategories.indexOf(value.id) < 0 ? this.selectedCategories.push(value.id) : this.selectedCategories.splice(this.selectedCategories.indexOf(value.id), 1)
      this.$emit('categoryIds', this.selectedCategories)

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


.categories-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.category-checkbox {
  font-family: "PT Sans Caption";
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  padding: 3px;
  width: 100%;
  cursor: pointer;

  .category {
    width: 100%;

  }
  span {

  }


  svg {

    width: 20px;

    rect {
      fill: transparent;
      stroke-width: 1px;
      stroke: #6B6B6B;
      transition: .15s ease;
    }

    path {
      transition: .15s ease;
      stroke: #000;
      stroke-width: 0;
    }

    &.selected {
      rect {
        fill: #FFC700;
        stroke-width: 0;
      }
      path {
        stroke-width: 2px;
      }
    }


  }

}
</style>