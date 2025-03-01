<template>

  <div class="wrapper">
    <div class="button">
      <div class="button_search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label for="search" class="search" >
      <input type="search"
             id="search"
             autocomplete="off"
             name="search"
             placeholder="Начните вводить название или ключевое слово"
             ref="searchInput"
             @input="lazySearch()"
             v-model="searchSettings.query">

    </label>

      <div class="results-grid" v-if="searchSettings.query.length > 0">
          <TransitionGroup name="list-complete">

              <template v-for="project of searchSettings.results" :key="project.id">
                  <ThePlaceholder
                          class="result-item"
                          :placeholder="project"
                          v-if="!project.type"
                          @click="emits('closeSearch')"
                  />
                  <project-card
                          class="result-item"
                          v-else-if="project.type"
                          :project="project"
                          @click="emits('closeSearch')"
                  />
              </template>
              <template v-if="searchSettings.isLoading || searchSettings.results.length === 0 || searchSettings.query.length > 0">
                  <the-loader style="margin-top: 30px;" v-if="searchSettings.isLoading" />
                  <div class="info-box" v-if="!searchSettings.isLoading && searchSettings.results.length === 0 && searchSettings.query.length > 0">
                      <div class="icon">
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 15V11M11 7H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>

                      </div>
                      <h3>Нет результатов</h3>

                  </div>
              </template>
          </TransitionGroup>
      </div>
  </div>


</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import ButtonSecondaryGray from "@/components/Buttons/ButtonSecondaryGray.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import axios from "axios";
import {api} from "@/API/apiurl.js";
import ProjectCard from "@/components/Layout/Project/ProjectCard.vue";
import ThePlaceholder from "@/components/Layout/Project/ThePlaceholder.vue";

const emits = defineEmits(['closeSearch'])


const searchSettings = reactive({
    results: [],
    query: '',
    searchTimer: null,
    isLoading: false

})

const searchInput = ref(null)

const searchProjects = () => {

    axios.get(api.url + `projects?search=${searchSettings.query}`)
        .then(result => {
            for (const project of result.data.projects) {
                searchSettings.results.push(project)
            }

            searchSettings.isLoading = false
        })

}

const lazySearch = () => {
    if ( searchSettings.query.length > 0) {
        searchSettings.isLoading = true
        searchSettings.results.splice(0, searchSettings.results.length)

        clearTimeout(searchSettings.searchTimer)

        searchSettings.searchTimer = (() => {
            return setTimeout(() => {
                searchProjects()
            }, 1000)
        })()
    }

}

onMounted(() => {
    searchInput.value.focus()
})
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  padding: 0;
  min-height: 22px;
}

.button {
  display: none;
  .button_search {
    cursor: pointer;
    position: relative;
    top: -5px;
  }
}
.search {
  position: fixed;
  top: 0;
  border-bottom: 1px solid #bdbdbd;
  background-color: #f8f8f8;
  left: 50%;
  translate: -50% 0;
  width: 100%;
  z-index: 3;

}
input {
  border-radius: 5px;
  border: none;
  margin-bottom: 0;
  width: 100%;
  display: flex;
  min-height: 45px;
  max-height: 50px;
  padding: 5px;
  box-sizing: border-box;
  text-align: center;
  outline: none;

}

.results-grid {
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  position: relative;


  .result-item {
    width: calc(25% - 10px);
    height: fit-content;
  }

  .info-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    padding-bottom: 60px;
    opacity: .5;
    svg {
      width: 50px;
      height: 50px;

      path {
        stroke-width: 1px;
      }
    }

    h3 {
      margin-top: 10px;
    }
  }
}

.list-complete-item {
  transition: all 0.3s ease;
  margin-right: 10px;
}

.list-complete-enter-from,
.list-complete-leave-to {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

@media screen and (max-width: 768px){
  .results-grid .result-item {
    width: calc(50% - 10px);}
}

@media screen and (max-width: 500px){
  .results-grid .result-item {
    width: 100%;}
}


</style>