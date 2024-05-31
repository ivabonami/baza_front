<template>
  <h2>Изменить услугу:</h2>

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
              v-model="editProduct.product.name"
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
                  v-model="editProduct.product.description"></textarea>
      </div>



      <button class="baza-button primary"
              v-on:click="checkForm()">
        Обновить услугу
      </button>

    </div>

    <div class="errors" ref="errors" v-if="Object.keys(this.errors).length > 0">
      <h3>Устраните ошибки:</h3>
      <div class="error" v-for="(error, index) of errors" >
        {{ error }}

      </div>
    </div>

  </div>

</template>

<script>
import config from "../../../assets/js/config.js";
import Modal from "../../TemplateParts/PageParts/Modal.vue";
import {editProduct} from "../../../assets/js/productController.js";
import {directive} from "vue-tippy";
import 'tippy.js/dist/tippy.css'
import {useFetch} from "../../../assets/js/fetchRequest.js";
import {modalSetting} from "../../../assets/js/modal.js";

export default {
  name: "editService.vue",
  props: ['product'],
  components: {},
  directives: {
    tippy: directive,
  },
  data () {
    return {
      modal: {},
      showModal: false,
      product: this.$props.product,
      counter: 0,
      errors: {},
      avatarError: false,
      avatarErrorPusher: false,
      editProduct
    }
  },

  mounted() {
    editProduct.product.name === '' ? this.$router.go(-1) : ''
  },

  methods: {
    addProduct () {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      this.counter++

      fetch(`${config.api.url}products/${editProduct.product.id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          name: editProduct.product.name,
          avatarFilePath: editProduct.product.image.replace(config.api.url, ''),
          description: editProduct.product.description,

        })
      })
          .then((response) => response.json())
          .then(response => {
            if (response.success === true) {

              modalSetting.show = true
              modalSetting.headline = `Вы обновили услугу!`
              modalSetting.description = `Услуга ${editProduct.product.name} успешно обновлена!`
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
      this.projectAvatar = e.target;
      const image = e.target.files[0]


      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "image/webp");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const formData = new FormData();
      formData.append("image-upload", image );

      if (e.target.files[0].type !== "image/jpeg" &&
          e.target.files[0].type !== "image/gif" &&
          e.target.files[0].type !== "image/jpg" &&
          e.target.files[0].type !== "image/png" &&
          e.target.files[0].type !== "image/webp") {
        this.avatarError = true
        if (this.avatarError === true || this.avatarErrorPushed === false) {
          this.errors.push('Формат артинки не поддерживается')
          this.avatarErrorPushed = true
        }
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
        console.dir(e.target.files[0].type)

      } else {
        this.avatarError = false
        this.avatarErrorPushed = false
        this.$refs.projectAvatar.parentElement.style.borderColor = 'transparent'

        useFetch(`image-upload`, "POST", formData)
            .then((result) => {
              editProduct.product.image = result.filePath
              console.log(editProduct.product.image)
            })

      }
    },

    checkForm () {

      if (editProduct.product.name.length < 4) {
        this.errors.serviceNameErr = 'Название услуги должно быть не менее 4 символов'
      } else {
        delete this.errors.serviceNameErr
      }

      if (editProduct.product.description.length < 30) {
        this.errors.serviceDescriptionErr = 'Описание услуги должно быть не менее 30 символов'

      } else {
        delete this.errors.serviceDescriptionErr
      }

      if (editProduct.product.image.length === 0) {
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
          setTimeout(() => {
            this.$refs.errors.scrollIntoView({behavior: 'smooth', block: 'start'})
          }, 20)
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
.btn {
  margin-top: 20px;
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