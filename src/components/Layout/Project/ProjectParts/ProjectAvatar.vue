<template>
  <div class="avatar">
    <the-loader v-if="!loading.loaded" />
    <img :src="api.url + data.avatar"
         v-show="loading.loaded"
         alt="Аватар проекта"
         @load="loading.loaded = true">

    <div class="favorite-wrapper" v-if="userStore.token">
      <button class="favorite"
              :class="{'in-favorite': data.favorite === 1}"
              @click="onFavorite(data.favorite, data.id, data.name)">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
              d="M21.6188 14.7186C20.5594 16.0029 15.9 19.8467 13.4766 21.8154C12.6141 22.5186 11.3813 22.5186 10.5188 21.8154C8.09531 19.8467 3.44063 16.0029 2.37656 14.7186C0.754688 12.7639 0 10.9029 0 8.87793C0 6.8998 0.675 5.08105 1.90313 3.7498C3.15 2.40449 4.85156 1.65918 6.70313 1.65918C8.09063 1.65918 9.35625 2.0998 10.4719 2.9623C11.0531 3.41699 11.5688 3.95137 11.9953 4.55605C12.4266 3.95605 12.9375 3.41699 13.5188 2.9623C14.6344 2.09512 15.9047 1.65918 17.2922 1.65918C19.1484 1.65918 20.85 2.40449 22.0922 3.7498C23.3156 5.08105 23.9953 6.89512 23.9953 8.87793C24 10.9029 23.2453 12.7639 21.6188 14.7186Z"
              fill="#D9D6E6"/>
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup>
import {userStore} from "@/Stores/userStore.js";
import {reactive, ref} from "vue";
import {addFavorite, removeFavorite} from "@/API/favoriteController.js";
import {addNotice} from "@/js/notifications.js";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import {api} from "@/API/apiurl.js";


const props = defineProps({
  data: {
    favorite: ref(Number)
  }
})
const emits = defineEmits(['favoriteChanged'])

const loading = reactive({
  loaded: false
})

function onFavorite (status, projectId, projectName) {
  if (status === 0) {
    try {
      addFavorite(projectId, projectName)
      emits("favoriteChanged", 1)
    } catch (e) {
      addNotice({name: 'Произошла ошибка', type: 'danger'})
    }
  } else {
    try {
      removeFavorite(projectId, projectName)
      emits("favoriteChanged", 0)
    } catch (e) {
      addNotice({name: 'Произошла ошибка', type: 'danger'})
    }

  }
}
</script>
<style scoped lang="scss">
.avatar {
  position: relative;
  aspect-ratio: 1 / 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    width: 100%;

  }
}
.favorite-wrapper {
  top: 15px;
  border-radius: 0 25px 25px 0;
  padding: 8px 5px 5px 0;
  left: 0;
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: .3s ease;

    svg {
      path {
        fill: #cecece;
        transition: .3s ease;
      }

    }

    &.in-favorite {
      svg {
        path {
          fill: #9a2929;
        }
      }
    }

    &:hover {
      opacity: .8;
    }
  }

}
</style>