<template>
  <div class="banners-wrapper wrapper">
    <the-loader style="min-height: 200px;" v-if="loading.loaded" />

    <div class="banners" v-else>
      <div class="large" v-if="adsBanners.large">
        <template v-for="banner of adsBanners.large" :key="banner.link">
          <a :href="banner.link" target="_blank">
            <img :src="api.url + banner.path" alt="">
            <div class="banner-menu" v-if="userStore.role === 'admin'" @click.prevent>
              <svg @click="onEditBanner(banner, 'large')" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.99998H5.8C4.11984 3.99998 3.27976 3.99998 2.63803 4.32696C2.07354 4.61458 1.6146 5.07353 1.32698 5.63801C1 6.27975 1 7.11983 1 8.79998V17.2C1 18.8801 1 19.7202 1.32698 20.362C1.6146 20.9264 2.07354 21.3854 2.63803 21.673C3.27976 22 4.11984 22 5.8 22H14.2C15.8802 22 16.7202 22 17.362 21.673C17.9265 21.3854 18.3854 20.9264 18.673 20.362C19 19.7202 19 18.8801 19 17.2V13M6.99997 16H8.67452C9.1637 16 9.40829 16 9.63846 15.9447C9.84254 15.8957 10.0376 15.8149 10.2166 15.7053C10.4184 15.5816 10.5914 15.4086 10.9373 15.0627L20.5 5.49998C21.3284 4.67156 21.3284 3.32841 20.5 2.49998C19.6716 1.67156 18.3284 1.67155 17.5 2.49998L7.93723 12.0627C7.59133 12.4086 7.41838 12.5816 7.29469 12.7834C7.18504 12.9624 7.10423 13.1574 7.05523 13.3615C6.99997 13.5917 6.99997 13.8363 6.99997 14.3255V16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg @click="onDeleteBanner(banner, 'large')" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
          </a>

        </template>

      </div>
      <div class="small" v-if="adsBanners.small">
        <template v-for="banner of adsBanners.small" :key="banner.link">
          <a :href="banner.link">
            <img :src="api.url + banner.path" alt="">

            <div class="banner-menu" v-if="userStore.role === 'admin'" @click.prevent>
              <svg @click="onEditBanner(banner, 'small')" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.99998H5.8C4.11984 3.99998 3.27976 3.99998 2.63803 4.32696C2.07354 4.61458 1.6146 5.07353 1.32698 5.63801C1 6.27975 1 7.11983 1 8.79998V17.2C1 18.8801 1 19.7202 1.32698 20.362C1.6146 20.9264 2.07354 21.3854 2.63803 21.673C3.27976 22 4.11984 22 5.8 22H14.2C15.8802 22 16.7202 22 17.362 21.673C17.9265 21.3854 18.3854 20.9264 18.673 20.362C19 19.7202 19 18.8801 19 17.2V13M6.99997 16H8.67452C9.1637 16 9.40829 16 9.63846 15.9447C9.84254 15.8957 10.0376 15.8149 10.2166 15.7053C10.4184 15.5816 10.5914 15.4086 10.9373 15.0627L20.5 5.49998C21.3284 4.67156 21.3284 3.32841 20.5 2.49998C19.6716 1.67156 18.3284 1.67155 17.5 2.49998L7.93723 12.0627C7.59133 12.4086 7.41838 12.5816 7.29469 12.7834C7.18504 12.9624 7.10423 13.1574 7.05523 13.3615C6.99997 13.5917 6.99997 13.8363 6.99997 14.3255V16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg @click="onDeleteBanner(banner, 'small')" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
          </a>
        </template>
      </div>
    </div>

    <Teleport to="body" v-if="popup.isVisible">
      <the-baza-popup
          :headline="component.headline"
          @closePopup="popup.isVisible = false"
      >
        <component :is="component.state" :banner-data="component.bannerData" @closePopup="popup.isVisible = false" />
      </the-baza-popup>
    </Teleport>
  </div>
</template>

<script setup>
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";
import {getAdsBanners} from "@/API/adsBanners.js";
import {onMounted, reactive, shallowRef} from "vue";
import {adsBanners} from "@/Stores/adsBannersStore.js";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import {api} from "@/API/apiurl.js";
import EditBanner from "@/components/popups/AdsBanners/EditBanner.vue";
import DeleteBanner from "@/components/popups/AdsBanners/DeleteBanner.vue";
import {userStore} from "@/Stores/userStore.js";


let loading = reactive({
  loaded: false
})

const component = reactive({
  state: null,
  bannerData: null,
  headline: 'Выполните действие'
})

const popup = reactive({
  isVisible: false
})

const onEditBanner = (data, size) => {
  popup.isVisible = true
  component.state = shallowRef(EditBanner)
  component.bannerData = data
  component.bannerData.type = size

}

const onDeleteBanner = (data, size) => {
  popup.isVisible = true
  component.state = shallowRef(DeleteBanner)
  component.bannerData = data
  component.bannerData.type = size
  component.headline = "Удалить баннер?"
}

onMounted(() => {
  getAdsBanners().then(() => loading.loaded = false)
})
</script>

<style scoped lang="scss">

.banners-wrapper {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  .banners {


    .large, .small {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;

      a {
        display: flex;
        height: 160px;
        width: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 10px;

        img {
          height: inherit;
        }

        .banner-menu {
          position: absolute;
          right: 5px;
          top: 5px;
          display: flex;
          gap: 10px;
          background-color: #fff;
          padding: 5px 10px;
          border-radius: 10px;

          svg {
            width: 15px;
            height: 15px;
            path {
              transition: .3s ease;
            }

            &:hover {

              path {
                stroke:  #5D599F;
              }
            }
          }
        }
      }
    }

    .small {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;

      a {
        width: 33%;
        overflow: hidden;
        display: flex;
        align-items: center;

        img {
          height: fit-content;
          min-width: 100%;
        }
      }

    }
  }


}

@media screen and (max-width: 500px){
.banners-wrapper {
  .banners {
    .large {
      a {
        width: 100%;
        height: auto;

        img {
          width: 100%;
        }
      }
    }
    .small {
      flex-direction: column;
      a {
        width: 100%;
        height: auto;
        max-height: 50px;

        img {
          width: 100%;
        }
      }
    }
  }
}
}

</style>