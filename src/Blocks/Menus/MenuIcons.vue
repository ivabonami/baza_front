<template>
  <div class="icons-menu">
    <div class="icon-menu_link"
         v-for="link of userMenu">
      <router-link
          active-class="active"
          v-if="link.auth && userInfo.token"
          :to="link.path">
        <img :src="link.icon" :alt="link.name">
      </router-link>

      <router-link
          active-class="active"
          v-if="!link.auth"
          :to="link.path">
        <img :src="link.icon" :alt="link.name">
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
  display: flex;
  gap: 10px;

  .icon-menu_link {

    a {
      img {
        width: 20px;
        height: 20px;
        opacity: .6;
        transition: .3s ease;
      }

      &:hover {
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
</style>