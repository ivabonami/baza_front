<script>
import SidebarMenu from "./components/TemplateParts/Menus/SidebarMenu.vue";
import TopMenu from "./components/TemplateParts/Menus/TopMenu.vue";
import FooterView from "./components/TemplateParts/PageParts/Footer.vue";
import recommended from "./components/TemplateParts/PageParts/FreshAndRecommendedProduct.vue";
import addCategory from "./components/Controllers/CategoryControllers/CategoryController.vue";


import modal from "./components/TemplateParts/PageParts/Modal.vue";
import {userInfo, refreshToken} from "./assets/js/userService.js";
import vClickOutside from "click-outside-vue3";
import bazaHeader from "./components/TemplateParts/PageParts/BazaHeader.vue";
import {modalSetting} from "./assets/js/modal.js";
import {watch} from "vue";

export default {
  components: { FooterView, SidebarMenu, modal, TopMenu, recommended, addCategory, vClickOutside, bazaHeader},
  emits: ['mobileClick'],
  data() {
    return {
      showMobileMenu: false,
      showLeftMenu: false,
      showRightMenu: false,

      isLoaded: false,
      isAdmin: false,
      showScrollTopButton: false,

      historyCount: 0,
      userInfo,
      refreshToken,
      modalSetting
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  setup() {
    watch(modalSetting, (value, oldValue) => {
    }, { immediate: true })
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
    this.historyCount = window.history.length
    window.addEventListener('scroll', this.handleScroll);
    document.querySelector('.preloader').style.display = 'none'
    this.isLoaded = true

    window.innerWidth >= 768 ? this.showMobileMenu = true : this.showMobileMenu = false

  },

  updated() {
    this.historyCount = window.history.length
    if (userInfo.expired - 3000 < Math.floor(Date.now() / 1000) || localStorage.getItem('role' !== '')) {
      refreshToken()
    } else {

    }


  },

}
</script>

<template>
  <div class="global-wrapper" v-if="this.isLoaded === true" ref="wrapper">

    <header class="header wrapper">
      <baza-header></baza-header>
    </header>



    <section class="main wrapper">
        <div class="content">
          <button
              v-if="historyCount > 1 || this.$route.path !== '/'"
              v-on:click="this.$router.go(-1)"
              class="back">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.52 137.91"><path d="M26.75,68.29c14.02,13.92,26.77,26.57,39.5,39.23,3.54,3.52,7.15,6.98,10.53,10.65,4.87,5.29,4.82,11.95,.1,16.49-4.67,4.49-11.53,4.36-16.53-.62C41.46,115.25,22.61,96.41,3.83,77.51c-4.97-5-5.17-11.48-.22-16.49C22.7,41.7,41.91,22.5,61.2,3.38c4.71-4.67,11.74-4.38,16.15,.11,4.28,4.36,4.32,11.35-.42,16.15-14.74,14.95-29.61,29.77-44.5,44.57-1.41,1.4-3.26,2.36-5.69,4.08Z"/></svg>
            Назад
          </button>
          <div class="recommend wrapper">
            <recommended
                v-if="this.$route.name === 'New projects view' || this.$route.name === 'Home' || this.$route.name === 'Favorite'" >

            </recommended>
          </div>


          <router-view v-slot="{ Component, route }">
            <transition name="list" mode="out-in">
              <div :key="route">
                <component :is="Component"></component>
              </div>

            </transition>
          </router-view>




      </div>
    </section>
    <footer class="footer ">
      <div class="row">
        <footer-view></footer-view>
      </div>
    </footer>
    <div class="scroll-to-top" v-if="showScrollTopButton === true" ref="scrollToTop">
      <svg id="a" xmlns="http://www.w3.org/2000/svg" class="arrow"  v-on:click="scrollToTop()"
           viewBox="0 0 15.96 8.57"><path class="b" d="M.6,8.57c-.15,0-.31-.06-.42-.18-.23-.23-.23-.61,0-.85L7.56,.17c.23-.22,.62-.22,.85,0l7.38,7.38c.23,.23,.23,.61,0,.85-.23,.24-.61,.23-.85,0L7.98,1.44,1.02,8.4c-.12,.12-.27,.18-.42,.18Z"/></svg>

    </div>
  </div>

  <modal v-if="modalSetting.show === true"></modal>

</template>

<style scoped lang="scss">

header {
  padding-top: 15px;
  padding-bottom: 15px;
}
.scroll-to-top {
  z-index: 10;
  padding: 1em;
  max-width: 1440px;
  width: 94%;
  margin: 0 auto 20px;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  right: 0;
  position: sticky;
  top: 20px;
  bottom: 20px;
  transition: .3s ease;

  svg {
    background-color: #0a58ca;
    padding: 10px;
    border-radius: 40px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    path {
      fill: #ffffff;
    }
  }
}
</style>