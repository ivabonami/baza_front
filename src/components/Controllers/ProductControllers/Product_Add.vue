<template>
  <h3>Добавить услугу в проект:</h3>

  <div class="add-project form-wrapper">
    <div class="left">
      <div class="input-wrapper">
        <label class="help">
          <span class="heading">Название услуги</span>
          Введите название услуги, которое коротко и ясно отражает его суть. От 5 до 255 символов.
        </label>
        <input
            type="text"
            placeholder="Название проекта"
            v-model="productName"
            minlength="5" maxlength="255"
            ref="productName"
            required>

      </div>


      <div class="input-wrapper">
        <label class="help">
          <span class="heading">Изображение услуги</span>
          Загрузите изображение услуги, размеры 230x170px, форматы: jpeg, jpg, gif. webp.
        </label>
        <div class="fake-input">
          <span class="name">Изображение *</span>
          <input type="file"
                 ref="projectAvatar"
                 v-on:change="uploadAvatar($event)"
                 accept="image/*"

          >
        </div>

      </div>

      <div class="input-wrapper">
        <label class="help">
          <span class="heading">Описание услуги</span>
          Предоставьте подробное описание услуги, включая еу цель, описание продаваемого товара, что бы пользователь точно понимал что он покупает.
        </label>

        <textarea placeholder="описание проекта *"
                  required
                  ref="productDescription"
                  maxlength="65535"
                  v-model="productDescription"></textarea>
      </div>




      <button class="btn btn-filled"
              v-on:click="checkForm()">
        Добавить услугу
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
import {isAdmin} from "../../../assets/js/userService.js";
import config from "../../../assets/js/config.js";
export default {
  name: "AddService.vue",
  props: ['projectId'],

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
      isAdmin, config
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
          isReviewed: isAdmin(),
          avatarFilePath: this.projectAvatar,
          description: this.productDescription,
          projectId: this.$props.projectId,

        })
      })
          .then((response) => response.json())
          .then(response => {
            if (response.success === true) {

              this.counter++
              this.$emit('added',this.counter )

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
        if (this.avatarError === true && this.avatarErrorPushed === false) {
          this.errors.push('Формат артинки не поддерживается')
          this.avatarErrorPushed = true
        }
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
        console.dir(e.target.files[0].type)

      } else {
        this.avatarError = false
        this.avatarErrorPushed = false
        this.$refs.projectAvatar.parentElement.style.borderColor = 'transparent'

        fetch(`${config.api.url}image-upload`, {
          method: "POST",
          headers: myHeaders,
          body: formData,
          redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => this.projectAvatar = result.filePath)
            .catch((error) => console.error(error));
      }
    },

    checkForm () {

      if (this.productName.length < 4) {
        this.errors.serviceNameErr = 'Название услуги должно быть не менее 4 символов'
        this.$refs.productName.style.borderColor = 'red'
      } else {
        delete this.errors.serviceNameErr
        this.$refs.productName.style.borderColor = 'transparent'
      }

      if (this.productDescription.length < 30) {
        this.errors.serviceDescriptionErr = 'Описание услуги должно быть не менее 30 символов'
        this.$refs.productDescription.style.borderColor = 'red'
      } else {
        delete this.errors.serviceDescriptionErr
        this.$refs.productDescription.style.borderColor = 'transparent'
      }

      if (this.projectAvatar.length === 0) {
        this.errors.serviceImageErr = 'Изображение не загружено'
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
      } else {
        delete this.errors.serviceImageErr
        this.$refs.projectAvatar.parentElement.style.borderColor = 'transparent'
      }

      if (this.avatarError === true) {
        this.errors.serviceImageTypeErr = 'Формат изображения не поддерживается'
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
      } else {
        delete this.errors.serviceImageTypeErr
        this.$refs.projectAvatar.parentElement.style.borderColor = 'transparent'
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

.add-project {
  display: flex;
  gap: 2%;
  flex-wrap: wrap;
  justify-content: space-between;
  .left {
    width: 100%;
  }

  .help {
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    margin-top: 7px;

    opacity: 1;
    display: block;
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