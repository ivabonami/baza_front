<template>

    <div @click="this.$router.push(`/project/${$props.project.id}`)"

        class="project-card_wrapper"
    >

      <div class="project-card_avatar">
        <img :src="config.api.url + $props.project.avatarFilePath" :alt="$props.project.name">

        <project-card-overlay
            @click.stop
            :projectId="$props.project.id"
            :projectOwner="$props.project.userData.username"
            :inFavorite="$props.project.favorite"
            :isPayed="$props.project.payed"
            :projectName="$props.project.name"

            @deleteProject="deleteModal.show = true"
        />


      </div>
      <div class="project-card_body">

        <div class="project-card_name">
          {{ normalizeProjectName($props.project.name) }}
        </div>

        <div class="project-card_stats">

          <project-stats
              :is-rating="true"
              v-if="$props.project.ratingAvg">
            <template #text>
              {{ $props.project.ratingAvg }}
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M4.15752 0.412463C4.26756 0.178639 4.32258 0.0617278 4.39727 0.0243745C4.46225 -0.00812482 4.53775 -0.00812482 4.60273 0.0243745C4.67742 0.0617278 4.73244 0.178639 4.84248 0.412463L5.88643 2.6308C5.91891 2.69983 5.93516 2.73435 5.95889 2.76115C5.97991 2.78487 6.00512 2.8041 6.03312 2.81775C6.06474 2.83318 6.10105 2.83875 6.17367 2.84988L8.50883 3.20789C8.75473 3.24559 8.87768 3.26444 8.93458 3.32743C8.98409 3.38224 9.00737 3.45756 8.99794 3.53241C8.98711 3.61844 8.8981 3.70938 8.72007 3.89126L7.03097 5.61689C6.97832 5.67068 6.95199 5.69758 6.935 5.72958C6.91996 5.75791 6.91031 5.78904 6.90659 5.82124C6.90239 5.8576 6.9086 5.8956 6.92102 5.97158L7.31957 8.40896C7.36161 8.66604 7.38263 8.79457 7.34313 8.87085C7.30876 8.93722 7.24767 8.98376 7.17688 8.99753C7.09551 9.01335 6.98546 8.95265 6.76537 8.83125L4.67777 7.67972C4.61273 7.64384 4.5802 7.6259 4.54594 7.61885C4.5156 7.61261 4.4844 7.61261 4.45406 7.61885C4.4198 7.6259 4.38728 7.64384 4.32223 7.67972L2.23463 8.83125C2.01454 8.95265 1.90449 9.01335 1.82312 8.99753C1.75233 8.98376 1.69124 8.93722 1.65687 8.87085C1.61737 8.79457 1.63839 8.66604 1.68043 8.40896L2.07898 5.97158C2.0914 5.8956 2.09761 5.8576 2.09341 5.82124C2.08969 5.78904 2.08004 5.75791 2.065 5.72958C2.04801 5.69758 2.02168 5.67068 1.96903 5.61689L0.279927 3.89126C0.101901 3.70938 0.0128882 3.61844 0.00205647 3.53241C-0.00736774 3.45756 0.0159145 3.38224 0.0654208 3.32743C0.122321 3.26444 0.245272 3.24559 0.491175 3.20789L2.82633 2.84988C2.89895 2.83875 2.93526 2.83318 2.96688 2.81775C2.99488 2.8041 3.02009 2.78487 3.04111 2.76115C3.06484 2.73435 3.08109 2.69983 3.11357 2.6308L4.15752 0.412463Z" fill="black"/>
              </svg>
            </template>
          </project-stats>

          <project-stats v-if="$props.project.reviewsCount > 0">
            <template #text>
              {{ $props.project.reviewsCount }}
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.77778 3.38357H5M2.77778 4.90039H6.33333M3.97056 7.50065H6.86667C7.6134 7.50065 7.98677 7.50065 8.27199 7.35895C8.52287 7.2343 8.72684 7.0354 8.85468 6.79077C9 6.51265 9 6.14858 9 5.42044V3.08021C9 2.35207 9 1.988 8.85468 1.70988C8.72684 1.46525 8.52287 1.26635 8.27199 1.14171C7.98677 1 7.6134 1 6.86667 1H3.13333C2.3866 1 2.01323 1 1.72801 1.14171C1.47713 1.26635 1.27316 1.46525 1.14532 1.70988C1 1.988 1 2.35207 1 3.08021V8.5128C1 8.74373 1 8.85919 1.04855 8.91849C1.09077 8.97007 1.15479 9.00007 1.22246 9C1.30028 8.99992 1.39274 8.92779 1.57767 8.78353L2.63787 7.95649C2.85445 7.78754 2.96274 7.70307 3.08333 7.64299C3.19031 7.5897 3.30419 7.55075 3.42187 7.5272C3.55452 7.50065 3.6932 7.50065 3.97056 7.50065Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </project-stats>

          <project-stats v-if="$props.project.viewCount > 0">
            <template #text>
              {{ $props.project.viewCount }}
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1.16083 5.40753C1.07782 5.28431 1.03632 5.2227 1.01309 5.12767C0.995637 5.05629 0.995637 4.94371 1.01309 4.87233C1.03632 4.7773 1.07782 4.71569 1.16083 4.59247C1.84676 3.57419 3.88851 1 7 1C10.1115 1 12.1532 3.57419 12.8392 4.59247C12.9222 4.71569 12.9637 4.7773 12.9869 4.87233C13.0044 4.94371 13.0044 5.05629 12.9869 5.12767C12.9637 5.2227 12.9222 5.28431 12.8392 5.40753C12.1532 6.42581 10.1115 9 7 9C3.88851 9 1.84676 6.42581 1.16083 5.40753Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 6.71429C8.00985 6.71429 8.8285 5.94677 8.8285 5C8.8285 4.05323 8.00985 3.28571 7 3.28571C5.99015 3.28571 5.1715 4.05323 5.1715 5C5.1715 5.94677 5.99015 6.71429 7 6.71429Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </project-stats>

          <project-stats v-if="$props.project.type === 'exchanger'">
            <template #text>
              {{ $props.project.reserve }}₽
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M8.34957 9.0754C7.52288 9.65531 6.52727 9.96765 5.50543 9.96765C4.4836 9.96765 3.48799 9.65531 2.6613 9.0754M7.62659 1.09673C8.54502 1.52922 9.29805 2.23135 9.77778 3.10246C10.2575 3.97358 10.4393 4.96897 10.2971 5.94597M0.713844 5.94593C0.571631 4.96893 0.753414 3.97354 1.23314 3.10242C1.71286 2.2313 2.4659 1.52918 3.38432 1.09668M8.16673 5.29578C8.16673 6.71489 6.97523 7.86531 5.50543 7.86531C4.03564 7.86531 2.84413 6.71489 2.84413 5.29578C2.84413 3.87666 4.03564 2.72625 5.50543 2.72625C6.97523 2.72625 8.16673 3.87666 8.16673 5.29578Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </project-stats>

          <project-stats v-if="$props.project.type === 'exchanger'">
            <template #text>
              {{ $props.project.minValueToExchange }}₽
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                <path d="M6.43288 2.08234C6.43288 2.62671 5.14209 3.06801 3.54981 3.06801C1.95754 3.06801 0.666748 2.62671 0.666748 2.08234M6.43288 2.08234C6.43288 1.53798 5.14209 1.09668 3.54981 1.09668C1.95754 1.09668 0.666748 1.53798 0.666748 2.08234M6.43288 2.08234V4.27897C5.79257 4.45975 5.38449 4.73325 5.38449 5.03933M0.666748 2.08234V7.99632C0.666748 8.54069 1.95754 8.98198 3.54981 8.98198C4.2468 8.98198 4.88601 8.89743 5.38449 8.75669V5.03933M0.666748 4.05367C0.666748 4.59804 1.95754 5.03933 3.54981 5.03933C4.2468 5.03933 4.88601 4.95478 5.38449 4.81403M0.666748 6.025C0.666748 6.56936 1.95754 7.01066 3.54981 7.01066C4.2468 7.01066 4.88601 6.9261 5.38449 6.78536M11.1506 5.03933C11.1506 5.5837 9.85983 6.025 8.26755 6.025C6.67528 6.025 5.38449 5.5837 5.38449 5.03933M11.1506 5.03933C11.1506 4.49497 9.85983 4.05367 8.26755 4.05367C6.67528 4.05367 5.38449 4.49497 5.38449 5.03933M11.1506 5.03933V8.98198C11.1506 9.52635 9.85983 9.96765 8.26755 9.96765C6.67528 9.96765 5.38449 9.52635 5.38449 8.98198V5.03933M11.1506 7.01066C11.1506 7.55502 9.85983 7.99632 8.26755 7.99632C6.67528 7.99632 5.38449 7.55502 5.38449 7.01066" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </project-stats>

          </div>

        <div class="project-card_links" @click.stop>

          <div v-for="(link, index) of $props.project.links"
              class="project-card_links_link"
          >

            <project-external-link
                v-if="index < 3"
                :link="link"
            />
          </div>

          <div v-show="$props.project.links.length >= 3"
               @click="() => {
                 this.modal.data = this.$props.project.links
                 modal.show = true
               }"
               class="show-more">
            Показать еще
          </div>

        </div>



      </div>
    </div>

  <popup-project-links
      :modal="modal"
      :data="$props.project.links"
      @closeModal="modal.show = false"
  />

  <popup-delete
      @click.stop
      :modal="deleteModal"
      @closeModal="deleteModal.show = false"
      @deleteConfirmed="removeProject($props.project.id, $props.options, $props.offset)"

  >
    <template #header>
      Удалить проект?
    </template>
    <template #text @click.stop>
      Вы действительно хотите удалить проект <b>{{ $props.projectName }}</b>
    </template>
    <template #buttonConfirm @click.stop>
      Да, удалить
    </template>
    <template #buttonSecondary>
      Отменить
    </template>
  </popup-delete>


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
import {removeProject} from "../API/projects.js";



// todo ваш проект под избранным
export default {
  name: "ProjectCard.vue",

  props: {
    project: {},
    options: null,
    offset: null
  },
  emits: ['updated'],
  components: {
    ProjectsView,
    projectCardOverlay,
    projectStats,
    projectExternalLink,
    popupProjectLinks,
    popupDelete
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
      deleteModal: {
        show: false
      },
      removeProject

    }
  },

  mounted() {
    this.userInfo.token !== null ? this.isLogin = true : this.isLogin = false
    this.payed = this.$props.project.payed
  },
  methods: {
    normalizeProjectName(name) {
      if (name.length > 63) {
        return name.substring(0, 60) + '...'
      } else {
        return name
      }

    }
  }
}
</script>

<style scoped lang="scss">
.project-card_wrapper {
  width: 100%;
  cursor: pointer;

  &.payed {
    border: 1px solid #FFC700;


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
      height: 100%;
      transition: .15s ease;
    }


  }

  &:hover {
    .project-card_avatar {
      img {
        height: 105%;
      }
    }
  }

  .project-card_body {
    .project-card_name {
      color: #000;
      font-family: "PT Sans Caption";
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 10px;
      word-wrap: break-word;

    }
    .project-card_stats {
      display: flex;
      gap: 10px;
      align-items: center;


    }
    .project-card_links {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      .project-card_links_link {

      }
      .show-more {
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        background-color: #F2F5F7;
        border-radius: 30px;
        padding: 5px 10px;
        transition: .15s ease;

        &:hover {
          background-color: #e8e8e8;
        }
      }
    }
  }
}
</style>