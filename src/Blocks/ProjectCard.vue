<template>

<div style="position: relative; z-index: 0">
  <project-card-overlay
      v-if="!project.project"
      @click.stop
      :projectId="$props.project.id"

      :inFavorite="$props.project.favorite"
      :isPayed="$props.project.payed"
      :projectName="$props.project.name"
      :project="$props.project"
      :favoritePage="this.$props.favoritePage"

      @projectChangePayedStatus="emit => $emit('projectChangePayedStatus', emit)"
      @favoriteChanged="emit => $emit('favoriteChanged', emit)"
      @deleteProject="emit => $emit('deleteProject', emit)"
  />
  <router-link :to="`/project/` + $props.project.id"

       class="project-card_wrapper"
  >

    <div class="project-card_avatar">
      <img :src="config.api.url +  $props.project.avatarFilePath"
           v-if="imgLoaded && !errorImageLoad"
           :alt="$props.project.name"
           @error="() => {
             this.imgLoaded = true
             this.errorImageLoad = true
           }"
           @load="imgLoaded = true">

      <img src="/src/assets/images/error.png"
           v-show="imgLoaded && errorImageLoad"
           :alt="$props.project.name"
           @error="() => {
             this.imgLoaded = true
             this.errorImageLoad = true
           }"
           @load="imgLoaded = true">
      <loader-small v-if="!imgLoaded"/>



    </div>
    <div class="project-card_body">

      <div class="project-card_name">
        {{ $props.project.name }}
      </div>





      <div class="project-card_stats">

        <project-stats
            :is-rating="true"
            v-if="$props.project.ratingAvg">
          <template #text>
            {{ $props.project.ratingAvg }}
          </template>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M13.9634 5.37003C13.8712 5.08655 13.6198 4.88585 13.3235 4.85904L9.28209 4.49214L7.68491 0.752815C7.56698 0.478091 7.29867 0.300781 7.00002 0.300781C6.70137 0.300781 6.43295 0.478091 6.31577 0.752815L4.71859 4.49214L0.676564 4.85904C0.380264 4.88638 0.129359 5.08709 0.0366454 5.37003C-0.0555345 5.65352 0.0295957 5.96445 0.25369 6.16099L3.30866 8.83976L2.4079 12.807C2.342 13.0987 2.45522 13.4004 2.69726 13.5753C2.82736 13.6699 2.98021 13.7171 3.13359 13.7171C3.2654 13.7171 3.39731 13.682 3.51513 13.6115L7.00002 11.5278L10.4843 13.6115C10.7399 13.7643 11.0613 13.7503 11.3028 13.5753C11.5448 13.4004 11.658 13.0987 11.5921 12.807L10.6914 8.83976L13.7463 6.16099C13.9703 5.96445 14.0556 5.65416 13.9634 5.37003Z" fill="#1E1E1E"/>
            </svg>
          </template>
        </project-stats>

        <project-stats v-if="$props.project.reviewsCount > 0">
          <template #text>
            {{ normalizeInt($props.project.reviewsCount) }}
          </template>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M11.9478 2.05081C9.21358 -0.683398 4.78814 -0.683809 2.05355 2.05081C-0.145162 4.24949 -0.560642 7.51876 0.739241 10.1223L0.0185891 13.2922C-0.0750806 13.7043 0.29418 14.0737 0.706349 13.98L3.87626 13.2594C8.48529 15.5605 13.997 12.229 13.997 6.99796C13.997 5.12922 13.2693 3.37228 11.9478 2.05081ZM8.46011 8.74017H4.08174C3.76437 8.74017 3.50708 8.48288 3.50708 8.1655C3.50708 7.84813 3.76437 7.59084 4.08174 7.59084H8.46011C8.77749 7.59084 9.03477 7.84813 9.03477 8.1655C9.03477 8.48288 8.77749 8.74017 8.46011 8.74017ZM9.91959 6.40504H4.08174C3.76437 6.40504 3.50708 6.14776 3.50708 5.83038C3.50708 5.51301 3.76437 5.25572 4.08174 5.25572H9.91959C10.237 5.25572 10.4942 5.51301 10.4942 5.83038C10.4942 6.14776 10.2369 6.40504 9.91959 6.40504Z" fill="#1E1E1E"/>
            </svg>
          </template>
        </project-stats>

        <project-stats v-if="$props.project.viewCount > 0">
          <template #text>
            {{ normalizeInt($props.project.viewCount) }}
          </template>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7.00005 9.15635C8.19041 9.15635 9.15538 8.19138 9.15538 7.00103C9.15538 5.81068 8.19041 4.8457 7.00005 4.8457C5.8097 4.8457 4.84473 5.81068 4.84473 7.00103C4.84473 8.19138 5.8097 9.15635 7.00005 9.15635Z" fill="#1E1E1E"/>
              <path d="M13.7853 6.40377C12.1285 4.40174 9.62066 2.47461 7.00003 2.47461C4.37888 2.47461 1.87043 4.40309 0.214792 6.40377C-0.0715972 6.7497 -0.0715972 7.25189 0.214792 7.59782C0.631039 8.10082 1.50368 9.07179 2.66917 9.92018C5.60443 12.057 8.38916 12.0617 11.3309 9.92018C12.4964 9.07179 13.369 8.10082 13.7853 7.59782C14.0708 7.25256 14.0723 6.75083 13.7853 6.40377ZM7.00003 3.98334C8.66394 3.98334 10.0175 5.33688 10.0175 7.00079C10.0175 8.66471 8.66394 10.0183 7.00003 10.0183C5.33612 10.0183 3.98257 8.66471 3.98257 7.00079C3.98257 5.33688 5.33612 3.98334 7.00003 3.98334Z" fill="#1E1E1E"/>
            </svg>
          </template>
        </project-stats>

        <!--          <project-stats v-if="$props.project.type === 'exchanger'">-->
        <!--            <template #text>-->
        <!--              {{ normalizeInt($props.project.reserve) }} ₽-->
        <!--            </template>-->
        <!--            <template #icon>-->
        <!--              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">-->
        <!--                <path d="M13.7366 4.1234V6.59183C13.7366 6.84686 13.5345 7.04895 13.2794 7.04895H11.2729C10.4164 7.04895 9.72837 6.36087 9.72837 5.50438V5.21086C9.72837 4.35437 10.4164 3.66628 11.2729 3.66628H13.2794C13.5345 3.66628 13.7366 3.86838 13.7366 4.1234Z" fill="#1E1E1E"/>-->
        <!--                <path d="M5.39782 7.33769C5.39782 7.6928 4.91664 8.00412 4.19199 8.17542C3.79791 8.27213 3.33021 8.32795 2.8293 8.32795C2.33177 8.32795 1.86406 8.27213 1.46998 8.17542C0.744848 8.00412 0.263672 7.6928 0.263672 7.33769C0.263672 6.78963 1.41272 6.34406 2.8293 6.34406C4.24877 6.34454 5.39782 6.78963 5.39782 7.33769Z" fill="#1E1E1E"/>-->
        <!--                <path d="M4.35848 8.87792C3.89944 8.98955 3.3687 9.0497 2.82882 9.0497C2.29183 9.0497 1.76205 8.98955 1.29772 8.87647C0.847339 8.77013 0.514365 8.62626 0.263672 8.46843V9.01601C0.263672 9.37112 0.74148 9.67955 1.46276 9.85374C1.85685 9.95334 2.32792 10.0096 2.82882 10.0096C3.33309 10.0096 3.8008 9.95334 4.19825 9.85374C4.92001 9.67955 5.39734 9.37112 5.39734 9.01601V8.46747C5.14617 8.62626 4.81127 8.77061 4.35848 8.87792Z" fill="#1E1E1E"/>-->
        <!--                <path d="M4.3681 10.5558C3.91147 10.6703 3.37688 10.7314 2.82882 10.7314C2.27884 10.7314 1.74569 10.6698 1.28617 10.5539C0.843489 10.4471 0.512921 10.3065 0.263672 10.1511V10.6949C0.263672 11.05 0.74148 11.3584 1.46276 11.5355C1.85685 11.6322 2.32792 11.688 2.82882 11.688C3.33309 11.688 3.8008 11.6317 4.19825 11.5355C4.92001 11.3579 5.39734 11.0495 5.39734 10.6949V10.1506C5.14713 10.3065 4.81464 10.448 4.3681 10.5558Z" fill="#1E1E1E"/>-->
        <!--                <path d="M11.2728 2.94453H13.1542V2.03992C13.1542 1.08719 12.3795 0.3125 11.4268 0.3125H2.98211C2.02938 0.3125 1.25469 1.08719 1.25469 2.03992V5.80464C1.74068 5.68291 2.28489 5.62276 2.82861 5.62276C4.3857 5.62276 5.96733 6.09383 6.11938 7.15819V10.4076H11.4268C12.3795 10.4076 13.1542 9.63288 13.1542 8.68015V7.77073H11.2728C10.0232 7.77073 9.00644 6.754 9.00644 5.50439V5.21087C9.00644 3.96174 10.0232 2.94453 11.2728 2.94453ZM6.08281 2.99939H3.60138C3.36224 2.99939 3.16833 2.80547 3.16833 2.56633C3.16833 2.32718 3.36224 2.13327 3.60138 2.13327H6.08233C6.32147 2.13327 6.51539 2.32718 6.51539 2.56633C6.51539 2.80547 6.32195 2.99939 6.08281 2.99939Z" fill="#1E1E1E"/>-->
        <!--              </svg>-->
        <!--            </template>-->
        <!--          </project-stats>-->


      </div>

      <div class="project-card_links">

        <div v-for="(link, index) of spredLinks($props.project.links)"
             class="project-card_links_link"
             v-show="index < 2"
        >
          <project-external-link
              @click.stop
              :link="link"
          />


        </div>

        <a v-show="$props.project.links.length > 2"
           href="javascript:void(0);"
           @click.stop
           @click="$emit('showLinksModal', this.$props.project.links)"
           class="show-more">
            ...

        </a>

      </div>

    </div>
  </router-link>




</div>


</template>

<script>

import ProjectsView from "../Pages/ProjectDetailed.vue";
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import config from "../assets/js/config.js";
import {useFetch} from "../assets/js/controllers/requestsControl.js";

import {userInfo} from "../Store/userInfo.js";

import {watch} from "vue";
import {projectsStore} from "../Store/projectsStore.js";
import projectCardOverlay from "./ProjectCardOverlay.vue";
import projectStats from "../Helpers/ProjectStats.vue";
import projectExternalLink from "../Helpers/ProjectExternalLink.vue";
import popupProjectLinks from "../components/Popups/PopupProjectLinks.vue";
import popupDelete from "../components/Popups/PopupDelete.vue";

import {changePayedStatus, removeProject} from "../API/projects.js";
import popupAction from "../components/Popups/PopupAction.vue";
import loaderSmall from "../components/Loaders/LoaderSmall.vue";

export default {
  name: "ProjectCard.vue",

  props: {
    project: {},
    options: null,
    offset: null,
    favoritePage: null,

  },
  emits: ['updated', 'favoriteChanged', 'showLinksModal'],
  components: {
    ProjectsView,
    projectCardOverlay,
    projectStats,
    projectExternalLink,
    popupProjectLinks,
    popupDelete,
    popupAction,
    loaderSmall
  },

  setup() {
    watch(projectsStore, (value, oldValue) => {
    }, {immediate: true})

  },

  directives: {
    tippy: directive,
  },
  data () {
    return {
      errorImageLoad: false,
      imgLoaded: false,
      favorite: false,
      isAdmin: false,
      reviewsLength: 0,
      counter: 0,
      isLogin: false,
      reviewsCount: 0,

      
      username: '',
      actionModal: {},
      payed: false,
      config, userInfo, useFetch,
      isFavorite: false,
      isPayed: false,
      modal: {
        show: false,
        data: []
      },


    }
  },

  mounted() {
    this.userInfo.token !== null ? this.isLogin = true : this.isLogin = false
    this.payed = this.$props.project.payed
  },
  methods: {
    spredLinks(array){
      const links = {
        clearnet: [],
        clearnet2: [],
        contacts: [],
        telegram: [],
        onion: [],
        blockchain: [],
        other: []
      }

      const newArray = [];

      for (let link of array) {
        if (link.name === 'Зеркало' ) {
          links.clearnet.push(link)
        } else if (link.name === 'Зеркало VPN') {
          links.clearnet2.push(link)
        }else if (link.name === 'Контакты') {
          links.contacts.push(link)
        } else if (link.name === 'Канал' || link.name === 'Бот') {
          links.telegram.push(link)
        } else if (link.name === 'Onion') {
          links.onion.push(link)
        } else if (link.name === 'Блокчейн') {
          links.blockchain.push(link)
        } else {
          links.other.push(link)
        }
      }

      for (let pushLink of links.clearnet) {
        newArray.push(pushLink)
      }
      for (let pushLink of links.clearnet2) {
        newArray.push(pushLink)
      }
      for (let pushLink of links.contacts) {
        newArray.push(pushLink)
      }

      for (let pushLink of links.telegram) {
        newArray.push(pushLink)
      }

      for (let pushLink of links.onion) {
        newArray.push(pushLink)
      }

      for (let pushLink of links.blockchain) {
        newArray.push(pushLink)
      }
      for (let pushLink of links.other) {
        newArray.push(pushLink)
      }



      return newArray
    },
    normalizeProjectName(name) {
      if (name.length > 35) {
        return name.substring(0, 33) + '...'
      } else {
        return name
      }

    },
    normalizeInt(summ) {
      let number = summ.toString()
      if (number.length > 12) {
        number = number.substring(0, number.length - 6) + 'трлн'
      } else if (number.length > 9) {
        number = number.substring(0, number.length - 6) + 'млрд'
      } else if (number.length > 6) {
        number = number.substring(0, number.length - 6) + ' ' + number.substring(1, number.length - 3) + ' ' + number.substring(4, number.length)
      } else if (number.length > 3) {
        number = number.substring(0, number.length - 3) + ' ' + number.substring(1, number.length)
      }

      return number
    }
  }
}
</script>

<style scoped lang="scss">
.project-card_wrapper {
  width: 100%;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  &.payed {
    border: 1px solid #FFC700;


  }
  .project-card_body {
    display: flex;
    flex-wrap: wrap;
    align-self: start;
  }

  .project-card_avatar {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;


    img {
      width: 100%;
      transition: .15s ease;
    }


  }



  .project-card_body {
    width: 100%;

    .project-card_name {
      font-family: "PT Sans Caption";
      -webkit-line-clamp: 2;
      position: relative;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-break: break-word;
      color: #191B2A;
      height: 40px;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      line-clamp: 3;
      margin-bottom: 5px;
      width: 100%;

    }
    .project-card_stats {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-top: 5px;



    }
    .project-card_links {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      width: 100%;
      margin-left: -0px;

      .project-card_links_link {

      }
      .show-more {
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        background-color: #F2F5F7;
        border-radius: 30px;
        padding: 5px 10px;
        transition: .15s ease;

        svg {
          height: 12px;
          path {
            stroke-width: 1px;
          }
        }

        &:hover {
          background-color: #e8e8e8;
        }
      }
    }
  }
}

@media screen and (max-width: 786px){
  .project-card_wrapper .project-card_body .project-card_name {
    font-size: 14px;
  }
  .project-card_wrapper .project-card_body .project-card_links .show-more {
    padding: 2px 5px;
    font-size: 10px;
  }
}
</style>