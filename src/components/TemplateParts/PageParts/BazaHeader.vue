<template>
  <div class="row">
    <div class="d-flex justify-between align-center">
      <div class="left">
        <router-link to="/" class="logo">
          <img src="../../../assets/images/logo.png" alt="">
        </router-link>

        <div class="search">
          <input type="search"
                 v-on:keydown.enter="$router.push(`/search?q=${searchQuery}`)"
                 placeholder="Найти проект"
                 v-model="searchQuery">
          <button class="button-search" v-tippy="{content: 'Нажмите что бы искать проекты '}"
                  v-on:click="$router.push(`/search?q=${searchQuery}`)">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          <button class="button-clear" v-tippy="{content: 'Очистить форму'}"
                  v-if="searchQuery.length > 0"
                  v-on:click="searchQuery = ''">
            <span >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>

        </div>
      </div>
      <div class="right">
        <div class="nav">
          <router-link to="/guarantee" class="link">Гарант</router-link>
          <router-link to="/advertisement" class="link">Реклама</router-link>
          <router-link to="/contacts" class="link">Контакты</router-link>
          <button class="baza-button signin"
                  v-if="userInfo.token === null"
                  @click="() => {
              modalSetting.show = true
              modalSetting.type = 'singIn'
            }">

            Войти
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.65304 14.9507C4.1397 13.8042 5.27594 13 6.6 13H11.4C12.7241 13 13.8603 13.8042 14.347 14.9507M12.2 7C12.2 8.76731 10.7673 10.2 9 10.2C7.23269 10.2 5.8 8.76731 5.8 7C5.8 5.23269 7.23269 3.8 9 3.8C10.7673 3.8 12.2 5.23269 12.2 7ZM17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#126DF7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="favorites"
               v-else>
            <svg @click="this.$router.push('/favorite')"
                 :class="{active: this.$route.path === '/favorite'}"
                 class="favorites-icon"
                 width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5455 8.92543C14.9195 8.26103 15.2313 7.66151 15.4236 7.20521C16.3573 4.98947 15.434 2.44077 13.1769 1.40112C10.9199 0.361478 8.65341 1.4395 7.65871 3.52093C5.75657 2.2157 3.21918 2.40739 1.81989 4.44424C0.420593 6.48108 0.859754 9.14203 2.77629 10.594C3.6461 11.253 5.36636 12.2242 6.98596 13.0884M15.2972 10.7499C14.8751 8.482 12.9454 6.82334 10.5156 7.27415C8.08592 7.72497 6.51488 9.91708 6.84335 12.299C7.10725 14.2127 8.56392 18.7027 9.12641 20.394C9.20316 20.6248 9.24154 20.7402 9.31753 20.8206C9.38372 20.8907 9.47174 20.9416 9.56554 20.9638C9.67322 20.9894 9.79235 20.9649 10.0306 20.916C11.7765 20.5575 16.3933 19.574 18.1826 18.8457C20.4096 17.9392 21.5589 15.4841 20.6981 13.153C19.8372 10.8219 17.4723 9.98151 15.2972 10.7499Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <div class="add-project" @click="this.$router.push('/add-project')" v-tippy="{content: 'Доавить свой проект'}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
                <path d="M11 7V15M7 11H15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <button class="baza-button user-menu" @click="dropdownShow = !dropdownShow">
              {{ userInfo.username }}

              <svg v-if="dropdownShow === false" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.65304 14.9507C4.1397 13.8042 5.27594 13 6.6 13H11.4C12.7241 13 13.8603 13.8042 14.347 14.9507M12.2 7C12.2 8.76731 10.7673 10.2 9 10.2C7.23269 10.2 5.8 8.76731 5.8 7C5.8 5.23269 7.23269 3.8 9 3.8C10.7673 3.8 12.2 5.23269 12.2 7ZM17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#126DF7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12" fill="none">
                <path d="M10 1L1 10M1 1L10 10" stroke="#126DF7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>




            </button>

            <div class="dropdown" v-if="dropdownShow === true">

              <button class="baza-button  dropdown-button"
                      v-if="isAdmin === true"
                      @click="() => {
                        this.$router.push('/category-control')
                        this.dropdownShow = false
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                  <path d="M1 6H14M1 1H14M1 11H9.66667" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Менеджер категорий
              </button>

              <button class="baza-button  dropdown-button"
                      v-if="isAdmin === true"
                      @click="() => {
                        this.$router.push('/check-projects')
                        this.dropdownShow = false
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 4.9V10.1M4.9 7.5H10.1M14 7.5C14 11.0899 11.0899 14 7.5 14C3.91015 14 1 11.0899 1 7.5C1 3.91015 3.91015 1 7.5 1C11.0899 1 14 3.91015 14 7.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Проверить проекты
              </button>

              <button class="baza-button  dropdown-button"
                      v-if="isAdmin === true"
                      @click="() => {
                        this.$router.push('/check-testimonials')
                        this.dropdownShow = false
            }">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6.00224C8.1762 5.50136 8.52397 5.07901 8.98173 4.80998C9.43949 4.54095 9.9777 4.4426 10.501 4.53237C11.0243 4.62213 11.499 4.89421 11.8409 5.30041C12.1829 5.70661 12.37 6.22072 12.3692 6.75168C12.3692 8.25056 10.1209 9 10.1209 9M10.1499 12H10.1599M5 16V18.3355C5 18.8684 5 19.1348 5.10923 19.2716C5.20422 19.3906 5.34827 19.4599 5.50054 19.4597C5.67563 19.4595 5.88367 19.2931 6.29976 18.9602L8.68521 17.0518C9.17252 16.662 9.41617 16.4671 9.68749 16.3285C9.9282 16.2055 10.1844 16.1156 10.4492 16.0613C10.7477 16 11.0597 16 11.6837 16H14.2C15.8802 16 16.7202 16 17.362 15.673C17.9265 15.3854 18.3854 14.9265 18.673 14.362C19 13.7202 19 12.8802 19 11.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V12C1 12.93 1 13.395 1.10222 13.7765C1.37962 14.8117 2.18827 15.6204 3.22354 15.8978C3.60504 16 4.07003 16 5 16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Проверить отзывы
              </button>


              <button class="baza-button dropdown-button signout"

                      @click="() => {
              modalSetting.show = true
              modalSetting.headline = 'Вы хотите выйти из аккаунта'
              modalSetting.description = 'Вы действительно хотите выйти из аккаунта? Некоторые функции недоступны без авторизации.'
              modalSetting.type = 'signout'
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M11.4 4.33333L14 7M14 7L11.4 9.66667M14 7H5.55M9.45 1.80269C8.62141 1.29218 7.65941 1 6.63333 1C3.52213 1 1 3.68629 1 7C1 10.3137 3.52213 13 6.63333 13C7.65941 13 8.62141 12.7078 9.45 12.1973" stroke="#841717" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Выйти
              </button>

              <div class="mask" @click="dropdownShow = false"></div>
            </div>


          </div>


        </div>
      </div>



    </div>
  </div>
</template>

<script>
import {refreshToken, userInfo} from "../../../assets/js/userService.js";
import {useFetch} from "../../../assets/js/fetchRequest.js";
import {modalSetting} from "../../../assets/js/modal.js";
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'


export default {
  name: "BazaHeader.vue",
  components: {modalSetting},

  data() {
    return {
      searchQuery: '',
      dropdownShow: false,
      isAdmin:false,
      userInfo, modalSetting, refreshToken
    }
  },
  directives: {
    tippy: directive,
  },

  mounted() {
    userInfo.role === 'admin' ? this.isAdmin = true : this.isAdmin = false

  },
}
</script>

<style scoped lang="scss">
input {
  margin-bottom: 0;
}
.button-search {
  padding-left: 5px;
  padding-right: 5px;
  border: none;
  position: absolute;
  right: 5px;
  cursor: pointer;
  background-color: #fff;
  margin-top: 10px;

  svg {
    width: 20px;
    height: 20px;
    path {
      transition: .3s ease;
    }
  }
  &:hover, &.active {
    svg {
      path {
        stroke: #2B2B2B;
      }
    }
  }
}
.button-clear {
  padding-left: 5px;
  padding-right: 5px;
  border: none;
  margin-top: 10px;
  background-color: #fff;
  position: absolute;
  right: 35px;
  cursor: pointer;

  svg {
    margin-top: 2px;
    width: 15px;
    height: 16px;
    path {
      stroke: #A8A8A8;
      transition: .3s ease;
    }
  }
  &:hover {
    svg {
      path {
        stroke: #2B2B2B;
      }
    }
  }
}
.search {
  position: relative;
}
.left, .right {
  display: flex;
  gap: 20px;
  align-items: center;
}
.left {
  width: 60%;
  justify-content: start;
}
.right {
  width: 40%;
  justify-content: right;
}
.nav {
  display: flex;
  align-items: center;



  a {
    color: #000;

    font-family: "PT Sans Caption", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: .3s ease;
    border-bottom: 1px solid transparent;
    margin-left: 20px;

    &:hover {
      border-bottom-color: black;
    }
  }

  button {
    margin-left: 10px;
  }

  .favorites {
    display: flex;
    margin-left: 40px;
    align-items: center;
    gap: 10px;
    position: relative;
    .favorites-icon, .add-project svg {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }

    .user-menu {
      color: #126DF7;

      font-family: "PT Sans Caption";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover {
        color: #0a58ca;
        transform: translateY(0);

        svg {

          path {
            stroke: #0a58ca;
          }
        }
      }
    }

    .dropdown {
      position: absolute;
      border: 1px solid var(--lightgray, #e7e7e7);
      border-radius: 10px;
      padding: 10px;
      padding-top: 40px;
      right: 0;
      top: 00px;
      z-index: 15;
      background-color: white;
      min-width: 230px;
      text-align: start;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: start;

      .mask {
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
      }

      .dropdown-button {
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 100%;
        padding: 0;
        text-align: start;
        align-items: center;
        display: flex;
        gap: 5px;
        position: relative;
        z-index: 29;
        transform: translateY(0);

        &:hover {
          padding-left: 4px;
        }

        &.signout {
          color: #984a5a;

          svg {
            path {
              stroke: #984a5a;
            }
          }
        }

        svg {
          max-width: 15px;
          path {
            stroke-width: 1px;
            stroke: #000;
          }
        }
      }
    }
    .user-menu {
      position: relative;
      z-index: 20;
    }

    svg.favorites-icon {

      cursor: pointer;
      path {
        transition: .3s ease;
      }

      &:hover, &.active {
        path {
          stroke: hotpink;
        }
      }

    }
  }
}

@media screen and (max-width: 500px){
  .search {
    display: none;
  }
  .left {
    width: 23%;
    img {
      width: 100%;
    }
  }
  .right {
    width: 75%;
  }
  .nav {
    button {
      margin-left: 5px;
      padding: 5px;
      overflow: hidden;
      width: 80px;
    }
    a {
      margin-left: 5px;
      font-size: 12px;

    }
    .favorites {
      margin-left: 5px;
    }
  }
}

</style>