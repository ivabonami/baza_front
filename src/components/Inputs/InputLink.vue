<template>
  <label :for="$props.input.name">
    {{ $props.input.name }}
    <svg v-show="input.tooltip" xmlns="http://www.w3.org/2000/svg" v-tippy="{content: $props.input.tooltip, theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </label>
  <input type="text"
         :minlength="$props.input.min"
         :maxlength="$props.input.max"
         :class="{error: $props.error === true}"
         v-model="inputData"
         @change="checkField()"
         :id="$props.input.name"
         :placeholder="$props.input.placeholder">
</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {checkInputData} from "../../assets/js/fieldDataController.js";

export default {
  name: "InputLink.vue",
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
      inputData: null,
      checkInputData,
      error: false,
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
      this.$props.input.data ? this.inputData = this.$props.input.data : null
    },
    checkField() {

      if (this.inputData < 10 ) {
        this.error = true
        this.$emit('error', 'Ссылка пустая')

      } else {

        if (/^(?:(?:(?:https?|ftp|http):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(this.inputData) === false) {
          this.error = true
          this.$emit('error', 'Ссылка не валидна')

        } else {

          this.error = false
          this.$emit('data', this.inputData)

        }

      }



    },
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

input {
  color: var(--gray-2, #000);
  font-family: "PT Sans Caption";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #D8D8D8;
  }

  &.error {
    border-color: #9A2929;
  }
}
</style>