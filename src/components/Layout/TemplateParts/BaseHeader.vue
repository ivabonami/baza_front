<template>
  <div class="header">
    <div class="logo">
      <router-link to="/" >
        <img :src="logotype" alt="">
      </router-link>
    </div>
    <div class="search">
      SEARCH
    </div>
    <div class="menu">
      <menu-header />
    </div>
    <div class="auth" v-if="!userStore.username">
      <button-black
          @buttonPressed="callModal({
            show: !popup.show,
            component: 'SignUp',
          })"
      >
        <template #default>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M14.549 13.2626C14.1189 13.0745 12.9276 12.7546 12.7844 12.213C12.5598 11.3563 13.4132 10.7038 13.7929 10.0293C14.1924 9.31825 14.5259 8.35597 14.5908 7.55165C14.8247 4.66481 13.0546 2.97565 10.5167 3.26803C8.67174 3.48033 7.56976 4.85577 7.45052 6.62721C7.32952 8.43231 7.9992 9.76529 8.71046 10.743C9.02176 11.1704 9.34846 11.4454 9.29874 11.9607C9.24022 12.5701 8.5888 12.7397 8.12284 12.9267C7.57042 13.1489 6.97598 13.4855 6.69504 13.641C5.78292 14.1448 4.7872 14.7456 4.47656 15.5508C5.91712 17.6089 8.30324 18.9586 11.0004 18.9586C13.7064 18.9586 16.1 17.6004 17.5384 15.5306C17.1072 14.4306 15.6191 13.7328 14.549 13.2626Z" fill="#F8F7FC"/>
            <path d="M10.9996 1.09961C5.54097 1.09961 1.09961 5.54075 1.09961 10.9996C1.09961 16.4585 5.54097 20.8996 10.9996 20.8996C16.4587 20.8996 20.8996 16.4582 20.8996 10.9996C20.8996 5.54075 16.4587 1.09961 10.9996 1.09961ZM10.9996 19.7349C6.17545 19.7349 2.26429 15.8242 2.26429 10.9996C2.26429 6.17501 6.17545 2.26407 10.9996 2.26407C15.8242 2.26407 19.7349 6.17479 19.7349 10.9996C19.7349 15.8242 15.8242 19.7349 10.9996 19.7349Z" fill="#F8F7FC"/>
          </svg>
          Авторизоваться

        </template>
      </button-black>
    </div>

    <div class="user-menu"
         v-else>
      <span @click="dropdown.show = !dropdown.show" data-dropdown="dropdown">
        {{ userStore.username }}
      </span>

      <dropdownBox v-if="dropdown.show === true"
                   :selector="'dropdown'"
                   @closeDropdown="dropdown.show = false"
      >
        <AdminMenu :admin-menu="adminMenu"/>
      </dropdownBox>

      <div class="sign-out" @click.prevent
           @click="addNotice({name: 'Никто не может выйти из аккаунта', type: 'warning'})"
      >
        <span title="Выйти из аккаунта">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M19.5608 13.5391L17.1758 15.9249L15.9975 14.7466L17.4108 13.3332H11.6675V11.6666H17.4642L15.9975 10.1991L17.1758 9.02074L19.5608 11.4057C20.1492 11.9941 20.1492 12.9507 19.5608 13.5391ZM11.6667 14.9999H13.3333V19.9991H0V3.49907C0 2.3124 0.845 1.28157 2.00917 1.04824L7.01 0.0474046C7.74833 -0.0975954 8.50417 0.0899046 9.08583 0.565738C9.4425 0.858238 9.6925 1.2424 9.8425 1.6649H10.8342C12.2125 1.6649 13.3342 2.78657 13.3342 4.1649V9.99907H11.6675V4.1649C11.6675 3.7049 11.2933 3.33157 10.8342 3.33157H10.0008V18.3316H11.6675V14.9991L11.6667 14.9999ZM7.50083 10.4157C7.50083 9.7249 6.94083 9.1649 6.25 9.1649C5.55917 9.1649 4.99917 9.7249 4.99917 10.4157C4.99917 11.1066 5.55917 11.6666 6.25 11.6666C6.94083 11.6666 7.50083 11.1066 7.50083 10.4157Z" fill="#B3B4C9"/>
          </svg>
        </span>


      </div>
    </div>
  </div>
</template>

<script>
import logotype from '@/assets/logo-black.svg'
import buttonBlack from "@/components/Buttons/ButtonBlack.vue";
import {popup} from "@/js/controllers/popupController.js";
import menuHeader from "@/components/Menus/MenuHeader.vue";
import {userStore} from "@/Stores/userStore.js";
import dropdownBox from "@/components/ReUsable/DropdownBox.vue";
import {addNotice} from "@/js/notifications.js";
import {adminMenu} from "@/Stores/adminMenu.js";
import AdminMenu from "@/components/Menus/AdminMenu.vue";

export default {
  name: "BaseHeader.vue",
  components: {
    AdminMenu,
    buttonBlack,
    menuHeader,
    dropdownBox
  },
  data() {
    return {
      logotype,
      popup,
      userStore,
      addNotice,
      adminMenu,
      dropdown: {
        show: false
      }
    }
  },
  methods: {
    callModal(settings) {
      for (const option in settings) {
        popup[option] = settings[option]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 44.5px;
  background: #FFF;
  margin-bottom: 25px;
  padding: 10px 20px;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  box-sizing: border-box;
  .logo {
    flex-basis: 130px;
    svg {
      width: 100%;
    }
  }
  .search {
    flex-basis: 250px;
  }
  .menu {

  }
  .auth {
    flex-basis: 250px;
  }
}

.user-menu {
  display: flex;
  position: relative;

}
</style>