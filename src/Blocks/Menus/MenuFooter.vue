<template>
  <div class="nav">
    <div class="links">
      <div class="nav_link"
           v-for="link of staticPages"
      >
        <router-link active-class="active"
                     :to="link.path"
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

    }


  },

  components: {},

  methods: {

  },

  mounted() {



  },

}
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;

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

}
</style>