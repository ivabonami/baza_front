<template>
  <div class="assign-wrapper">
    <div class="small-placeholder"
         :style="placeholder.style"
         v-for="placeholder of placeholders.categoryPlaceholders"
    >
      <div class="placeholder" @click="assignProject(placeholder, data.project)">
        <div class="project" v-if="placeholder.project">
          <div class="image">
            <img :src="api.url + placeholder.project.avatarFilePath" alt="">
          </div>
          {{ placeholder.project.name }}
        </div>
        <div class="placeholder-text" v-else>
          {{ placeholder.text }}
        </div>
      </div>

    </div>

  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import {getPlaceholders, linkProjectWithPlaceholder, relinkProjectToPlaceholder} from "@/API/placeholders.js";
import {api} from "@/API/apiurl.js";
import {placeholders} from "@/API/placeholders.js";
import {reactive} from "vue";


const route = useRoute()
const loading = reactive({
  isLoaded: false
})

const props = defineProps({
  data: null
})
const emits = defineEmits(['closePopup'])

getPlaceholders(route.query.categoryIds).then((result) => {
  loading.isLoaded = true
  placeholders.categoryPlaceholders = result
})


const assignProject = (placeholder, project) => {


  if(placeholder.project) {
    relinkProjectToPlaceholder(placeholder.id, project)
  } else {
    linkProjectWithPlaceholder(placeholder.id, project)
  }
  emits('closePopup')
}

</script>
<style lang="scss" scoped>
.assign-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  .small-placeholder {
    width: 24%;
    box-sizing: border-box;
    border-radius: 20px;
    text-align: center;
    border: 3px solid transparent;
    position: relative;
    padding: 15px;
    flex-wrap: wrap;
    cursor: pointer;
    color: #B3B4C9;
    font-weight: 500;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    align-items: center;
    display: flex;
    justify-content: center;
    transition: .3s ease;
    min-height: 250px;


    .placeholder {
      position: relative;
      width: 100%;
      height: 100%;

      .project {
        padding: 0;

        .image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1 / 1;
          overflow: hidden;

          img {
            height: 100%;
            border-radius: 20px;
          }
        }

      }
      .placeholder-text {
        border-radius: 13px;
        border: 2px dashed #B3B4C9;
        display: flex;
        width: 100%;
        font-size: 22px;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

    }
    &:hover {
      border-color: #191B2A;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    }
  }
}

@media screen and (max-width: 500px){
  .assign-wrapper .small-placeholder {
    width: 100%;
  }
}
</style>