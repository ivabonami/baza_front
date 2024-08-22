<script>
import FooterView from "./Layouts/BaseFooter.vue";
import recommended from "./Blocks/ProductsCarousel.vue";
import addCategory from "./Blocks/Controllers/CategoryController.vue";
import bazaHeader from "./Layouts/BaseHeader.vue";
import {modalSetting} from "./assets/js/modal.js";
import {watch, ref} from "vue";
import baseFooter from "./Layouts/BaseFooter.vue";
import yandexMetrica from "./Layouts/YandexMetrica.vue";
import bitMabiaBanner from './assets/payedBanners/BitMafia x MixMafiaCROP.webm'
export default {
  components: { FooterView, recommended, addCategory, bazaHeader, baseFooter, yandexMetrica},
  emits: ['mobileClick'],
  data() {
    return {
      showMobileMenu: false,
      showLeftMenu: false,
      showRightMenu: false,
      bitMabiaBanner,
      isLoaded: false,
      isAdmin: false,
      showScrollTopButton: false,
      clearCategory: false,
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'});
    },
    onClickOutside (event) {
      if (event.target.classList[0] !== 'mobileMenu') {
        this.showRightMenu = false
        this.showLeftMenu = false
      }

    },
    handleScroll() {
      window.scrollY > 200 ? this.showScrollTopButton = true : this.showScrollTopButton = false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.historyCount = window.history.length
    this.isLoaded = true
    window.innerWidth >= 768 ? this.showMobileMenu = true : this.showMobileMenu = false


    document.querySelector('.preloader') ? document.querySelector('.preloader').style.display = 'none' : null
  },

  updated() {
    this.historyCount = window.history.length

  },

}

</script>

<template>
  <div class="global-wrapper" v-if="this.isLoaded === true" ref="wrapper">
    <yandexMetrica />
    <header class="header wrapper">
      <baza-header />
    </header>



    <section class="main wrapper">
        <div class="content">
          <button
              v-if="historyCount > 1 && this.$route.path !== '/'"
              v-on:click="this.$router.go(-1)"
              class="back">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.52 137.91"><path d="M26.75,68.29c14.02,13.92,26.77,26.57,39.5,39.23,3.54,3.52,7.15,6.98,10.53,10.65,4.87,5.29,4.82,11.95,.1,16.49-4.67,4.49-11.53,4.36-16.53-.62C41.46,115.25,22.61,96.41,3.83,77.51c-4.97-5-5.17-11.48-.22-16.49C22.7,41.7,41.91,22.5,61.2,3.38c4.71-4.67,11.74-4.38,16.15,.11,4.28,4.36,4.32,11.35-.42,16.15-14.74,14.95-29.61,29.77-44.5,44.57-1.41,1.4-3.26,2.36-5.69,4.08Z"/></svg>
            Назад
          </button>
          <a class="payed-banner" href="https://Bitmafia.io" target="_blank">
            <video autoplay loop muted>
              <source :src="bitMabiaBanner" type="video/mp4">
            </video>
<!--            <img :src="bitMabiaBanner" alt="BIT MAFIA">-->
          </a>
          <div class="recommend">
            <recommended
                v-if="this.$route.name === 'New projects view' || this.$route.name === 'Home' || this.$route.name === 'Favorite'" >
            </recommended>
          </div>


          <router-view v-slot="{ Component, route }">
            <transition name="list" mode="out-in">
              <component :is="Component" :key="route"></component>

            </transition>
          </router-view>




      </div>
    </section>
    <div class="scroll-to-top-wrapper">
      <div class="scroll-to-top" v-if="showScrollTopButton === true" ref="scrollToTop" @click="scrollToTop()">
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 7L7 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>
    </div>

    <base-footer />
  </div>





</template>

<style scoped lang="scss">

header {
  padding: 10px 15px;
}
.scroll-to-top-wrapper {
  max-width: 1250px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  height: 0;
  right: 0;
  left: 0;
  z-index: 30;
  position: fixed;
  bottom: 80px;
  display: flex;
  justify-content: end;
}
.payed-banner {
  width: 100%;
  margin-bottom: 14px;
  position: relative;
  display: block;
  overflow: hidden;

  video {
    border-radius: 20px;
    width: 100%;
  }

}
.scroll-to-top {
  box-sizing: border-box;
  transition: .3s ease;
  border: 1px solid black;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;



  svg {
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    width: 15px;
    height: 15px;
    position: relative;
    left: 3px;
    top: 2px;

    path {
      stroke: black;
      background-color: #FFC700;
      border-radius: 20px;
    }
  }

}
@media screen and (max-width: 500px){
  header {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>