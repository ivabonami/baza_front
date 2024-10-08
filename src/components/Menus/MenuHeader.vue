<template>
  <nav class="items">
    <ul>
      <li v-for="item of menuItems">
        <router-link :to="item.href" :class="item.color">
          <inline-svg class="menuIcon" v-if="item.icon" :src="item.icon" />
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {menuItems} from "@/Stores/menuItems.js";

export default {
  name: "MenuHeader.vue",
  data() {
    return {
      menuItems
    }
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">

.items {
  padding: 0 30px;
  box-sizing: border-box;
  ul {
    list-style: none;
    padding-left: 0;
    display: flex;
    gap: 20px;

    li {
      a {
        color: #B3B4C9;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        gap: 5px;
        align-items: center;

        svg {
          width: 16px;
          height: 16px;


          path {
            stroke: #6B6B6B;
          }
        }
      }
    }
  }
}

</style>