<template>

  <div class="sign-in" v-if="!userInfo.token">
    <popup-auth
        v-show="popup.auth.show === true"
        @closeModal="popup.auth.show = false"
        v-bind:modal="popup.auth" />

    <div class="need-auth" @click="popup.auth.show = true">
      <h2 >Вы не авторизованы, войдите в аккаунт</h2>
      <button-primary
          @click="addLinkToProject"
          :style="'filled'">
        <template #default>
          Войти
        </template>
      </button-primary>
    </div>


  </div>


  <div class="add-project form-wrapper" v-else>


    <div class="left">
      <input-text
          :input="inputs.name"
          :data="inputs.name.data"
          @data="emit => {
            project.name = emit
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
            delete this.notice.text.nameLength
          }"
          @error="emit => {
            project.name = null
            this.notice.color = 'red'
            this.notice.text.nameLength = emit
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
          }"
      />

      <input-textarea
          :input="inputs.description"
          :data="inputs.description.data"
          @data="emit => {
            this.project.description = emit
            delete this.notice.text.descriptionLength
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false

          }"
          @error="emit => {
            this.project.description = null
            this.notice.color = 'red'
            this.notice.text.descriptionLength = emit
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false

          }"
      />
    </div>

    <div class="right">
      <div class="images-box">

        <input-file
            :input="inputs.avatar"
            :data="project.avatar"
            @data="emit => {
              this.project.avatar = emit
              delete this.notice.text.imageErros
              Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
            }"
            @error="emit => {
              this.project.avatar = null
              this.notice.color = 'red'
              this.notice.text.imageErros = emit
              Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
            }"
        />

        <input-file
            :input="inputs.banner"
            @data="emit => {
          this.project.banner = emit
          delete this.notice.text.imageErros
          Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
        }"
            @error="emit => {
          this.project.banner = null
          this.notice.color = 'red'
          this.notice.text.imageErros = emit
          Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
        }"
        />




      </div>

      <div class="links-box">
        <div>
          <input-select
              :input="inputs.links.name"
              @data="emit => linkToAdd.name = emit"

          />
        </div>
        <div>
          <input-link
              :input="inputs.links.link"
              :data="inputs.links.link.data"
              @data="emit => {
                linkToAdd.link = emit
                inputs.links.link.data = emit
                Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
                delete this.notice.text.linkErr
              }"

              @error="emit => {
                linkToAdd.link = null
                this.notice.color = 'red'
                this.notice.text.linkErr = emit
                Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false

              }"
          />
        </div>

        <button-primary
            @click="addLinkToProject"
            :style="'filled'">
          <template #default>
            Вставить ссылку в проект
          </template>
        </button-primary>
      </div>

      <div class="categories-box">
        <input-categories
            :input="inputs.categories"
            :data="inputs.categories.data"
            @categoryIds="emit => {
              project.categoryIds = emit
              Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
              delete this.notice.text.nameLength
            }"

            @exchangerSelected="emit => {
              this.exchangerSelected = emit

            }"
        />
      </div>

      <div class="exchanger-box"
           v-if="exchangerSelected"
      >
        <div>
          <input-number
              :input="inputs.reserve"
              :data="inputs.reserve.data"
              @data="emit => {
            project.reserve = emit

            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
            delete this.notice.text.reserveErr
          }"
              @error="emit => {
            project.reserve = null
            this.notice.color = 'red'
            this.notice.text.reserveErr = emit
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
          }"
          />
        </div>
        <div>
          <input-number
              :input="inputs.minValueToExchange"
              :data="inputs.minValueToExchange.data"
              @data="emit => {
            project.minValueToExchange = emit

            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
            delete this.notice.text.minValueToExchangeErr
          }"
              @error="emit => {
            project.minValueToExchange = null
            this.notice.color = 'red'
            this.notice.text.minValueToExchangeErr = emit
            Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false
          }"
          />
        </div>

      </div>

    </div>

    <div class="links">
      <div class="link" v-for="link of project.links">
        <project-external-link
            :link="link"
            :edit="true"
            @removeLink="emit => {
              project.links.splice(project.links.findIndex(item => item.link === emit), 1)

            }"
        />
      </div>


    </div>
    <div class="buttons">
      <button-primary
          @click="checkForm"
          :style="'filled'">
        <template #default>
          Добавить проект
        </template>
      </button-primary>


    </div>

  </div>



  <notice :notice="notice" :errors="errors"
          @closeNotice="notice.show = false"
  />

  <popup-info
      :modal="modal"
      v-if="modal.show"
      @closeModal="this.$router.push('/')"


  >
    <template #header>
      Проект успешно добавлен
    </template>

    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
        <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </template>

    <template #text>
      Спасибо за добавление проекта "{{ project.name }}". В ближайшее время модератор проверит ваш проект и он появится в результатах выдачи
    </template>

    <template #button>
      Жду модерацию
    </template>
  </popup-info>
</template>

<script>
import loader from "../../Layouts/BaseLoader.vue";
import buttonPrimary from "../../components/Buttons/ButtonPrimary.vue";
import notice from "../../components/Popups/Notice.vue";
import inputText from "../../components/Inputs/InputText.vue";
import inputTextarea from "../../components/Inputs/InputTextarea.vue";
import inputFile from "../../components/Inputs/InputFile.vue";
import inputSelect from "../../components/Inputs/InputSelect.vue";
import inputCategories from "../../components/Inputs/InputCategories.vue";
import inputLink from "../../components/Inputs/InputLink.vue";
import inputNumber from "../../components/Inputs/InputNumber.vue";
import {categoriesStore} from "../../Store/categories.js";
import {addProject} from "../../API/project.js";
import popupInfo from "../../components/Popups/PopupInfo.vue";
import signIn from "../../components/Forms/SignIn.vue";
import {userInfo} from "../../Store/userInfo.js";
import projectExternalLink from "../../Helpers/ProjectExternalLink.vue";
import buttonAction from "../../components/Buttons/ButtonAction.vue";
import {apiUrl} from "../../assets/js/config.js";
import popupAuth from "../../components/Popups/PopupAuth.vue";

export default {
  name: "Project_Add.vue",
  components: {
    loader,
    buttonPrimary,
    notice,
    inputText,
    inputTextarea,
    inputFile,
    inputSelect,
    inputCategories,
    inputLink,
    inputNumber,
    popupInfo,
    popupAuth,
    projectExternalLink,
    buttonAction


  },
  emits: ['changeModal'],

  data () {
    return {
      popup: {
        auth: {
          show: false
        }
      },
      project: {
        name: '',
        description: null,
        avatarFilePath: null,
        categoryIds: [],
        links: []
      },
      apiUrl,
      exchangerSelected: false,
      linkToAdd: {
        name: "Зеркало",
        link: ''
      },
      userInfo,

      inputs: {
        name: {
          name: 'Название',
          placeholder: 'От 4 до 255 символов',
          tooltip: 'На главной странице и на странице проекта отображаются только первые 90 символов, будьте внимательны.',
          min: 4,
          max: 255,
          data: null
        },

        minValueToExchange: {
          name: 'Минимальный обмен в рублях',
          placeholder: 'От 1 до 30 символов',
          tooltip: 'На главной странице и на странице проекта отображаются только первые 90 символов, будьте внимательны.',
          min: 1,
          max: 10000000000000,
          data: null
        },
        reserve: {
          name: 'Резерв валюты в рублях',
          placeholder: 'От 1 до 30  символов',
          tooltip: 'На главной странице и на странице проекта отображаются только первые 90 символов, будьте внимательны.',
          min: 1,
          max: 10000000000000,
          data: null
        },

        categories: {
          name: 'Категории',
          placeholder: 'От 5 до 255 символов',
          tooltip: 'На главной странице и на странице проекта отображаются только первые 90 символов, будьте внимательны.',
          data: null
        },

        links: {
          name: {
            name: 'Ресурс',
            placeholder: 'От 5 до 255 символов',
            tooltip: 'Ресурс, на который ссылается ссылка',
          },

          link: {
            name: 'Ссылка',
            placeholder: 'От 5 до 255 символов',
            tooltip: 'На главной странице и на странице проекта отображаются только первые 90 символов, будьте внимательны.',
            min: 5,
            max: 255,
            data: null
          }

        },

        avatar: {
          name: 'Изображение',
          tooltip: 'Рекомендуем размеры от 200х200px, соотношение сторон 1:1, требуемый формат: png, jpeg, jpg, gif. webp.',
          data: null
        },

        banner: {
          name: 'Баннер проекта',
          tooltip: 'Рекомендуем размеры от 1000х200px, соотношение сторон 4:1, требуемый формат: png, jpeg, jpg, gif. webp.',
          data: null
        },

        description: {
          name: 'Описание',
          placeholder: 'От 30 символов.',
          min: 30,
          max: 65535,
          data: null
        },
      },
      notice: {
        show: false,
        color: null,
        text: {}
      },
      errors: {},

      categoriesStore,
      modal: {
        show: false,
      }

    }
  },

  watch: {
    exchangerSelected: function (newVal, oldVal) {
      newVal === false ? delete this.project.minValueToExchange : null
      newVal === false ? delete this.project.reserve : null
    }
  },

  mounted() {
    !userInfo.token ? this.popup.auth.show = true : null
  },

  methods: {

    addLinkToProject() {

      console.log(this.linkToAdd.link.length)

      if (this.linkToAdd.name === null || !this.linkToAdd.link) {

      } else {
        if (this.project.links.length < 12) {
          const link = {
            name: this.linkToAdd.name,
            link: this.linkToAdd.link
          }
          this.project.links.push(link)
          this.linkToAdd.link = ''
          this.inputs.links.link.data = ''

        } else {

        }


      }

    },
    removeLink(removableLink) {
      for (let link of this.project.links){
        if (link.link === removableLink) {
          this.project.links.splice(this.project.links.indexOf(link), 1)
        }
      }

    },


    checkForm () {


      this.project.name < 1 ? this.notice.text.nameEmpty = 'Название не может быть пустым' : delete this.notice.text.nameEmpty
      this.project.description < 1 ? this.notice.text.descriptionEmpty = 'Описание не может быть пустым' : delete this.notice.text.descriptionEmpty
      this.project.categoryIds.length < 1 ? this.notice.text.categoriesEmpty = 'Проект должен иметь хотя бы 1 категорию' : delete this.notice.text.categoriesEmpty
      this.project.links.length < 1 && this.linkToAdd.link.length <= 0 ? this.notice.text.linksEmpty = 'Проект должен иметь хотя бы 1 ссылку' : delete this.notice.text.linksEmpty
      !this.project.avatar ? this.notice.text.avatarFilePathEmpty = 'Загрузите аватар' : delete this.notice.text.avatarFilePathEmpty
      !this.project.minValueToExchange && this.project.categoryIds.includes(categoriesStore.exchanger.id) ? this.notice.text.minValueToExchangeErr2 = 'У обменника должно быть заполнено поле минимального обмена' : delete this.notice.text.minValueToExchangeErr2
      !this.project.reserve && this.project.categoryIds.includes(categoriesStore.exchanger.id) ? this.notice.text.reserveErr2 = 'У обменника должно быть заполнено поле резерв' : delete this.notice.text.reserveErr2
      this.linkToAdd.link.length > 0 ? this.addLinkToProject() : null


      Object.keys(this.notice.text).length > 0 ? this.notice.show = true : this.notice.show = false

      if(Object.keys(this.notice.text).length <= 0) {

        addProject(this.project).then(result => {
          this.modal.show = true
        }).catch(error => this.notice.text = error)

      }
    }
  },
}
</script>

<style scoped lang="scss">
.add-project {
  display: flex;
  width: 100%;
  gap: 3%;

  .left {
    width: 29%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;


  }
  .right {
    width: 68%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    .images-box, .links-box {
      width: 50%;
    }
    .links-box {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;

      div {

        &:nth-child(1) {
          width: 35%;
        }

        &:nth-child(2) {
          width: 63%;
        }

      }


    }

    .categories-box {
      width: 100%;
    }

    .exchanger-box {
      margin-top: 10px;
      display: flex;
      gap: 20px;
      width: 100%;
      justify-content: space-between;

      div {
        width: 50%;
      }

    }

  }

  input {
    width: 100%;

  }
  label {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
}

textarea {
  height: 220px;
}
.links {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;


}
.errors {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #984a5a;

  h2 {
    color: #984a5a;
    margin-bottom: 10px;
    font-family: "PT Sans Caption";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  span {
    color: #984a5a;
    font-family: "PT Sans Caption";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.buttons {
  width: 20%;
  margin-top: 20px;
  display: flex;
  gap: 2%;

}
@media screen and (max-width: 500px){
  .form-wrapper {
    padding-left: 10px;
    padding-right: 10px;
    flex-wrap: wrap;
    .input-wrapper {
      .fake-input {
        width: 100%;
        label {
          width: 100%;
        }
      }
    }

    .left, .right, .input-wrapper {
      width: 100%;
      flex-wrap: wrap;

      .images, .link {
        width: 100%;
      }

    }
  }
  .links {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 30px;
  }
}
.sign-in {
  .need-auth {
    max-width: 300px;
    margin: 0 auto;
    text-align: center;

    h2 {
      margin-bottom: 20px;
    }
  }
}
@media screen and (max-width: 768px){

  .add-project .right {
    .images-box, .links-box {
      width: 100%;
    }
    .categories-box {
      margin-top: 30px;
    }
  }

  .buttons {
    width: 100%;
  }
}
</style>