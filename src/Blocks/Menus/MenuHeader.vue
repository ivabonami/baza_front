<template>
  <div class="nav">
    <div class="hamburger" @click="showMenu" data-dropdown="dropdownMenu" :class="{active: !hideMenu}">
      <span data-dropdown="dropdownMenu"></span>
      <span data-dropdown="dropdownMenu"></span>
      <span data-dropdown="dropdownMenu"></span>
    </div>
    <div class="links" data-dropdown="dropdownMenu" v-if="!hideMenu">
      <div class="nav_link"
           data-dropdown="dropdownMenu"
           v-for="link of staticPages"
      >
        <router-link active-class="active"
                     @click="closeDropdown"
                     :to="link.path"
                     data-dropdown="dropdownMenu"
                     class="link">{{ link.name }}</router-link>
      </div>
    </div>



  </div>
</template>

<script>
import {staticPages} from "../../Store/staticPages.js";
import { useWindowSize } from '@vueuse/core'

export default {
  name: "MenuHeader.vue",
  data() {
    return {
      staticPages,
      hideMenu: false,
      style: 'display: none',

    }


  },

  components: {},

  methods: {
    closeByOutsideClick (event) {

      if (event.target.dataset.dropdown !== 'dropdownMenu') {
        this.closeDropdown()
      }
    },
    closeByEsc (event) {
      if (event.key === 'Escape') {
        this.closeDropdown()
      }

    },
    closeDropdown() {
      this.hideMenu = true
    },
    showMenu() {
      this.hideMenu = !this.hideMenu
    },
    myEventHandler(e) {
      e.target.innerWidth < 960 ? this.hideMenu = true : this.hideMenu = false
    }
  },

  mounted() {

    window.addEventListener('keydown', e => this.closeByEsc(e))
    window.addEventListener('mousedown', e => this.closeByOutsideClick(e))
    window.addEventListener("resize", this.myEventHandler);

    if (useWindowSize().width.value < 960) {

      this.hideMenu = true
    } else {
      this.hideMenu = false
    }


  },
  beforeUnmount() {
    window.removeEventListener('keydown', e => this.closeByEsc(e))
    window.removeEventListener('mousedown', e => this.closeByOutsideClick(e))

    window.removeEventListener("resize", this.myEventHandler);
  }

}
</script>

<style scoped lang="scss">
.hamburger {
  width: 20px;
  padding: 5px;
  display: none;
  flex-wrap: wrap;
  gap: 3px;
  cursor: pointer;

  span {
    transition: .3s ease;
    display: block;
    width: 15px;
    height: 2px;
    background-color: black;
    border-radius: 10px;
  }

  span:nth-child(2) {
    padding-right: 5px;
  }

  &:hover {
    span {
      background-color: #ffcc00;
    }
    span:nth-child(2) {
      padding-right: 0;
    }
  }

  &.active {
    padding-left: 0;
    span {
      position: relative;

    }
    span:nth-child(1) {
      rotate: 45deg;
      top: 2px;
      left: 2px;
    }
    span:nth-child(3) {
      rotate: -45deg;
      top: -2px;
      right: -2px;
    }
    span:nth-child(2) {
      display: none;
    }
  }
}
.nav {
  display: flex;
  align-items: center;
  justify-content: center;

  .links {
    display: flex;

    align-items: center;
    gap: 10px;
  }

  a {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-bottom: 1px solid transparent;

    object {
      width: 15px;
      height: 15px;

    }

    &:hover {
      border-bottom-color: rgba(0,0,0,.3);
    }

    &.active {
      border-bottom-color: #000;
    }
  }
}
@media screen and (max-width: 960px){
  .hamburger {
    display: flex;
  }
  .nav {
    position: relative;
    z-index: 3;
    order: 3;

    .links {
      position: absolute;
      right: 0;
      top: 20px;
      background-color: #FFFFFF;
      padding: 20px;
      flex-wrap: wrap;
      border-radius: 10px;

    }
    .link {
      width: 100%;
    }
  }
}
</style>