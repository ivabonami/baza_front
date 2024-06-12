<template>


  <div class="add-project form-wrapper">
    <div class="left">

      <div class="input-wrapper">
        <label class="help" for="projectName">
          Название услуги
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Введите название услуги, которое коротко и ясно отражает его суть. От 5 до 255 символов.', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>
        <div class="input">
          <input
              type="text"
              id="productName"
              v-model="product.name"
              minlength="1" maxlength="255"
              ref="productName"
              required>
        </div>
      </div>
      <div class="input-wrapper mb">
        <label class="help">
          Изображение услуги
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Загрузите изображение услуги, размеры 230x170px, форматы: jpeg, jpg, gif. webp.', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>
        <loader v-if="checker.imageLoaded === false"></loader>

        <div class="fake-input" v-if="checker.imageLoaded === true">
          <input type="file"
                 id="productImage"
                 name="productImage"
                 ref="productImage"
                 v-on:change="(e) => {
                   checker.imageLoaded = false

                   if (parseInt(e.target.files[0].size) > 5200000) {
                     errors.productImageSize = 'Допустимое значение 5мб, уменьшите размер файла'
                   } else {
                     checker.imageLoaded = false

                     uploadImage(e.target.files[0])
                      .then(result => {
                        product.avatarFilePath = result.filePath
                        checker.image = result.filePath.replace('uploads/', '')
                        checker.imageLoaded = true
                        }).catch(e => {
                          checker.imageLoaded = true
                    })
                   }
                 }"
                 accept="image/*"
          >
          <label for="productImage">
            <span class="input-file-btn">Выберите файл</span>
            <span class="input-file-text">Максимум 5мб</span>
          </label>

        </div>

        <div class="loaded" v-if="checker.imageLoaded === true && product.avatarFilePath.length > 1">
          <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>

          <span class="image-name">
              Картинка загружена! {{ checker.image }}
            </span>
        </div>


      </div>

      <div class="input-wrapper">
        <label class="help" for="projectName">
          Описание услуги
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Предоставьте подробное описание услуги, включая еу цель, описание продаваемого товара, что бы пользователь точно понимал что он покупает.', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>

        <textarea placeholder="описание проекта *"
                  required
                  ref="productDescription"
                  maxlength="65535"
                  v-model="product.description"></textarea>
      </div>

      <form-errors v-bind:errors="errors">

      </form-errors>

      <add-button>
        <template #submit>
          <span @click="checkForm()">
            Добавить услугу
          </span>

        </template>
        <template #cancel>
          <span @click="modalSetting.show = false">
            Отменить
          </span>

        </template>
      </add-button>


    </div>



  </div>

</template>

<script>
import config from "../../assets/js/config.js";
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {useFetch} from "../../assets/js/controllers/requestsControl.js";
import {modalSetting} from "../../assets/js/modal.js";
import formErrors from "../../Helpers/FixErrors.vue";
import loader from "../../Layouts/BaseLoader.vue";
import {uploadImage} from "../../assets/js/controllers/imageUploader.js";


export default {
  name: "AddService.vue",
  components: { formErrors, loader},

  props: ['projectId'],

  directives: {
    tippy: directive,
  },


  data () {
    return {
      errors: {},
      product: {
        name: '',
        avatarFilePath: '',
        description: '',
        projectId: window.location.pathname.replace('/project/', '')

      },
      checker: {
        imageLoaded: true,
        image: ''
      },
      config, modalSetting, uploadImage
    }
  },
  mounted() {

  },

  methods: {
    addProduct () {
      console.log(this.product)
      useFetch('products', "POST", this.product)
          .then(result => {
            modalSetting.show = true
            modalSetting.headline = `Вы добавили услугу!`
            modalSetting.description = `Вы добавили услугу ${this.product.name}`
            modalSetting.type = 'ok'
            modalSetting.modalSize = 'small'
          })
    },

    checkForm () {
      if (this.product.name.length < 1) {
        this.errors.productName = 'Название должно содержать хотя бы 1 символ'
        this.$refs.productName.classList.add('error')
      } else {
        delete this.errors.productName
        this.$refs.productName.classList.remove('error')
      }

      if (this.product.description.length < 30) {
        this.errors.productDescription = 'Название должно содержать от 30 символов'
        this.$refs.productDescription.classList.add('error')
      } else {
        delete this.errors.productDescription
        this.$refs.productDescription.classList.remove('error')
      }

      if (this.product.avatarFilePath.length < 1) {
        this.errors.productImage = 'Изображение не загружено'
        this.$refs.productImage.classList.add('error')
      } else {
        delete this.errors.productImage
        this.$refs.productImage.classList.remove('error')
      }

      if (Object.keys(this.errors).length <= 0) {
        this.addProduct()
      }

      console.log(this.product)

    }
  }
}
</script>

<style scoped lang="scss">
textarea {
  height: 150px;
}
.mb {
  margin-bottom: 10px;
}
.btn {
  margin-top: 20px;
}

.add-project {
  display: flex;
  gap: 2%;
  flex-wrap: wrap;
  justify-content: space-between;
  .left {
    width: 100%;
  }


}


.errors {
  margin-top: 10px;
  background-color: #ffdada;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;

  .error {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}

</style>