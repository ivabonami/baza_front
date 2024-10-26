<template>
  <nav class="items" :class="{collapsed: userMenu.collapsed, show: userMenu.show}" ref="userMenuBox">
    <button-black
        :type="'button'"
        v-if="userMenu.collapsed"
        @click="toggleDropdown()"
        :style="'filled'">
      <div class="button-text">
        M
      </div>
    </button-black>
    <ul>
      <li v-for="item of menuItems">
        <a
           target="_blank"
           v-if="item.type === 'external'"
           :href="item.href"
           :class="item.color">
          <inline-svg class="menuIcon" v-if="item.icon" :src="item.icon" />
          <span>{{ item.name }}</span>
        </a>
        <router-link
                     v-else-if="item.type === 'internal'"
                     :to="item.href"
                     :class="item.color">
          <inline-svg class="menuIcon" v-if="item.icon" :src="item.icon" />
          <span>{{ item.name }}</span>
        </router-link>


      </li>
    </ul>
  </nav>
</template>

<script setup>
import {menuItems} from "@/Stores/menuItems.js";
import {reactive, ref} from "vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";

const userMenu = reactive({
  collapsed: false,
  show: false
})

const userMenuBox = ref(null)

const hideMenuIOnResize = (e) => {
  userMenu.collapsed = e.target.innerWidth < 1165;
}
userMenu.collapsed = window.innerWidth < 1165;


const toggleDropdown = () => {
  if (!userMenu.show) {
    userMenu.show = true
    addEventListener('mousedown', closeByClickOutside)
    addEventListener('keydown', closeByEsc)
  } else {
    closeDropdown()
  }
}

const closeDropdown = () => {
  removeEventListener('mousedown', closeByClickOutside)
  removeEventListener('keydown', closeByEsc)
  userMenu.show = false
  console.log(userMenu.show)
}

const closeByClickOutside = (e) => {
  if (userMenuBox.value && !userMenuBox.value.contains(e.target)) {
    closeDropdown()
  }
}

const closeByEsc = (e) => {
  if (e.key === 'Escape') {
    closeDropdown()
  }
}

window.addEventListener('resize', hideMenuIOnResize)

</script>

<style scoped lang="scss">

.items {
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  position: relative;

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
  button {
    display: none;
  }

  &.collapsed {
    padding: 0;
    button {
      display: block;
    }

    ul {
      display: none;
    }

    &.show {

      ul {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        right: 0;
        top: 40px;
        padding: 10px 20px;
        border-radius: 20px;
        background-color: #FFFFFF;
        z-index: 20;
        width: 240px;
        box-sizing: border-box;
        box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
        gap: 5px;

        li {
          width: 100%;
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