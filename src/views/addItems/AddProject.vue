<template>
<h1>Добавление проекта</h1>

  <div v-if="userLoggined === false" class="not-registered">
    Вы не вошли в аккаунт, что бы добавить проект Вам нужно зарегитстрироваться и \ или войти в аккаунт.
  </div>

  <div class="add-project form-wrapper" v-else>
    <div class="left">
      <div class="input-wrapper">
        <input
            type="text"
            placeholder="Название проекта"
            v-model="projectName"
            minlength="5" maxlength="255"
            ref="projectName"
            required>
        <span class="help">
          Введите название проекта, которое коротко и ясно отражает его суть. От 5 до 255 символов.
        </span>
      </div>

      <div class="input-wrapper">
        <select v-model="projectCategory" ref="projectCategory" >
          <option :id="category.id"
                  v-for="category of categories"
                  :value="category.id"
                  :data-name="category.id"

          >{{ category.name }}</option>
        </select>
        <span class="help">
          Выберите категорию, к которой относится проект.

        </span>
      </div>
      <div class="input-wrapper">
        <div class="fake-input">
          <span class="name">Аватарка *</span>
          <input type="file"
                 ref="projectAvatar"
                 v-on:change="uploadAvatar($event)"
                 accept="image/*"
          >
        </div>
        <span class="help">
          Загрузите аватар проекта, размеры 110x110px, форматы: jpeg, jpg, gif. webp
        </span>

      </div>

      <div class="input-wrapper">
        <div class="fake-input">
          <span class="name">Баннер</span>
          <input type="file"

                 v-on:change="uploadBanner($event)"
                 accept="image/*" ref="projectBanner">
        </div>
        <span class="help">
          Загрузите аватар проекта, размеры 1060х220px, форматы: jpeg, jpg, gif. webp
        </span>
      </div>



    </div>
    <div class="right">
      <textarea placeholder="описание проекта *"
                required
                ref="projectDescription"
                v-model="projectDescription" maxlength="65535"></textarea>
      <span class="help">
        Предоставьте подробное описание проекта, включая его цель, описание продаваемых товаров, что бы пользователь точно понимал что он покупает.
        От 30 до 65535 символов.
      </span>
    </div>
    <div class="advanced" v-if="this.projectCategory === this.exchangersCategory">
      <div class="input-wrapper">
        <label for="min" >Минимальный обмен</label>
        <input
            type="number"
            id="min"
            placeholder="Минимальный обмен"
            v-model="projectExchangeRate"
            ref="projectExchangeRate"
            max="6"

            v-if="this.projectCategory === this.exchangersCategory">
        <span class="help" v-if="this.projectCategory === this.exchangersCategory">
          Введите размер минимальной суммы обмена
        </span>
      </div>

      <div class="input-wrapper">
        <label for="rate" v-if="this.projectCategory === this.exchangersCategory">Курс обмена</label>
        <input
            type="number"
            id="rate"
            placeholder="Курс"
            v-model="minValueToExchange"
            ref="minValueToExchange"
            max="6"

            v-if="projectCategory === this.exchangersCategory">
        <span class="help" v-if="this.projectCategory === this.exchangersCategory">
          Введите текущий курс вашего обмена
        </span>
      </div>

      <div class="input-wrapper">
        <label for="res" v-if="this.projectCategory === this.exchangersCategory">Резерв</label>
        <input
            type="number"
            id="res"
            placeholder="Резерв"
            v-model="projectReserve"
            ref="projectReserve"
            max="6"

            v-if="projectCategory === this.exchangersCategory">
        <span class="help" v-if="this.projectCategory === this.exchangersCategory">
          Введите резерв валюты.
        </span>
      </div>


    </div>

    <div class="bottom">
      <div class="heading">
        Ссылки на проект *
      </div>
      <div class="description">
        Одна ссылка обязательно, максимум 12 ссылок.
      </div>

      <div class="links-wrapper">
        <div class="top-heading">

        </div>
        <div class="links" >
          <div class="link" ref="link" v-on:keydown.enter="checkLinks()"
               v-if="this.addedLinksCount < 13">
            <span class="name" v-if="this.addedLinksCount < 13">
              Обязательная ссылка
            </span>
            <div class="leftW" v-if="this.addedLinksCount < 13">
              <input
                  type="text"
                  placeholder="Название"
                  v-model="addName"
                  ref="addName"
                  required>
              <span class="help">
              Название ссылки (например: Зеркало, Onion, WWH и другое)
            </span>
            </div>
            <div class="rightW" v-if="this.addedLinksCount < 13">
              <input
                  type="text"
                  placeholder="Ссылка"
                  v-model="addLink"
                  ref="addLink"

                  required>
              <span class="help" >
              Сама ссылка, https://myproject.com и аналогичное
            </span>
            </div>
            <button class="add"
                    v-if="this.addedLinksCount < 13"
                    v-on:click="checkLinks()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                <path opacity="0.3" d="M7.69655 17V0H10.3034V17H7.69655ZM0 9.70283V7.33727H18V9.70283H0Z" fill="black"/>
              </svg>
              Добавить ссылку в проект
            </button>
          </div>

          <div class="links-to-add">
            <p class="name" v-for="(link, index) of linksToAdd">{{parseInt(index) + 1}}) {{link.name}}: {{link.link}}
              <span v-on:click="deleteLink(index)">
                удалить
              </span></p>


          </div>


        </div>
      </div>

    </div>

    <button class="btn-filled btn disabled"

    v-on:click="() => {
       checkForm ()

    }">
      Добавить проект
    </button>
  </div>
  <div class="errors" ref="errors" v-if="this.errors.length > 0">
    <h3>Устраните ошибки:</h3>
    <div class="error" v-for="(error, index) of errors" >
      {{ index + 1 }}) {{ error }}

    </div>
  </div>



  <modal-window-backdrop
      v-if="showModal === true"
      v-on:changeModal="(emitShowModal) => {
        this.showModal = emitShowModal
        this.$router.push('/')
      }"
      v-bind:icon-type="'ok'"
      v-bind:heading="'Проект успешно добавлен'"
      v-bind:descriptionType="'text'"
      v-bind:description="'Проект появится в результатах поиска после одобрения модератором.\n'+
  '\n'+
  'Так же после одобрения проекта вы сможете добавлять, редактировать и удалять услуги и ссылки проекта '"
  >

  </modal-window-backdrop>
</template>

<script>
import modalWindowBackdrop from "../../components/page components/ModalWindowBackdrop.vue";
import { ref, watch } from "vue";
export default {
  name: "AddProject.vue",
  components: {modalWindowBackdrop},

  emits: ['changeModal'],

  data () {
    return {
      categories: '',
      selectedOption: '',
      count: 1,

      showModal: this.$emit.changeModal,

      projectName: '',
      projectDescription: '',
      projectCategory: [],
      projectCategoryName: [],
      projectAvatar: '',
      projectBanner: '',

      exchangersCategory: 0,

      projectLinks: [],
      errorMessage: '',

      projectExchangeRate: 100,
      projectReserve: 10000,
      minValueToExchange: 10,


      userLoggined: false,

      errors: [],
      avatarError: false,
      avatarErrorPushed: false,
      bannerError: false,
      bannerErrorPushed: false,
      linksToAdd: {},

      addLink: '',
      addName: '',
      addedLinksCount: 0,
      linkErr: false
    }
  },
  mounted() {
    this.getCategoryList()

    console.log(this.reviewedCount)
    localStorage.getItem('token') ? this.userLoggined = true : this.userLoggined = false
  },


  methods: {
    uploadAvatar(e){




      this.projectAvatar = e.target;
      const image = e.target.files[0]

      console.log(image)
      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "image/webp");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const formData = new FormData();
      formData.append("image-upload", image );

      console.log(formData)

      if (e.target.files[0].type !== "image/jpeg" ??
          e.target.files[0].type !== "image/jpg" ??
          e.target.files[0].type !== "image/png" ??
          e.target.files[0].type !== "image/webp") {
        this.avatarError = true
        if (this.avatarError === true && this.avatarErrorPushed === false) {
          this.errors.push('Формат аватарки не поддерживается')
          this.avatarErrorPushed = true
        }


        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
        console.dir(e.target.files[0].type)
      } else {
        this.avatarError = false
        this.avatarErrorPushed = false
        this.$refs.projectAvatar.parentElement.style.borderColor = '#6C7AFF'
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
    uploadBanner(e){
      this.projectBanner = e.target;
      const image = e.target.files[0]

      console.log(image)
      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "image/webp");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const formData = new FormData();
      formData.append("image-upload", image );

      console.log(formData)

      if (e.target.files[0].type !== "image/jpeg" ??
          e.target.files[0].type !== "image/jpg" ??
          e.target.files[0].type !== "image/png" ??
          e.target.files[0].type !== "image/webp") {
        this.avatarError = true
        if (this.avatarError === true && this.avatarErrorPushed === false) {
          this.errors.push('Формат аватарки не поддерживается')
          this.avatarErrorPushed = true
        }


        this.$refs.projectBanner.parentElement.style.borderColor = 'red'
        console.dir(e.target.files[0].type)
      } else {
        this.bannerError = false
        this.bannerErrorPushed = false
        this.$refs.projectBanner.parentElement.style.borderColor = '#6C7AFF'
        fetch("http://62.113.96.171:3000/image-upload", {
          method: "POST",
          headers: myHeaders,
          body: formData,
          redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => this.projectBanner = result.filePath)
            .catch((error) => console.error(error));
      }

    },
    addLinkToProject(index) {

      this.linksToAdd[index] = {
        name: this.addName,
        link: this.addLink
      }
      this.addName = ''
      this.addLink = ''
      console.log(this.addName)
    },

    previewBeforeUpload () {

      let projectType =''
      if (this.projectCategory === this.exchangersCategory) {

        projectType = 'exchanger'
        console.log('pts', this.projectCategory)
      } else {
        projectType = 'project'
        console.log('pte', this.projectCategory)
      }

      if (this.projectCategory === this.exchangersCategory) {
        projectType = 'exchanger'
        console.log(projectType)
      } else {
        projectType = 'project'
        console.log(projectType)
      }


      const project = {
        name: this.projectName,
        description: this.projectDescription,
        categoryIds: [this.projectCategory],
        avatarFilePath: this.projectAvatar,
        bannerFilePath: this.projectBanner || null,
        type: projectType,
        links:  this.linksToAdd,
        minValueToExchange: this.minValueToExchange || null,
        exchangeRate: this.projectExchangeRate || null,
        reserve: this.projectReserve || null,
        payed: false


      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


        fetch(`http://62.113.96.171:3000/projects`, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(project)
        })
            .then((response) => response.json())
            .then(response => console.log(response))
            .catch((error) => {console.error(error)});


    },
    getCategoryList() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch("http://62.113.96.171:3000/categories", {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            this.categories = result.categories
            this.projectCategory = result.categories[0].id
            console.log(this.categories.find(ex => {
              if (ex.name === 'Обменники') {
                this.exchangersCategory = ex.id
              }
              console.log(this.exchangersCategory)

            } ))
          })
          .catch((error) => {console.error(error)});
    },

    deleteLink(index) {
      console.log(this.linksToAdd)
      this.addedLinksCount--
      delete this.linksToAdd[index]
    },

    checkLinks() {

      if (this.addName < 3) {
        this.errors.push('Имя ссылки не может быть меньше 3х символов')
        this.linkErr = true
        this.$refs.addName.style.borderColor = 'red'
      } else {
        this.linkErr = false
        this.errors = []
        this.$refs.addName.style.borderColor = '#6C7AFF'
      }

      if (this.addLink < 10 ) {
        this.errors.push('Сама ссылка не может быть меньше, чем 10 символов')
        this.$refs.addLink.style.borderColor = 'red'
        this.linkErr = true
      } else {
        this.linkErr = false
        this.errors = []
        this.$refs.addLink.style.borderColor = '#6C7AFF'
      }

      if ( this.addName < 3 || this.addLink < 10 || this.linkErr === true) {
        setTimeout(()=> {
          this.$refs.errors.scrollIntoView({ behavior: 'smooth', block: 'start'})
        }, 20)
      } else {
        this.errors = []
        this.addLinkToProject(this.addedLinksCount)
        this.addedLinksCount++
      }


    },
    checkForm () {
      this.errors = []

      if (this.projectName.length < 5) {
        this.errors.push('Название проекта должно быть не менее 5 символов')
        this.$refs.projectName.style.borderColor = 'red'
      } else {
        this.$refs.projectName.style.borderColor = '#6C7AFF'
      }

      if (this.projectDescription.length < 30 || this.projectDescription.length > 65535) {
        this.errors.push('Описание проекта должно быть не менее 30 символов и не более 65535')
        this.$refs.projectDescription.style.borderColor = 'red'
      } else {
        this.$refs.projectDescription.style.borderColor = '#6C7AFF'
      }

      if (this.projectCategory.length === 0) {
        this.errors.push('Не выбрана категория проекта')
        this.$refs.projectCategory.style.borderColor = 'red'
      } else {
        this.$refs.projectCategory.style.borderColor = '#6C7AFF'
      }

      if (this.projectAvatar.length === 0) {
        this.errors.push('Аватар не загружен')
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
      } else {
        this.$refs.projectAvatar.parentElement.style.borderColor = '#6C7AFF'
      }

      if (this.linksToAdd.length === 0) {
        this.errors.push('Проект должен содержать хотя бы 1 ссылку')
        this.$refs.addName.style.borderColor = 'red'
        this.$refs.addLink.style.borderColor = 'red'
      } else {
        this.$refs.addName.style.borderColor = '#6C7AFF'
        this.$refs.addLink.style.borderColor = '#6C7AFF'
      }


      if (this.projectCategory === this.exchangersCategory) {
        if (this.projectExchangeRate < 10) {
          this.errors.push('Минимальный обмен не должен быть меньше 10$')
          this.$refs.projectExchangeRate.style.borderColor = 'red'
        } else {
          this.$refs.projectExchangeRate.style.borderColor = '#6C7AFF'

        }

        if (this.projectReserve === 0) {
          this.errors.push('Резерв не может быть меньше 500$')
          this.$refs.projectReserve.style.borderColor = 'red'
          console.log(this.$refs.projectReserve)
        } else {
          this.$refs.projectReserve.style.borderColor = '#6C7AFF'
        }
      }

      if (this.avatarError === true) {
        this.avatarError = this.errors.push('Формат аватарки не поддерживается')
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
      }

      if (this.bannerError === true) {
        this.bannerError = this.errors.push('Формат аватарки не поддерживается')
        this.$refs.projectBanner.parentElement.style.borderColor = 'red'
      }

      if (this.errors.length > 0 ) {
        setTimeout(()=> {
          this.$refs.errors.scrollIntoView({ behavior: 'smooth', block: 'start'})
        }, 20)
      } else {
        this.previewBeforeUpload();
        this.showModal = true
      }
    }
  },
}
</script>

<style scoped lang="scss">
.not-registered {
  margin-top: 10px;
}
.errors {
  margin-top: 10px;
  background-color: #ffdada;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;

  .error {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
.add {
  border-radius: 10px;
  border: 1px solid #DFDFDF;
  background: #FFF;
  margin-top: 0px;

  color: #000;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 1;
  cursor: pointer;
  height: auto;
  align-items: center;
  padding: 10px;
  width: 100%;
  position: relative;
  top: 4px;
  svg {
    position: relative;
    top: 2px;
  }
  transition: .3s ease;

  &:hover {
    opacity: 1;
  }
}
.links-to-add {
  padding-top: 20px;

  padding-bottom: 10px;
  box-sizing: border-box;

  p {
    margin-bottom: 5px;
  }
}
.top-heading {
  display: flex;
  width: 100%;



}
.bottom {
  margin-top: 20px;
  width: 100%;

  .heading {
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    opacity: .5;
  }
  .description {
    color: #000;
    font-family: Montserrat;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    opacity: .5;
  }
}
.help {
  color: #000;
  font-family: Montserrat;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  margin-top: 7px;

  opacity: 0.5;
  display: block;
}

.add-project {
  display: flex;
  gap: 2%;
  flex-wrap: wrap;
  justify-content: space-between;
  .left {
    width: 42%;
  }
  .right {
    width: 56%;
  }


}



</style>