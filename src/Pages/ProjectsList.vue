<template>

  <div class="projects-list">
    <div class="carousel">
      <productsCarouselMenu />
    </div>
    <div class="projects-nav">
      <ProjectsMenu />
      <sort :sorts="projectsSortsStore" @sortChanged="(emit) => {
        this.requestOptions.sort = emit.slug
        this.projects.splice(0, this.projects.length)
        this.requestOptions.offset = 0
        getProjectsList(requestOptions)
      }"/>
    </div>

    <div class="projects">
      <div class="project-box"
           v-for="project of projects"
           :key="project"
      >
        <project-card
            :project="project"
        />
      </div>

      <Waypoint @change="onChange" v-if="hasMore">
        <button @click="getProjectsList(requestOptions)">Еще</button>
      </Waypoint>


    </div>
  </div>

</template>

<script>
import {defineAsyncComponent} from "vue";
import {getProjects} from "@/API/projectsController.js";
import {projects} from "@/Stores/projectsStore.js";
import {projectsSortsStore} from "@/Stores/projectsSortsStore.js";
import { Waypoint } from "vue-waypoint";
import productsCarouselMenu from "@/components/Blocks/ProductsCarouselMenu.vue";

export default {
  name: 'ProjectsList.vue',
  components: {
    ProjectCard: defineAsyncComponent({
      loader: () => import("@/components/Layout/Project/ProjectCard.vue"),
      delay: 200,
      timeout: 3000
    }),
    ProjectsMenu: defineAsyncComponent({
      loader: () => import("@/components/Menus/ProjectsMenu.vue"),
      delay: 200,
      timeout: 3000
    }),
    Sort: defineAsyncComponent({
      loader: () => import("@/components/ReUsable/BaseSort.vue"),
      delay: 200,
      timeout: 3000
    }),
    productsCarouselMenu: defineAsyncComponent({
      loader: () => import("@/components/Blocks/ProductsCarouselMenu.vue"),
      delay: 200,
      timeout: 3000
    }),
    Waypoint
  },
  watch: {
    $route: function (newVal, oldVal) {
      if (newVal.query.categoryIds !== oldVal.query.categoryIds) {

        if (!newVal.query.categoryIds) {
          delete this.requestOptions.categoryIds
          this.requestOptions.offset = 0

          projects.splice(0, projects.length)
          this.getProjectsList(this.requestOptions)
        } else {
          this.requestOptions.categoryIds = `[${newVal.query.categoryIds}]`
          this.requestOptions.offset = 0

          projects.splice(0, projects.length)
          this.getProjectsList(this.requestOptions)
        }

      }
    }
  },
  data() {
    return {
      requestOptions: {
        limit: 8,
        offset: 0,
        isPayedFirst: true,
        sort: null
      },
      projectsSortsStore,
      result: null,
      projects,
      hasMore: true
    }
  },
  methods: {
    onChange(e) {
      if (e.direction === 'UP' && e.going) {
        this.getProjectsList(this.requestOptions)
      }
    },
    getProjectsList(options) {
      if (options['sort']) {
        try {
          getProjects(options).then(result => {
            this.hasMore = result.hasMore
            for (const project of result.projects) {
              projects.push(project)
            }
          })

          this.requestOptions.offset += options.limit

        } catch (err) {
          this.result = err
        }
      }

    }
  },
  mounted() {
    if (window.innerWidth > 1053) {
      this.requestOptions.limit = 8
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1053) {
      this.requestOptions.limit = 4
    } else {
      this.requestOptions.limit = 4
    }

    this.getProjectsList(this.requestOptions)
  }
}

</script>

<style scoped lang="scss">
.projects {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5%;
  align-items: stretch;

  .project-box {
    width: 23%;
    box-sizing: border-box;
    margin-bottom: 1.5%;

  }
}

.projects-nav {
  border-radius: 44.5px;
  background: #FFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  width: 100%;
  margin-bottom: 25px;
  margin-top: 25px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 1052px){
  .projects {
    .project-box {
      width: 31%;
    }
  }
}
@media screen and (max-width: 768px){
  .projects {
    .project-box {
      width: 48%;
    }
  }

}
@media screen and (max-width: 576px){
  .projects {
    .project-box {
      width: 100%;
    }
  }
}

@media screen and (max-width: 356px){
  .projects {
    .project-box {
      width: 100%;
    }
  }
}

</style>