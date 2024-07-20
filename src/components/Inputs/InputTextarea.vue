<template>
  <div>
    <label :for="$props.input.name">
      {{ $props.input.name }}
      <svg v-show="input.tooltip" xmlns="http://www.w3.org/2000/svg" v-tippy="{content: $props.input.tooltip, theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </label>
    <textarea
        :minlength="$props.input.min"
        :maxlength="$props.input.max"
        :class="{error: error}"
        v-model="inputData"
        @change="checkField()"
        :id="$props.input.name"
        :placeholder="$props.input.placeholder">
    </textarea>
  </div>
</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {checkInputData} from "../../assets/js/fieldDataController.js";

export default {
  name: "InputTextarea.vue",
  emits: ['returnedData', 'returnedError'],
  props: {
    input: {
      name: null,
      placeholder: null,
      tooltip: null,
      min: 0,
      max: 255,
    },
    data: null


  },
  data() {
    return {
      inputData: null,
      checkInputData,
      error: false
    }
  },

  directives: {
    tippy: directive,
  },

  watch: {
    data: function (newVal, oldVal) {
      this.setData(newVal)

    }
  },

  components: {},

  methods: {
    checkField() {
      const checkData = checkInputData(this.$props.input.min, this.$props.input.max, this.inputData, this.$props.input.name)

      if (checkData === true) {
        this.error = false
        this.$emit('returnedData', this.inputData)
      } else {
        this.error = true
        this.$emit('returnedError', checkData)
      }
    },
    setData (value) {
      this.$props.input.data ? this.inputData = this.$props.input.data : null
      this.$props.input.data ? this.inputData = value : null
    },
  },

  mounted() {
    this.setData(this.$props.data)
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

textarea {
  color: var(--gray-2, #000);
  font-family: "PT Sans Caption";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 180px;

  &::placeholder {
    color: #D8D8D8;
  }

  &.error {
    border-color: #9A2929;
  }
}
</style>