<template>
  <div class="wrapper">
    <div class="row">
      <h3 v-if="this.$route.path !== '/'" class="page-header">
        Категория: {{ this.categoryName }}
      </h3>


      <div class="baza-menu">
        <div class="categories">
          <div class="category"
               v-for="category of store.categories"
               @click="() => {
                 this.category = category.id
                 this.getOffset = 0
                 this.projects.splice(0, this.projects.length)
                 this.isLoading = true
                 getProjects()
               }"

          >
            <div class="category-icon">
              <svg xmlns="http://www.w3.org/2000/svg" v-if="category.name === 'Маркетплейсы'" viewBox="0 0 20 22" fill="none">
                <path d="M14.1625 8V5C14.1625 2.79086 12.3716 1 10.1625 1C7.95334 1 6.16248 2.79086 6.16248 5V8M1.75448 9.35196L1.15448 15.752C0.983885 17.5717 0.898586 18.4815 1.20053 19.1843C1.46578 19.8016 1.9306 20.3121 2.5205 20.6338C3.192 21 4.10585 21 5.93353 21H14.3914C16.2191 21 17.133 21 17.8045 20.6338C18.3944 20.3121 18.8592 19.8016 19.1244 19.1843C19.4264 18.4815 19.3411 17.5717 19.1705 15.752L18.5705 9.35197C18.4264 7.81535 18.3544 7.04704 18.0088 6.46616C17.7045 5.95458 17.2548 5.54511 16.7171 5.28984C16.1065 5 15.3348 5 13.7914 5L6.53353 5C4.99017 5 4.21849 5 3.6079 5.28984C3.07014 5.54511 2.62049 5.95458 2.31614 6.46616C1.97057 7.04704 1.89854 7.81534 1.75448 9.35196Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Форумы'" viewBox="0 0 22 22" fill="none">
                <path d="M5.09436 10.2288C5.03221 9.82823 4.99996 9.41786 4.99996 9C4.99996 4.58172 8.60525 1 13.0526 1C17.4999 1 21.1052 4.58172 21.1052 9C21.1052 9.99807 20.9213 10.9535 20.5852 11.8345C20.5154 12.0175 20.4804 12.109 20.4646 12.1804C20.4489 12.2512 20.4428 12.301 20.4411 12.3735C20.4394 12.4466 20.4493 12.5272 20.4692 12.6883L20.8717 15.9585C20.9153 16.3125 20.9371 16.4895 20.8782 16.6182C20.8266 16.731 20.735 16.8205 20.6211 16.8695C20.4911 16.9254 20.3146 16.8995 19.9617 16.8478L16.7765 16.3809C16.6101 16.3565 16.527 16.3443 16.4512 16.3448C16.3763 16.3452 16.3245 16.3507 16.2511 16.3661C16.177 16.3817 16.0823 16.4172 15.893 16.4881C15.0097 16.819 14.0524 17 13.0526 17C12.6344 17 12.2237 16.9683 11.8227 16.9073M6.63158 21C9.59648 21 12 18.5376 12 15.5C12 12.4624 9.59648 10 6.63158 10C3.66668 10 1.26316 12.4624 1.26316 15.5C1.26316 16.1106 1.36028 16.6979 1.53955 17.2467C1.61533 17.4787 1.65322 17.5947 1.66566 17.6739C1.67864 17.7567 1.68091 17.8031 1.67608 17.8867C1.67145 17.9668 1.65141 18.0573 1.61134 18.2383L1 21L3.9948 20.591C4.15827 20.5687 4.24 20.5575 4.31137 20.558C4.38652 20.5585 4.42641 20.5626 4.50011 20.5773C4.5701 20.5912 4.67416 20.6279 4.88227 20.7014C5.43059 20.8949 6.01911 21 6.63158 21Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Обменники'" viewBox="0 0 22 22" fill="none">
                <path d="M5 5L7 3M7 3L5 1M7 3H5C2.79086 3 1 4.79086 1 7M17 17L15 19M15 19L17 21M15 19H17C19.2091 19 21 17.2091 21 15M9.18903 5.5C9.85509 2.91216 12.2042 1 15 1C18.3137 1 21 3.68629 21 7C21 9.79574 19.0879 12.1449 16.5001 12.811M13 15C13 18.3137 10.3137 21 7 21C3.68629 21 1 18.3137 1 15C1 11.6863 3.68629 9 7 9C10.3137 9 13 11.6863 13 15Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Услуги'" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 4H10.9344C13.9816 4 15.5053 4 16.0836 4.54729C16.5836 5.02037 16.8051 5.71728 16.6702 6.39221C16.514 7.17302 15.2701 8.05285 12.7823 9.81253L8.71772 12.6875C6.2299 14.4471 4.98599 15.327 4.82984 16.1078C4.69486 16.7827 4.91642 17.4796 5.41636 17.9527C5.99474 18.5 7.51836 18.5 10.5656 18.5H11.5M7 4C7 5.65685 5.65685 7 4 7C2.34315 7 1 5.65685 1 4C1 2.34315 2.34315 1 4 1C5.65685 1 7 2.34315 7 4ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg"  v-else-if="category.name === 'Другое'"  viewBox="0 0 22 18" fill="none">
                <path d="M1.5 9H4.88197C5.56717 9 6.19357 9.38713 6.5 10C6.80643 10.6129 7.43283 11 8.11803 11H13.882C14.5672 11 15.1936 10.6129 15.5 10C15.8064 9.38713 16.4328 9 17.118 9H20.5M7.96656 1H14.0334C15.1103 1 15.6487 1 16.1241 1.16396C16.5445 1.30896 16.9274 1.5456 17.2451 1.85675C17.6043 2.2086 17.8451 2.6902 18.3267 3.65337L20.4932 7.9865C20.6822 8.36449 20.7767 8.55348 20.8434 8.75155C20.9026 8.92745 20.9453 9.10847 20.971 9.29226C21 9.49923 21 9.71053 21 10.1331V12.2C21 13.8802 21 14.7202 20.673 15.362C20.3854 15.9265 19.9265 16.3854 19.362 16.673C18.7202 17 17.8802 17 16.2 17H5.8C4.11984 17 3.27976 17 2.63803 16.673C2.07354 16.3854 1.6146 15.9265 1.32698 15.362C1 14.7202 1 13.8802 1 12.2V10.1331C1 9.71053 1 9.49923 1.02897 9.29226C1.05471 9.10847 1.09744 8.92745 1.15662 8.75155C1.22326 8.55348 1.31776 8.36448 1.50675 7.9865L3.67331 3.65337C4.1549 2.69019 4.3957 2.2086 4.75495 1.85675C5.07263 1.5456 5.45551 1.30896 5.87589 1.16396C6.35125 1 6.88969 1 7.96656 1Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg width="21" height="20" v-else viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.49999 1L5.49999 19M16.5 1L13.5 19M19.5 6H2.5M18.5 14H1.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
            <div class="category-name">
              {{ category.name }}
            </div>



          </div>

          <div class="sep"></div>
          <div class="add-project" @click="this.$router.push('/add-project')" v-tippy="{content: 'Доавить свой проект'}">
            <div class="category-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
                <path d="M11 7V15M7 11H15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="category-name">
              Добавить
            </div>
          </div>
        </div>

        <div class="filters">
          <div class="filter" @click="this.sort.show = !this.sort.show">
            <div class="current-filter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.66667 8H2.24444C1.80885 8 1.59105 8 1.42467 8.08477C1.27833 8.15934 1.15934 8.27833 1.08477 8.42467C1 8.59105 1 8.80885 1 9.24444V13.7556C1 14.1912 1 14.409 1.08477 14.5753C1.15934 14.7217 1.27833 14.8407 1.42467 14.9152C1.59105 15 1.80885 15 2.24444 15H5.66667M5.66667 15H10.3333M5.66667 15L5.66667 5.35556C5.66667 4.91996 5.66667 4.70216 5.75144 4.53579C5.82601 4.38944 5.94499 4.27045 6.09134 4.19588C6.25772 4.11111 6.47551 4.11111 6.91111 4.11111H9.08889C9.52449 4.11111 9.74228 4.11111 9.90866 4.19588C10.055 4.27045 10.174 4.38944 10.2486 4.53579C10.3333 4.70216 10.3333 4.91996 10.3333 5.35556V15M10.3333 15H13.7556C14.1912 15 14.4089 15 14.5753 14.9152C14.7217 14.8407 14.8407 14.7217 14.9152 14.5753C15 14.4089 15 14.1912 15 13.7556V2.24444C15 1.80885 15 1.59105 14.9152 1.42467C14.8407 1.27833 14.7217 1.15934 14.5753 1.08477C14.409 1 14.1912 1 13.7556 1H11.5778C11.1422 1 10.9244 1 10.758 1.08477C10.6117 1.15934 10.4927 1.27833 10.4181 1.42467C10.3333 1.59105 10.3333 1.80885 10.3333 2.24444V4.88889" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="sort-name">{{ this.sort.name }}</span>

            </div>

            <div class="filters-list sort" v-if="this.sort.show === true">
              <span class="filter-name"
                    :class="{active: this.sort.name === 'Популярные'}"
                    @click="() => {
                this.sort.name = 'Популярные'
                this.sort.filter = 'newest'
                this.sort.show = false
                this.getOffset = 0
                getProjects()
              }">Популярные</span>
              <span class="filter-name"
                    :class="{active: this.sort.name === 'Высокий рейтинг'}"
                    @click="() => {
                this.sort.name = 'Высокий рейтинг'
                this.sort.filter = 'highestRating'
                this.sort.show = false
                this.projects.splice(0, this.projects.length)
                this.getOffset = 0
                getProjects()
              }">Высокий рейтинг</span>
              <span class="filter-name"
                    :class="{active: this.sort.name === 'Низкий рейтинг'}"
                    @click="() => {
                this.sort.name = 'Низкий рейтинг'
                this.sort.filter = 'lowestRating'
                this.sort.show = false
                this.projects.splice(0, this.projects.length)
                this.getOffset = 0
                getProjects()
              }">Низкий рейтинг</span>
              <span class="filter-name"
                    :class="{active: this.sort.name === 'Сначала новые'}"
                    @click="() => {
                this.sort.name = 'Сначала новые'
                this.sort.filter = 'newest'
                this.sort.show = false
                this.projects.splice(0, this.projects.length)
                this.getOffset = 0
                getProjects()
              }">Сначала новые</span>
              <span class="filter-name"
                    :class="{active: this.sort.name === 'Сначала старые'}"
                    @click="() => {
                this.sort.name = 'Сначала старые'
                this.sort.filter = 'oldest'
                this.sort.show = false
                this.projects.splice(0, this.projects.length)
                this.getOffset = 0
                getProjects()
              }">Сначала старые</span>
              <span class="filter-name"
                    :class="{active: this.sort.name === 'Мне повезет!'}"
                    @click="() => {
                this.sort.name = 'Мне повезет!'
                this.sort.filter = 'random'
                this.sort.show = false
                this.projects.splice(0, this.projects.length)
                this.getOffset = 0
                getProjects()
              }">Мне повезет!</span>
            </div>
          </div>

          <div class="filter" @click="sortCategories.show = !sortCategories.show">
            <span class="current-filter">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                <path d="M10.8 6.25V8.63C10.8 9.02204 10.8 9.21806 10.7237 9.36779C10.6566 9.49951 10.5495 9.60659 10.4178 9.6737C10.2681 9.75 10.072 9.75 9.68 9.75L1 9.75M8 9.75V12.13C8 12.522 8 12.7181 7.92371 12.8678C7.85659 12.9995 7.74951 13.1066 7.61779 13.1737C7.46806 13.25 7.27204 13.25 6.88 13.25H1M1 1L1 15M1 6.25L12.48 6.25C12.872 6.25 13.0681 6.25 13.2178 6.1737C13.3495 6.10659 13.4566 5.99951 13.5237 5.86779C13.6 5.71806 13.6 5.52204 13.6 5.13V3.87C13.6 3.47796 13.6 3.28195 13.5237 3.13221C13.4566 3.00049 13.3495 2.89341 13.2178 2.8263C13.0681 2.75 12.872 2.75 12.48 2.75L1 2.75L1 6.25Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="sort-name">
                Категории
              </span>

            </span>

            <div class="filters-list categories" v-if="sortCategories.show === true">
              <span class="filter-name"

                    :class="{active: sortCategories.categoriesIds.indexOf(category.id) >= 0 }"
                    v-for="category of store.categories"
                    @click="() => {

                      if (sortCategories.categoriesIds.indexOf(category.id) >= 0) {
                        sortCategories.categoriesIds.splice(sortCategories.categoriesIds.indexOf(category.id), 1)
                      } else {
                        sortCategories.categoriesIds.push(category.id)
                      }

                      this.projects.splice(0, this.projects.length)
                      this.getOffset = 0

              }">
                {{category.name}}
              </span>
            </div>

          </div>

          <div class="mask"
               @click="() => {
                 this.sort.show = false
                 this.sortCategories.show = false
                 console.log(123)
               }"
               v-if="this.sort.show === true || sortCategories.show === true"></div>
        </div>
      </div>

      <div class="projects-wrapper">
        <div class="projects" >
          <transition-group name="list"
                            tag="div"
                            class="list-wrapper">
            <div class="list">
              <project-card

                  v-for="project of projects"
                  v-if="isLoading === false"
                  v-bind:project="project"
                  v-on:removeProjectFromList="(emit) => {
                    const projectToDelete = this.projects.findIndex(project => project.id === emit)
                    deleteProject(emit)
                    console.log(this.projects, projectToDelete)
                    this.projects.splice(projectToDelete, 1)

                  }"
              >
              </project-card>


              <div v-if="this.emptyProjectsResponse === true && isLoading === false && this.projects.length <= 0" class="noProjects">
                <h3>Нет проектов</h3>
                <img src="../../assets/images/cat%20sleep.png" alt="">
                <span>В эту категорию проекты еще не добавлены.</span>

              </div>
            </div>



          </transition-group>
          <Waypoint v-if="emptyProjectsResponse === false && isLoading === false" @change="(way) => {
                if (way.going === 'IN') {
                  getProjects()
                }
              }">
            <div class="loadmore btn btn-outlined" ref="loadmore"
                 v-if="emptyProjectsResponse === false"
                 v-on:click="() => {
                       getProjects()
                     }">
              Загрузить еще
            </div>
          </Waypoint>

          <loader v-if="isLoading === true"></loader>



        </div>

      </div>
    </div>
  </div>


</template>

<script>

import projectCard from "../TemplateParts/Cards/ProjectCard.vue";
import {ref, defineComponent, watch} from "vue";
import { Waypoint } from "vue-waypoint";
import vClickOutside from 'click-outside-vue3'
import AnimateHeight from 'vue-animate-height';
import 'vue-loading-overlay/dist/css/index.css';
import loader from "../TemplateParts/PageParts/Loader.vue";
import {store} from "../../assets/js/store.js";
import {useFetch} from "../../assets/js/fetchRequest.js";
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'


import {deleteProject} from "../../assets/js/projectController.js";
import {userInfo} from "../../assets/js/userService.js";
export default {
  name: "AllProjectsWithSort.vue",
  components: {projectCard, Waypoint, loader, AnimateHeight},
  emits: ['updated', 'projectDeleted'],

  data () {
    return {
      projects: [],
      emptyProjectsResponse: true,

      sort: {
        name: "Популярные",
        show: false,
        arrow: 'up',
        filter: 'newest'
      },
      sortCategories: {
        categoriesIds: [],
        show: false
      },

      getOffset: 0,
      getLimit: 4,
      isLoading: false,

      store, deleteProject, userInfo
    }
  },
  directives: {
    tippy: directive,
  },
  setup () {

  },

  mounted() {
    this.isLoading = true
    this.getProjects()

    this.$route.path === '/' ? this.dinamicWidth = '100%' : this.dinamicWidth = '48%'

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.sort.show = false
        this.sortCategories.show = false

      }
    })

  },

  methods: {
    onClickOutside (event) {
      if (event.target.classList[0] !== 'filter') {
        this.showSort = false
        this.arrowDate = 'up'
      }
    },

    getProjects () {
      let url = `projects?isPayedFirst=true&offset=${this.getOffset}&limit=${this.getLimit}&sort=${this.sort.filter}`
      this.category > 0 ? url += `&categoryIds=[${this.category}]` : url

      if(this.sortCategories.categoriesIds.length > 0) {
        url += `&categoryIds=[${this.sortCategories.categoriesIds}]`
      }

      this.projects.length <= 0 ? this.isLoading = true : this.isLoading = false

      useFetch(url, 'GET')
          .then(result => {

            for (let project of result.projects) {
              this.projects.push(project)
            }

            result.projects.length === 0 ? this.emptyProjectsResponse = true : this.emptyProjectsResponse = false

            this.isLoading = false
          })

      this.getOffset += this.getLimit

    },

  }
}
</script>

<style scoped lang="scss">
.baza-menu {
  display: flex;
  width: 100%;
  margin-bottom: 15px;

  .categories {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    overflow-x: auto;
    overflow-y: visible;
    .sep {
      width: 1px;
      height: 100%;
      background-color: #D8D8D8;
    }
    svg {
      margin-bottom: 5px;
      height: 25px;
    }

    .category, .add-project {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px;
      padding: 5px 10px;
      transition: .3s ease;
      cursor: pointer;


      .category-icon {
        width: 100%;
        margin-bottom: -10px;
        svg {
          position: relative;
          left:50%;
          transform: translateX(-50%);

          path {
            stroke-width: 1px;
          }
        }

      }
      .category-name {
        white-space: nowrap;
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: center;
        width: 100%;
        padding-bottom: 5px;
        transition: .3s ease;
        border-bottom: 2px solid transparent;
      }

      &:hover {
        .category-name  {
          border-bottom-color: #7c7c7c;
        }
      }
    }
    .add-project {
      white-space: nowrap;
      display: flex;
      gap: 5px;
      flex-wrap: wrap;

      .category-icon {
        width: 100%;
        svg {
          position: relative;
          left:50%;
          transform: translateX(-50%);
        }

      }
      .category-name {
        width: 100%;
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: center;
      }
    }
  }

}
.buttons {
  display: flex;
  gap: 10px;
  padding: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  justify-content: space-between;

  .btns {
    display: none;
    gap: 10px;
    position: relative;
    align-items: center;

    .currentSort {
      width: 245px;
      border: 1px solid transparent;
      outline: none;
      color: #000;
      background-color: #fff;
      font-size: 16px;
      font-family: "Montserrat", sans-serif;
      transition: all 0.2s ease-in-out;
      border-radius: 10px;
      padding: 10px 10px;
      display: flex;
      justify-content: start;
      cursor: pointer;
      span {
        position: relative;
        top: 3px;
      }

      svg {
        position: relative;
        top: 2px;
        width: 15px;
        height: 15px;
        margin-left: auto;

        &.sort {
          margin-right: 5px;
          margin-left: 0;
          width: 20px;
          height: 20px;
          path {
            fill: black;
          }
        }

      }

    }

    .sortFilter {
      position: absolute;
      border-radius: 10px;
      background-color: #fff;
      z-index: 10;
      top: 45px;

      &.categories {
        left: 255px;
        width: 240px;


        .input {
          margin-top: 5px;
          margin-bottom: 5px;


          .sep {
            margin-top: 5px;
          }





          label {
            padding: 5px;
            font-size: 14px;
            width: 100%;
            display: flex;
            box-sizing: border-box;
            justify-content: space-between;

          }
          svg {
            width: 15px;
            height: 15px;
          }
        }

      }



      .sep {
        width: 100%;
        height: 1px;
        background-color: rgba(0,0,0,.2);
      }

      .filter {
        display: flex;
        padding: 5px;
        font-size: 14px;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: .3s ease;
        width: 220px;



        svg {
          width: 15px;
          height: 15px;

          path {
            fill: #000;
          }
        }

        &.active {
          color: #000;
        }

        &:hover {
          background-color: rgba(10, 88, 202, 0.11);
        }
      }
    }
  }
}
.noProjects {
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  h3 {
    width: 100%;
  }

  img {
    display: inline-block;
    width: 150px;
    height: 150px;
  }

  svg {
    margin-left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    flex-basis: 100%;

  }
  span {
    color: #000;
    flex-basis: 100%;
    font-family: "PT Sans Caption";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.arrow {
  transition: .3s ease;

  &.up {
    transform: rotate(0grad);
  }
  &.down {
    transform: rotate(200grad);
  }
}
.btn {
  color: #0a58ca;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 100px;
  border: 1px solid #0a58ca;
  svg {
    path {
      transition: .3s ease;
      fill: transparent;
    }
  }
  &.active {
    background-color: transparent;
    color: #fff;
    svg {
      path {
        fill: #fff
      }
    }

  }
}
.btn-sort-switcher {
  border: 1px solid #AFBFC9;
  outline: none;
  color: #434F58;
  font-size: 1rem;
  font-family: "Proxima Nova", sans-serif;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  padding: 0.4375rem 0.5rem;


  svg {
    width: 15px;
    height: 15px;
  }
}
.projects-wrapper {
  width: 100%;
  min-height: 200px;
  padding-bottom: 30px;
  transition: max-height 3.25s ease;

  .projects {
    width: 100%;
    transition: .3s ease;
    display: flex;
    flex-wrap: wrap;
    gap: 1%;

    .list-wrapper {
      width: 100%;
      justify-content: start;
      align-items: start;

      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        flex-flow: row wrap;
        gap: 1%;
      }

    }
  }
}

@media screen and (max-width: 1080px)  {
  .buttons {
    flex-wrap: nowrap;

    .btns {
      display: flex;
      width: auto;
      justify-content: space-between;
      .currentSort {
        width: 150px;
        font-size: 11px;
      }
      .sortFilter {
        &.categories {
          left: 210px;
          width: 180px;
        }
        .filter {
          width: 160px;
          font-size: 11px;
        }
      }
    }
  }
}
.filters {
  margin-left: 30px;
  position: relative;
  width: 40%;
  display: flex;
  gap: 10px;
  align-items: center;

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 29;
  }

  .filter {
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    border: 1px solid var(--gray-2, #D8D8D8);
    padding: 5px 10px;
    cursor: pointer;
    transition: .3s ease;

    &:hover {
      border-color: #6B6B6B;
    }

    .current-filter {
      font-size: 12px;

      display: flex;
      width: 100%;
      align-items: center;
      gap: 10px;

    }
  }



  .filters-list {
    position: absolute;
    display: block;
    z-index: 30;
    background-color: white;
    border-radius: 10px;
    width: 150px;
    top: 50px;

    border: 1px solid var(--gray-2, #D8D8D8);
    box-shadow: 0px 3px 6px 0px rgba(39, 37, 37, 0.20);


    &.categories {
      right: 5%;
    }
    &.sort {
      right: 50%;
    }
    .filter-name {
      width: 100%;
      padding: 10px;
      display: block;
      font-size: 12px;
      border-radius: 10px;

      &.active {
        font-weight: 900;
        background-color: #fff0d2;
      }

      &:hover {
        background-color: #fff0d2;
      }
    }
  }
}
.sort-name {
  color: #000;
  font-family: "PT Sans Caption";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}
@media screen and (max-width: 768px)  {
  .search {
    width: v-bind(dinamicWidth);
    input[type=search] {
      width: 100%;
    }
  }
  .projects-wrapper {
    display: flex;
    .projects {
      .list-wrapper {
        .list {
          padding-left: 10px;
          padding-right: 10px;
          gap: 10px;
          justify-content: center;
        }
      }
    }




  }
  .filters .filter .sort-name {
    display: none;
  }

  .buttons {
    flex-wrap: wrap;

    .btns {
      display: flex;
      width: v-bind(dinamicWidth);
      justify-content: space-between;
      .currentSort {
        width: 165px;
        font-size: 12px;
      }
      .sortFilter {
        &.categories {
          left: 190px;
          width: 180px;
        }
        .filter {
          width: 160px;
          font-size: 12px;
        }
      }
    }
  }
}
@media screen and (max-width: 500px){
  .projects-wrapper {
    display: flex;

    .projects {
      .list-wrapper {
        .list {
          justify-content: center;
        }
      }
    }
  }
  .filters {
    justify-content: center;
    .filter {
      .current-filter {
        text-align: center;
        justify-content: center;
        width: 100%;
      }
    }

  }
}
.page-header {
  margin-top: 30px;
}
</style>