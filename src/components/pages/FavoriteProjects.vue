<template>
  <div class="projects-wrapper" :class="{fadeAnimate: this.projectCardAnimate}" >
    <div class="projectsList" >
      <h3>Ваши любимые проекты</h3>
      <transition-group name="list" tag="div" class="list-wrapper">
          <project-card
                        v-for="project of projects"
                        v-if="loaded === true || projects.length > 0"
                        ref='fadeAnimate'
                        v-bind:project="project"
                        v-bind:favorite="true"
                        v-on:favoriteRemoved="(emit) => {

                          console.log(emit)
                          const removedProject = this.projects.findIndex(item => item.id === emit)
                          this.projects.splice(removedProject,1)

                        }"
                        v-on:updated="(emit) => {

                this.$refs.currentSort.scrollIntoView({ behavior: 'smooth', block: 'start'})
                this.projects = this.projects.slice(this.projects.length, this.projects.length)
                this.getOffset = 0

                this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit)

               }"
          >

          </project-card>


<!--        <div v-if="this.projects.length <= 0 " class="no-projects">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">-->
<!--            <g clip-path="url(#clip0_380_7664)">-->
<!--              <path d="M26.8089 0C28.2705 0 29.7295 0 31.1911 0C31.4772 0.0721778 31.7608 0.172711 32.0521 0.211378C44.129 1.84569 52.2593 8.43964 56.4353 19.8308C57.2473 22.0503 57.4922 24.476 58 26.8089V31.1911C57.9252 31.5185 57.8144 31.8433 57.7809 32.1758C56.6364 43.5309 48.4313 53.4812 37.4448 56.7008C35.4084 57.2963 33.2791 57.5747 31.1911 58H26.8089C26.5202 57.9278 26.2366 57.8196 25.9453 57.7912C14.0515 56.5874 4.02907 48.0343 1.01564 36.4524C0.567111 34.7278 0.332533 32.9466 0 31.1911C0 29.7295 0 28.2705 0 26.8089C0.0747556 26.4815 0.172711 26.1593 0.219111 25.8293C1.85084 14.0927 8.18444 6.02169 19.2302 1.7864C21.6327 0.866133 24.2749 0.577422 26.8089 0ZM3.35111 28.8685C3.35369 43.2628 14.6882 54.6412 29.0284 54.6489C43.1881 54.654 54.6515 43.2061 54.6489 29.0619C54.6489 14.8428 43.2577 3.35369 29.1572 3.35111C14.8377 3.34853 3.34853 14.7114 3.35111 28.8685Z" fill="#C8716B"/>-->
<!--              <path d="M29.0079 13.2653C29.8225 13.4999 30.668 13.6623 31.4439 13.9871C32.3719 14.3763 32.756 15.1857 32.6761 16.1833C32.3409 20.416 31.9981 24.6487 31.6527 28.8815C31.5135 30.5905 31.3537 32.2996 31.2093 34.0086C31.0985 35.3388 30.3793 36.0477 29.0775 36.0915C27.7293 36.1379 26.9173 35.4316 26.7936 34.0422C26.2986 28.5309 25.7934 23.0222 25.3397 17.5083C25.0922 14.4975 26.1001 13.4019 29.0079 13.2627V13.2653Z" fill="#C8716B"/>-->
<!--              <path d="M28.7914 44.5957C27.2138 44.49 25.9172 43.0052 26.0409 41.4482C26.1672 39.8629 27.6546 38.5611 29.1987 38.69C30.7737 38.8189 32.0806 40.3217 31.9595 41.8581C31.8332 43.4408 30.3767 44.7013 28.794 44.5957H28.7914Z" fill="#C8716B"/>-->
<!--            </g>-->
<!--            <defs>-->
<!--              <clipPath id="clip0_380_7664">-->
<!--                <rect width="58" height="58" fill="white"/>-->
<!--              </clipPath>-->
<!--            </defs>-->
<!--          </svg>-->
<!--          <span>Нет избранных проектов.</span>-->

<!--        </div>-->



      </transition-group>
<!--      <Waypoint v-if="emptyResponse === false || loaded === true" @change="(way) => {-->

<!--                if (way.going === 'IN' || way.direction === 'UP' || emptyResponse === false) {-->
<!--                  lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false)-->
<!--                }-->

<!--              }">-->
<!--        <div class="loadmore btn btn-outlined" ref="loadmore"-->
<!--             v-if="emptyResponse === false || backendNoProjects === false"-->
<!--             v-on:click="() => {-->
<!--                       lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false)-->

<!--                     }">-->
<!--          Загрузить еще-->
<!--        </div>-->
<!--      </Waypoint>-->

      <loader v-if="loaded === false"></loader>



    </div>








  </div>

</template>

<script>
import recommended from "../TemplateParts/PageParts/FreshAndRecommendedProduct.vue";
import projectCard from "../TemplateParts/Cards/ProjectCard.vue";
import { ref, defineComponent } from "vue";
import { Waypoint } from "vue-waypoint";
import vClickOutside from 'click-outside-vue3'
import AnimateHeight from 'vue-animate-height';

import 'vue-loading-overlay/dist/css/index.css';
import loader from "../TemplateParts/PageParts/Loader.vue";
import {store} from "../../assets/js/store.js";
import config from "../../assets/js/config.js";

export default {
  name: "FavoriteProjects.vue",
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

      activeSort: 'random',
      activeSortName: 'Популярные',
      activeSortTab: 'random',
      arrowDate: 'up',
      arrowCategory: 'up',

      globalOffset: 0,
      globalLimit: 0,

      getOffset: 0,
      getLimit: 5,
      lazyProjects: [],
      emptyResponse: false,

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
    this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false, false)
    this.loaded === true ? this.handleScroll() : ''
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

    lazyProjectLoad (sort, offset, limit) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      let url = `${config.api.url}user/project`

      fetch(url, {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            result.projects.length === 0 || offset === 0 ? this.backendNoProjects = true : this.backendNoProjects = false

            // if (this.$route.path === '/') {
            //   for (let project of result.projects) {
            //     this.projects.push(project)
            //
            //   }
            //   result.projects.length < this.getLimit ? this.emptyResponse = true : this.emptyResponse = false
            //
            // } else {
            //
              for (let project of result.projects) {
                this.projects.push(project)

              }
            //
            //   result.projects.length < limit ? this.emptyResponse = true : this.emptyResponse = false
            // }

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
h3 {
  color: #000;
  font-family: "PT Sans Caption";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
  margin-top: 40px;
}
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
.no-projects {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-weight: bold;
  text-align: center;

  svg {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    flex-basis: 100%;

    path {
      fill: #95c86b;
    }
  }
  span {

    flex-basis: 100%;
  }

  span {


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
  width: 100%;
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
  margin-top: 30px;
  padding-bottom: 30px;
  transition: max-height 3.25s ease;

  .projectsList {
    width: 100%;
    transition: .3s ease;
    .list-wrapper {
      display: flex;
      gap: 1%;
      .project {
        width: 100%;
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

@media screen and (max-width: 768px)  {
  .search {
    input[type=search] {
      width: 100%;
    }
  }
  .projects-wrapper {
    margin-top: 0;
    h3 {
      margin-top: 0;
    }
    display: flex;
    padding-left: 10px;
    padding-right: 10px;

  }

  .list-wrapper {
    width: 100%;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;


    .project {
      width: 48%;


    }
  }
  .buttons {
    flex-wrap: wrap;

    .btns {
      display: flex;
      width: auto;
      justify-content: space-between;

      .currentSort {
        width: 100%;
        font-size: 12px;
      }
      .sortFilter {
        &.categories {
          left: 210px;
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