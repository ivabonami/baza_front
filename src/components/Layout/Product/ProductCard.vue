<template>
  <div class="service-card" :class="{highlighted: $props.highlighted}">
    <div class="service-card_image">
      <img :src="api.url + $props.item.avatarFilePath"
           alt="name"
           v-show="imgLoaded && !errorImageLoad"
           @error="() => {
             this.imgLoaded = true
             this.errorImageLoad = true
           }"
           @load="imgLoaded = true">
      <img src="/src/assets/images/error.png"
           v-show="imgLoaded && errorImageLoad"
           alt="sorry"
           @load="imgLoaded = true">
<!--      <loader-small v-if="!imgLoaded" />-->
    </div>
    <div class="service-card_text">
      {{ normalizeText($props.item.name) }}
    </div>

    <div class="admin-menu" v-if="$props.isEditable" @click.prevent>
      <div class="item" @click="() => {
        popup.show = true
        popup.component = 'EditProduct'
        popup.product = $props.item
      }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1.27237 12.5486C1.30565 12.2491 1.32229 12.0994 1.3676 11.9594C1.4078 11.8352 1.4646 11.7171 1.53646 11.6081C1.61745 11.4853 1.72399 11.3787 1.93707 11.1656L11.5027 1.60005C12.3027 0.799984 13.5999 0.799985 14.4 1.60005C15.2 2.40011 15.2 3.69727 14.4 4.49734L4.83436 14.0629C4.62127 14.276 4.51473 14.3826 4.39191 14.4635C4.28295 14.5354 4.16477 14.5922 4.04059 14.6324C3.90062 14.6777 3.75087 14.6943 3.45137 14.7276L1 15L1.27237 12.5486Z" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        редактировать
      </div>
      <div class="item" @click="() => {
        popup.show = true
        popup.component = 'DeleteProduct'
        popup.product = $props.item
      }">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path d="M9.66667 3.8V3.24C9.66667 2.45593 9.66667 2.06389 9.52134 1.76441C9.39351 1.50099 9.18954 1.28681 8.93865 1.15259C8.65344 1 8.28007 1 7.53333 1H6.46667C5.71993 1 5.34656 1 5.06135 1.15259C4.81046 1.28681 4.60649 1.50099 4.47866 1.76441C4.33333 2.06389 4.33333 2.45593 4.33333 3.24V3.8M1 3.8H13M11.6667 3.8V11.64C11.6667 12.8161 11.6667 13.4042 11.4487 13.8534C11.2569 14.2485 10.951 14.5698 10.5746 14.7711C10.1468 15 9.58677 15 8.46667 15H5.53333C4.41323 15 3.85318 15 3.42535 14.7711C3.04903 14.5698 2.74307 14.2485 2.55132 13.8534C2.33333 13.4042 2.33333 12.8161 2.33333 11.64V3.8" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        удалить
      </div>
    </div>

  </div>
</template>

<script>
import { ref, watch } from "vue";
import {api} from "@/API/apiurl.js";
import {productsStore} from "@/Stores/productsStore.js";
import {userStore} from "@/Stores/userStore.js";
import {popup} from "@/js/controllers/popupController.js";

export default {
  name: "ServicesCard.vue",
  props: {
    item: {
      projectId: ref(Number) ,
      UserId: ref(Number),
      avatarFilePath: ref(String),
      createdAt: ref(Date),
      updatedAt: ref(Date),
      description: ref(String),
      id: ref(Number),
      name: ref(String),

    },
    isEditable: false,
    highlighted: ref(Boolean)
  },
  components: {

  },

  data() {
    return {
      popup,
      errorImageLoad: false,
      imgLoaded: false,
      text: null,
      api,
      productsStore
    }
  },
  mounted() {

  },
  watch: {
    item: function(newVal, oldVal) {

    }
  },
  methods: {
    normalizeText(text) {
      if (text) {
        return text
      }
    }
  }
}
</script>

<style scoped lang="scss">
.admin-menu {
  display: flex;
  justify-content: start;
  gap: 20px;
  .item {
    color: #B3B4C9;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: .3s ease;
    display: flex;
    align-items: center;
    gap: 5px;

    svg {
      path {
        transition: .3s ease;
      }
    }

    &:hover {
      color: #191B2A;

      svg {
        path {
          stroke: #191B2A;
        }
      }
    }
  }
}
.service-card {
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  border-radius: 20px;
  background: #FFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  padding: 14px;

  &.highlighted {
    background: #fff7d6;
  }

  .service-card_image {

    aspect-ratio: 1/1;
    border-radius: 10px;
    height: 100%;
    overflow: hidden;
    margin-bottom: 10px;
    background: #fff 50% / cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;



    img {
      height: 100%;
      position: relative;
      scale: 1;
      transition: .15s ease;
    }


  }
  .service-card_text {
    -webkit-line-clamp: 2;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-word;
    color: #191B2A;
    height: 35px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    line-clamp: 3;
  }

  &:hover {
    .service-card_image {
      img {
        scale: 1.05;
      }
    }
  }

}

@media screen and (max-width: 768px){
  .service-card {
    width: 100%;
  }
  .admin-menu {
    gap: 10px;
    margin-top: 10px;
    .item {
      font-size: 8px;
    }
  }
}
</style>