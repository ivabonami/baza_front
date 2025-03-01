<template>
  <div class="search-projects" ref="searchBox">
      <button-advanced :type="'button'"
                       @click="search.showPopup = true"
      >
          <div class="button-content">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 19L15.5001 15.5M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Поиск
          </div>
      </button-advanced>


      <teleport to="body" v-if="search.showPopup">
          <search-popup
                  headline="Поиск проекта"
                  style="top: 0;"
                  @closePopup="search.showPopup = false"
          >
              <input-search-new @closeSearch="search.showPopup = false" />
          </search-popup>
      </teleport>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import ButtonAdvanced from "@/components/Buttons/ButtonAdvanced.vue";
import InputSearchNew from "@/components/Inputs/InputSearchNew.vue";
import SearchPopup from "@/components/popups/SearchPopup.vue";

const search = reactive({
    showPopup: false
})

</script>

<style scoped lang="scss">
.search-projects {
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  .button-content {
    svg {
      width: 12px;
      height: 12px;
      path {
        stroke: #575757;
        stroke-width: 3px;
      }
    }
  }

}
</style>