<template>


  <div class="add-project form-wrapper">
    <div class="left">

      <div class="input-wrapper">
        <label class="help" for="projectName">
          Название услуги
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Введите название услуги, которое коротко и ясно отражает его суть. От 5 до 255 символов.'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>
        <div class="input">
          <input
              type="text"
              id="projectName"
              v-model="productName"
              minlength="1" maxlength="255"
              ref="projectName"
              required>
        </div>
      </div>
      <div class="input-wrapper mb">
        <label class="help">
          Изображение услуги
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Загрузите изображение услуги, размеры 230x170px, форматы: jpeg, jpg, gif. webp.'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>
        <div class="fake-input" >
          <input type="file"
                 id="projectAvatar"
                 name="projectAvatar"
                 ref="projectAvatar"
                 v-on:change="uploadAvatar($event)"
                 accept="image/*"
          >
          <label for="projectAvatar">
            <span class="input-file-btn">Выберите файл</span>
            <span class="input-file-text">Максимум 5мб</span>
          </label>

        </div>

      </div>

      <div class="input-wrapper">
        <label class="help" for="projectName">
          Описание услуги
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Предоставьте подробное описание услуги, включая еу цель, описание продаваемого товара, что бы пользователь точно понимал что он покупает.'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>

        <textarea placeholder="описание проекта *"
                  required
                  ref="productDescription"
                  maxlength="65535"
                  v-model="productDescription"></textarea>
      </div>




      <button class="baza-button primary"
              v-on:click="checkForm()">
        Добавить услугу
      </button>

    </div>

    <div class="errors" v-if="Object.keys(errors).length > 0">
      <h2>Исправьте ошибки</h2>
      <span v-for="(error) of errors">{{ error }} <br></span>
    </div>

  </div>
</template>

<script>
import config from "../../../assets/js/config.js";
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {useFetch} from "../../../assets/js/fetchRequest.js";
import {modalSetting} from "../../../assets/js/modal.js";

export default {
  name: "AddService.vue",
  props: ['projectId'],

  directives: {
    tippy: directive,
  },

  data () {
    return {
      productDescription: '',
      projectAvatar: '',
      productName: '',
      counter: 0,
      errors: {},
      addedId: 0,
      avatarError: false,
      avatarErrorPusher: false,
      config
    }
  },
  mounted() {

  },

  methods: {
    addProduct () {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      this.counter++

      fetch(`${config.api.url}products`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          name: this.productName,
          isReviewed: false,
          avatarFilePath: this.projectAvatar,
          description: this.productDescription,
          projectId: window.location.pathname.replace('/project/', ''),

        })
      })
          .then((response) => response.json())
          .then(response => {
            if (response.success === true) {

              modalSetting.show = true
              modalSetting.headline = `Вы добавили услугу!`
              modalSetting.description = `Услуга ${this.productName} успешно добавлена!`
              modalSetting.type = 'ok'
              modalSetting.modalSize = 'small'



            }
            else {
              this.errors.push(response.message)

            }
          })
          .catch((error) => {console.error(error)});
    },



    uploadAvatar(e){
      this.avatarLoaded = false
      const image = e.target.files[0]
      const reader = new FileReader();

      const formData = new FormData();
      formData.append("image-upload", image );

      if (image.type !== "image/jpeg" &&
          image.type !== "image/jpg" &&
          image.type !== "image/gif" &&
          image.type !== "image/png" &&
          image.type !== "image/webp") {
        this.$refs.projectAvatar.value = null
        this.errors.projectAvatarTypeErr = 'Формат аватарки не поддерживается'
        this.avatarErrorPushed = true
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'

      } else {
        delete this.errors.projectAvatarTypeErr

        if (parseInt(image.size) > 5200000) {
          this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
          this.$refs.projectAvatar.value = null
          this.errors.projectAvatarLengthErr = 'Слишком большой размер, рекомендуем загружать аватар до 512х512px и весом не более 5Мб'
          this.avatarErrorPushed = true

        } else {
          this.avatarError = false
          delete this.errors.projectAvatarLengthErr
          this.$refs.projectAvatar.parentElement.style.borderColor = 'transparent'

          reader.addEventListener('progress', () => {

          })
          useFetch('image-upload', "POST", formData)
              .then(result => {
                this.projectAvatar = result.filePath
              })
        }



      }

    },

    checkForm () {
      this.errors

      if (this.productName.length < 4) {
        this.errors.serviceNameErr = 'Название услуги должно быть не менее 4 символов'
      } else {
        delete this.errors.serviceNameErr
      }

      if (this.productDescription.length < 30) {
        this.errors.serviceDescriptionErr = 'Описание услуги должно быть не менее 30 символов'
      } else {
        delete this.errors.serviceDescriptionErr
      }

      if (this.projectAvatar.length === 0) {
        this.errors.serviceImageErr = 'Изображение не загружено'
      } else {
        delete this.errors.serviceImageErr
      }

      if (this.avatarError === true) {
        this.errors.serviceImageTypeErr = 'Формат изображения не поддерживается'
      } else {
        delete this.errors.serviceImageTypeErr
      }

      if (this.errors) {
        if (Object.keys(this.errors).length > 0) {

        } else {
          this.addProduct();
          this.showModal = true
        }
      }
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