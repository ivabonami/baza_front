<template>
  <div class="header-admin-menu" data-dropdown="adminMenu">

    <div class="header-admin-menu-item" v-if="userStore.role === 'admin'" data-dropdown="adminMenu" @click="makeRoute('/categories-editor')">
      <div class="icon" data-dropdown="adminMenu">
        <svg fill="none" viewBox="0 0 15 12" height="12" width="15" xmlns="http://www.w3.org/2000/svg" data-dropdown="adminMenu">
          <path xmlns="http://www.w3.org/2000/svg" d="M1 6H14M1 1H14M1 11H9.66667" stroke="black" stroke-linecap="round" stroke-linejoin="round" data-dropdown="adminMenu"></path>
        </svg>
      </div>
      <div class="text" data-dropdown="adminMenu">
        Редактор витрины
      </div>
    </div>

    <div class="header-admin-menu-item" v-if="userStore.role === 'admin'" data-dropdown="adminMenu" @click="makeRoute('/payed-editor')">
      <div class="icon" data-dropdown="adminMenu">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 13.6667C7.5 14.9553 8.54467 16 9.83333 16H12C13.3807 16 14.5 14.8807 14.5 13.5C14.5 12.1193 13.3807 11 12 11H10C8.61929 11 7.5 9.88071 7.5 8.5C7.5 7.11929 8.61929 6 10 6H12.1667C13.4553 6 14.5 7.04467 14.5 8.33333M11 4.5V6M11 16V17.5M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="text" data-dropdown="adminMenu">
        Редактор платных мест
      </div>
    </div>

    <div class="sep" v-if="userStore.role === 'admin'"></div>

    <div class="header-admin-menu-item" v-if="userStore.role === 'admin'" data-dropdown="adminMenu" @click="makeRoute('/reviews-checker')">
      <div class="icon" data-dropdown="adminMenu">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 14L7 16L11.5 11.5M7 7V4.2C7 3.0799 7 2.51984 7.21799 2.09202C7.40973 1.71569 7.71569 1.40973 8.09202 1.21799C8.51984 1 9.07989 1 10.2 1H17.8C18.9201 1 19.4802 1 19.908 1.21799C20.2843 1.40973 20.5903 1.71569 20.782 2.09202C21 2.51984 21 3.0799 21 4.2V11.8C21 12.9201 21 13.4802 20.782 13.908C20.5903 14.2843 20.2843 14.5903 19.908 14.782C19.4802 15 18.9201 15 17.8 15H15M4.2 21H11.8C12.9201 21 13.4802 21 13.908 20.782C14.2843 20.5903 14.5903 20.2843 14.782 19.908C15 19.4802 15 18.9201 15 17.8V10.2C15 9.07989 15 8.51984 14.782 8.09202C14.5903 7.71569 14.2843 7.40973 13.908 7.21799C13.4802 7 12.9201 7 11.8 7H4.2C3.0799 7 2.51984 7 2.09202 7.21799C1.71569 7.40973 1.40973 7.71569 1.21799 8.09202C1 8.51984 1 9.07989 1 10.2V17.8C1 18.9201 1 19.4802 1.21799 19.908C1.40973 20.2843 1.71569 20.5903 2.09202 20.782C2.51984 21 3.07989 21 4.2 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="text" data-dropdown="adminMenu">
        Проверить отзывы
      </div>
    </div>

    <div class="header-admin-menu-item" v-if="userStore.role === 'admin'" data-dropdown="adminMenu" @click="makeRoute('/projects-checker')">
      <div class="icon" data-dropdown="adminMenu">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 11L10 13L14.5 8.5M16.9012 3.99851C17.1071 4.49653 17.5024 4.8924 18.0001 5.09907L19.7452 5.82198C20.2433 6.02828 20.639 6.42399 20.8453 6.92206C21.0516 7.42012 21.0516 7.97974 20.8453 8.47781L20.1229 10.2218C19.9165 10.7201 19.9162 11.2803 20.1236 11.7783L20.8447 13.5218C20.9469 13.7685 20.9996 14.0329 20.9996 14.2999C20.9997 14.567 20.9471 14.8314 20.8449 15.0781C20.7427 15.3249 20.5929 15.549 20.4041 15.7378C20.2152 15.9266 19.991 16.0764 19.7443 16.1785L18.0004 16.9009C17.5023 17.1068 17.1065 17.5021 16.8998 17.9998L16.1769 19.745C15.9706 20.2431 15.575 20.6388 15.0769 20.8451C14.5789 21.0514 14.0193 21.0514 13.5212 20.8451L11.7773 20.1227C11.2792 19.9169 10.7198 19.9173 10.2221 20.1239L8.47689 20.8458C7.97912 21.0516 7.42001 21.0514 6.92237 20.8453C6.42473 20.6391 6.02925 20.2439 5.82281 19.7464L5.09972 18.0006C4.8938 17.5026 4.49854 17.1067 4.00085 16.9L2.25566 16.1771C1.75783 15.9709 1.36226 15.5754 1.15588 15.0777C0.949508 14.5799 0.949228 14.0205 1.1551 13.5225L1.87746 11.7786C2.08325 11.2805 2.08283 10.7211 1.8763 10.2233L1.15497 8.47678C1.0527 8.2301 1.00004 7.96568 1 7.69863C0.999957 7.43159 1.05253 7.16715 1.15472 6.92043C1.25691 6.67372 1.40671 6.44955 1.59557 6.26075C1.78442 6.07195 2.00862 5.92222 2.25537 5.8201L3.9993 5.09772C4.49687 4.89197 4.89248 4.4972 5.0993 4.00006L5.82218 2.25481C6.02848 1.75674 6.42418 1.36103 6.92222 1.15473C7.42027 0.948424 7.97987 0.948424 8.47792 1.15473L10.2218 1.87712C10.7199 2.08291 11.2793 2.08249 11.7771 1.87595L13.523 1.15585C14.021 0.94966 14.5804 0.949702 15.0784 1.15597C15.5763 1.36223 15.972 1.75783 16.1783 2.25576L16.9014 4.00153L16.9012 3.99851Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="text" data-dropdown="adminMenu">
        Проверить проекты
      </div>
    </div>

    <div class="sep" v-if="userStore.role === 'admin'"></div>

    <div class="header-admin-menu-item" v-if="userStore.role === 'admin'" data-dropdown="adminMenu" @click="emits('addBanner'); emits('closeMenu')">
      <div class="icon" data-dropdown="adminMenu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6V14M6 10H14M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="text" data-dropdown="adminMenu">
        Добавить баннер
      </div>
    </div>

    <div class="sep" v-if="userStore.role === 'admin'"></div>

    <div class="header-admin-menu-item" data-dropdown="adminMenu" @click="emits('signOut'); emits('closeMenu')">
      <div class="icon" data-dropdown="adminMenu">
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 6L21 10M21 10L17 14M21 10H8M14 2.20404C12.7252 1.43827 11.2452 1 9.66667 1C4.8802 1 1 5.02944 1 10C1 14.9706 4.8802 19 9.66667 19C11.2452 19 12.7252 18.5617 14 17.796" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="text" data-dropdown="adminMenu">
        Выйти
      </div>
    </div>


  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {userStore} from "@/Stores/userStore.js";

const router = useRouter(),
    emits = defineEmits(['closeMenu', 'addBanner', 'signOut'])

const makeRoute = (path) => {
  router.push({path: path})
  emits('closeMenu')
}

</script>

<style scoped lang="scss">
.header-admin-menu {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  max-width: 240px;

  .sep {
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 1px;
    background-color: #ececec;
    width: 100%;
  }

  .header-admin-menu-item {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
    height: 30px;
    transition: .3s ease;
    cursor: pointer;

    .icon {
      width: 30px;
      svg {
        path {
          transition: .3s ease;
          stroke-width: 2px;
          stroke: #7c7c7c;
        }
      }
    }
    .text {
      color: #7c7c7c;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    &:hover {
      .icon {
        svg {
          path {
            stroke: #5D599F;
          }
        }
      }
      .text {
        color: #5D599F;
      }
    }
  }
}
</style>