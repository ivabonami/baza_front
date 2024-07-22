<template>
  <div class="search">

    <input type="search"
           v-on:keydown.enter="searchProjects()"
           id="search"
           autocomplete="off"
           name="search"
           placeholder="Найти проект"
           v-model="search.query">

    <div class="search_buttons">
      <button class="button-clear"
              @click="search.query = ''"
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

  <notice v-if="notice.show" :notice="notice" :errors="errors" @closeNotice="notice.show = false" />
</template>

<script>
import {ref} from "vue";
import notice from "../Popups/Notice.vue";


export default {
  name: "InputSearch.vue",
  data() {
    return {
      search: {
        query: ''
      },

      errors: {},

      notice: {
        show: ref(false)
      }
    }
  },

  components: {
    notice
  },

  methods: {
    searchProjects() {
      if (this.search.query !== '') {
        this.$router.push(`/search?q=${this.search.query}`)
      } else {
        this.errors.emptyQuery = 'Нельзя искать пустоту, введите запрос'
        this.notice.show = true
      }

    }
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">
input {
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  margin-bottom: 0;
  width: 370px;
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

@media screen and (max-width: 768px){
  .search {
    display: none;
  }
  .nav {
    display: none;
  }
}
</style>