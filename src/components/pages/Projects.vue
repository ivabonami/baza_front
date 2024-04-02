<template>
  <h3 v-if="this.$route.path !== '/'">
    {{ this.categoryName }}
  </h3>

  <transition name="list">
    <div class="buttons" v-if="loaded === true">

    <div class="btns">
      <span class="currentSort"
            ref="currentSort"
            v-click-outside="onClickOutside"
            v-on:click="() => {
              this.showSort = !this.showSort
              this.arrowDate === 'down' ? this.arrowDate = 'up' : this.arrowDate = 'down'


            }">
        {{ this.activeSortName }}
        <svg id="a" xmlns="http://www.w3.org/2000/svg" :class="{
            up: arrowDate === 'up',
            down: arrowDate === 'down'
          }" class="arrow"
             viewBox="0 0 15.96 8.57"><path class="b" d="M.6,8.57c-.15,0-.31-.06-.42-.18-.23-.23-.23-.61,0-.85L7.56,.17c.23-.22,.62-.22,.85,0l7.38,7.38c.23,.23,.23,.61,0,.85-.23,.24-.61,.23-.85,0L7.98,1.44,1.02,8.4c-.12,.12-.27,.18-.42,.18Z"/></svg>

      </span>
      <div class="sortFilter box-shadow" v-if="this.showSort === true" ref="sortFilter">
        <span class="filter" :class="{active: this.activeSortName === 'Популярные'}"
              v-on:click=" () => {
                if (this.activeSortName !== 'Популярные') {
                  this.activeSortName = 'Популярные'
                  this.activeSort = 'Популярные'
                  this.getOffset = 0

                  this.clicked = true
                  this.projects = this.projects.slice(this.projects.length, this.projects.length)
                  this.activeSortTab = 'random'
                  this.projectCardAnimate = true

                  this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit)
                }
              }

              ">Популярные

          <svg id="a" v-if="this.activeSortName === 'Популярные'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.47 166.37">
            <path class="b" d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
          </svg>

        </span>
        
        <span class="filter" :class="{active: this.activeSortName === 'Сначала старые'}" v-on:click=" () => {
                if (this.activeSortName !== 'Сначала старые') {
                  this.activeSortName = 'Сначала старые'
                  this.activeSort = 'oldest'
                  this.getOffset = 0
                   this.projects = this.projects.slice(this.projects.length, this.projects.length )

                  this.clicked = true
                  this.activeSortTab = 'oldest'
                  this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, true)
                }
              }
              ">Сначала старые
           <svg id="a" v-if="this.activeSortName === 'Сначала старые'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.47 166.37">
            <path class="b" d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
          </svg>

        </span>
        

        <span class="filter" :class="{active: this.activeSortName === 'Сначала новые'}" v-on:click=" () => {
                if (this.activeSortName !== 'Сначала новые') {
                  this.activeSortName = 'Сначала новые'
                  this.activeSort = 'newest'
                  this.getOffset = 0
                  this.projects = this.projects.slice(this.projects.length, this.projects.length)
                  this.clicked = true
                  this.activeSortTab = 'newest'
                  this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, true)
                }
              }">Сначала новые
           <svg id="a" v-if="this.activeSortName === 'Сначала новые'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.47 166.37">
            <path class="b" d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
          </svg>

        </span>
        

        <span class="filter" :class="{active: this.activeSortName === 'С высоким рейтингом'}" v-on:click=" () => {
                if (this.activeSortName !== 'С высоким рейтингом') {
                  this.activeSortName = 'С высоким рейтингом'
                  this.activeSort = 'highestRating'
                  this.getOffset = 0
                  this.projects = this.projects.slice(this.projects.length, this.projects.length)
                  this.clicked = true
                  this.activeSortTab = 'highestRating'
                  this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, true)
                }
              }">С высоким рейтингом
           <svg id="a" v-if="this.activeSortName === 'С высоким рейтингом'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.47 166.37">
            <path class="b" d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
          </svg>
        </span>

        


        <span class="filter" :class="{active: this.activeSortName === 'С низким рейтингом'}" v-on:click="() => {
                if (this.activeSortName !== 'С низким рейтингом') {
                  this.activeSortName = 'С низким рейтингом'
                  this.activeSort = 'lowestRating'
                  this.getOffset = 0
                  this.projects = this.projects.slice(this.projects.length, this.projects.length)
                  this.clicked = true
                  this.activeSortTab = 'lowestRating'
                  this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, true)
                }
              }">С низким рейтингом
           <svg id="a" v-if="this.activeSortName === 'С низким рейтингом'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.47 166.37">
            <path class="b" d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
          </svg>

        </span>

      </div>

      <span class="currentSort"
            ref="categorySort"
            v-if="this.$route.path === '/' || this.$route.path === '/favorite'"
            v-click-outside="onClickOutsideCategory"
            v-on:click="() => {
              this.showCategorySort = !this.showCategorySort
              this.arrowCategory === 'down' ? this.arrowCategory = 'up' : this.arrowCategory = 'down'


            }">
        Категории поиска
        <svg id="a" xmlns="http://www.w3.org/2000/svg" :class="{
            up: arrowCategory === 'up',
            down: arrowCategory === 'down'
          }" class="arrow"
             viewBox="0 0 15.96 8.57"><path class="b" d="M.6,8.57c-.15,0-.31-.06-.42-.18-.23-.23-.23-.61,0-.85L7.56,.17c.23-.22,.62-.22,.85,0l7.38,7.38c.23,.23,.23,.61,0,.85-.23,.24-.61,.23-.85,0L7.98,1.44,1.02,8.4c-.12,.12-.27,.18-.42,.18Z"/></svg>

      </span>
      <div class="sortFilter categories box-shadow categorySelector" v-if="this.showCategorySort === true" ref="showCategorySort">
        <div class="categorySelector input" v-for="category of store.categories" v-on:change="() => {
          this.getLimit = 5
          this.getOffset = 0
          this.projects = this.projects.slice(this.projects.length, this.projects.length)
          this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit)
        }">
          <input type="checkbox" v-model="categoriesFilter" :id="category.id" class="categorySelector" :value="category.id" hidden>
          <label :for="category.id" class="categorySelector" >
            {{category.name}}
            <svg id="a" v-if="categoriesFilter.includes(category.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.47 166.37">
              <path class="b" d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
            </svg>
          </label>
          

        </div>


      </div>


    </div>

    <div class="search"
         v-on:input="() => {
      this.getOffset = 0
      this.projects = this.projects.slice(this.projects.length, this.projects.length)

      this.timerSearch()
    }">
      <input type="search" placeholder="Искать продавца или магазин " v-model="searchQuery">
      <button class="searchQ"
              v-on:click="() => {
        this.getOffset = 0

        this.projects = this.projects.slice(this.projects.length, this.projects.length)
        this.timerSearch()
      }">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M16.0192 14.6473C16.1135 14.7262 16.2098 14.7948 16.2924 14.877C17.4092 15.9915 18.5222 17.1094 19.6408 18.2221C19.9431 18.5232 20.0764 18.8698 19.9558 19.2845C19.7436 20.0111 18.8578 20.2413 18.3001 19.7087C17.8035 19.2338 17.3256 18.7397 16.8397 18.2531C16.106 17.5185 15.3723 16.7834 14.6301 16.0395C12.2652 17.8276 9.64012 18.4274 6.76629 17.7115C4.56655 17.1634 2.82168 15.9094 1.54672 14.032C-1.02481 10.2472 -0.32677 5.18447 3.17141 2.14558C6.54706 -0.787156 11.7014 -0.704961 15.0583 2.34144C18.456 5.42495 19.0761 10.739 16.0192 14.6478V14.6473ZM2.00159 8.99083C1.99033 12.8366 5.12329 15.9854 8.97682 16.0009C12.8393 16.0169 15.991 12.8846 16.0018 9.01948C16.0126 5.15347 12.8937 2.01689 9.01766 1.99481C5.17352 1.97321 2.01286 5.12482 2.00159 8.99083Z" fill="#6C7AFF"/>
        </svg>
      </button>

      <button class="clearQ"
              v-if="searchQuery !== ''"
              v-on:click="() => {
      this.searchQuery = ''
      this.lazyProjects = []
      this.getOffset = 0
      lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit)
    }">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
          <path d="M1 0.5L13 12.5M1 12.5L13 0.5" stroke="#2B2B2B"/>
        </svg>
      </button>

    </div>

  </div>
  </transition>
  <div class="projects-wrapper" :class="{fadeAnimate: this.projectCardAnimate}" >


    <div class="projectsList" >
      <transition-group name="list" tag="div" class="list-wrapper">



        <div class="project" v-for="project of projects" v-if="loaded === true">
          <project-card v-if="projects.length > 0"
              ref='fadeAnimate'
              v-bind:project="project"
              v-on:updated="(emit) => {

                this.$refs.currentSort.scrollIntoView({ behavior: 'smooth', block: 'start'})
                this.projects = this.projects.slice(this.projects.length, this.projects.length)
                this.getOffset = 0

                this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit)

               }"
          >

          </project-card>






        </div>


        <div v-if="this.backendNoProjects === true" class="noProjects">
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
            <g clip-path="url(#clip0_380_7664)">
              <path d="M26.8089 0C28.2705 0 29.7295 0 31.1911 0C31.4772 0.0721778 31.7608 0.172711 32.0521 0.211378C44.129 1.84569 52.2593 8.43964 56.4353 19.8308C57.2473 22.0503 57.4922 24.476 58 26.8089V31.1911C57.9252 31.5185 57.8144 31.8433 57.7809 32.1758C56.6364 43.5309 48.4313 53.4812 37.4448 56.7008C35.4084 57.2963 33.2791 57.5747 31.1911 58H26.8089C26.5202 57.9278 26.2366 57.8196 25.9453 57.7912C14.0515 56.5874 4.02907 48.0343 1.01564 36.4524C0.567111 34.7278 0.332533 32.9466 0 31.1911C0 29.7295 0 28.2705 0 26.8089C0.0747556 26.4815 0.172711 26.1593 0.219111 25.8293C1.85084 14.0927 8.18444 6.02169 19.2302 1.7864C21.6327 0.866133 24.2749 0.577422 26.8089 0ZM3.35111 28.8685C3.35369 43.2628 14.6882 54.6412 29.0284 54.6489C43.1881 54.654 54.6515 43.2061 54.6489 29.0619C54.6489 14.8428 43.2577 3.35369 29.1572 3.35111C14.8377 3.34853 3.34853 14.7114 3.35111 28.8685Z" fill="#C8716B"/>
              <path d="M29.0079 13.2653C29.8225 13.4999 30.668 13.6623 31.4439 13.9871C32.3719 14.3763 32.756 15.1857 32.6761 16.1833C32.3409 20.416 31.9981 24.6487 31.6527 28.8815C31.5135 30.5905 31.3537 32.2996 31.2093 34.0086C31.0985 35.3388 30.3793 36.0477 29.0775 36.0915C27.7293 36.1379 26.9173 35.4316 26.7936 34.0422C26.2986 28.5309 25.7934 23.0222 25.3397 17.5083C25.0922 14.4975 26.1001 13.4019 29.0079 13.2627V13.2653Z" fill="#C8716B"/>
              <path d="M28.7914 44.5957C27.2138 44.49 25.9172 43.0052 26.0409 41.4482C26.1672 39.8629 27.6546 38.5611 29.1987 38.69C30.7737 38.8189 32.0806 40.3217 31.9595 41.8581C31.8332 43.4408 30.3767 44.7013 28.794 44.5957H28.7914Z" fill="#C8716B"/>
            </g>
            <defs>
              <clipPath id="clip0_380_7664">
                <rect width="58" height="58" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span>Нет проектов.</span>

        </div>



      </transition-group>
      <Waypoint v-if="emptyResponse === false && loaded === true" @change="(way) => {

                if (way.going === 'IN' && way.direction === 'UP' && emptyResponse === false) {
                  lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false)
                }

              }">
        <div class="loadmore btn btn-outlined" ref="loadmore"
             v-if="emptyResponse === false && backendNoProjects === false"
             v-on:click="() => {
                       lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false)

                     }">
          Загрузить еще
        </div>
      </Waypoint>

      <loader v-if="loaded === false"></loader>



    </div>








  </div>

</template>

<script>
import recommended from "../TemplateParts/Page Parts/FreshAndRecommendedProduct.vue";
import projectCard from "../TemplateParts/Cards/ProjectCard.vue";
import { ref, defineComponent } from "vue";
import { Waypoint } from "vue-waypoint";
import vClickOutside from 'click-outside-vue3'
import AnimateHeight from 'vue-animate-height';

import 'vue-loading-overlay/dist/css/index.css';
import loader from "../TemplateParts/Page Parts/Loader.vue";
import {store} from "../../assets/js/store.js";
import config from "../../assets/js/config.js";

export default {
  name: "AllProjectsWithSort.vue",
  components: {recommended, projectCard, Waypoint, loader, AnimateHeight},
  emits: ['updated', 'projectDeleted'],

  data () {
    return {

      loaded: false,
      showSort: false,
      showCategorySort: false,
      category: {},
      projects: [],
      recommend: ref(),
      backendNoProjects: true,

      activeSort: '',
      activeSortName: 'Популярные',
      activeSortTab: '',
      arrowDate: 'up',
      arrowCategory: 'up',

      globalOffset: 0,
      globalLimit: 0,

      getOffset: 0,
      getLimit: 5,
      lazyProjects: [],
      emptyResponse: false,

      categoryName: 0,

      searchQuery: '',
      searchStatus: false,
      clicked: false,

      isLoading: false,
      fullPage: true,

      fadeAnimate: false,
      projectCardAnimate: false,
      height: 0,
      categoriesFilter: [],

      timer: ref(null),
      dinamicWidth: '100%',
      store
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  setup () {

  },

  mounted() {
    this.height = 1250

    if (this.lazyProjects.length < 1) {
      this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false, false)
    }
    this.loaded === true ? this.handleScroll() : ''

    this.$route.path === '/' ? this.dinamicWidth = '100%' : this.dinamicWidth = '48%'


  },
  created() {
    this.isLoading = true
  },
  updated() {

      this.isLoading = false
  },



  methods: {
    timerSearch() {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit)
      }, 600);

    },

    onClickOutside (event) {
      if (event.target.classList[0] !== 'filter') {
        this.showSort = false
        this.arrowDate = 'up'
      } else {

      }

    },
    onClickOutsideCategory (event) {

      if (event.target.classList[0] !== 'categorySelector' ) {
        this.showCategorySort = false
        this.arrowCategory = 'up'
      } else {

      }

    },
    handleScroll () {


    },
    lazyProjectLoad (sort, offset, limit) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const category = [parseInt(this.$route.path.replace('/projects-list/', ''))]

      this.$route.path !== '/' ? this.categoryName = store.categories[store.categories.findIndex(item => item.id === parseInt(category))].name : '' ;

      let url = `${config.api.url}projects?isPayedFirst=true&offset=${offset}&limit=${limit}`

      if (this.$route.path === '/favorite') {
        url = `${config.api.url}user/project`

      } else {
        if (this.$route.path !== '/') {
          url += `&categoryIds=[${category}]`
        }
        if (this.activeSortName !== 'Популярные') {
          url += `&sort=${sort}`
        }

        if (this.searchQuery !== '') {
          url += `&search=${this.searchQuery}`
        }
        if (this.categoriesFilter.length > 0) {
          url += `&categoryIds=[${this.categoriesFilter}]`
        }
      }




      fetch(url, {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            result.projects.length === 0 && offset === 0 ? this.backendNoProjects = true : this.backendNoProjects = false

            if (this.$route.path === '/') {
              for (let project of result.projects) {
                this.projects.push(project)

              }



              result.projects.length < this.getLimit ? this.emptyResponse = true : this.emptyResponse = false

            } else {

              for (let project of result.projects) {
                this.projects.push(project)

              }

              result.projects.length < limit ? this.emptyResponse = true : this.emptyResponse = false
            }

            this.loaded = true
            this.projectCardAnimate = true

            setTimeout(() => {
              this.projectCardAnimate = false
            }, 200)


          })
          .catch((error) => {console.error(error)});


      this.getOffset += this.getLimit

    },

  }
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
  justify-content: space-between;

  .btns {
    display: flex;
    gap: 10px;
    position: relative;
    align-items: center;

    .currentSort {
      width: 220px;
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
      justify-content: space-between;
      cursor: pointer;

      svg {
        position: relative;
        top: 2px;
        margin-left: 5px;
        width: 15px;
        height: 15px;
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
        padding: 10px;
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

  svg {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    flex-basis: 100%;

    path {
      fill: #c8b26b;
    }
  }
  span {
    color: #c8b26b;
    flex-basis: 100%;
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
.search {
  position: relative;
  max-width: 400px;
  justify-self: end;
  display: flex;

  input[type=search] {
    border: 1px solid transparent;
    outline: none;
    color: #434F58;
    font-size: 1rem;
    line-height: calc(1em + 8px);
    font-family: "Proxima Nova", sans-serif;
    display: block;
    background-color: #fff;
    width: 100%;
    transition: all .2s ease-in-out;
    border-radius: 10px;
    padding: 0.4375rem 0.5rem;

    &::-webkit-search-cancel-button {
      display: none;
    }

    &::placeholder {
      color: #2B2B2B;
      opacity: .5;
    }

    &:hover, &:focus {
      outline: none;
    }

  }
  .searchQ {
    position: absolute;
    right: 9px;
    cursor: pointer;
    width: 20px;
    top: 8px;

    border: none;
    background-color: #ffffff;
    box-sizing: unset;


    svg {
      path {
        fill: lightgray;
      }
    }

  }
  .clearQ {
    position: absolute;
    right: 40px;
    cursor: pointer;
    width: 20px;
    top: 12px;
    border: none;
    background-color: transparent;
    background-color: #ffffff;

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
  padding-bottom: 30px;
  transition: max-height 3.25s ease;

  .projectsList {
    width: 100%;
    transition: .3s ease;
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
@media screen and (max-width: 768px)  {
  .search {
    width: v-bind(dinamicWidth);
    input[type=search] {
      width: 100%;
    }
  }
  .projects-wrapper {
    display: flex;

  }

  .list-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    justify-content: center;
    align-items: stretch;

    .project {
      width: 48%;


    }
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

</style>