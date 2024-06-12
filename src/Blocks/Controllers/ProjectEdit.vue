<template>


  <div class="add-project form-wrapper">

    <div class="left">
      <div class="input-wrapper">
        <label class="help" for="projectName">
          Название проекта
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Введите название проекта, до 255 символов', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>
        <div class="input">
          <input
              type="text"
              id="projectName"
              v-model="project.name"
              minlength="1" maxlength="255"
              ref="projectName"
              required>
        </div>
      </div>

      <div class="input-wrapper">
        <label class="help" for="projectDescription">
          Описание проекта
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Введите описание проекта, включая его цель, описание продаваемых товаров.', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </label>
        <div class="input">
          <textarea
              required
              id="projectDescription"
              ref="projectDescription"
              v-model="project.description" maxlength="65535"></textarea>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="images">

        <div class="input-wrapper">
          <label class="help">
            Аватар проекта
            <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Загрузите аватар проекта, размером  110x110 пикселей. Поддерживаемые форматы: jpeg, jpg, png, gif и webp.', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
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
          <div class="loader" v-if="images.avatar.uploaded === false">
            <loader></loader>
          </div>
          <div class="loaded" v-if="images.avatar.uploaded === true && this.images.avatar.name !== null">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>


            <span class="image-name">
              Аватар загружен! {{this.images.avatar.name}}
            </span>
          </div>



          <div class="fake-input">
            <label class="help">
              Баннер проекта
              <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Загрузите баннер проекта, размером  1060x220 пикселей. Поддерживаемые форматы: jpeg, jpg, png, gif и webp.', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </label>
            <input type="file"
                   name="projectBanner"
                   id="projectBanner"
                   v-on:change="uploadBanner($event)"
                   accept="image/*" ref="projectBanner">

            <label for="projectBanner">
              <span class="input-file-btn">Выберите файл</span>
              <span class="input-file-text">Максимум 5мб</span>
            </label>

          </div>

          <div class="loader" v-if="images.banner.uploaded === false">
            <loader></loader>
          </div>

          <div class="loaded" v-if="images.banner.uploaded && this.images.banner.name !== null">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>


            <span class="image-name">
              Баннер загружен! {{this.images.banner.name}}
            </span>
          </div>
        </div>
      </div>
      <div class="link">
        <div class="input-wrapper">
          <label class="help" for="projectName">
            Ссылки на проект
            <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Заполните ссылки на проект', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </label>
          <div class="links-form">
            <div class="links-form-left">
              <label class="help" for="linkName">
                Ресурс
              </label>
              <select v-model="link.name">
                <option value="Зеркало" selected="selected">Зеркало</option>
                <option value="Onion">Onion</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Канал">Канал</option>
                <option value="Бот">Бот</option>
              </select>
            </div>
            <div class="links-form-right">
              <label class="help" for="linkName">
                Ссылка на проект
              </label>
              <input
                  type="text"
                  v-on:keydown.enter="checkLinks()"
                  v-model="link.link"
                  ref="addLink"
                  id="linkHref"
                  maxlength="100"
                  required>

            </div>

            <button class="baza-button outline" @click="checkLinks()">
              Вставить ссылку в проект
            </button>
          </div>
        </div>

      </div>

      <div class="categories-wrapper">
        <label class="help">
          Категории проекта
          <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Загрузите аватар проекта, размером  110x110 пикселей. Поддерживаемые форматы: jpeg, jpg, png, gif и webp.', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </label>

        <div class="categories"

        >

          <div class="category" v-for="category in store.categories">
            <input :id="category.id"
                   type="checkbox"
                   :ref="'category' + category.id"
                   @change="(e) => {

                     e.target.checked === true ? project.categoryIds.push(category.id) : project.categoryIds.splice(project.categoryIds.indexOf(category.id), 1)

                     if (project.categoryIds.indexOf(store.exchanger) >= 0){
                       this.isExchanger = true
                       project.type = 'exchanger'
                     } else {
                       this.isExchanger = false
                       project.type = 'project'
                     }
                   }"
                   :value="{id: category.id }">
            <span class="checkmark"></span>
            <label :for="category.id">
              {{ category.name }}
            </label>
          </div>


        </div>

      </div>
      <div class="exchanger-advanced" v-if="isExchanger === true">
        <div class="input-wrapper">
          <label class="help" for="projectName">
            Минимальный обмен в рублях
            <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Минимально возможная сумма обмена в рублях', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </label>
          <div class="input">
            <input
                type="text"
                id="projectName"
                v-model="project.exchangeRate"
                minlength="1" maxlength="255"
                ref="projectName"
                required>
          </div>
        </div>

        <div class="input-wrapper">
          <label class="help" for="projectName">
            Резерв валюты в рублях
            <svg xmlns="http://www.w3.org/2000/svg" v-tippy="{content: 'Резерв валюты в рублях', theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </label>
          <div class="input">
            <input
                type="text"
                id="projectName"
                v-model="project.reserve"
                minlength="1" maxlength="255"
                ref="projectName"
                required>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="links">

    <div class="link" v-for="link of project.links"

         :class="{
                    mirror: link.name === 'Зеркало',
                    darknet: link.name === 'Onion',
                    blockchain: link.name === 'Blockchain',
                    telegram: link.name === 'Канал' || link.name === 'Бот'
                 }">
      <div class="dot">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" fill="none">
          <circle cx="3" cy="3" r="3" fill="#8B4BDD"/>
        </svg>
      </div>
      <a class="link-name" :href="link.link" target="_blank">

        <span v-tippy="{content: `Ссылка: ${link.link}, нажмите, что бы проверить работоспособность`, theme: 'light'}" >
        {{ link.name }}
        </span>
        <svg width="14" height="16" viewBox="0 0 14 16"
             @click.stop
             v-tippy="{content: `Удалить ссылку ${link.link}`, theme: 'light'}"
             @click="removeLink(link.link)"
             fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.66667 3.8V3.24C9.66667 2.45593 9.66667 2.06389 9.52134 1.76441C9.39351 1.50099 9.18954 1.28681 8.93865 1.15259C8.65344 1 8.28007 1 7.53333 1H6.46667C5.71993 1 5.34656 1 5.06135 1.15259C4.81046 1.28681 4.60649 1.50099 4.47866 1.76441C4.33333 2.06389 4.33333 2.45593 4.33333 3.24V3.8M1 3.8H13M11.6667 3.8V11.64C11.6667 12.8161 11.6667 13.4042 11.4487 13.8534C11.2569 14.2485 10.951 14.5698 10.5746 14.7711C10.1468 15 9.58677 15 8.46667 15H5.53333C4.41323 15 3.85318 15 3.42535 14.7711C3.04903 14.5698 2.74307 14.2485 2.55132 13.8534C2.33333 13.4042 2.33333 12.8161 2.33333 11.64V3.8" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


      </a>
    </div>
    <div class="errors" v-for="(error) of errors">
      <h2>Исправьте ошибки</h2>
      <span>{{ error }} <br></span>
    </div>
    <div class="buttons">
      <button
          @click="checkForm()"
          class="baza-button primary">
        Изменить проект
      </button>

      <button
          @click="$router.go(-1)"
          class="baza-button gray">
        Отменить
      </button>
    </div>
  </div>


</template>

<script>
import Modal from "../../components/Popups/Modal.vue";
import loader from "../../Layouts/BaseLoader.vue";
import config from "../../assets/js/config.js";
import {store} from "../../assets/js/services/categoriesService.js";
import {editableProject} from "../../assets/js/projectController.js";
import {watch} from "vue";
import {modalSetting} from "../../assets/js/modal.js";

import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {useFetch} from "../../assets/js/controllers/requestsControl.js";

export default {
  name: "editProject.vue",
  components: { loader },
  emits: ['changeModal'],

  setup() {
    watch(editableProject, (value, oldValue) => {
    }, { immediate: true })

    watch(store, (value, oldValue) => {
    }, { immediate: true })
  },
  data () {
    return {
      project: {},
      links: [],
      link: {
        name: 'Зеркало',
        link: '',
      },
      images: {
        avatar: {
          name: null,
          uploaded: true,
        },
        banner: {
          name: null,
          uploaded: true
        }
      },
      isExchanger: false,
      errors: {},

      editableProject, store, modalSetting


    }
  },
  directives: {
    tippy: directive,
  },
  created() {


  },
  mounted() {

    if (editableProject.project === null) {
      this.$router.go(-1)
    } else {
      this.project = editableProject.project
      const categories = this.project.categories
      delete this.project.categories
      this.project.categoryIds = []


      for (let category of categories) {
        this.project.categoryIds.push(category.id)
        document.getElementById(category.id).checked = true
      }

      if (this.project.categoryIds.indexOf(store.exchanger) >= 0){
        this.isExchanger = true
        this.project.type = 'exchanger'
      } else {
        this.isExchanger = false
        this.project.type = 'project'
      }
    }







  },
  beforeMount() {

  },
  updated() {


  },


  methods: {
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
        this.images.avatar.name = image.name

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
          this.images.avatar.uploaded = false
          useFetch('image-upload', "POST", formData)
              .then(result => {
                this.images.avatar.uploaded = true
                this.project.avatarFilePath = result.filePath
              })
        }



      }

    },
    uploadBanner(e){
      this.images.banner.uploaded = false
      const image = e.target.files[0]
      const reader = new FileReader();

      const formData = new FormData();
      formData.append("image-upload", image );


      if (image.type !== "image/jpeg" &&
          image.type !== "image/jpg" &&
          image.type !== "image/gif" &&
          image.type !== "image/png" &&
          image.type !== "image/webp") {
        this.$refs.projectBanner.value = null
        this.errors.projectBannerTypeErr = 'Формат баннера не поддерживается'
        this.avatarErrorPushed = true
        this.$refs.projectBanner.parentElement.style.borderColor = 'red'

      } else {
        delete this.errors.projectBannerTypeErr
        this.images.banner.name = image.name

        if (parseInt(image.size) > 5200000) {
          this.$refs.projectBanner.parentElement.style.borderColor = 'red'
          this.$refs.projectBanner.value = null
          this.errors.projectBannerLengthErr = 'Слишком большой размер, вес не более 5Мб'
          this.avatarErrorPushed = true

        } else {
          this.avatarError = false
          delete this.errors.projectBannerLengthErr
          this.$refs.projectBanner.parentElement.style.borderColor = 'transparent'
          reader.addEventListener('progress', () => {

          })
          this.images.banner.uploaded = false
          useFetch('image-upload', "POST", formData)
              .then(result => {
                this.images.banner.uploaded = true
                this.project.bannerFilePath = result.filePath
              })
        }



      }

    },
    addLinkToProject() {
      this.project.links.push({
        name: this.link.name,
        link: this.link.link
      })
      this.link.link = ''

    },
    removeLink(removableLink) {
      for (let link of this.project.links){
        if (link.link === removableLink) {
          this.project.links.splice(this.project.links.indexOf(link), 1)
        }
      }

    },
    previewBeforeUpload () {
      let projectType =''
      if (this.exchangerSelected === true) {
        projectType = 'exchanger'
      } else {
        projectType = 'project'
      }

      useFetch(`projects/${this.project.id}`, "PUT", this.project)
          .then((result) => {
            if (result.success === true) {
              modalSetting.show = true
              modalSetting.headline = `Вы обновили проект!`
              modalSetting.description = `Проект ${this.project.name} успешно обновлен`
              modalSetting.type = 'ok'
              modalSetting.modalSize = 'small'

            }


          })


    },
    getCategoryList() {
      this.categories = store.categories

    },
    checkLinks() {
      if (this.$refs.addLink.length < 10 ) {
        this.errors.linkLengthError = 'Сама ссылка не может быть меньше, чем 10 символов'
        this.$refs.classList.add('error')
        this.linkErr = true
      } else {
        this.linkErr = false

        if (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(this.link.link) === true) {
          this.linkErr = false
          this.$refs.addLink.classList.remove('error')

          delete this.errors.linkTypeError
        } else {
          this.linkErr = true
          this.errors.linkTypeError = 'Ссылка не валидная, введите ссылку формата https://example.com' + this.link.link
          this.$refs.addLink.classList.add('error')
        }


        delete this.errors.linkLengthError
        this.$refs.addLink.classList.remove('error')
      }



    },
    checkForm () {
      if (this.project.name.length < 1) {
        this.errors.projectNameErr = 'Название проекта должно быть не менее 1 символов'
        this.$refs.projectName.style.borderColor = 'red'
      } else {
        delete this.errors.projectNameErr
        this.$refs.projectName.style.borderColor = 'transparent'
      }

      if (this.avatarLoader === true) {
        this.errors.avatarLoaderErr = 'Аватар еще не загружен, дождитесь завершения загрузки'
        this.$refs.projectAvatar.style.borderColor = 'red'
      } else {
        delete this.errors.avatarLoaderErr
        this.$refs.projectAvatar.style.borderColor = 'transparent'
      }

      if (this.bannerLoader === true) {
        this.errors.bannerLoaderErr = 'Баннер еще не загружен, дождитесь завершения загрузки'
        this.$refs.projectBanner.style.borderColor = 'red'
      } else {
        delete this.errors.bannerLoaderErr
        this.$refs.projectBanner.style.borderColor = 'transparent'
      }

      if (this.project.description.length < 30 || this.project.description.length > 65535) {
        this.errors.descriptionErr = 'Описание проекта должно быть не менее 30 символов и не более 65535'
        this.$refs.projectDescription.style.borderColor = 'red'
      } else {
        delete  this.errors.descriptionErr
        this.$refs.projectDescription.style.borderColor = 'transparent'
      }

      if (this.project.categoryIds.length === 0) {
        this.errors.projectCategoryErr = 'Не выбрана категория проекта'
      } else {
        delete this.errors.projectCategoryErr
      }



      if (this.project.avatarFilePath.length === 0) {
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
        this.errors.projectAvatarEmpty = 'Аватар не загружен'

      } else {
        delete this.errors.projectAvatarEmpty
        this.$refs.projectAvatar.parentElement.style.borderColor = 'transparent'
      }
      if (this.link.link.length > 0) {
        this.checkLinks()
      }
      // TODO ДОДЕЛАТЬ

      if (this.project.categoryIds.includes(this.exchangersCategory)) {
        if (this.project.reserve < 10) {
          this.errors.projectExchangeRateErr = 'Минимальный обмен не должен быть меньше 10$'
        } else if (this.project.reserve > 10000000) {
          this.errors.projectExchangeRateMaxErr = 'Минимальный обмен не может быть на столько большим'
        }
        else {
          delete this.errors.projectExchangeRateErr
        }

        if (this.project.minValueToExchange < 10) {
          this.errors.minValueToExchangeErr = 'Текущий курс вашего обмена не должен быть меньше 10$'
        } else if (this.minValueToExchange > 10000000) {

          this.errors.minValueToExchangeErr = 'Текущий курс вашего обмена не может быть на столько большим'
        }
        else {
          delete this.errors.minValueToExchangeErr
          this.$refs.minValueToExchange.style.borderColor = 'transparent'
        }

        if (this.reserve < 500 ) {
          this.$refs.projectReserve.style.borderColor = 'red'
          this.errors.projectReserveErr = 'Резерв не может быть меньше 500$'


        } else if (this.projectReserve > 10000000) {
          delete this.errors.projectReserveErr
          this.$refs.projectReserve.style.borderColor = 'red'
          this.errors.projectReserveMaxErr = 'Резерв не может быть на столько большим'

        }

        else {
          delete this.errors.projectReserveErr
          delete this.errors.projectReserveMaxErr
          this.$refs.projectReserve.style.borderColor = 'transparent'
        }

      }


      if (Object.keys(this.errors).length > 0) {
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
.add-project {
  display: flex;
  width: 100%;
  gap: 3%;

  .input-wrapper {
    margin-bottom: 20px;
    position: relative;
    .fake-input {
      margin-top: 5px;
      margin-bottom: 35px;
      .help {
        margin-bottom: 0!important;
      }


    }

    .loaded {
      position: absolute;
      display: flex;
      align-items: center;
      color: #85c86b;
      height: 0;
      margin: 0;
      width: 100%;
      padding: 0;

      span {
        position: absolute;
        bottom: 10px;
        left: 25px;
        white-space: nowrap;
        width:300px;

        overflow:hidden;

        text-overflow: ellipsis;
      }
      svg {
        bottom: 10px;
        position: absolute;
        width: 18px;
        height: 18px;

        path {
          fill: #85c86b;
        }
      }
    }

    .links-form {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 15px;
      .links-form-left {
        width: 40%;
      }
      .links-form-right {
        width: 55%;
        align-items: end;
      }

      button, {
        margin-top: 15px;
        width: 100%;
      }

      .help {
        color: #7C7C7C;
        font-family: "PT Sans Caption";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

  }
  .help {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    padding-bottom: 10px;
    line-height: normal;

    svg {
      margin-left: 5px;
      position: relative;
      top: 2px;
    }
  }

  .left {
    width: 30%;
    .input-wrapper {
      .help {

      }
    }
  }
  .right {
    width: 70%;
    display: flex;
    flex-wrap: wrap;

    .images, .link  {
      width: 50%;
    }

    .exchanger-advanced {
      display: flex;
      position: relative;
      width: 100%;
      gap: 3%;
      margin-top: 10px;

      .input-wrapper {
        width: 50%;
      }


    }
  }
  .categories-wrapper {
    width: 100%;
    .categories {
      margin-top: 10px;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      .category {
        display: flex;
        position: relative;
        padding-left: 15px;
        margin-bottom: 0;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {

        & {
          appearance: none;
          background-color: #dfe1e4;
          border-radius: 72px;
          border-style: none;
          flex-shrink: 0;
          height: 20px;
          margin: 0;
          position: relative;
          width: 30px;
        }

          &::before {
            bottom: -6px;
            content: "";
            left: -6px;
            position: absolute;
            right: -9px;
            top: -6px;

          }

          &,
          &::after {
            transition: all 100ms ease-out;
          }

          &::after {
            background-color: #fff;
            border-radius: 50%;
            content: "";
            height: 14px;
            left: 3px;
            position: absolute;
            top: 3px;
            width: 14px;
          }

          .checkbox-wrapper-2 input[type=checkbox] {
            cursor: default;
          }

          &:hover {
            background-color: #c9cbcd;
            transition-duration: 0s;
          }

          &:checked {
            background-color: #FFC700;
          }

          &:checked::after {
            background-color: #fff;
            left: 13px;
          }

          .checkbox-wrapper-2 :focus:not(.focus-visible) {
            outline: 0;
          }

          &:checked:hover {
            background-color: #FFC700;
          }

        }

        label {
          margin-left: 10px;
          cursor: pointer;
        }


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


.links {
  display: flex;
  flex-wrap: wrap;

  .link {
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 30px;
    background: var(--lightgray, #F2F5F7);
    cursor: pointer;
    padding: 5px 10px;
    display: flex;
    gap: 3px;
    align-items: center;

    a {
      color: #000;
      font-family: "PT Sans Caption";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .dot {

      svg {
        width: 5px;
        height: 5px;
        position: relative;
        top: -2px;

        circle {
          transition: .3s ease;
          fill: #7c7c7c;
        }
      }
    }
    &.mirror {
      svg {
        circle {
          fill: #FFC700;
        }
      }

    }
    &.darknet {
      svg {
        circle {
          fill: #8B4BDD;
        }
      }

    }
    &.blockchain {
      svg {
        circle {
          fill: #B7DD4B;
        }
      }

    }
    &.telegram {
      svg {
        circle {
          fill: #4BBADD;
        }
      }

    }
    .link-name {
      color: #000;
      font-family: "PT Sans Caption";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      transition: .3s ease;

      svg {
        position: relative;
        top: 2px;
        width: 10px;
        height: 12px;
        margin-left: 5px;

        path {
          stroke: black;
        }
      }
    }

    transition: .3s ease;
    border: 1px solid transparent;

    &:hover {
      background-color: #7c7c7c;
      .link-name {
        color: #fff;
      }
      .dot {
        svg {
          circle {
            fill: #fff;
          }
        }
      }

      &.mirror {
        background-color: #FFC700;
      }

      &.darknet {
        background-color: #8B4BDD;

      }
      &.blockchain {
        background-color: #B7DD4B;
      }
      &.telegram {
        background-color: #4BBADD;
      }
    }
  }
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
  width: 100%;
  margin-top: 20px;
  display: flex;
  gap: 2%;
  button {
    min-width: 30%;
  }
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
</style>