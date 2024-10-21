<template>
  <nav data-dropdown="dropdownMenu" class="items" >
    <ul data-dropdown="dropdownMenu">
      <li data-dropdown="dropdownMenu" v-for="item of menuItems" @click="$emit('closeDropdown', true)">
        <a data-dropdown="dropdownMenu"
           target="_blank"
           v-if="item.type === 'external'"
           :href="item.href"
           :class="item.color">
          <inline-svg data-dropdown="dropdownMenu" class="menuIcon" v-if="item.icon" :src="item.icon" />
          <span data-dropdown="dropdownMenu">{{ item.name }}</span>
        </a>
        <router-link data-dropdown="dropdownMenu"
                     v-else-if="item.type === 'internal'"
                     :to="item.href"
                     :class="item.color">
          <inline-svg data-dropdown="dropdownMenu" class="menuIcon" v-if="item.icon" :src="item.icon" />
          <span data-dropdown="dropdownMenu">{{ item.name }}</span>
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
  width: 100%;

  ul {
    list-style: none;
    padding-left: 0;
    display: flex;
    gap: 20px;
    margin-top: 5px;
    align-items: center;
    justify-content: end;
    width: 100%;

    li {
      a {
        color: #191B2A;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        gap: 5px;
        align-items: center;
        transition: .3s ease;
        border-bottom: 2px solid transparent;
        padding-bottom: 5px;

        svg {
          width: 16px;
          height: 16px;


          path {
            stroke: #6B6B6B;
          }
        }

        &.green {
          color: green;
        }

        &.router-link-active {
          border-bottom-color: #FFC700;
        }
      }
    }
  }
}
@media screen and (max-width: 992px) {
  .items {
    max-width: 150px;
    ul {
      flex-wrap: wrap;
      li {
        width: 100%;
      }
    }
  }
}
</style>