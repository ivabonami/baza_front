<template>
  <div class="project-form" v-if="!loading">
    <h2 class="heading2">Изменить проект</h2>
    <div class="project-banner">
      <input-file :data="project.bannerFilePath" @dataChanged="emit => project.bannerFilePath = emit">
        Загрузите баннер профиля вашего проекта в размере 1600x220px или оставьте поле пустым
      </input-file>
    </div>
    <div class="project-info">
      <div class="project-avatar">
        <input-file :data="project.avatarFilePath" @dataChanged="emit => project.avatarFilePath = emit">
          Загрузите аватар вашего сервиса макс размер 400x400px
        </input-file>
      </div>
      <div class="project-name-description">
        <div class="project-name">
          <input-text
              :inputDataProp="project.name"
              :placeholder="'Введите название проекта....'"
              @dataChanged="emit => project.name = emit">

          </input-text>
        </div>

        <div class="project-description">
          <input-textarea
              :inputDataProp="project.description"
              :placeholder="'Введите описание проекта...'"
              @dataChanged="emit => project.description = emit"
          >

          </input-textarea>
        </div>
      </div>

    </div>
    <div class="project-categories">
      <h4>Выбор категории проекта</h4>
      <div class="categories">

        <div class="category"
             v-for="category of categories.allCategories"
             :key="category.id"
             :class="{selected: project.categoryIds.includes(category.id)}"
             @click="categoryControl(category.id)">


          <div class="category-icon">
            <inline-svg class="categoryIcon" :src="category.icon" />
          </div>
          <div class="category-name">
            {{ category.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="exchanger-data"
         v-show="this.project.categoryIds.includes(categories.exchangerCategory[0].id)">
      <div class="fields-name">
        Доп информация для обмеников:
      </div>
      <div class="exchanger-input">
        <input-text :placeholder="'Минимальный обмен в рублях...'"
                    @dataChanged="emit => project.minValueToExchange = emit" />
      </div>
      <div class="exchanger-input">
        <input-text :placeholder="'Резерв валюты в рублях...'"
                    @dataChanged="emit => project.reserve = emit" />
      </div>

    </div>


    <div class="add-links">
      <h4>Ссылки на проект</h4>
      <div class="adder">
        <input-links @dataChanged="emit => project.links.push(emit)"/>
      </div>
      <div class="links">
        <div class="link-wrapper"
             v-for="(link, index) of project.links"
             :key="link"
        >

          <project-link-item :data="link" />
          <div class="menu">
            <svg @click="() => {
            popup.show = true
            popup.component = 'EditLink'
            popup.link = link
          }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1.27237 12.5486C1.30565 12.2491 1.32229 12.0994 1.3676 11.9594C1.4078 11.8352 1.4646 11.7171 1.53646 11.6081C1.61745 11.4853 1.72399 11.3787 1.93707 11.1656L11.5027 1.60005C12.3027 0.799984 13.5999 0.799985 14.4 1.60005C15.2 2.40011 15.2 3.69727 14.4 4.49734L4.83436 14.0629C4.62127 14.276 4.51473 14.3826 4.39191 14.4635C4.28295 14.5354 4.16477 14.5922 4.04059 14.6324C3.90062 14.6777 3.75087 14.6943 3.45137 14.7276L1 15L1.27237 12.5486Z" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg @click="project.links.splice(link, 1)"
                 xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M9.66667 3.8V3.24C9.66667 2.45593 9.66667 2.06389 9.52134 1.76441C9.39351 1.50099 9.18954 1.28681 8.93865 1.15259C8.65344 1 8.28007 1 7.53333 1H6.46667C5.71993 1 5.34656 1 5.06135 1.15259C4.81046 1.28681 4.60649 1.50099 4.47866 1.76441C4.33333 2.06389 4.33333 2.45593 4.33333 3.24V3.8M1 3.8H13M11.6667 3.8V11.64C11.6667 12.8161 11.6667 13.4042 11.4487 13.8534C11.2569 14.2485 10.951 14.5698 10.5746 14.7711C10.1468 15 9.58677 15 8.46667 15H5.53333C4.41323 15 3.85318 15 3.42535 14.7711C3.04903 14.5698 2.74307 14.2485 2.55132 13.8534C2.33333 13.4042 2.33333 12.8161 2.33333 11.64V3.8" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

        </div>


      </div>
    </div>

    <button-advanced @buttonPressed="checkForm()" style="margin-top: 20px;">
      <div class="button-content">
        Сохранить изменения в проекте
      </div>
    </button-advanced>
  </div>
</template>

<script>
import InputFile from "@/components/Inputs/InputFile.vue";
import InputText from "@/components/Inputs/InputText.vue";
import InputTextarea from "@/components/Inputs/InputTextarea.vue";
import ButtonAdvanced from "@/components/Buttons/ButtonAdvanced.vue"
import {categories} from "@/Stores/categories.js";
import {addNotice} from "@/js/notifications.js";
import projectLinkItem from "@/components/Layout/Project/ProjectLinkItem.vue";
import InputLinks from "@/components/Inputs/InputLinks.vue";
import {editProject, getProject} from "@/API/projectsController.js";
import {userStore} from "@/Stores/userStore.js";
import {popup} from "@/js/controllers/popupController.js";

export default {
  name: "Project_Add.vue",
  components: {
    ButtonAdvanced,
    InputFile,
    InputText,
    InputTextarea,
    projectLinkItem,
    InputLinks
  },

  data () {
    return {
      popup,
      error: false,
      categories,
      loading: true,
      project: {
        name: null,
        categoryIds: [],
        description: null,
        avatarFilePath: null,
        bannerFilePath: null,
        links: []
      }
    }
  },

  methods: {
    categoryControl (categoryId) {
      if (!this.project.categoryIds.includes(categoryId)) {
        this.project.categoryIds.push(categoryId)
      } else {
        this.project.categoryIds.splice(this.project.categoryIds.indexOf(categoryId), 1)
      }

    },
    checkForm() {
      this.error = false

      if (!this.project.name || this.project.name.length < 3) {
        addNotice({name: 'Имя проекта должно быть больше 3х символов', type: 'warning'})
        this.error = true
      }
      if (!this.project.name || this.project.description.length < 15) {
        addNotice({name: 'Описание проекта должно быть больше 15и символов', type: 'warning'})
        this.error = true
      }
      if (this.project.categoryIds.length <= 0) {
        addNotice({name: 'Не выбрана категория', type: 'warning'})
        this.error = true
      }
      if (this.project.links.length <= 0) {
        addNotice({name: 'Не добавлено ни одной ссылки', type: 'warning'})
        this.error = true
      }
      if (!this.project.avatarFilePath) {
        addNotice({name: 'Не загружен аватар', type: 'warning'})
        this.error = true
      }

      if (this.project.reserve) {
        this.project.type = 'exchanger'
      } else {
        this.project.type = 'project'
      }

      if (!this.error) {
        editProject(this.project)
        this.$router.go(-1)
      }

    }

  },
  mounted() {
    const projectId = this.$route.path.replace('/project/', '').replace('/edit', '')
    if (!userStore.token) {
      this.$router.go(-1)
      popup.show = true
      popup.component = 'SignIn'
    }

    getProject(projectId).then(result => {
      this.project = result.data.project
      this.project.categoryIds = []

      for(let categoryId of this.project.categories) {
        this.project.categoryIds.push(categoryId.id)
      }

      if (userStore.username !== this.project.userData.username) {
        if (userStore.role !== 'admin') {
          addNotice({name: 'У вас нет прав для просмотра этой страницы', type: 'danger'})
          this.$router.replace('/')
        }

      }

      this.loading = false
    })
  }
}
</script>

<style scoped lang="scss">
.project-form {
  .project-banner {
    width: 100%;
    margin-bottom: 20px;
    min-height: 80px;
  }
  .project-info {
    display: flex;
    gap: 20px;
    align-items: stretch;

    .project-avatar {
      width: 180px;
      height: auto;

    }

    .project-name-description {
      width: 84%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .project-name, .project-description {
        width: 100%;
        height: 50px;
      }
      .project-description {
        height: 120px;
      }
    }

  }

  .project-categories {
    margin-top: 20px;
    border-radius: 20px;
    border: 2px dashed #B3B4C9;
    background: #F8F7FC;
    padding: 10px;
    box-sizing: border-box;
    h4 {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      color: #B3B4C9;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .categories {
      display: flex;
      gap: 10px;
      justify-content: space-around;
      align-items: stretch;

      .category {
        cursor: pointer;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 20px;
        transition: .3s ease;
        opacity: .5;
        background-color: transparent;
        align-items: center;
        text-align: center;

        .category-name {
          color: #5D599F;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        &.selected {
          background-color: #FFFFFF;
          opacity: 1;
          box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
        }
      }

    }
  }
  .exchanger-data {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-around;
    margin-top: 20px;
    border-radius: 20px;
    border: 2px dashed #B3B4C9;
    background: #F8F7FC;
    padding: 10px;
    box-sizing: border-box;

    .fields-name {
      color: #B3B4C9;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .exchanger-input {
      width: 391px;
      height: 56px;
      flex-shrink: 0;
    }

  }
  .add-links {
    margin-top: 20px;
    border-radius: 20px;
    border: 2px dashed #B3B4C9;
    background: #F8F7FC;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    .links {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      svg {
        cursor: pointer;
        path {
          transition: .3s ease;
        }

        &:hover {
          path {
            stroke: #191B2A;
          }
        }
      }

      h4 {
        width: 100%;
      }
    }

    h4 {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      color: #B3B4C9;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .adder {
      display: flex;

      .links-input-wrapper {
        height: 40px;
      }


    }
  }
}
.link-wrapper {
  display: flex;

  align-items: center;
  box-sizing: border-box;
  a {
    position: relative;
    z-index: 1;
  }
  .menu {
    width: 45px;
    border-radius: 0 20px 20px 0;
    border: 1px solid #c7c7c7;
    padding: 3px;
    margin-left: -10px;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 5px;
  }
}

@media screen and (max-width: 500px) {
  .links-input-wrapper .link-input {
    width: 100%;
  }
  .project-form {
    .exchanger-data {
      flex-wrap: wrap;
      .exchanger-input {
        width: 100%;
      }
    }
    .add-links {
      flex-wrap: wrap;

      .adder {
        width: 100%;

        .links-input-wrapper {
          flex-wrap: wrap;
          gap: 10px;
          width: 100%;
          height: auto;
        }
      }
    }
    .project-info {
      flex-wrap: wrap;
      width: 100%;
      .project-avatar {
        width: 100%;
      }
      .project-name-description {
        width: 100%;
      }
    }
    .project-categories {
      .categories {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        .category {
          .category-name {
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>