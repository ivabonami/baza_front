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

          <div class="adder">
              <h4>Ссылки на проект</h4>
              <input-links @dataChanged="emit => project.links.push(emit)"/>
          </div>

          <div class="links">
              <h4>Добавленные ссылки</h4>
              <span v-if="project.links.length <= 0"> Вы пока не добавили ни одной ссылки, нужно добавить, как минимум, одну</span>
              <div class="links-wrapper">
                  <project-links :project-links="project.links" :show-count="999" :isEditable="true" />
              </div>

          </div>
      </div>

    <button-black @buttonPressed="checkForm()" style="margin-top: 20px; width: fit-content" :type="'button'">
      <div class="button-content">
        Сохранить
      </div>
    </button-black>
  </div>
</template>

<script>
import InputFile from "@/components/Inputs/InputFile.vue";
import InputText from "@/components/Inputs/InputText.vue";
import InputTextarea from "@/components/Inputs/InputTextarea.vue";
import ButtonAdvanced from "@/components/Buttons/ButtonAdvanced.vue"
import {categories} from "@/Stores/categories.js";
import {addNotice} from "@/js/notifications.js";
import InputLinks from "@/components/Inputs/InputLinks.vue";
import {editProject, getProject, linksSorter} from "@/API/projectsController.js";
import {userStore} from "@/Stores/userStore.js";
import {popup} from "@/js/controllers/popupController.js";
import ProjectLinks from "@/components/Layout/Project/ProjectParts/ProjectLinks.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";

export default {
  name: "Project_Add.vue",
  components: {
      ButtonBlack,
    ButtonAdvanced,
    InputFile,
    InputText,
    InputTextarea,
    ProjectLinks,
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
      },
      linksSorter
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
    border-radius: 10px;
    border: 2px dashed #B3B4C9;
    background: #F8F7FC;
    padding: 10px;
    box-sizing: border-box;


    .categories {
      display: flex;
      gap: 10px;
      justify-content: space-around;
      align-items: stretch;

      .category {
        cursor: pointer;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 10px;
        transition: .3s ease;
        opacity: .5;
        background-color: transparent;
        align-items: center;
        text-align: center;
        border: 1px solid transparent;

        .category-name {
          color: #5D599F;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        &.selected {
          border: 1px solid #191B2A;
          background-color: #FFFFFF;
          opacity: 1;

          svg {
            path {
              stroke: #191B2A;
            }
          }
          .category-name {
            font-weight: 500;
          }
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
    border-radius: 10px;
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
    border-radius: 10px;
    border: 2px dashed #B3B4C9;
    background: #F8F7FC;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .links {
      display: flex;
      align-items: center;
      .links-wrapper {
        display: flex;
        gap: 10px;
      }
    }

    .adder, .links {
      width: 48%;
      display: flex;
      flex-direction: column;
      text-align: left;
      align-items: start;

      span {
        opacity: .5;
        font-size: 12px;
        text-align: left;
      }

      h4 {
        width: 100%;
      }

      .links-input-wrapper {
        height: 40px;
      }


    }
  }
}

h4 {
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
  color: #191B2A;
  font-weight: bold;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
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
  .project-form .add-links {
    .links, .adder {
      width: 100%;
    }
  }
}
</style>