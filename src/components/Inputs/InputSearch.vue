<template>

  <div class="wrapper">
    <div class="button" data-dropdown="dropdownSearch">
      <div class="button_search" data-dropdown="dropdownSearch" @click="showMobileSearch">
        <svg data-dropdown="dropdownSearch" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path data-dropdown="dropdownSearch" d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="search" >
      <input type="search"
             data-dropdown="dropdownSearch"
             @click="liveResults.length > 0 ? showLiveResults = true : null"
             v-on:keydown.enter="searchProjects()"
             @input="() => {
               this.showLiveResults = true
               startSearch(1000)
             }"
             id="search"
             autocomplete="off"
             name="search"
             placeholder="Найти проект"
             v-model="search.query">

    </div>

    <div class="search_mobile"  v-if="showSearch" data-dropdown="dropdownSearch">
      <input type="search"
             data-dropdown="dropdownSearch"
             v-on:keydown.enter="searchProjects()"
             id="search"
             @input="() => {
               this.showLiveResults = true
               startSearch(1000)
             }"
             autocomplete="off"
             name="search"
             placeholder="Найти проект"
             v-model="search.query">

    </div>

    <div class="dropdownSearchItems" @click="closeDropdown()" data-dropdown="dropdownSearch" v-if="liveResults.length > 0 && showLiveResults">
      <div class="item" data-dropdown="dropdownSearch"
                   @click="() =>  {
                     search.query = ''
                     this.showLiveResults = false
                     this.showSearch = false
                     startSearch(1000)

                   }"
                   :style="item.style"

                   v-for="item of liveResults"
                   :key="item"
      >
        <div class="project" v-if="item.project" data-dropdown="dropdownSearch" @click="$emit('projectSelected', item.project ? item.project : item)">
          <div class="avatar" data-dropdown="dropdownSearch">
            <img :src="api.url + item.project.avatarFilePath" alt="" data-dropdown="dropdownSearch">
          </div>
          <div class="info" data-dropdown="dropdownSearch">
            <div class="name" data-dropdown="dropdownSearch">{{item.project.name}}</div>
            <div class="description" data-dropdown="dropdownSearch">{{item.project.description}}</div>
          </div>
        </div>

        <div class="project" v-else data-dropdown="dropdownSearch" @click="$emit('projectSelected', item)">
          <div class="avatar" data-dropdown="dropdownSearch">
            <img :src="api.url + item.avatarFilePath" alt="" data-dropdown="dropdownSearch">
          </div>
          <div class="info" data-dropdown="dropdownSearch">
            <div class="name" data-dropdown="dropdownSearch">{{item.name}}</div>
            <div class="description" data-dropdown="dropdownSearch">{{item.description}}</div>
          </div>
        </div>



      </div>
    </div>
    <div class="dropdownSearchItems" data-dropdown="dropdownSearch" v-else-if="liveResults.length <= 0 && showLiveResults && !noResults && search.query.length > 0">
      <the-loader />
    </div>
    <div class="dropdownSearchItems" data-dropdown="dropdownSearch" v-else-if="noResults && showLiveResults && search.query.length > 0">
      <span>Нет результатов</span>
    </div>
    <div class="backdrop-mobile"  v-if="showSearch"></div>

  </div>


</template>

<script>
import {ref} from "vue";
import ButtonSecondaryGray from "@/components/Buttons/ButtonSecondaryGray.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import axios from "axios";
import {api} from "@/API/apiurl.js";

export default {
  name: "InputSearch.vue",

  data() {
    return {
      search: {
        query: ''
      },
      api,
      searchTimeoutId: null,
      showSearch: false,
      errors: {},
      showLiveResults: false,
      noResults: true,
      notice: {
        show: ref(false)
      },
      liveResults: []
    }
  },

  components: {
    TheLoader,
    ButtonSecondaryGray,
  },

  methods: {

    startSearch(timer) {
      this.noResults = false
      if (this.searchTimeoutId) clearTimeout(this.searchTimeoutId)

      this.liveResults = []

      if (this.search.query) {
        this.searchTimeoutId = setTimeout(() => {
          axios.get(api.url + `projects?search=${this.search.query}`)
              .then(result => {
                this.liveResults = result.data.projects

                result.data.projects.length > 0 ? this.noResults = false : this.noResults = true
              })
        },timer)
      }

    },
    showMobileSearch() {
      this.showSearch = !this.showSearch
      this.showLiveResults = false
    },
    searchProjects() {
      if (this.search.query !== '') {
        this.$router.push(`/search?q=${this.search.query}`)
      } else {
        this.errors.emptyQuery = 'Нельзя искать пустоту, введите запрос'
        this.notice.show = true
      }
      this.showLiveResults = false
      this.showSearch = false

    },
    closeByOutsideClick (event) {
      if (event.target.dataset.dropdown !== 'dropdownSearch') {
        this.closeDropdown()
        this.showLiveResults  = false
      }
    },
    closeByEsc (event) {
      if (event.key === 'Escape') {
        this.closeDropdown()
      }

    },
    closeDropdown() {
      this.$emit('closeSearch', true)
      this.showSearch = false
      this.showLiveResults  = false
    },
  },


  mounted() {
    window.addEventListener('keydown', e => this.closeByEsc(e))
    window.addEventListener('mousedown', e => this.closeByOutsideClick(e))
  },
  beforeUnmount() {
    window.removeEventListener('keydown', e => this.closeByEsc(e))
    window.removeEventListener('mousedown', e => this.closeByOutsideClick(e))
  }

}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
}
.backdrop-mobile {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 30;
  background: rgba(217, 217, 217, 0.6);
  backdrop-filter: blur(3px);
}
.button {
  display: none;
  .button_search {
    cursor: pointer;
    position: relative;
    top: -5px;
  }
}
input {
  border-radius: 20px;
  border: none;
  background-color: #F8F7FC;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  min-height: 45px;
  max-height: 50px;
  padding: 10px;
  box-sizing: border-box;
}

.search {
  position: relative;
}

.dropdownSearchItems {
  max-width: 100%;
  position: absolute;
  z-index: 31;
  box-sizing: border-box;
  background: #FFFFFF;
  padding: 10px;
  top: 60px;
  right: 50%;
  transform: translateX(50%);
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;


  .item {
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    border: 2px solid transparent;
    transition: .15s ease;
    padding: 10px;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    animation: BgGrad 5s ease-in-out infinite;

    @keyframes BgGrad {
      0% {
        background-size: 100% 100%;
      }
      50% {
        background-size: 1000% 1000%;
      }
      100% {
        background-size: 100% 100%;
      }
    }

    .project {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      align-items: center;
    }

    .avatar {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
      }

    }
    .info {
      flex-basis: 80%;

    }
    .name {
      
      -webkit-line-clamp: 1;
      position: relative;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-break: break-word;
      color: #191B2A;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      line-clamp: 3;
      margin-bottom: 5px;
      width: 100%;
    }

    .description {
      
      -webkit-line-clamp: 2;
      position: relative;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-break: break-word;
      color: #191B2A;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-overflow: ellipsis;
      display: -moz-box;
      -moz-box-orient: vertical;
      display: -webkit-box;
      line-clamp: 3;
      margin-bottom: 5px;
      width: 100%;
    }

    &:hover {
      border-color: black;
    }
  }

}

@media screen and (max-width: 768px){
  .dropdownSearchItems {
    top: 75px;
    max-height: 400px;
    width: 90%;
    max-width: 90%;
    position: fixed;
    left: 5%;
    right: 5%;
    transform: none;

    .item {
      .project {
        flex-wrap: nowrap;
        .avatar {
          width: 25%;
        }
        .info {
          width: 73%;
        }
      }
    }
  }
  .wrapper {
    align-items: center;
    display: flex;
    width: 100%;
  }
  input {
    width: 90%;
    top: 30px;
    left: 4%;
    right: 3%;
    z-index: 20;
    max-height: 60px;
    border-radius: 30px;
    height: 100%;
    position: fixed;
    box-sizing: border-box;
  }
  .button {
    display: flex;
    .button_search {
      position: relative;
      top: -5px;
    }
  }
  .button {
    width: 15px;
    height: 15px;
    box-sizing: border-box;
  }
  .button_search {
    display: none;
  }
  .nav {
    display: none;
  }
}
</style>