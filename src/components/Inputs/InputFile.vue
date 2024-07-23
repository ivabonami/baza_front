<template>
  <div class="image-input">
    <label :for="$props.input.name">
      {{ $props.input.name }}
      <svg v-show="input.tooltip" xmlns="http://www.w3.org/2000/svg" v-tippy="{content: $props.input.tooltip, theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </label>

    <input type="file"
           hidden
           accept="image/*"
           ref="imageInput"
           :class="{error: error}"
           @change="checkField($event.target.files[0])"
           :id="$props.input.name"
           :placeholder="$props.input.placeholder">

    <label :for="$props.input.name"
           v-show="!file.data"
           class="input-file-label">
      <span class="input-file-btn">Выберите файл</span>
      <span class="input-file-text">Максимум 5мб</span>
    </label>

    <loader-small v-show="!file.loaded" />

    <div class="input-file-loaded" v-if="file.data">
      <div class="input-file-loaded_success">
        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
          <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Изображение выбрано
      </div>

      <div
          @click="clearInput()"
          class="input-file-loaded_delete">
        <svg v-tippy="{content: 'Удалить выбранный файл', theme: 'light'}"
             xmlns="http://www.w3.org/2000/svg"
             width="14" height="16" viewBox="0 0 14 16"
             fill="none">
          <path d="M9.66667 3.8V3.24C9.66667 2.45593 9.66667 2.06389 9.52134 1.76441C9.39351 1.50099 9.18954 1.28681 8.93865 1.15259C8.65344 1 8.28007 1 7.53333 1H6.46667C5.71993 1 5.34656 1 5.06135 1.15259C4.81046 1.28681 4.60649 1.50099 4.47866 1.76441C4.33333 2.06389 4.33333 2.45593 4.33333 3.24V3.8M1 3.8H13M11.6667 3.8V11.64C11.6667 12.8161 11.6667 13.4042 11.4487 13.8534C11.2569 14.2485 10.951 14.5698 10.5746 14.7711C10.1468 15 9.58677 15 8.46667 15H5.53333C4.41323 15 3.85318 15 3.42535 14.7711C3.04903 14.5698 2.74307 14.2485 2.55132 13.8534C2.33333 13.4042 2.33333 12.8161 2.33333 11.64V3.8" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="input-file-loaded_file-name">
        Имя файла: {{ normalizeText(file.data) }}
      </div>
    </div>
  </div>


</template>

<script>
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {checkFileData} from "../../assets/js/fieldDataController.js";
import loaderSmall from "../Loaders/LoaderSmall.vue";
import {uploadImage} from "../../API/image.js";

export default {
  name: "InputText.vue",
  props: {
    input: {
      name: null,
      tooltip: null,
    },
    data: {}


  },
  data() {
    return {
      inputData: null,
      file: {
        loaded: true,
        data: null
      },
      error: false
    }
  },

  watch: {
    data: function (newVal, oldVal) {
      !newVal ? this.file.data = null : null
    }
  },

  directives: {
    tippy: directive,
  },

  components: {
    loaderSmall
  },

  methods: {
    normalizeText(text){
      if (text.length >= 30) {
        return text.slice(0, 20) + '...' + text.slice(-10)
      } else {
        return text
      }

    },
    checkField(file) {
      this.file.loaded = false
      const checkData = checkFileData(file)

      if (Object.keys(checkData) <= 0) {
        this.error = false
        this.file.loaded = true
        this.file.data = file.name
        this.$emit('data', file)

      } else {
        this.error = true
        this.file.loaded = false
        this.file.data = null

        let errorsText = ''
        for (let error in checkData) {
          errorsText += checkData[error] + ', '
        }
        errorsText =
            errorsText.charAt(0).toUpperCase() + errorsText.slice(1).slice(0, -2)

        this.$emit('error', errorsText)
      }

      this.file.loaded = true
    },
    clearInput() {
      this.file.data = null
      this.$emit('data', null)
      this.$refs.imageInput.value = null
    }

  },

  mounted() {

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
.image-input {
  margin-bottom: 10px;
}
.input-file-label {
  display: flex;
  flex-wrap: wrap;

  .input-file-btn {
    padding: 9px 13px;
    border-radius: 10px;
    width: 55%;
    background-color: transparent;
    border: 2px solid var(--yellow, #FFC700);
    color: #000;
    text-align: center;
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .input-file-text {
    color: #000;
    text-align: center;
    font-family: "PT Sans Caption";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.input-file-loaded {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: start;
  flex-wrap: wrap;

  .input-file-loaded_file-name {
    text-align: left;
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #6B6B6B;
    width: 100%;
  }

  .input-file-loaded_success {
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
      width: 20px;
      height: 20px;
    }
    color: #2E7E36;
    text-align: center;
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .input-file-loaded_delete {
    cursor: pointer;
    margin-left: 10px;
    svg {
      width: 15px;
      height: 15px;

      path {
        transition: .15s ease;
        stroke: #7C7C7C;
      }
    }

    &:hover {
      svg {
        path {
          stroke: #dc4a4a;
        }
      }
    }
  }


}

</style>