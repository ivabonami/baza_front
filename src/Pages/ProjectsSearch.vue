<template>
  <div class="row">
    <h2>Результаты для запроса: {{this.$route.query.q}}</h2>
    <div class="projects" >

      <div class="project" v-for="project of projects">
        <project-card
            :project="project"

        />
      </div>


    </div>
  </div>
</template>

<script>
import ProjectCard from "../Blocks/ProjectCard.vue";
import {useFetch} from "../assets/js/controllers/requestsControl.js";

export default {
  name: "SearchPage.vue",

  data() {
    return {
      projects: [],
      query: this.$route.query.q
    }
  },
  components: {ProjectCard},
  methods: {
    searchProject (query) {
      useFetch(`projects?search=${query}`, 'GET')
          .then(result => {
            if (result.success === true) {
              this.projects = result.projects
            }
          })

    }
  },
  mounted() {

    this.searchProject(this.query)

  },
}
</script>

<style scoped lang="scss">
.row {
  .projects {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 20px;

    .project {
      box-sizing: border-box;
      width: 24%;
      margin-bottom: 20px;
      padding: 10px;
      border: 2px solid transparent;
      border-radius: 20px;
      transition: .15s ease;
      background-color: #fff;
      cursor: pointer;

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
  .row {
    .projects {
      .project {
        width: 32%;
      }
    }
  }
}
@media screen and (max-width: 768px)  {
  .row {
    .projects {
      .project {
        width: 48%;
      }
    }
  }
}
@media screen and (max-width: 500px){

}
</style>