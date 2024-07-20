<template>
  <div>
    <div class="popup"
         v-if="modal.show"
         :class="{show: modal.show}">

      <div class="popup_header">
        <slot name="header"></slot>
      </div>

      <div class="popup_body">
        <input-text

            :input="inputs.productName"
            :data="inputs.productName.data"
            @returnData="emit => {
              this.product.name = emit
              Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
              delete this.notice.text.nameLength
            }"
            @returnError="emit => {
              this.product.name = null
              this.notice.color = 'red'
              this.notice.text.nameLength = emit
              Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
            }"
        />


        <input-file
            :input="inputs.productImage"
            v-if="!$props.options || this.oldImage"
            @data="emit => {
            this.product.file = emit
            delete this.notice.text.imageErros
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
          }"
            @error="emit => {
            this.product.file = null
            this.notice.color = 'red'
            this.notice.text.imageErros = emit
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
          }"
        />

        <div class="popup_body_image" v-else-if="$props.options.avatarFilePath">
          <img :src="api.url + $props.options.avatarFilePath" alt="">
          <button-action @click="() => {
          this.oldImage = $props.options.avatarFilePath
          this.$props.options.avatarFilePath = null
        }">
            <template #text>
              Заменить
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </button-action>
        </div>

        <input-textarea
            :input="inputs.productDescription"
            :data="inputs.productDescription.data"
            @returnedData="emit => {
            this.product.description = emit
            delete this.notice.text.descriptionLength
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false

          }"
            @error="emit => {
            this.product.description = null
            this.notice.color = 'red'
            this.notice.text.descriptionLength = emit
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false

          }"
        />
      </div>


      <div class="popup_buttons" >
        <div class="popup_buttons_button">
          <button-primary
              v-show="!loading"
              @close="() => {

              if (Object.keys(this.notice.text).length <= 0) {
                this.product.projectId = $props.projectId
                this.$props.options === null ? addNewProduct(product) : updateExistProduct(product)
              } else {

              }

            }"
          >
            <template #default>
              <slot name="buttonConfirm"></slot>
            </template>
          </button-primary>

          <loader-small v-show="loading" />
        </div>

        <div class="popup_buttons_button">
          <button-secondary-gray
              @pressed="() => {
              closeModal()
              this.oldImage ? $props.options.avatarFilePath = this.oldImage : null
            }"
          >
            <template #default>
              <slot name="buttonSecondary"></slot>
            </template>
          </button-secondary-gray>

        </div>


      </div>


      <div class="popup_close" @click="closeModal()">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="backdrop"
         @click="closeModal()"
         :class="{show: modal.show}"></div>

    <notice v-if="notice.show" :notice="notice"
            @closeNotice="emit => notice.show = emit"
    />
  </div>
</template>

<script>
import ButtonPrimary from "../Buttons/ButtonPrimary.vue";
import ButtonSecondaryGray from "../Buttons/ButtonSecondaryGray.vue";
import inputText from "../Inputs/InputText.vue";
import inputTextarea from "../Inputs/InputTextarea.vue";
import notice from "./Notice.vue";
import {checkInputData} from "../../assets/js/fieldDataController.js";
import inputFile from "../Inputs/InputFile.vue";
import {addProduct, updateProduct} from "../../API/products.js";
import loaderSmall from "../Loaders/LoaderSmall.vue";
import {api} from "../../assets/js/config.js";
import buttonAction from "../Buttons/ButtonAction.vue";



export default {
  name: "Popup.vue",
  emits: ['closeModal', 'productAdded', 'productUpdated'],
  props: {
    modal: {
      show: true,
      data: null
    },
    options: {
      buttonConfirmText: null,
      product: null
    },
    mode: null,
    projectId: null

  },

  data() {
    return {
      data: {
        name: null,
        description: null,
        imageFilePath: null
      },
      notice: {
        show: false,
        color: null,
        text: {}
      },
      oldImage: null,
      checkInputData,
      loading: false,

      product: {
        name: null,
        description: null,
        avatarFilePath: null,
        file: null
      },

      inputs: {
        productName: {
          name: 'Название',
          placeholder: 'От 5 до 255 символов',
          tooltip: 'На главной странице и на странице проекта отображаются только первые 90 символов, будьте внимательны.',
          min: 5,
          max: 255,
          data: null
        },

        productImage: {
          name: 'Изображение',
          tooltip: 'Рекомендуем размеры от 200х200px, соотношение сторон 1:1, требуемый формат: png, jpeg, jpg, gif. webp.',
          data: null
        },

        productDescription: {
          name: 'Описание',
          placeholder: 'От 30 символов.',
          min: 30,
          max: 65535,
          data: null
        },


      },
      api
    }
  },
  components: {
    ButtonPrimary,
    ButtonSecondaryGray,
    inputText,
    inputTextarea,
    notice,
    inputFile,
    loaderSmall,
    buttonAction
  },
  watch: {
    options: (val, oldVal) => {

    },
    mode: (val, oldVal) => {

    }
  },
  mounted() {
    if (this.$props.modal.show === true) {
      document.body.style.overflow = 'hidden hidden'
      window.addEventListener('keydown', (e) => {
        e.key === 'Escape' ? this.closeModal() : null
      })
    } else {
      document.body.style.overflow = 'hidden scroll'
    }
    this.$props.options ? this.product = this.$props.options : null

    this.inputs.productName.data = this.product.name || null
    this.inputs.productDescription.data = this.product.description || null
    this.inputs.productImage.data = this.product.avatarFilePath || null


  },
  methods: {

    closeModal() {
      this.$emit('closeModal', true)

      document.body.style.overflow = 'hidden scroll'
    },
    async addNewProduct(product) {
      this.loading = true
      if (!product.name) {
        this.notice.show = true
        this.notice.color = 'red'
        this.notice.text.nameLength = `Название должно содержать не менее 5 символов`
        this.loading = false

      }
      if (!product.description) {
        this.notice.show = true
        this.notice.color = 'red'
        this.notice.text.descriptionLength = `Описание должно содержать не менее 30 символов`
        this.loading = false
      }
      if (!product.file) {
        this.notice.show = true
        this.notice.color = 'red'
        this.notice.text.imageErros = `Загрузите изображение`
        this.loading = false
      }

      if (Object.keys(this.notice.text).length <= 0) {
        product.projectId = this.$props.projectId

        addProduct(product).then(result => {
          this.closeModal()

          this.notice.show = true
          this.notice.color = 'green'
          this.notice.text = {
            success: 'Добавлено успешно.'
          }
          this.loading = false
          this.$emit('productAdded', product)
        }).catch(error => {
          this.notice.show = true
          this.notice.color = 'red'
          this.notice.text = {
            error: error
          }
          this.loading = false
        })
      }




    },
    async updateExistProduct(product) {
      this.loading = true
      if (!product.name) {
        this.notice.show = true
        this.notice.color = 'red'
        this.notice.text.nameLength = `Название должно содержать не менее 5 символов`

      }
      if (!product.description) {
        this.notice.show = true
        this.notice.color = 'red'
        this.notice.text.descriptionLength = `Описание должно содержать не менее 30 символов`
      }
      if (!product.file && !this.$props.options.avatarFilePath) {
        this.notice.show = true
        this.notice.color = 'red'
        this.notice.text.imageErros = `Загрузите изображение`
      }

      if (Object.keys(this.notice.text).length <= 0) {
        product.projectId = this.$props.projectId

        updateProduct(product).then(result => {
          this.closeModal()

          this.notice.show = true
          this.notice.color = 'green'
          this.notice.text = {
            success: 'Добавлено успешно.'
          }
          this.loading = false
          this.$emit('productUpdated', product)
        }).catch(error => {
          this.notice.show = true
          this.notice.color = 'red'
          this.notice.text = {
            error: error
          }
          this.loading = false
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">

.popup {
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  background: #FFF;
  padding: 15px 20px 20px 15px;
  position: fixed;
  z-index: 51;
  width: 300px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  scale: 0;
  transition: .15s ease;

  visibility: hidden;
  opacity: 0;

  &.show {
    scale: 1;
    visibility: visible;
    opacity: 1;
  }

  .popup_icon {
    margin-bottom: 20px;
  }

  .popup_header {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
  }
  .popup_text {
    color: var(--gray, #A8A8A8);
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
    word-wrap: break-word;
  }
  .popup_buttons {
    display: flex;
    width: 100%;
    gap: 10px;
  }
  .popup_close {
    position: absolute;
    right: 22px;
    top: 22px;
    cursor: pointer;
  }
  .popup_body_image {
    width: 100%;

    img {
      width: 100%;
      border-radius: 10px;
    }
  }
}
.backdrop {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  height: 100%;
  width: 100%;
  z-index: 50;

  background: rgba(217, 217, 217, 0.60);
  backdrop-filter: blur(3px);

  visibility: hidden;
  opacity: 0;


  &.show {
    visibility: visible;
    opacity: 1;
  }
}
@media screen and (max-width: 768px){
  .popup {
    width: 90%;
    flex-wrap: wrap;
    max-height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 10px;
    .popup_body {
      width: 100%;
      .popup_image {
        width: 140px;
      }
      .popup_header {
        font-size: 14px;
      }
      .popup_text {
        font-size: 12px;
      }
    }
  }
}
</style>
