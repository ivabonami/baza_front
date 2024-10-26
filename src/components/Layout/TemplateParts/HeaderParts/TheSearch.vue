<template>
  <div class="search-projects" ref="searchBox" :class="{collapsed: searchProjects.collapsed, show: searchProjects.show}">
    <div class="button" v-if="!searchProjects.show" @click="toggleSearch">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 19L13.0001 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
    <input-search v-if="searchProjects.show" @projectSelected="emit => onProjectClick(emit.id)" />

    <div class="close-search" v-if="searchProjects.show && searchProjects.collapsed" @click="toggleSearch">
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7L7 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>


    </div>
  </div>
</template>

<script setup>
import InputSearch from "@/components/Inputs/InputSearch.vue";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";

const router = useRouter()

const searchProjects = reactive({
  collapsed: false,
  show: true
})

const searchBox = ref(null)

const toggleSearch = () => {
  if (!searchProjects.show) {
    searchProjects.show = true
    addEventListener('mousedown', closeByClickOutside)
    addEventListener('keydown', closeByEsc)
  } else {
    closeDropdown()
  }
}

const closeDropdown = () => {
  removeEventListener('mousedown', closeByClickOutside)
  removeEventListener('keydown', closeByEsc)
  searchProjects.show = false
  console.log(searchProjects.show)
}

const closeByClickOutside = (e) => {
  if (searchBox.value && !searchBox.value.contains(e.target)) {
    closeDropdown()
  }
}

const closeByEsc = (e) => {
  if (e.key === 'Escape') {
    closeDropdown()
  }
}


const hideMenuIOnResize = (e) => {
  searchProjects.collapsed = e.target.innerWidth < 992;
}

searchProjects.collapsed = window.innerWidth < 992;
searchProjects.show = window.innerWidth > 992;


window.addEventListener('resize', hideMenuIOnResize)

const onProjectClick = (id) => {
  router.push({path: '/project/' + id, params: id})
  closeDropdown()
}

</script>

<style scoped lang="scss">
.search-projects {
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  .close-search {
    position: fixed;
    z-index: 21;
    right: 1%;
    padding: 20px;
    box-sizing: border-box;
  }

}
</style>