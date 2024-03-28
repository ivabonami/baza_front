<template>
  <h1>Изменить услугу:</h1>

  <div class="add-project form-wrapper">
    <div class="left">
      <div class="input-wrapper">
        <div class="field-name">Название услуги</div>
        <input
            type="text"
            placeholder="Название проекта"
            v-model="product.name"
            minlength="5" maxlength="255"
            ref="productName"
            required>
        <span class="help">
          Введите название услуги, которое коротко и ясно отражает его суть. От 5 до 255 символов.
        </span>
      </div>


      <div class="input-wrapper">
        <div class="field-name">Изображение услуги</div>
        <div class="fake-input">
          <input type="file"
                 ref="projectAvatar"
                 v-on:change="uploadAvatar($event)"
                 accept="image/*"

          >
        </div>
        <span class="help">
          Загрузите изображение услуги, размеры 230x170px, форматы: jpeg, jpg, gif. webp. Старое изображение будет удалено.
        </span>
      </div>
      <div class="input-wrapper">
        <div class="field-name">Описание услуги</div>
        <textarea
            required
            ref="productDescription"
            maxlength="65535"
            v-model="product.description"></textarea>
        <span class="help">
        Предоставьте подробное описание услуги, включая еу цель, описание продаваемого товара, что бы пользователь точно понимал что он покупает.
      </span>
      </div>



      <button class="btn btn-filled"
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

  <modal-window-backdrop
      v-if="showModal === true"
      v-on:changeModal="(emitShowModal) => {
        this.$emit('updated', product.id)
        this.showModal = emitShowModal
      }"
      v-bind:icon-type="this.modal.iconType"
      v-bind:descriptionType="this.modal.descriptionType"
      v-bind:heading="this.modal.heading"
      v-bind:description="this.modal.description"
      v-bind:close="this.modal.close"
      v-bind:exit="this.modal.exit"
      ref="modal"
      tabindex="0"

  >

  </modal-window-backdrop>
</template>

<script>
import config from "../../../assets/js/config.js";
import modalWindowBackdrop from "../../TemplateParts/Page Parts/Modal.vue";
export default {
  name: "editService.vue",
  props: ['product'],
  components: {modalWindowBackdrop},
  data () {
    return {
      modal: {},
      showModal: false,
      product: this.$props.product,
      counter: 0,
      errors: {},
      avatarError: false,
      avatarErrorPusher: false
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

      fetch(`${config.api.url}products/${this.$props.product.id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          name: this.product.name,
          avatarFilePath: this.product.image,
          description: this.product.description,

        })
      })
          .then((response) => response.json())
          .then(response => {
            if (response.success === true) {

              this.counter++
              this.showModal = true
              this.modal = {
                iconType: 'ok',
                heading: 'Услуга успешно обновлена!',
                description: `Спасибо!`,
                descriptionType: 'text',
                exit: true,
                close: true,
                confirm: false

              }

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
        this.$refs.projectAvatar.parentElement.style.borderColor = 'rgb(0, 115, 236)'

        fetch("http://62.113.96.171:3000/image-upload", {
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

      if (this.product.name.length < 4) {
        this.errors.serviceNameErr = 'Название услуги должно быть не менее 4 символов'
        this.$refs.productName.style.borderColor = 'red'
      } else {
        delete this.errors.serviceNameErr
        this.$refs.productName.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.product.description.length < 30) {
        this.errors.serviceDescriptionErr = 'Описание услуги должно быть не менее 30 символов'
        this.$refs.productDescription.style.borderColor = 'red'
      } else {
        delete this.errors.serviceDescriptionErr
        this.$refs.productDescription.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.product.image.length === 0) {
        this.errors.serviceImageErr = 'Изображение не загружено'
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
      } else {
        delete this.errors.serviceImageErr
        this.$refs.projectAvatar.parentElement.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.avatarError === true) {
        this.errors.serviceImageTypeErr = 'Формат изображения не поддерживается'
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
      } else {
        delete this.errors.serviceImageTypeErr
        this.$refs.projectAvatar.parentElement.style.borderColor = 'rgb(0, 115, 236)'
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