<template>
<h1>Добавление проекта</h1>

  <div class="add-project form-wrapper">
    <div class="left">
      <div class="input-wrapper">
        <input
            type="text"
            placeholder="Название проекта"
            v-model="projectName"
            v-on:input="(e) => {
              projectName.length <= 5 ? e.target.classList.add('bad') : e.target.classList.add('ok')
              projectName.length > 5 ? e.target.classList.remove('bad') : e.target.classList.remove('ok')
            }"

            minlength="5" maxlength="30"
            required>
        <span class="help">
          Введите название проекта, которое коротко и ясно отражает его суть. От 5 до 30 символов.
        </span>
      </div>

      <div class="input-wrapper">
        <select v-model="projectCategory">
          <option v-for="category of categories" :value="category.id" selected>{{ category.name }}</option>
        </select>
        <span class="help">
          Выберите категорию, к которой относится проект.
        </span>
      </div>
      <div class="input-wrapper">
        <div class="fake-input">
          <span class="name">Аватарка *</span>
          <input type="file"
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
                 accept="image/*">
        </div>
        <span class="help">
          Загрузите аватар проекта, размеры 1060х220px, форматы: jpeg, jpg, gif. webp
        </span>
      </div>



    </div>
    <div class="right">
      <textarea placeholder="описание проекта *" required v-model="projectDescription"></textarea>
      <span class="help">
        Предоставьте подробное описание проекта, включая его цель, описание продаваемых товаров, что бы пользователь точно понимал что он покупает.
      </span>
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
        <div class="links">
          <div class="link">
            <span class="name">
              Обязательная ссылка
            </span>
            <div class="leftW">
              <input
                  type="text"
                  placeholder="Название"
                  v-model="projectLinks.name"
                  required>
              <span class="help">
              Название ссылки (например: Зеркало, Onion, WWH и другое)
            </span>
            </div>
            <div class="rightW">
              <input
                  type="text"
                  placeholder="Ссылка"
                  v-model="projectLinks.link"
                  required>
              <span class="help">
              Сама ссылка, https://myproject.com и аналогичное
            </span>
            </div>
          </div>

          <button class="add"
                  v-if="this.count < 12"

                  v-on:click="addAnotherOneLink()">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
              <path opacity="0.3" d="M7.69655 17V0H10.3034V17H7.69655ZM0 9.70283V7.33727H18V9.70283H0Z" fill="black"/>
            </svg>
            Добавить еще ссылку
          </button>
        </div>
      </div>

    </div>

    <button class="btn-filled btn disabled"
            disabled
    v-on:click="() => {
      previewBeforeUpload()
      console.log($emit.changeModal)
      this.showModal = true
    }">
      Добавить проект
    </button>
  </div>


  <modal-window-backdrop
      v-if="showModal === true"
      v-on:changeModal="(emitShowModal) => {this.showModal = emitShowModal}"
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
      projectAvatar: '',
      projectBanner: '',

      projectLinks: [],
      errorMessage: '',

      acceptableInput: ''
    }
  },
  mounted() {
    this.getCategoryList()
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
      fetch("http://62.113.96.171:3000/image-upload", {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
      })
          .then((response) => response.json())
          .then((result) => this.projectAvatar = result.filePath)
          .catch((error) => console.error(error));
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
      fetch("http://62.113.96.171:3000/image-upload", {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
      })
          .then((response) => response.json())
          .then((result) => this.projectBanner = result.filePath)
          .catch((error) => console.error(error));
    },
    addAnotherOneLink () {
      const wrapper = document.querySelector('.links-wrapper .links')
      this.count = wrapper.childNodes.length

      if (wrapper.childNodes.length < 13) {
        const newInput = document.createElement('div')


        newInput.classList.add('link')
        newInput.innerHTML = `<span class="name">
              Дополнительная ссылка
              <span class="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
                  <path d="M2.82058 1.25147C2.93 0.47276 3.57911 -0.00211763 4.23459 7.10013e-06C4.87201 0.00213183 5.51687 0.448326 5.64116 1.25041C5.67197 1.25041 5.70491 1.25041 5.73678 1.25041C6.24778 1.25041 6.75877 1.24723 7.26871 1.25254C7.84451 1.25891 8.31727 1.65305 8.43625 2.21504C8.55736 2.78872 8.29496 3.33265 7.77227 3.58549C7.72128 3.60993 7.70641 3.64074 7.70641 3.69386C7.70747 4.79341 7.70747 5.89189 7.70747 6.99144C7.70747 7.7351 7.71172 8.47875 7.70747 9.22347C7.70428 9.83433 7.3282 10.3081 6.75559 10.4324C6.6621 10.4526 6.5633 10.459 6.46662 10.459C4.97612 10.4601 3.48562 10.4601 1.99406 10.4601C1.27484 10.4601 0.756403 9.94376 0.755341 9.22241C0.754278 7.72341 0.755341 6.22441 0.755341 4.72541C0.755341 4.38121 0.754278 4.037 0.756403 3.69279C0.756403 3.63649 0.738343 3.60993 0.688412 3.58656C0.186975 3.35284 -0.0552449 2.84715 0.0106219 2.29684C0.0786133 1.7306 0.583237 1.23979 1.25147 1.24935C1.75078 1.25679 2.25115 1.25147 2.75046 1.25147C2.77171 1.25147 2.79402 1.25147 2.82058 1.25147ZM1.32477 3.71192C1.32477 3.79372 1.32477 3.87127 1.32477 3.94776C1.32477 5.71023 1.32477 7.47269 1.32477 9.23516C1.32477 9.62505 1.59461 9.89383 1.98344 9.89383C2.50506 9.89383 3.02668 9.89383 3.5483 9.89383C4.52568 9.89383 5.50199 9.89383 6.47937 9.89383C6.61854 9.89383 6.74815 9.86196 6.86395 9.78122C7.06367 9.64098 7.14016 9.44445 7.1391 9.20754C7.13698 8.77197 7.13698 8.3364 7.13698 7.90083C7.13698 6.56331 7.13804 5.22579 7.13804 3.88827C7.13804 3.8309 7.13804 3.77353 7.13804 3.71298C5.19497 3.71192 3.26465 3.71192 1.32477 3.71192ZM4.22609 3.13824V3.1393C4.87839 3.1393 5.53068 3.1393 6.18297 3.1393C6.55799 3.1393 6.93194 3.14567 7.30696 3.13293C7.62035 3.1223 7.85301 2.88539 7.89232 2.56562C7.93269 2.24054 7.74996 1.93458 7.44825 1.85277C7.33033 1.8209 7.20178 1.81984 7.07748 1.81984C5.13442 1.81772 3.19241 1.81878 1.24934 1.81772C0.767027 1.81772 0.461065 2.22142 0.593861 2.68673C0.658665 2.91302 0.881762 3.14036 1.22809 3.1393C2.22884 3.13505 3.22747 3.13824 4.22609 3.13824ZM3.40276 1.24723C3.95625 1.24723 4.5055 1.24723 5.05474 1.24723C5.00268 0.878584 4.64679 0.578997 4.24946 0.567311C3.84577 0.555625 3.48669 0.840339 3.40276 1.24723Z" fill="black"/>
                  <path d="M3.94871 7.28678C3.94871 6.76515 3.94871 6.24353 3.94871 5.72297C3.94871 5.53918 4.0677 5.41276 4.23449 5.41383C4.3981 5.41595 4.51496 5.54237 4.51496 5.71979C4.51496 6.76516 4.51496 7.81159 4.51496 8.85695C4.51496 9.04818 4.3896 9.17885 4.21537 9.17035C4.06133 9.16292 3.94871 9.04074 3.94871 8.87714C3.94765 8.34596 3.94871 7.81584 3.94871 7.28678Z" fill="black"/>
                  <path d="M2.42965 7.28687C2.42965 6.75675 2.42859 6.22663 2.43071 5.69651C2.43071 5.5669 2.5072 5.46598 2.62619 5.42667C2.73561 5.39055 2.86522 5.42136 2.92896 5.52228C2.96933 5.58602 2.99483 5.67101 2.99483 5.74644C3.00014 6.39555 2.99801 7.04571 2.99801 7.69482C2.99801 8.08365 2.99908 8.47247 2.99695 8.86024C2.99589 9.04721 2.86841 9.17682 2.69949 9.16832C2.54757 9.16089 2.43284 9.04402 2.43071 8.88467C2.42752 8.62333 2.42965 8.36305 2.42965 8.10171C2.42965 7.8308 2.42965 7.55884 2.42965 7.28687Z" fill="black"/>
                  <path d="M6.03217 7.29729C6.03217 7.82423 6.03323 8.35222 6.03111 8.87916C6.03004 9.07038 5.88025 9.19362 5.69434 9.16281C5.55942 9.1405 5.46593 9.01939 5.46593 8.85791C5.46487 8.42446 5.46487 7.99208 5.46487 7.55863C5.46487 6.94565 5.4638 6.3316 5.46593 5.71862C5.46699 5.50189 5.65715 5.35847 5.84625 5.42859C5.96099 5.47215 6.03217 5.57201 6.03217 5.70587C6.03429 6.13294 6.03323 6.56107 6.03323 6.98814C6.03323 7.09225 6.03323 7.1953 6.03217 7.29729C6.03323 7.29729 6.03323 7.29729 6.03217 7.29729Z" fill="black"/>
                </svg>
                    Удалить
                </span>
            </span>

            <div class="leftW">
              <input
                  type="text"
                  placeholder="Название"
                  required>
              <span class="help">
              Название ссылки (например: Зеркало, Onion, WWH и другое)
            </span>
            </div>
            <div class="rightW">
              <input
                  type="text"
                  placeholder="Ссылка"
                  required>
              <span class="help">
              Сама ссылка, https://myproject.com и аналогичное
            </span>
            </div>`
        wrapper.insertBefore(newInput, document.querySelector('.add'))


        const deleteButtons = document.querySelectorAll('.delete')
        for (let button of deleteButtons) {
          button.addEventListener('click', (e) => {
            e.target.parentNode.parentNode.remove()
            console.log()
            this.count = wrapper.childNodes.length - 1
          })

        }
        console.log(this.count)
      }

    },
    previewBeforeUpload () {
      const project = {
        name: this.projectName,
        description: this.projectDescription,
        categoryIds: [this.projectCategory],
        avatarFilePath: this.projectAvatar,
        bannerFilePath: this.projectBanner,
        links:  {
          name: this.projectLinks.name,
          link: this.projectLinks.link
        }


      };
      console.log(project.links)


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
      console.log(project)
    },
    getCategoryList() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch("http://62.113.96.171:3000/categories", {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {this.categories = result.categories})
          .catch((error) => {console.error(error)});
    },
  },
}
</script>

<style scoped lang="scss">
.add {
  border-radius: 10px;
  border: 1px solid #DFDFDF;
  background: #FFF;
  margin-top: 22px;

  color: #000;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: .5;
  cursor: pointer;
  height: auto;
  align-items: center;
  padding: 10px;
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
.top-heading {
  display: flex;
  width: 100%;



}
.bottom {
  margin-top: 20px;

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