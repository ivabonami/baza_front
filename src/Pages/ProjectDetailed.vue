<template v-cloak>

  <div class="wrapper" ref="wrapper">
    <div class="project">

      <project-header
          :project="project"
      >
        <template #project-name>
          {{ project.name }}
        </template>
      </project-header>


      <div class="project-banner">
        <img :src="api + project.bannerFilePath"
             alt=""
             v-if="project.bannerFilePath !== null">

      </div>

      <div class="project-body">
<!--        todo product edit-->
        <project-products :projectId="project.id">

        </project-products>

<!--        todo project-review -->


        <div class="tabs-body">

          <div class="project-reviews" >
            <div class="block-heading">
              <div class="left">
                <h3>Отзывы</h3>
                <div class="action" v-if="userInfo.token !== null">
                  <button class="action-button"

                          @click="() => {
                            modalSetting.show = true
                            modalSetting.type = 'testimonial'
                            modalSetting.headline = 'Оцените проект'
                          }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3.5 5.06291H3.50556M6 5.06291H6.00556M8.5 5.06291H8.50556M3.22222 9.12581V10.391C3.22222 10.6797 3.22222 10.824 3.2829 10.8981C3.33568 10.9626 3.41571 11.0001 3.5003 11C3.59757 10.9999 3.71315 10.9097 3.94431 10.7294L5.26956 9.69561C5.54029 9.48443 5.67565 9.37883 5.82638 9.30374C5.96011 9.23713 6.10246 9.18844 6.24956 9.159C6.41537 9.12581 6.58872 9.12581 6.93542 9.12581H8.33333C9.26675 9.12581 9.73346 9.12581 10.09 8.94868C10.4036 8.79287 10.6586 8.54425 10.8183 8.23846C11 7.89082 11 7.43573 11 6.52555V3.60026C11 2.69008 11 2.235 10.8183 1.88735C10.6586 1.58156 10.4036 1.33294 10.09 1.17713C9.73346 1 9.26675 1 8.33333 1H3.66667C2.73325 1 2.26654 1 1.91002 1.17713C1.59641 1.33294 1.34144 1.58156 1.18166 1.88735C1 2.235 1 2.69008 1 3.60026V6.95893C1 7.46272 1 7.71461 1.05679 7.92127C1.2109 8.48211 1.66015 8.92016 2.2353 9.07044C2.44725 9.12581 2.70557 9.12581 3.22222 9.12581ZM3.77778 5.06291C3.77778 5.2125 3.65341 5.33377 3.5 5.33377C3.34659 5.33377 3.22222 5.2125 3.22222 5.06291C3.22222 4.91332 3.34659 4.79205 3.5 4.79205C3.65341 4.79205 3.77778 4.91332 3.77778 5.06291ZM6.27778 5.06291C6.27778 5.2125 6.15341 5.33377 6 5.33377C5.84659 5.33377 5.72222 5.2125 5.72222 5.06291C5.72222 4.91332 5.84659 4.79205 6 4.79205C6.15341 4.79205 6.27778 4.91332 6.27778 5.06291ZM8.77778 5.06291C8.77778 5.2125 8.65341 5.33377 8.5 5.33377C8.34659 5.33377 8.22222 5.2125 8.22222 5.06291C8.22222 4.91332 8.34659 4.79205 8.5 4.79205C8.65341 4.79205 8.77778 4.91332 8.77778 5.06291Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Оставить отзыв
                  </button>
                </div>
              </div>

              <div class="right">
                <div class="stars">
                  <div class="star"
                       v-for="star of projectRating"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                      <path d="M8.70843 0.823678C8.93892 0.356738 9.05416 0.123269 9.21061 0.0486752C9.34673 -0.0162251 9.50487 -0.0162251 9.64099 0.0486752C9.79744 0.123269 9.91268 0.356738 10.1432 0.823677L12.3298 5.25364C12.3979 5.3915 12.4319 5.46042 12.4816 5.51394C12.5257 5.56132 12.5785 5.59971 12.6371 5.62698C12.7033 5.65778 12.7794 5.6689 12.9315 5.69113L17.8228 6.40607C18.3378 6.48135 18.5954 6.519 18.7146 6.6448C18.8183 6.75425 18.867 6.90466 18.8473 7.05414C18.8246 7.22594 18.6382 7.40754 18.2653 7.77074L14.7272 11.2168C14.6169 11.3242 14.5618 11.3779 14.5262 11.4418C14.4947 11.4984 14.4745 11.5606 14.4667 11.6249C14.4579 11.6975 14.4709 11.7734 14.4969 11.9251L15.3317 16.7925C15.4198 17.3059 15.4638 17.5625 15.3811 17.7149C15.3091 17.8474 15.1811 17.9403 15.0328 17.9678C14.8624 17.9994 14.6319 17.8782 14.1709 17.6358L9.79816 15.3362C9.66191 15.2645 9.59379 15.2287 9.52202 15.2146C9.45848 15.2022 9.39312 15.2022 9.32957 15.2146C9.2578 15.2287 9.18968 15.2645 9.05344 15.3362L4.6807 17.6358C4.2197 17.8782 3.98919 17.9994 3.81875 17.9678C3.67046 17.9403 3.5425 17.8474 3.47052 17.7149C3.38778 17.5625 3.43181 17.3058 3.51986 16.7925L4.35467 11.9251C4.38069 11.7734 4.39371 11.6975 4.3849 11.6249C4.3771 11.5606 4.35689 11.4984 4.32539 11.4418C4.2898 11.3779 4.23466 11.3242 4.12437 11.2168L0.586341 7.77074C0.213444 7.40754 0.0269959 7.22594 0.00430753 7.05414C-0.0154326 6.90466 0.0333348 6.75425 0.137032 6.6448C0.256216 6.519 0.513753 6.48135 1.02882 6.40607L5.92009 5.69113C6.07221 5.6689 6.14826 5.65778 6.2145 5.62698C6.27315 5.59971 6.32594 5.56132 6.36997 5.51394C6.41969 5.46042 6.45371 5.3915 6.52175 5.25364L8.70843 0.823678Z" fill="black"/>
                    </svg>

                  </div>
                </div>
                <h3 class="rating-avg">
                  <span v-if="project.ratingAvg !== null && project.ratingAvg !== 0">
                    {{ project.ratingAvg }} / 5
                  </span>
                  <span v-else>
                    Нет оценок
                  </span>

                </h3>
              </div>

            </div>
            <div class="project-reviews">
              <project-reviews
                  v-bind:isAdmin="this.isAdmin"
                  v-bind:project="this.project">
              </project-reviews>
            </div>
          </div>

            <Transition>
              <div class="flex"
                   v-if="this.tab === 'editService'">

                <edit-service
                v-bind:product="this.editProduct"

                v-on:updated="(emit) => {
                      this.tab = 'services'
                    }"
                >

                </edit-service>

              </div>
            </Transition>

            <Transition>
              <div class="flex"
                   v-if="this.tab === 'editProject'">

                <edit-project
                    v-bind:isAdmin="this.isAdmin"
                    v-on:switchTabBack="() => {
                      this.tab = 'description'
                      this.getProjectFullInfo()
                    }"

                    v-bind:project="this.project">

                </edit-project>
              </div>
            </Transition>

            <Transition>
            <div class="flex"
                 v-if="this.tab === 'addService'">

              <div class="services">

              </div>

              <add-service
                  v-bind:projectId="project.id"
                  v-on:added="() => {
                    this.tab = 'services'
                    this.limit = 8
                    this.offset = 0
                    this.products = this.products.splice(this.products.length, this.products.length)
                    this.getProducts(6, 0)


                    this.showModal = true
                    this.modal = {
                      iconType: 'ok',
                      heading: 'Услуга успешно добавлена!',
                      description: `Спасибо!`,
                      descriptionType: 'text',
                      exit: true,
                      close: true,
                      confirm: false

                    }

                  }"

              >

              </add-service>
            </div>
            </Transition>
          </div>

        </div>


      </div>

    </div>



</template>
<script>

import {ref, watch} from 'vue'
import AddService from "../Blocks/Controllers/ProductAdd.vue";
import config from '../assets/js/config.js'
import projectDescriptionTab from "../Blocks/ProjectDescription.vue";
import projectReviews from "../Blocks/ProjectReviews.vue";
import editProject from "../Blocks/Controllers/ProjectEdit.vue";
import editService from "../Blocks/Controllers/ProductEdit.vue";
import {editableProject} from "../assets/js/projectController.js";
import {Waypoint} from "vue-waypoint";
import {highlight} from "../assets/js/productController.js";
import {modalSetting} from "../assets/js/modal.js";

import {store} from "../assets/js/services/categoriesService.js";
import {useFetch} from "../assets/js/controllers/requestsControl.js";

import {userInfo} from "../Store/userInfo.js";
import projectHeader from "../Blocks/ProjectHeader.vue";
import {projectsStore} from "../Store/projectsStore.js";
import projectProducts from "../Layouts/ProjectProducts.vue";



// TODO обновлять рейтинг при удалении отзыва реактивно
// TODO Любимые проекты (не удаляется из списка любимых)
export default {

  name: "ProjectsView.vue",
  components: {
    editProject,
    AddService,
    projectDescriptionTab,
    projectReviews,
    editService,
    Waypoint,

    projectHeader,
    projectProducts
  },
  emits: ['updated', 'high'],

  data() {
    return {
      modal: {},
      api: config.api.url,
      project: {},
      projectRating: 0,
      products: [],
      actionModal: {
        show: false
      },
      isFavourite: false,
      isExchanger: false,
      isOwner: false,
      isAdmin: false,

      limit: 8,
      offset: 0,
      emptyResponse: false,
      editProduct: {},

      config, highlight, userInfo, modalSetting, store, useFetch, editableProject
    }
  },
  props: ['selectedId', 'highlight', 'tab'],
  setup() {
    watch(projectsStore, (value, oldValue) => {
    }, {immediate: true})
  },

  methods: {


    deleteProduct(id) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


      fetch(`${config.api.url}products/${id}`, {
        method: "DELETE",
        headers: myHeaders
      })
          .then((response) => response.json())
          .then(response => {
            this.limit = 8
            this.offset = 0
            this.products = this.products.slice(this.products.length, this.products.length)
            this.getProducts(this.limit, this.offset)
            this.$refs.wrapper.scrollIntoView({behavior: "smooth", block: "center"})
          })
          .catch((error) => {
            console.error(error)
          });
    },


    getProjectFullInfo() {
      const projectId = window.location.pathname.replace('/project/', '');

      useFetch(`projects/${projectId}`, 'GET').then(result => {
        this.project = result.project

        result.project.favorite === 1 ? this.isFavourite = true : this.isFavourite = false
        result.project.userData.username === userInfo.username ? this.isOwner = true : this.isOwner = false
        this.projectRating = Math.round(this.project.ratingAvg)
        result.project.categories.find(category => category.id === store.exchanger) ? this.isExchanger = true : this.isExchanger = false
      }).catch(err => {
        modalSetting.show = true
        modalSetting.type = 'error'
      })


    },


  },
  mounted() {
    this.getProjectFullInfo()
    userInfo.role === 'admin' ? this.isAdmin = true : this.isAdmin = false


  }
}
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity .1s ease, max-height .3s, transform 0.3s;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(5px);
  max-height: 0;
  opacity: 0;
}

.wrapper {
  position: relative;
}
.addService {
  width: 100%;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
[v-cloak] {
  display: block;
  padding: 50px 0;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #333;
    animation: spinner .6s linear infinite;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div {
    display: none;
  }
}

input[type='text'] {
  border-radius: 5px;
  border: 1px solid var(--new-dark, transparent);
  background: var(--neutral, #FFF);
  color: #000;
  padding: 0px 5px;
  width: 100%;
  box-sizing: border-box;

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  get.bad {
    background-color: #fff3f3;
    border: 1px solid #984a5a;
    get.ok {
      background-color: #ffffff;
    }
  }

  &::placeholder {
    opacity: .3;
  }
}
.reviewTextError {
  background-color: #ffd6d6;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;
  padding: 10px;

}
textarea {
  border-radius: 5px;
  border: 1px solid var(--new-dark, transparent);
  background: var(--neutral, #FFF);
  padding: 10px 15px;

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-style: normal;
  height: 280px;
  font-weight: 400;
  line-height: normal;
  resize: none;

  box-sizing: border-box;

  width: 100%;

  &::placeholder {
    opacity: .3;
  }
}


.set-rating {
  svg {
    opacity: .3;
    transition: .3s ease;
    path {
      cursor: pointer;
    }

    get.active {
      opacity: 1!important;
    }
  }
}

.flex {
  width: 100%;
  box-sizing: border-box;
}

.project-header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  padding: 10px;
  margin-bottom: 10px;

  get.owner {
    border-color: #FFC700;
  }
  .button {
    margin-left: auto;
  }

  .baza-button {
    margin-left: 20px;
    padding-left: 20px;
    padding-right: 20px;


  }

  .exchanger-rates {
    width: 20%;
    display: flex;
    gap: 15px;
    margin-left: auto;
    .rate {
      .top {
        display: flex;
        align-items: center;

        color: #000;
        font-family: "PT Sans Caption";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 125% */

        svg {
          width: 10px;
          height: 10px;
          margin-right: 5px;
          path {
            stroke-width: 1px;
            stroke: #000;
          }
        }
      }
      .bottom {
        color: var(--gray, #A8A8A8);
        font-family: "PT Sans Caption";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
    }
  }

  .avatar {

    width: 80px;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    flex-grow: 0;
    display: block;
    box-sizing: border-box;
    position: relative;
    border-radius: 15px;
    overflow: hidden;

    figure {
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0;
      display: block;
      box-sizing: border-box;
    }

    .cover img {
      object-fit: cover;
      height: 100%;
      width: inherit;
    }


    img {
      object-fit: cover;

    }
    .favorite {
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 5px;
      border-radius: 400px;
      padding: 4px;
      transition: .3s ease;

      svg {

      }
    }
  }
}

.project-info {
  width: 50%;
  cursor: default;
  .name {
    width: 100%;
    color: #000;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
      span {
        word-break: break-word;
      }

    font-family: "PT Sans Caption";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-left: 5px;

    svg {
      cursor: pointer;
      width: 18px;
      height: 18px;
      position: relative;
      margin-left: 10px;
      path {
        transition: .3s ease;
      }

      &:hover {
        path {
          stroke: #7c7c7c;
        }
      }
    }
  }
  .project-stats {

    padding-left: 5px;

    display: flex;
    align-items: center;
    justify-content: start;

    .rating {
      display: flex;
      gap: 10px;
      align-items: center;

      color: var(--gray, #A8A8A8);
      font-family: "PT Sans Caption";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &.edit-project {
        cursor: pointer;
      }

    }
    .sep {
      width: 3px;
      height: 3px;
      margin-right: 10px;
      margin-left: 10px;
      border-radius: 200px;
      background-color: #A8A8A8;
    }
    svg {
      width: 12px;
      height: 12px;

    }
  }
}
.services {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  .project {
    width: 30%;

  }
}

.content {
  padding: 0;
}

.project {
  width: 100%;


  .project-banner {
    width: 100%;
    height: auto;
    max-height: 500px;
    overflow: hidden;
    border-radius: 20px;
    position: relative;

    .owner {
      position: absolute;
      z-index: 15;
      text-align: right;
      right: 10px;
      bottom: 10px;
      font-size: 12px;
      color: #ffffff;
      background-color: #000;
      padding: 5px 10px;
      border-radius: 10px;
      p {
        color: #ffffff;
      }
      svg {
        width: 12px;
        height: 12px;
        margin-left: 3px;
        path {
          fill: #fff;
        }
      }
    }



    img {
      width: 100%;
      min-height: 100%;
    }
  }



  .project-body {

    .tabs-body {
      .project-reviews {


      }
    }

  }

  .block-heading {
    display: flex;
    align-items: center;
    .left {
      width: 75%;
      display: flex;
      gap: 20px;
      align-items: end;
      .action {

        .action-button {
          cursor: pointer;
          background: none;
          border: none;
          color: var(--gray, #A8A8A8);
          font-family: "PT Sans Caption";
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

      }

    }
    .right {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: end;

      svg {
        width: 18px;
        height: 18px;
      }

      .stars {
        display: flex;
        gap: 4px;
        align-items: center;
        margin-right: 20px;
      }
      .rating-avg {
        color: #000;
        text-align: right;
        font-family: "PT Sans Caption";
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  .recommend-project {
    svg {
      width: 22px;
      height: 22px;

      path {
        fill: #0a58ca;
      }
    }
  }

}

h3 {
  color: #000;
  font-family: "PT Sans Caption";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.favorite {
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 400px;
  padding: 5px;
  transition: .3s ease;

}

.notReviews {
  svg {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    flex-basis: 100%;

    path {
      fill: #c8b56b;
    }
  }
  span {
    color: #c8b56b;
    flex-basis: 100%;
  }
}



.cards-wrapper {
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;


  .tabs-content {
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 20px;

    .shop-view {
      width: 18.5%;
    }
  }
  .card {

  }
}

.waypoint {
  width: 100%;
  display: flex;
  justify-content: center;
  .loadmore {
    width: fit-content;

  }
}

@media screen and (max-width: 768px) {
  .project {
    .project-body {

    }
    .project-banner {
      padding: 0 10px;
      max-height: 400px;
      img {
        border-radius: 10px;
      }
      .owner {
        p {
          font-size: 10px;
        }
      }
    }

  }

  .cards-wrapper {
    .tabs-content {
      display: flex;

      .shop-view {
        width: 46%;
        justify-content: center;
        display: flex;
      }
    }
  }

  .name {
    font-size: 16px;
  }
  .tab-stats {
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 100%;
    justify-content: start;
    gap: 0px;
    margin-left: 0;
    margin-right: 0;
    background-color: transparent;
    box-shadow: none;



    .stat {
      font-size: 14px;
      margin-right: 10px;
      width: auto;
      margin-bottom: 5px;

      svg {
        margin-right: 5px;
      }
    }
  }

}
@media screen and (max-width: 500px) {
  .project {
    .project-header {
      flex-wrap: wrap;
      .avatar {
        width: 120px;
      }
      .button {
        margin-left: 0;
        width: 100%;
      }
      .baza-button {
        width: 100%;
        box-sizing: border-box;
        margin-left: 0;
      }
    }
    .project-info {
      width: calc(100% - 130px);
      .project-stats {
        flex-wrap: wrap;
        gap: 1px;

        .sep {
          display: none;
        }

        .rating {
          min-width: 47%;
        }
      }
    }
    .project-body {
      padding-left: 10px;
      padding-right: 10px;
      .tabs-body {
        .project-reviews {
          .block-heading {
            .left {
              width: 60%;
            }
            .right {
              width: 40%;
            }
          }
        }
      }
    }
  }


}
</style>