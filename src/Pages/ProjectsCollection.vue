<template>
  <div class="projects-collection_wrapper">

    <projects-navigation
        :sort="this.sorts"
        @sortChanged="(emit) => {
          this.options.sort = emit
          projectsStore.projects.splice(0, projectsStore.projects.length)
          options.offset = 0
          collectProjects()
        }"
        @categoryChanged="(emit) => {
          this.options.categoryIds = emit
          projectsStore.projects.splice(0, projectsStore.projects.length)
          options.offset = 0
          collectProjects()
        }"
    />

    <transition-group name="list">
      <div class="projects-collection_items"
           v-if="!isLoading || projectsStore.projects.length > 0">

        <div v-for="project of projectsStore.projects"
             :key="project"
             :class="{payed: project.payed}"
             class="projects-collection_items_item">

          <project-card
              :project="project"
              :options="link"
              :offset="options.limit"
              @favoriteChanged="emit => changeFavoriteStatus(project.id, emit)"

          />
        </div>

        <empty-store
            v-show="!isLoading && projectsStore.projects.length <= 0">
          <template #header>
            Нет проектов
          </template>
          <template #text>
            В данную категорию еще не добавлены проекты :(
          </template>
        </empty-store>
      </div>

    </transition-group>


    <Waypoint v-if="!isLoading && showLoadMore"
              @change="way => way.going === 'IN' ? collectProjects() : null">

      <button-primary
          @click="collectProjects()"
          :style="'outline'">
        <template #default>
          Загрузить еще
        </template>
      </button-primary>

    </Waypoint>

    <loader v-show="isLoading" />

  </div>


</template>

<script>
import {watch} from "vue";

import projectCard from "../Blocks/ProjectCard.vue";
import loader from "../Layouts/BaseLoader.vue";
import projectsNavigation from "../Blocks/Menus/ProjectsNavigation.vue";
import emptyStore from "../Blocks/EmptyStore.vue";
import buttonPrimary from "../components/Buttons/ButtonPrimary.vue";

import {getProjects} from "../API/projects.js";
import {projectsStore} from "../Store/projectsStore.js";

import { Waypoint } from "vue-waypoint";
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

export default {
  name: "AllProjectsWithSort.vue",
  components: {
    projectCard,
    Waypoint,
    loader,
    projectsNavigation,
    emptyStore,
    buttonPrimary
  },
  emits: ['updated', 'projectDeleted'],

  data () {
    return {
      sorts: [
        {
          name: 'Популярные',
          sort: 'popularity'
        },

        {
          name: 'Сначала новые',
          sort: 'newest'
        },
        {
          name: 'Сначала старые',
          sort: 'oldest'
        },
        {
          name: 'С высоким рейтингом',
          sort: 'highestRating'
        },
        {
          name: 'С низким рейтингом',
          sort: 'lowestRating'
        },
        {
          name: 'Мне повезет',
          sort: 'random'
        },

      ],
      options: {
        isPayedFirst: true,
        limit: 4,
        offset: 0,

        sort: {
          name: 'Популярные',
          sort: 'popularity'
        },
        categoryIds: 0
      },
      link: null,
      isLoading: false,
      activeCategory: 0,
      showLoadMore: true,
      getProjects,
      projectsStore
    }
  },
  directives: {
    tippy: directive,
  },

  setup() {
    watch(projectsStore, (value, oldValue) => {
    }, {immediate: true})

  },
  mounted() {
    if (projectsStore.projects.length <= 0) {
      this.collectProjects()
    } else {
      this.options.offset = projectsStore.projects.length
    }

  },

  methods: {
    changeFavoriteStatus(projectId, status) {

    },
    linkBuilder () {
      let link = `?`
      for (const param in this.options) {
        this.options[param] !== null && param !== 'categoryIds' && param !== 'sort' && this.options[param] !== '' ? link += `${param}=${this.options[param]}&` : null
        param === 'sort' ? link += `${param}=${this.options[param].sort}&` : null
        param === 'categoryIds' && this.options['categoryIds'] !== 0 ? link += `${param}=[${this.options[param]}]&` : null

      }
      link = link.slice(0, -1)

      this.link = link
      return link
    },

    collectProjects () {
      this.isLoading = true

      getProjects(this.linkBuilder()).then(result => {
        for (const project of result.data.projects) {
          projectsStore.projects.push(project)
        }

        result.data.projects.length < 4 ? this.showLoadMore = false : this.showLoadMore = true

        this.options.offset += this.options.limit
        this.isLoading = false
      }).catch(e => e)

    },

  }
}
</script>

<style scoped lang="scss">
.projects-collection_wrapper {
  min-height: 300px;
  width: 100%;

  .projects-collection_items {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1.1%;
    flex-flow: row wrap;
    justify-content: space-between;
    &::after {
      content: "";
      flex: auto;
    }

    .projects-collection_items_item {
      box-sizing: border-box;
      width: 24%;
      margin-bottom: 20px;
      padding: 10px;
      border: 2px solid transparent;
      border-radius: 20px;
      transition: .15s ease;
      background-color: #fff;

      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;

      &.payed {
        background: linear-gradient(#fff, #fff 0) padding-box,
        linear-gradient( to bottom , #1254FF 70%, #CAA0FF) border-box;
      }

      &:hover {
        border-color: #191B2A;

        &.payed {
          border: 2px solid var(--Linear, #031e59);

        }

      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .projects-collection_wrapper {
    .projects-collection_items {
      .projects-collection_items_item {
        width: 32%;
      }
    }
  }
}
@media screen and (max-width: 768px)  {
  .projects-collection_wrapper {
    .projects-collection_items {
      .projects-collection_items_item {
        width: 49%;
      }
    }
  }
}
@media screen and (max-width: 500px){

}

</style>