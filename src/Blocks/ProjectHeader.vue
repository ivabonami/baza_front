<template>
  <div class="project-header">
    <div class="project-header_avatar">
      <img :src="api.url + $props.project.avatarFilePath"
           v-show="avatarLoaded && !errorAvatar"
           @error="() => {
             this.avatarLoaded = true
             this.errorAvatar = true
           }"
           @load="avatarLoaded = true"
           alt="">
      <loader-small v-if="!avatarLoaded"/>

      <img src="/src/assets/images/error.png"
           v-show="avatarLoaded && errorAvatar"
           alt="">
      <div class="project-header_avatar_favorite" v-show="userInfo.token">
        <button-favorite
            :inFavorite="$props.project.favorite || 0"
            :projectId="$props.project.id"
            :project="$props.project"
        />
      </div>

    </div>
    <div class="project-header_info">

      <div class="project-header_info_stats">
        <div class="project-header_info_header">
          <span class="project-name">
            {{ normalizedName }}
<!--<svg xmlns="http://www.w3.org/2000/svg"-->
<!--     @click="() => {-->
<!--                 modalInfo.show = true-->
<!--                 modalInfo.data = project-->
<!--               }"-->
<!--     v-tippy="{content: 'О проекте', theme: 'light'}"-->
<!--     width="24" height="24" viewBox="0 0 24 24" fill="none">-->
<!--            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#D8D8D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--          </svg>-->
          </span>




        </div>
        <div v-for="(stat, index) of stats"
             v-tippy="{content: stat.tooltip, theme: 'light'}"
             v-show="stat.stat"
             class="project-header_info_stats_stat">

          <project-stats

          >
            <template #text>
              {{ stat.stat }}
            </template>
            <template #icon>
              <img :src="stat.icon" alt="" style="width: 100%;">
            </template>
          </project-stats>

<!--          <svg xmlns="http://www.w3.org/2000/svg" width="3"  v-if="isAdmin"  height="3" viewBox="0 0 3 3" fill="none">-->
<!--            <circle cx="1.5" cy="1.5" r="1.5" fill="#A8A8A8"/>-->
<!--          </svg>-->

        </div>
        <button-action v-if="isAdmin || userInfo.username === project.userData.username" @click="this.$router.push({name: 'ProjectEdit'})">
          <template #text>
            <span class="hideOnMobile">Редактировать</span>
          </template>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </button-action>

      </div>
      <div class="project-header_info_stats_exchanger pc_version" v-if="$props.project.type === 'exchanger'">


        <div
            class="project-header_info_stats_exchanger_item">
          <project-additional-stats>
            <template #header>
              {{ normalizeReserveSumm($props.project.minValueToExchange) }} ₽
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
            <template #helper>
              Мин. обмен
            </template>
          </project-additional-stats>

          <project-additional-stats>
            <template #header>
              {{ normalizeReserveSumm($props.project.reserve) }} ₽
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
            <template #helper>
              Резерв
            </template>
          </project-additional-stats>
        </div>


      </div>
    </div>




    <div class="project-header_links">
      <button-primary
          @click="() => {
          modal.show = true
        }"
          :style="'filled'">
        <template #default>
          Ссылки на проект
        </template>
      </button-primary>
    </div>



  </div>
  <popup-project-links
      :modal="modal"
      :data="this.$props.project.links"
      @closeModal="modal.show = false"
  />



  <popup-show-full-info
      v-if="modalInfo.show"
      :modal="modalInfo"
      @closeModal="modalInfo.show = false"
  >
    <template #header>
      {{ modalInfo.data.name }}
    </template>

    <template #text>
      {{ modalInfo.data.description }}
    </template>

    <template #image>
      <img :src="api.url + modalInfo.data.avatarFilePath"
           style="height: 100%;"
           :alt="modalInfo.data.name">
    </template>

  </popup-show-full-info>




  <div class="short-description">
    <div class="project-info">



    </div>
    <p class="short-description">
      {{ shortDescription(project.description) }}


    </p>

    <div class="long-menu" v-if="longDescription || isAdmin">
      <span class="full"
            v-if="longDescription"
            @click="() => {
                 modalInfo.show = true
                 modalInfo.data = project
               }">
          Подробнее
        </span>

      <span class="full"
            v-if="isAdmin"
            @click="() => {
                 modalAction.show = true
                 modalAction.data = project
               }">
          Скрыть проект
        </span>
    </div>



    <div class="project-banner" v-if="$props.project.bannerFilePath">
      <img :src="api.url + $props.project.bannerFilePath"
           alt=""
           v-show="bannerLoaded"
           @load="bannerLoaded = true">

      <loader-small  v-if="!bannerLoaded"/>
    </div>

    <div class="links">
      <transition-group name="list" >
        <div class="link-cat"
             :key="linkCat"
             v-show="linkCat.links.length > 0"
             v-for="linkCat of linksSpread(project.links)">
            <project-external-link
                :shortLinks="false"
                v-for="link of linkCat.links"
                :key="link"
                :link="link"
                :edit="false"
                  @removeLink="emit => {
                project.links.splice(project.links.findIndex(item => item.link === emit), 1)

              }"
            />



        </div>
      </transition-group>
    </div>

    <popup-action
        v-if="modalAction.show === true"
        @closeModal="modalAction.show = false"
        @actionConfirmed="() => {
          disapproveProject(project).then(() => {
            this.modalAction.show = false
          })

        }"
        :modal="modalAction"
    >
      <template #header>
        Скрыть проект?
      </template>
      <template #text>
        Вы собиратесь скрыть проект {{ modalAction.data.name }}
      </template>
      <template #buttonConfirm>
        Скрыть
      </template>
      <template #buttonSecondary>
        Закрыть
      </template>
    </popup-action>
  </div>

</template>

<script>
import buttonPrimary from "../components/Buttons/ButtonPrimary.vue";
import popupProjectLinks from "../components/Popups/PopupProjectLinks.vue";
import {api} from "../assets/js/config.js";
import buttonFavorite from "../components/Buttons/ButtonFavorite.vue";
import projectStats from "../Helpers/ProjectStats.vue";
import projectAdditionalStats from "../Helpers/ProjectAdditionalStats.vue";


import {directive} from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import buttonAction from "../components/Buttons/ButtonAction.vue";

import iconRating from "../assets/icons/icon-rating.svg"
import iconCategories from "../assets/icons/icon-categories.svg"
import iconEye from "../assets/icons/icon-eye.svg"
import iconTestimonial from "../assets/icons/icon-testimonial.svg"
import {userInfo} from "../Store/userInfo.js";
import projectEdit from "./Controllers/ProjectEdit.vue";
import {categoriesStore} from "../Store/categories.js";
import popupShowFullInfo from "../components/Popups/PopupShowFullInfo.vue";
import loaderSmall from "../components/Loaders/LoaderSmall.vue";
import projectExternalLink from "../Helpers/ProjectExternalLink.vue";
import popupAction from "../components/Popups/PopupAction.vue";
import {disapproveProject} from "../API/projects.js";



export default {
  name: "ProjectHeader.vue",
  props: {
    project: {
      name: null,
      avatarFilePath: null,
    }
  },
  data() {
    return {
      disapproveProject,
      bannerLoaded: false,
      modal: {
        show: false,

      },
      modalAction: {
        show: false
      },
      errorAvatar: false,
      modalInfo: {
        show: false
      },
      longDescription: false,
      avatarLoaded: false,
      categoriesStore,
      userInfo,
      normalizedName: null,
      stats: {
        ratingAvg: {
          stat: null,
          icon: iconRating,
          tooltip: 'Рейтинг проекта'
        },
        reviewsCount: {
          stat: null,
          icon: iconTestimonial,
          tooltip: 'Оценок проекта'
        },
        viewCount: {
          stat: null,
          icon: iconEye,
          tooltip: 'Просмотров у проекта'
        },
        categories: {
          stat: null,
          icon: iconCategories,
          tooltip: 'Категория проекта'
        },

      },
      api,
      isAdmin: false,
      sortedLinks: [],

      spreadLinks: {
        clearnet: {
          name: 'Клирнет',
          links: []
        },
        clearnet2: {
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
      }
    }
  },
  directives: {
    tippy: directive,
  },
  components: {
    projectEdit,
    buttonPrimary,
    popupProjectLinks,
    buttonFavorite,
    projectStats,
    buttonAction,
    projectAdditionalStats,
    popupShowFullInfo,
    loaderSmall,
    projectExternalLink,
    popupAction

  },

  methods: {
    shortDescription(text) {
      if (text.length > 310 && window.innerWidth > 768) {
        this.longDescription = true
        return text.substring(0, 307) + '...'
      } else if (text.length > 160 && window.innerWidth <= 768){
        this.longDescription = true
        return text.substring(0, 157) + '...'
      } else {
        return text
      }
    },
    normalizeInt(summ) {
      let number = summ.toString()
      if (number.length > 6) {
        number = number.substring(0, number.length - 6) + 'м'
      } else if (number.length > 3) {
        number = number.substring(0, number.length - 3) + 'к'
      }

      return number
    },
    setStats () {
      this.stats.viewCount.stat = this.normalizeInt(this.$props.project.viewCount)
      this.stats.reviewsCount.stat = this.normalizeInt(this.$props.project.reviewsCount)
      this.stats.ratingAvg.stat =  this.$props.project.ratingAvg

      if (window.innerWidth > 768) {
        this.$props.project.categories.length > 0 ? this.stats.categories.stat = this.$props.project.categories[0].name : null
      } else if (window.innerWidth > 768 && this.$props.project.viewCount > 1000 ) {
        this.$props.project.categories.length > 0 ? this.stats.categories.stat = this.$props.project.categories[0].name.substring(0, 4) + '...' : null
      } else {
        this.$props.project.categories.length > 0 ? this.stats.categories.stat = this.$props.project.categories[0].name : null
      }



      if (this.$props.project.categories.length > 1) {
        this.stats.categories.stat += ` + ${this.$props.project.categories.length - 1}`
        this.stats.categories.tooltip = 'Категории проекта: '
        for (const [index, category] of this.$props.project.categories.entries()) {

          index !== this.$props.project.categories.length - 1 ? this.stats.categories.tooltip += `${category.name}, ` : this.stats.categories.tooltip += `${category.name}`
        }


      }
    },
    linksSpread (links) {

      for (let link of links) {
        if (link.name === 'Зеркало') {
          this.spreadLinks.clearnet.links.push(link)
        } else if (link.name === 'Зеркало VPN') {
          this.spreadLinks.clearnet2.links.push(link)
        } else if (link.name === 'Контакты') {
          this.spreadLinks.contacts.links.push(link)
        } else if (link.name === 'Канал' || link.name === 'Бот') {
          this.spreadLinks.telegram.links.push(link)
        } else if (link.name === 'Onion') {
          this.spreadLinks.onion.links.push(link)
        } else if (link.name === 'Блокчейн') {
          this.spreadLinks.blockchain.links.push(link)
        } else {
          this.spreadLinks.other.links.push(link)
        }
      }

      return this.spreadLinks

    },

    normalizeReserveSumm(summ) {
      let number = summ.toString()
      if (number.length > 12) {
        number = number.substring(0, number.length - 12) + 'трлн'
      } else if (number.length > 9) {
        number = number.substring(0, number.length - 9) + 'млрд'
      } else if (number.length > 6) {
        number = number.substring(0, number.length - 6) + 'млн'
      } else if (number.length > 3) {
        number = number.substring(0, number.length - 3) + 'к'
      }

      return number
    }
  },
  watch: {
    project: function(newVal, oldVal) {
      this.setStats()

      if (window.innerWidth > 768) {
        if ( this.normalizedName ) {
          this.$props.project.name.length > 39 ?  this.normalizedName = this.$props.project.name.substring(0, 42) + '...' :  this.normalizedName = this.$props.project.name
        }



      } else {

        if ( this.normalizedName ) {
          this.$props.project.name.length > 29 ?  this.normalizedName = this.$props.project.name.substring(0, 22) + '...' :  this.normalizedName = this.$props.project.name
        }


      }


      if (userInfo.username) {
        userInfo.username === this.$props.project.userData.username ? this.isAdmin = true :  this.isAdmin = false
        userInfo.role === 'admin' ? this.isAdmin = true :  this.isAdmin = false
      } else {
        this.isAdmin = false
      }
    }
  },

  mounted() {
    this.setStats()

    if (window.innerWidth > 768) {
      this.$props.project.name.length > 80 ?  this.normalizedName = this.$props.project.name.substring(0, 77) + '...' :  this.normalizedName = this.$props.project.name
    } else {
      this.$props.project.name.length > 33 ?  this.normalizedName = this.$props.project.name.substring(0, 29) + '...' :  this.normalizedName = this.$props.project.name
    }



    if (userInfo.username) {
      userInfo.username === this.$props.project.userData.username ? this.isAdmin = true :  this.isAdmin = false
      userInfo.role === 'admin' ? this.isAdmin = true :  this.isAdmin = false
    } else {
      this.isAdmin = false
    }


  }

}
</script>

<style scoped lang="scss">
.long-menu {
  display: flex;
  justify-content: space-between;

}
.project-banner {
  box-sizing: border-box;
  width: 100%;
  min-height: 20px;
  height: auto;
  max-height: 800px;
  overflow: hidden;

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
    border-radius: 20px;
    min-height: 100%;
  }
}
.short-description {
  margin-top: 0px;

  span {
    color: var(--gray, #A8A8A8);
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-right: 6px;
    padding-left: 0;
    cursor: pointer;
    margin-top: -10px;
    transition: .3s ease;
    margin-bottom: 20px;
    display: block;
    &:hover {
      color: black;
    }
  }

  .short-description {
    margin-bottom: 15px;
    font-size: 16px;
    color: #000;
    font-family: "PT Sans Caption";
    word-break: break-word;

  }
  .links {
    margin-top: 10px;
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    width: 100%;
    overflow-x: auto;
    padding: 10px 0;

    .link-cat {
      display: flex;
      gap: 15px;
    }
  }
  .project-info {

    color: #000;
    font-family: "PT Sans Caption";
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 8px;

  }

}
.project-header {
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  display: flex;
  padding: 10px 10px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 10px;

  .project-header_avatar {
    flex-basis: 80px;
    width: 80px;
    aspect-ratio: 1 / 1;

    overflow: hidden;
    position: relative;

    img {
      border-radius: 10px;
      width: 100%;
    }
    .project-header_avatar_favorite {
      position: absolute;
      z-index: 10;
      width: 20px;
      height: 20px;
      right: 5px;
      top: 5px;
    }
  }
  .project-header_info {
    flex-basis: 68%;
    display: flex;
    gap: 20px;
    width: 75%;

    .project-header_info_stats {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      flex-basis: 70%;
      width: 100%;


      .project-header_info_stats_stat {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .project-header_info_header {

        flex-basis: 100%;
        word-wrap: break-word;
        word-break: break-word;
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 18px;
        font-style: normal;
        width: 100%;
        font-weight: 600;
        margin-bottom: -5px;
        display: flex;
        align-items: center;
        gap: 10px;
        line-height: 1;



        .project-name {
          -webkit-line-clamp: 2;
          position: relative;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          display: -moz-box;
          -moz-box-orient: vertical;
          display: -webkit-box;
          line-clamp: 2;
          max-width: 100%;
          line-height: 1.2;
        }

        svg {
          display: inline-block;
          width: 16px;
          position: relative;
          top: 2px;
          height: 16px;
          padding-left: 5px;
          padding-top: 0;
          padding-bottom: 0;

        }

      }
    }
    .project-header_info_stats_exchanger {
      flex-basis: 28%;
      box-sizing: border-box;
      margin-top: 2px;

      .project-header_info_stats_exchanger_item {
        display: flex;
        gap: 20px;
        justify-content: end;
        align-items: center;

      }
    }
  }

  .project-header_links {
    flex-basis: 20%;
  }

}
.hideOnMobile {
  display: block;
}
.mobile_version {
  display: none;
}
@media screen and (max-width: 768px){

  .short-description {
    font-size: 14px;
    .short-description {
      font-family: "PT Sans Caption";
      position: relative;
      word-break: break-word;
      color: #191B2A;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    h2 {
      margin-top: 0;
      font-size: 16px;
      line-height: 1.5;
      position: relative;
      top: -2px;

    }

    .project-info {
      h2 {
        margin-top: 0;
        font-size: 16px;
        line-height: 1.5;
        position: relative;
        top: -2px;
      }
    }
  }

  .project-header .project-header_info .project-header_info_stats .project-header_info_header .project-name {
    word-break: break-all;
    font-size: 14px;
  }
  .hideOnMobile {
    max-width: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .project-header {
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    word-break: break-all;

    .project-header_links {
      width: 100%;
      flex-basis: 100%;
      margin-top: 10px;
    }

    .project-header_avatar {

      flex-basis: 20%;
      align-items: start;
    }

    .project-header_info {
      flex-basis: 75%;
      flex-wrap: wrap;
      box-sizing: border-box;
      gap: 2px;
      height: 100%;
      margin-top: 15px;

      .project-header_info_stats {
        flex-basis: 100%;
        width: 100%;
        gap: 8px;
        margin-top: -15px;

        .project-header_info_header {
          width: 100%;
          font-size: 16px;
          margin-bottom: 5px;

          svg {
            width: 12px;
          }
        }
      }

      .project-header_info_stats_exchanger {
        width: 100%;
        flex-basis: 100%;

        &.pc_version {

        }


        .project-header_info_stats_exchanger_item {
          justify-content: start;
        }
      }

    }
  }
  .mobile_version {
    display: flex;
    width: 100%;

    .project-header_info_stats_exchanger_item {
      display: flex;
      width: 100%;
      gap: 20px;
    }
  }
}

</style>