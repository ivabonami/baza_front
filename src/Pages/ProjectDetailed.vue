<template >
  <div class="wrapper2" ref="wrapper">
    <div class="project" v-if="project.name && !loading">
      <project-header
          v-if="project.name"
          :project="project"
      >
        <template>
          {{ project.name }}
        </template>
      </project-header>




      <div class="project-body">

        <project-products :project="project">

        </project-products>


        <project-reviews
            @reviewAdded="() => {
              getProjectFullInfo()
            }"
            :project="project">

        </project-reviews>


        </div>


      </div>

    <loaderSmall v-else-if="loading" />

    <empty-store
        :show-button="false"
        :show-button-for-users="false"
        v-else-if="!project.name && !loading">
      <template #header>
        Проект с этим ID отсутствует
      </template>
      <template #text>
        проверьте правильность URL
      </template>
    </empty-store>



    </div>





</template>
<script>

import {ref, watch} from 'vue'
import config from '../assets/js/config.js'
import projectDescriptionTab from "../Blocks/ProjectDescription.vue";
import ProjectReviews from "../Layouts/ProjectReviews.vue";
import editProject from "../Blocks/Controllers/ProjectEdit.vue";
import {editableProject} from "../assets/js/projectController.js";
import {Waypoint} from "vue-waypoint";
import {highlight} from "../assets/js/productController.js";
import {modalSetting} from "../assets/js/modal.js";

import {store} from "../assets/js/services/categoriesService.js";

import {userInfo} from "../Store/userInfo.js";
import projectHeader from "../Blocks/ProjectHeader.vue";
import {projectsStore} from "../Store/projectsStore.js";
import projectProducts from "../Layouts/ProjectProducts.vue";

import {useFetch} from "../assets/js/controllers/requestsControl.js";
import emptyStore from "../Blocks/EmptyStore.vue";
import loaderSmall from "../components/Loaders/LoaderSmall.vue";
import popupDelete from "../components/Popups/PopupDelete.vue";
import popupAction from "../components/Popups/PopupAction.vue";

export default {

  name: "ProjectsView.vue",
  components: {
    editProject,
    projectDescriptionTab,
    ProjectReviews,
    Waypoint,
    loaderSmall,
    projectHeader,
    projectProducts,
    emptyStore,
    popupDelete,
    popupAction
  },
  emits: ['updated', 'high'],

  data() {
    return {
      modal: {},
      api: config.api.url,
      project: {},
      projectRating: 0,
      products: [],
      loading: false,
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
      bannerLoaded: false,

      spreadLinks: {
        clearnet: {
          name: 'Клирнет',
          links: []
        },
        contacts: {
          name: 'Контакты',
          links: []
        },
        telegram: {
          name: 'Телеграм',
          links: []
        },
        onion: {
          name: 'Onion',
          links: []
        },
        blockchain: {
          name: 'Блокчейн',
          links: []
        },
        other: {
          name: 'Другое',
          links: []
        }
      },


      config, highlight, userInfo, modalSetting, store, editableProject, useFetch
    }
  },
  props: ['selectedId', 'tab'],
  setup() {
    watch(projectsStore, (value, oldValue) => {
    }, {immediate: true})
  },

  methods: {



    getProjectFullInfo() {
      const projectId = window.location.pathname.replace('/project/', '');

      useFetch(`projects/${projectId}`, 'GET').then(result => {
        this.project = result.project

        result.project.favorite === 1 ? this.isFavourite = true : this.isFavourite = false
        result.project.userData.username === userInfo.username ? this.isOwner = true : this.isOwner = false
        this.projectRating = Math.round(this.project.ratingAvg)
        result.project.categories.find(category => category.id === store.exchanger) ? this.isExchanger = true : this.isExchanger = false

        this.loading = false
      }).catch(err => {

        this.loading = false
      })


    },


  },
  mounted() {
    this.loading = true
    this.$nextTick(() => {
      this.getProjectFullInfo()
      userInfo.role === 'admin' ? this.isAdmin = true : this.isAdmin = false
    })

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

  font-family: "PT Sans Caption";
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

  font-family: "PT Sans Caption";
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
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
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
  box-sizing: border-box;






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
      padding: 0;
      max-height: 800px;
      height: auto;
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
@media screen and (max-width: 768px) {



}
</style>