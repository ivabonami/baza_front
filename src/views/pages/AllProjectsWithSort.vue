<template>

  <div class="wrapper" ref="recommend">

    <recommended ></recommended>
  </div>

  <div class="buttons">
    <button class="btn btn-sort-switcher" v-on:click="() => {
      this.activeSort = 'random'
      this.getOffset = 0
      this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, true)
      this.activeSortTab = 'random'
    }"
            :class="{ active: activeSortTab === 'random' }">
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
        <path d="M15.9284 8.29975C17.8821 8.29975 19.8363 8.31854 21.7893 8.29068C22.5423 8.27966 23.0898 8.88292 22.9874 9.62938C22.922 10.1069 22.4347 10.5586 21.8878 10.5994C21.8237 10.6039 21.7582 10.6026 21.6934 10.6026C17.851 10.6026 14.0078 10.6033 10.1654 10.602C9.25303 10.602 8.74955 9.98771 8.92256 9.0974C8.98541 8.77406 9.38327 8.37815 9.71244 8.32955C9.88221 8.30428 10.0565 8.30104 10.2289 8.3004C12.1287 8.29845 14.0286 8.2991 15.9278 8.29975H15.9284Z" fill="#2B2B2B"/>
        <path d="M15.9285 0.708541C17.9042 0.708541 19.8805 0.724741 21.8555 0.698822C22.5171 0.690398 23.0322 1.26645 22.9985 1.86776C22.9661 2.4464 22.5475 2.89221 21.9229 2.94793C21.8263 2.95636 21.7285 2.95312 21.6313 2.95312C17.8199 2.95312 14.0085 2.95312 10.1978 2.95312C9.7747 2.95312 9.38138 2.88443 9.10664 2.51379C8.82801 2.13862 8.79756 1.70836 8.98417 1.31763C9.17144 0.924964 9.51745 0.69947 10.0008 0.70271C11.9765 0.715021 13.9522 0.707893 15.9285 0.707893V0.708541Z" fill="#2B2B2B"/>
        <path d="M13.2565 15.9072C14.3243 15.9072 15.3922 15.9046 16.4594 15.9085C16.9331 15.9098 17.3912 16.191 17.5305 16.5519C17.7314 17.0716 17.6303 17.6016 17.2 17.9185C16.9966 18.0681 16.7115 18.1796 16.4626 18.1815C14.3166 18.2016 12.1705 18.1977 10.0237 18.1906C9.34985 18.1887 8.86905 17.6787 8.88007 17.0107C8.88979 16.3802 9.36799 15.9117 10.0211 15.9085C11.0994 15.9033 12.1782 15.9072 13.2565 15.9072Z" fill="#2B2B2B"/>
        <path d="M2.05552 16.7664C2.55122 16.1651 3.03007 15.5709 3.52448 14.9903C3.72405 14.7557 3.92557 14.494 4.18476 14.3475C4.53531 14.1492 4.99667 14.2944 5.20726 14.575C5.42627 14.8665 5.42433 15.3039 5.16903 15.6305C4.72452 16.1988 4.26446 16.7547 3.80569 17.312C3.43635 17.761 3.06441 18.2081 2.68406 18.6475C2.16309 19.2488 1.6324 19.2183 1.18011 18.558C0.815953 18.0261 0.455681 17.4902 0.116792 16.942C-0.0937991 16.6018 -0.00567497 16.1955 0.287856 15.9487C0.602123 15.6836 1.02914 15.6402 1.32137 15.9072C1.57926 16.1424 1.78078 16.4398 2.05488 16.7671L2.05552 16.7664Z" fill="#2B2B2B"/>
        <path d="M2.02723 2.50308C2.22486 2.28212 2.40888 2.08903 2.57865 1.88427C2.99076 1.38663 3.39574 0.883151 3.80461 0.382917C4.13249 -0.0188257 4.67549 -0.119909 5.02993 0.153535C5.43685 0.467801 5.49711 0.951188 5.13425 1.40801C4.45129 2.26722 3.7437 3.10634 3.04519 3.95195C2.87413 4.1593 2.71796 4.38609 2.51774 4.56169C2.11146 4.91742 1.59762 4.86688 1.28141 4.4282C0.8855 3.87937 0.51486 3.3124 0.155236 2.73894C-0.102657 2.32748 -0.0171248 1.91213 0.338612 1.6497C0.728691 1.36265 1.13238 1.38663 1.46738 1.75208C1.66825 1.9711 1.82635 2.22834 2.02787 2.50178L2.02723 2.50308Z" fill="#2B2B2B"/>
        <path d="M2.03006 9.65195C2.31128 9.32213 2.56204 9.03249 2.80762 8.73831C3.15299 8.3249 3.49318 7.90696 3.8392 7.4942C4.21696 7.04386 4.66212 6.98554 5.0833 7.32573C5.43839 7.61213 5.45329 8.15967 5.11764 8.57178C4.34202 9.52365 3.56575 10.4762 2.79013 11.428C2.25037 12.0903 1.64063 12.0682 1.14298 11.3555C0.798264 10.8617 0.478166 10.3505 0.134093 9.85671C-0.170454 9.41933 0.0978065 8.93853 0.401705 8.72664C0.74513 8.48754 1.30692 8.61973 1.55639 8.97352C1.70413 9.18217 1.84927 9.39276 2.02941 9.65195H2.03006Z" fill="#2B2B2B"/>
      </svg>
      Весь каталог
    </button>
    <button class="btn btn-sort-switcher" v-on:click="() => {
      this.activeSort === 'oldest' ? this.activeSort = 'newest' : this.activeSort = 'oldest'
      this.arrowDate === 'up' ? this.arrowDate = 'down' : this.arrowDate = 'up'
      this.getOffset = 0
      this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, true)
      this.activeSortTab = 'date'

      console.log(this.activeSort)
    }"
            :class="{ active: activeSortTab === 'date' }">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.50269 15.0001C3.35458 15.0006 0 11.6468 0 7.49947C0 3.3511 3.35381 -0.000660988 7.50371 0.000106943C11.6508 0.000874875 15.0026 3.35725 15 7.50663C14.9974 11.6476 11.6439 14.9993 7.50269 15.0001ZM7.50781 1.20832C4.05007 1.20576 1.21564 4.02483 1.20898 7.47285C1.20232 10.9534 4.02217 13.7891 7.49219 13.7914C10.9558 13.7937 13.7869 10.9726 13.7915 7.51431C13.7961 4.04429 10.9727 1.21088 7.50806 1.20832H7.50781Z" fill="#6C7AFF"/>
        <path d="M8.10729 6.89229C8.17154 6.89229 8.2212 6.89229 8.27112 6.89229C9.11994 6.89229 9.9685 6.89152 10.8173 6.8928C11.1514 6.89331 11.3917 7.08555 11.4511 7.39272C11.5126 7.7109 11.2991 8.02959 10.9806 8.09C10.9182 8.10178 10.8537 8.10639 10.7899 8.10639C9.72379 8.10741 8.65739 8.10741 7.59124 8.10664C7.12869 8.10639 6.89242 7.86807 6.89242 7.40347C6.89191 6.03016 6.89114 4.65684 6.89242 3.28352C6.89294 2.78718 7.34448 2.48027 7.76582 2.68966C8.00951 2.81048 8.1078 3.02038 8.10755 3.28608C8.10652 4.43337 8.10703 5.58066 8.10703 6.72795C8.10703 6.77812 8.10703 6.82804 8.10703 6.89229H8.10729Z" fill="#6C7AFF"/>
      </svg>
      Давность
      <svg id="a" class="arrow" :class="{
        up: arrowDate === 'up',
        down: arrowDate === 'down'
      }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.08 74.2"><path d="M254.57,74.2c-1.3,0-2.63-.3-3.87-.94L149.13,21.23c-11.02-5.64-24.17-5.64-35.19,0L12.38,73.26c-4.18,2.14-9.3,.49-11.44-3.69-2.14-4.18-.49-9.3,3.69-11.44L106.19,6.1c15.87-8.13,34.82-8.13,50.69,0l101.57,52.04c4.18,2.14,5.83,7.26,3.69,11.44-1.5,2.94-4.48,4.63-7.57,4.63Z"/></svg>
    </button>
    <button class="btn btn-sort-switcher" v-on:click="() => {
      this.activeSort === 'highestRating' ? this.activeSort = 'lowestRating' : this.activeSort = 'highestRating'
      this.arrowRating === 'up' ? this.arrowRating = 'down' : this.arrowRating = 'up'
      this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, true)
      this.activeSortTab = 'rating'

      console.log(this.activeSort)
    }"
            :class="{ active: activeSortTab === 'rating' }">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M8.93325 0.7084L10.1489 4.61808C10.2802 5.04057 10.6571 5.32648 11.0822 5.32648H15.0168C15.9674 5.32648 16.3627 6.59722 15.5936 7.18118L12.4105 9.59732C12.0665 9.85835 11.9227 10.3211 12.054 10.7436L13.2697 14.6533C13.5635 15.5978 12.5287 16.3833 11.7597 15.7996L8.57651 13.3835C8.23253 13.1224 7.7669 13.1224 7.42292 13.3835L4.23977 15.7996C3.47071 16.3833 2.43593 15.5978 2.72972 14.6533L3.94542 10.7436C4.07671 10.3211 3.93294 9.85835 3.58896 9.59732L0.406373 7.18088C-0.362688 6.59722 0.0326187 5.32618 0.983169 5.32618H4.91752C5.3426 5.32618 5.71947 5.04028 5.85077 4.61778L7.06675 0.7084C7.36053 -0.236133 8.63947 -0.236133 8.93325 0.7084Z"/>
      </svg>
      Рейтинг
      <svg id="a" class="arrow" :class="{
        up: arrowRating === 'up',
        down: arrowRating === 'down'
      }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 263.08 74.2"><path d="M254.57,74.2c-1.3,0-2.63-.3-3.87-.94L149.13,21.23c-11.02-5.64-24.17-5.64-35.19,0L12.38,73.26c-4.18,2.14-9.3,.49-11.44-3.69-2.14-4.18-.49-9.3,3.69-11.44L106.19,6.1c15.87-8.13,34.82-8.13,50.69,0l101.57,52.04c4.18,2.14,5.83,7.26,3.69,11.44-1.5,2.94-4.48,4.63-7.57,4.63Z"/></svg>

    </button>
  </div>

  <div class="projects-wrapper">


    <div class="" v-for="projects of lazyProjects">
      <project-card v-for="project of projects"
                    v-bind:projectId="project.id"
                    v-bind:projectName="project.name"
                    v-bind:projectDescription="project.description"
                    v-bind:projectCreateDate="project.createdAt"
                    v-bind:projectViews="project.viewCount"
                    v-bind:payed="project.payed"
                    v-bind:projectRating="project.ratingAvg"
                    v-bind:avatar="project.avatarFilePath"
                    v-bind:projectCategory="project.categories[0].name"
                    v-bind:exchangeRate="project.exchangeRate"
                    v-bind:reserve="project.reserve"

                    v-on:updated="(emit) => {
                    this.$refs.recommend.scrollIntoView({behavior: 'smooth'})

                    this.getOffset = 0
                    this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, true)

                   }"

      >


      </project-card>
    </div>

    <Waypoint @change="(way) => {

      if (way.going === 'IN' && way.direction === 'UP') {
        lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false)
      }
      console.log(way)
    }">
      <div class="loadmore" ref="loadmore"
           v-if="emptyResponse === false"
           v-on:click="() => {
             lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false)

           }">
        load more
      </div>
    </Waypoint>


    <div class="empty" v-if="projects.length === 0">
      Категория пуста
    </div>


  </div>
</template>

<script>
import recommended from "../../components/page components/Recommended.vue";
import projectCard from "../project/ProjectCard.vue";
import { ref, defineComponent } from "vue";
import { Waypoint } from "vue-waypoint";

export default {
  name: "AllProjectsWithSort.vue",
  components: {recommended, projectCard, Waypoint},
  emits: ['updated'],

  data () {
    return {
      category: {},
      projects: {},
      recommend: ref(),

      activeSort: 'random',
      activeSortTab: 'random',
      arrowDate: 'up',
      arrowRating: 'up',

      globalOffset: 0,
      globalLimit: 0,

      getOffset: 0,
      getLimit: 5,
      lazyProjects: [],
      emptyResponse: false
    }
  },
  mounted() {
    this.handleScroll()

    if (this.lazyProjects.length < 1) {
      this.lazyProjectLoad(this.activeSort, this.getOffset, this.getLimit, false)
    }
  },

  setup() {

  },



  methods: {
    handleScroll () {

      if (this.$refs.loadmore.getBoundingClientRect().bottom < window.innerHeight) {
        console.log('ref: ', this.$refs.loadmore)
      }

    },
    getProjects (sort, offset, limit, global) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");



      fetch(`http://62.113.96.171:3000/projects?isPayedFirst=true&sort=${sort}&offset=${offset}&limit=${limit}`, {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            if (this.$route.path === '/') {

              this.lazyProjects = result.projects

            } else {
              this.category = parseInt(this.$route.path.replace('/projects-list/', ''))
              this.lazyProjects = result.projects.filter( project => project.categories[0].id === this.category);
            }

          })
          .catch((error) => {console.error(error)});

      this.getOffset += this.getOffset + this.getLimit

    },
    lazyProjectLoad (sort, offset, limit, global) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const category = [parseInt(this.$route.path.replace('/projects-list/', ''))]
      console.log('category:', category)
      if(global === true) {
        this.getOffset = 0
      }
      let url = `http://62.113.96.171:3000/projects?isPayedFirst=true&sort=${sort}&offset=${offset}&limit=${limit}`

      if (category === NaN) {
        url = `http://62.113.96.171:3000/projects?isPayedFirst=true&sort=${sort}&offset=${offset}&limit=${limit}&categoryIds=[${category}]`
      } else {

      }

      fetch(url, {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            if (this.$route.path === '/') {

              if(global === true) {
                this.lazyProjects = []
              }

                this.lazyProjects.push(result.projects)


              result.projects.length <= 0 ? this.emptyResponse = true : this.emptyResponse = false

            } else {
              this.category = parseInt(this.$route.path.replace('/projects-list/', ''))
              this.lazyProjects = result.projects.filter( project => project.categories[0].id === this.category);
            }

          })
          .catch((error) => {console.error(error)});

      this.getOffset += this.getOffset + this.getLimit

    },

  }
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.arrow {
  transition: .3s ease;

  &.up {
    transform: rotate(0grad);
  }
  &.down {
    transform: rotate(200grad);
  }
}
.btn {
  color: #6C7AFF;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 100px;
  border: 1px solid #6C7AFF;
  svg {
    path {
      transition: .3s ease;
      fill: #6C7AFF;
    }
  }
  &.active {
    background-color: #6C7AFF;
    color: #fff;
    svg {
      path {
        fill: #fff
      }
    }

  }
}
.search {
  position: relative;
  width: 40%;
  input[type=search] {
    background-color: #ffffff;
    width: 100%;
    color: var(--new-dark, #6C7AFF);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 5px 10px;
    border-radius: 100px;
    border: 1px solid #6C7AFF;

    &::-webkit-search-cancel-button {
      display: none;
    }

    &::placeholder {
      color: #6C7AFF;
      opacity: .5;
    }

    &:hover, &:focus {
      outline: none;
    }

  }
  button {
    position: absolute;
    right: 15px;
    cursor: pointer;
    width: 20px;
    top: 3px;
    border: none;
    background-color: transparent;

  }
}
.btn-sort-switcher {
  svg {
    width: 15px;
    height: 15px;
  }
}
</style>