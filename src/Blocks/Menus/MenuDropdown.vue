<template>
  <div class="dropdown"
       :class="{show: $props.dropdown.show === true}"
       data-dropdown="dropdown">

    <router-link class="dropdown_link"
                 v-for="link of menu"
                 :to="link.path"
                 data-dropdown="dropdown"
                 @mouseup="closeDropdown"
    >
      <object :data="link.icon"
              type="image/svg+xml"></object>
      <span data-dropdown="dropdown">
        {{ link.name }}
      </span>
    </router-link>

    <a class="dropdown_link sign-out"
       @click="modal.show = true"
       data-dropdown="dropdown">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
        <path d="M11.4 4.33333L14 7M14 7L11.4 9.66667M14 7H5.55M9.45 1.80269C8.62141 1.29218 7.65941 1 6.63333 1C3.52213 1 1 3.68629 1 7C1 10.3137 3.52213 13 6.63333 13C7.65941 13 8.62141 12.7078 9.45 12.1973" stroke="#841717" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span data-dropdown="dropdown">
        Выйти
      </span>

    </a>

  </div>
  <popup-action
      v-show="modal.show === true"
      @closeModal="modal.show = false"
      :modal="modal"
  >
    <template #header>
      Выйти?
    </template>
    <template #text>
      Вы собиратесь выйти из аккаунта, подтвердите действие.
    </template>
    <template #buttonConfirm>
      Выйти
    </template>
    <template #buttonSecondary>
      Отменить
    </template>
  </popup-action>

</template>

<script>
import {adminMenu} from "../../Store/adminMenu.js";
import {ref} from "vue";
import popupAction from "../../components/Popups/PopupAction.vue";

export default {
  name: "DropdownMenu.vue",
  props: {
    dropdown: {
      show: ref(true)
    }
  },

  data() {
    return {
      menu: {},
      modal: {
        show: ref(false)
      }
    }
  },

  components: {popupAction},

  methods: {
    getMenuItems() {
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
  },
  beforeUnmount() {
    document.removeEventListener('keydown',e => this.closeByEsc(e))
    document.removeEventListener('mousedown', e => this.closeByOutsideClick(e))
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
  width: 250px;
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
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 16px;
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
      font-size: 16px;
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