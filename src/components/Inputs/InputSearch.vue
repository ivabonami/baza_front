<template>

  <div >
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

      <div class="search_buttons" >
        <button class="button-clear"
                @click="() => {
                  search.query = ''
                  startSearch(1000)
                }"
                v-show="search.query.length > 0">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17 1L1 17M1 1L17 17" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button class="button-search"
                v-on:click="searchProjects()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
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

      <div class="search_buttons" data-dropdown="dropdownSearch">
        <button class="button-clear"
                data-dropdown="dropdownSearch"
                @click="search.query = ''"
                v-show="search.query.length > 0">
          <svg data-dropdown="dropdownSearch" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path data-dropdown="dropdownSearch" d="M17 1L1 17M1 1L17 17" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button data-dropdown="dropdownSearch" class="button-search"
                v-on:click="searchProjects()">
          <svg data-dropdown="dropdownSearch" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path data-dropdown="dropdownSearch" d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="dropdownSearchItems" data-dropdown="dropdownSearch" v-if="liveResults.length > 0 && showLiveResults">
      <router-link class="item" data-dropdown="dropdownSearch"
                   @click="() =>  {
                     search.query = ''
                     this.showLiveResults = false
                     this.showSearch = false
                     startSearch(1000)
                   }"
                   :to="`/project/` + item.id"
                   v-for="item of liveResults"
      >
        <div class="avatar" data-dropdown="dropdownSearch">
          <img :src="apiUrl + item.avatarFilePath" alt="" data-dropdown="dropdownSearch">
        </div>
        <div class="info" data-dropdown="dropdownSearch">
          <div class="name" data-dropdown="dropdownSearch">{{item.name}}</div>
          <div class="description" data-dropdown="dropdownSearch">{{item.description}}</div>
        </div>
      </router-link>
    </div>
    <div class="dropdownSearchItems" data-dropdown="dropdownSearch" v-else-if="liveResults.length <= 0 && showLiveResults && !noResults">
      <loader-small />
    </div>
    <div class="dropdownSearchItems" data-dropdown="dropdownSearch" v-else-if="noResults && showLiveResults">
      <span>Нет результатов</span>
    </div>
    <div class="backdrop-mobile"  v-if="showSearch"></div>

    <notice v-if="notice.show" :notice="notice" :errors="errors" @closeNotice="notice.show = false" />
  </div>


</template>

<script>
import {ref} from "vue";
import notice from "../Popups/Notice.vue";
import buttonSecondaryGray from "../Buttons/ButtonSecondaryGray.vue";
import {useFetch} from "../../assets/js/controllers/requestsControl.js";
import {apiUrl} from "../../assets/js/config.js";
import loaderSmall from "../Loaders/LoaderSmall.vue";


export default {
  name: "InputSearch.vue",
  data() {
    return {
      search: {
        query: ''
      },
      searchTimeoutId: null,
      showSearch: false,
      errors: {},
      showLiveResults: false,
      apiUrl,
      noResults: true,
      notice: {
        show: ref(false)
      },
      useFetch,
      liveResults: []
    }
  },

  components: {
    notice,
    buttonSecondaryGray,
    loaderSmall
  },

  methods: {
    startSearch(timer) {
      this.noResults = false
      if (this.searchTimeoutId) clearTimeout(this.searchTimeoutId)

      this.liveResults = []

      if (this.search.query) {
        this.searchTimeoutId = setTimeout(() => {
          useFetch(`projects?search=${this.search.query}`, 'GET')
              .then(result => {
                if (result.success === true) {
                  this.liveResults = result.projects

                  result.projects.length > 0 ? this.noResults = false : this.noResults = true
                }
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
      this.showSearch = false
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
.search_mobile {
  z-index: 31;
  position: absolute;
  box-sizing: border-box;
  bottom: -5px;

  width: 100%;
  left: 0;
  right: 0;
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
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  margin-bottom: 0;
  max-width: 370px;
}
.search_buttons {
  position: absolute;
  right: 1px;
  top: 1px;
  bottom: 1px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
}
.button-search, .button-clear {
  background-color: transparent;
  border: none;
  cursor: pointer;

  svg {
    background-color: transparent;

    path {
      width: 100%;
      height: 100%;
      stroke-width: 2px;
      stroke: #A8A8A8;
      transition: .3s ease;
    }
  }
  &:hover, &.active {
    svg {
      path {
        stroke: #2B2B2B;
      }
    }
  }
}

.search {
  position: relative;
}

.dropdownSearchItems {
  max-width: 500px;
  position: absolute;
  z-index: 31;
  box-sizing: border-box;
  background: #FFFFFF;
  padding: 10px;
  top: 60px;
  left: 0;
  border-radius: 20px;
  width: 100%;
  box-sizing: border-box;
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

    .avatar {
      width: 80px;
      flex-basis: 20%;
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
      font-family: "PT Sans Caption";
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
      font-family: "PT Sans Caption";
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
    top: 65px;
    max-height: 400px;
  }
  input {
    max-width: 100%;
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
  .search {
    display: none;
  }
  .nav {
    display: none;
  }
}
</style>