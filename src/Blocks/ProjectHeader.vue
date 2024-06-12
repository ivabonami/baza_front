<template>
  <div class="project-header">
    <div class="project-header_avatar">
      <img :src="api.url + $props.project.avatarFilePath" alt="">
      <div class="project-header_avatar_favorite">
        <button-favorite
            :inFavorite="$props.project.favorite || 0"
            :projectId="$props.project.id"
        />
      </div>

    </div>
    <div class="project-header_info">

      <div class="project-header_info_stats">
        <div class="project-header_info_header">
          <slot name="project-name"></slot>
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
              <img :src="stat.icon" alt="">
            </template>
          </project-stats>

          <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#A8A8A8"/>
          </svg>

        </div>
<!--        todo редактирование проекта -->
        <button-action>
          <template #text>
            Редактировать
          </template>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </button-action>

      </div>
      <div class="project-header_info_stats_exchanger" >
<!--           -->

        <div v-show="$props.project.type === 'exchanger'"
            class="project-header_info_stats_exchanger_item">
          <project-additional-stats>
            <template #header>
              {{ $props.project.minValueToExchange }} р.
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
            <template #helper>
              мин. обмен
            </template>
          </project-additional-stats>

          <project-additional-stats>
            <template #header>
              {{ $props.project.reserve }} р.
            </template>
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
            <template #helper>
              резерв
            </template>
          </project-additional-stats>
        </div>


      </div>
    </div>


    <div class="project-header_links">
      <button-primary
          @click="() => {
          modal.show = true
          data
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
      modal: {
        show: false,

      },
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
      api
    }
  },
  directives: {
    tippy: directive,
  },
  components: {
    buttonPrimary,
    popupProjectLinks,
    buttonFavorite,
    projectStats,
    buttonAction,
    projectAdditionalStats

  },

  methods: {
    setStats () {
      this.stats.viewCount.stat = this.$props.project.viewCount
      this.stats.reviewsCount.stat = this.$props.project.reviewsCount
      this.stats.ratingAvg.stat = this.$props.project.ratingAvg

      this.stats.categories.stat = this.$props.project.categories[0].name

      if (this.$props.project.categories.length > 1) {
        this.stats.categories.stat += ` и еще ${this.$props.project.categories.length - 1}`
        this.stats.categories.tooltip = 'Категории проекта: '
        for (const [index, category] of this.$props.project.categories.entries()) {

          index !== this.$props.project.categories.length - 1 ? this.stats.categories.tooltip += `${category.name}, ` : this.stats.categories.tooltip += `${category.name}`
        }


      }




    }
  },
  watch: {
    project: function(newVal, oldVal) {
      this.setStats()

    }
  },

  mounted() {


  }

}
</script>

<style scoped lang="scss">
.project-header {
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;

  .project-header_avatar {
    flex-basis: 80px;
    width: 80px;
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    img {

      height: 100%;
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
    flex-basis: 75%;
    display: flex;
    gap: 20px;
    width: 75%;

    .project-header_info_stats {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      flex-basis: 60%;
      width: 100%;


      .project-header_info_stats_stat {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .project-header_info_header {
        flex-basis: 100%;
        word-wrap: break-word;
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 18px;
        font-style: normal;
        width: 100%;
        font-weight: 700;
        line-height: normal;
        margin-bottom: -5px;

      }
    }
    .project-header_info_stats_exchanger {
      flex-basis: 25%;
      box-sizing: border-box;
      margin-top: 5px;

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
</style>