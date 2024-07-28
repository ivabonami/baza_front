<template>
  <div class="icons-menu">
    <div class="icon-menu_link"
         v-for="link of userMenu">
      <router-link
          active-class="active"
          :class="{favorite: link.auth && userInfo.token}"
          v-if="link.auth && userInfo.token"
          :to="link.path">
        <img :src="link.icon" :alt="link.name">
        <span>{{ link.name }}</span>
      </router-link>

      <router-link
          active-class="active"
          v-if="!link.auth"
          :to="link.path">
        <img :src="link.icon" :alt="link.name">
        <span>{{ link.name }}</span>
      </router-link>
    </div>

  </div>
</template>

<script>
import {userMenu} from "../../Store/adminMenu.js";
import {userInfo} from "../../Store/userInfo.js";
import {watch} from "vue";

export default {
  name: "iconsMenu",
  data() {
    return {
      userMenu, userInfo
    }
  },

  components: {},

  methods: {

  },

  setup() {
    watch(userInfo, (value, oldValue) => {
    }, { immediate: true })
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.icons-menu {
  display: none;
  gap: 10px;

  .icon-menu_link {

    a {
      display: flex;
      text-align: center;
      gap: 5px;
      -webkit-transition: .3s ease;
      -moz-transition: .3s ease;
      -ms-transition: .3s ease;
      -o-transition: .3s ease;
      transition: .3s ease;

      span {
        color: #7C7C7C;
        font-size: 12px;
        font-family: "PT Sans Caption";
        position: relative;
        line-height: 2;
      }
      img {
        width: 20px;
        opacity: .6;
        transition: .3s ease;
      }
      &.favorite {
        span {
          color: #984a5a;
        }
      }

      &:hover {
        opacity: .8;
        img {
          opacity: 1;
        }
      }

      &.active {

        img {
          opacity: .9;
        }
      }
    }


  }


}
@media screen and (max-width: 470px){
  .icons-menu .icon-menu_link a span {
    display: none;
  }
}
</style>