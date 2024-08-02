<template>
  <div class="dropdown"
       :class="{show: $props.dropdown.show === true}"
       data-dropdown="dropdown">

    <router-link class="dropdown_link"
                 v-for="link of menu"
                 :to="link.path"
                 data-dropdown="dropdown"
                 @mouseup="closeDropdown"
                 v-if="isAdmin"
    >
      <object :data="link.icon"
              type="image/svg+xml"></object>
      <span data-dropdown="dropdown">
        {{ link.name }}
      </span>
    </router-link>

    <a class="dropdown_link sign-out"
       @click="this.$emit('signOut', true)"
       data-dropdown="dropdown">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
        <path d="M11.4 4.33333L14 7M14 7L11.4 9.66667M14 7H5.55M9.45 1.80269C8.62141 1.29218 7.65941 1 6.63333 1C3.52213 1 1 3.68629 1 7C1 10.3137 3.52213 13 6.63333 13C7.65941 13 8.62141 12.7078 9.45 12.1973" stroke="#841717" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span data-dropdown="dropdown">
        Выйти
      </span>

    </a>


  </div>


</template>

<script>
import {adminMenu} from "../../Store/adminMenu.js";
import popupAction from "../../components/Popups/PopupAction.vue";
import {userInfo} from "../../Store/userInfo.js";

export default {
  name: "DropdownMenu.vue",
  emits: ['isOpen', 'signOut'],
  props: {
    dropdown: {
      show: false
    }
  },

  data() {
    return {
      menu: {},
      isAdmin: false,

    }
  },

  components: {popupAction},

  methods: {
    changeAdminProperty(role) {
      this.isAdmin = userInfo.role === "admin";
    },
    getMenuItems() {
      this.isAdmin = userInfo.role === "admin";

      this.loading = true
      try {
        this.menu = adminMenu
        this.loading = false
      } catch (e) {
        this.menu = {}
      }
    },

    closeDropdown() {
      this.$emit('isOpen', false)

    },
    closeByEsc (event) {
      if (event.key === 'Escape') {
        this.closeDropdown()
      }

    },
    closeByOutsideClick (event) {

      if (event.target.dataset.dropdown !== 'dropdown') {
        this.closeDropdown()
      }
    }
  },

  mounted() {
    this.getMenuItems()
    document.addEventListener('keydown', e => this.closeByEsc(e))
    document.addEventListener('mousedown', e => this.closeByOutsideClick(e))

    this.isAdmin = userInfo.role === "admin";
  },
  beforeUnmount() {
    document.removeEventListener('keydown',e => this.closeByEsc(e))
    document.removeEventListener('mousedown', e => this.closeByOutsideClick(e))
  },
  updated() {
    this.isAdmin = userInfo.role === "admin";
  }

}
</script>

<style scoped lang="scss">

.dropdown {
  position: absolute;
  padding: 15px;
  right: 0;
  top: 45px;
  z-index: 15;
  border-radius: 10px;
  border: 1px solid var(--lightgray, #F2F5F7);
  background: #FFF;
  max-width: 180px;
  max-height: 200px;
  text-align: start;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: start;

  visibility: hidden;
  transition: .15s ease;
  opacity: 0;

  &.show {
    visibility: visible;
    opacity: 1;
  }

  .dropdown_link {
    width: 100%;
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    transition: .3s;


    span {
      transition: .3s;
      width: 100%;
    }
    object {
      width: 15px;
      height: 15px;
    }

    &:hover {
      span {
        transform: translatex(5px);
      }

    }

    &.sign-out {
      color: #841717;
      font-family: "PT Sans Caption";
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &:hover {
        span {
          transform: translatex(5px);
        }

      }
    }
  }



}
</style>