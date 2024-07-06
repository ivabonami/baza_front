<template>
  <div class="projects-collection_wrapper">

    <projects-navigation
        :sort="this.options.sort"
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
           v-show="!isLoading || projectsStore.projects.length > 0">

        <div v-for="project of projectsStore.projects"
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
import 'vue-loading-overlay/dist/css/index.css';

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

      options: {
        isPayedFirst: true,
        limit: 4,
        offset: 0,
        sort: {
          name: 'Популярные',
          sort: 'newest'
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
      width: 24%;
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid transparent;
      border-radius: 20px;
      transition: .15s ease;
      background-color: #fff;

      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;

      &.payed {
        border-color: #1254FF;

      }

      &:hover {
        border-color: #191B2A;

        &.payed {
          border: 1px solid var(--Linear, #1440a6);

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