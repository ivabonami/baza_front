<template>

    <div class="project"
         :ref="project+$props.project.id"
         :class="{
           paid: this.payed,
           owner: this.username === $props.project.userData.username || false}">
      <div class="avatar">
        <figure class="cover">
          <img :src="config.api.url + $props.project.avatarFilePath"
               alt="" class="can-be-hovered"
               v-if="$props.project.avatarFilePath !== ''"
               v-on:click="$router.push('/project/' +$props.project.id)">
        </figure>

        <<div class="favorite"
              v-on:click.stop
              v-if="this.isFavourite === false && this.isLogin === true"
              v-on:click="() => {
               addFavorite($props.project.id)
               this.isFavourite = true
             }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
            <path d="M11.9306 19.135C17.3959 15.5765 22.8612 11.6118 22.8612 6.34557C22.8632 5.65344 22.7233 4.96775 22.4494 4.32792C22.1754 3.6881 21.7729 3.10676 21.265 2.61735C20.7571 2.12794 20.1538 1.74011 19.4898 1.47616C18.8258 1.21221 18.1142 1.07735 17.3959 1.07934C15.9905 1.07934 14.6008 1.59091 13.5311 2.62159L11.9306 4.16384L10.33 2.62159C9.82358 2.13072 9.22141 1.74117 8.55815 1.47536C7.89489 1.20954 7.18364 1.07269 6.4653 1.07269C5.74696 1.07269 5.0357 1.20954 4.37245 1.47536C3.70919 1.74117 3.10701 2.13072 2.60055 2.62159C2.09238 3.11015 1.68938 3.69064 1.4147 4.32971C1.14003 4.96879 0.9991 5.65385 1 6.34557C1 11.6118 6.4653 15.5765 11.9306 19.135Z" fill="#7C7C7C" stroke="black" stroke-width="2"/>
          </svg>
        </div>

        <div class="favorite"
             v-on:click.stop
             v-else-if="this.isFavourite === true && this.isLogin === true"
             v-on:click="() => {
               // deleteFavorite($props.project.id)
               this.isFavourite = false
               this.$emit('favoriteRemoved', project.id)
             }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#F8104B" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278" clip-rule="evenodd"></path></svg>
        </div>

      </div>
      <div class="project-body" v-on:click="$router.push('/project/' + $props.project.id)">

          <div class="project-name">
            {{ $props.project.name }}
            <svg xmlns="http://www.w3.org/2000/svg" @click.stop @click="() => {
                      modalSetting.show = true
                      modalSetting.image = config.api.url + this.project.avatarFilePath
                      modalSetting.headline = this.project.name
                      modalSetting.description = this.project.description
                      modalSetting.type = 'info'
                      modalSetting.modalSize = 'large'
                   }"
                 width="22" v-tippy="{ content: 'Посмотреть описание проекта'}" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 15V11M11 7H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#D8D8D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <div class="project-info">

            <div v-tippy="{ content: 'Рейтинг проекта' }" class="rating" v-if="$props.project.ratingAvg" title="Рейтинг">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" fill="none">
                <path d="M4.15752 0.412463C4.26756 0.178639 4.32258 0.0617278 4.39727 0.0243745C4.46225 -0.00812482 4.53775 -0.00812482 4.60273 0.0243745C4.67742 0.0617278 4.73244 0.178639 4.84248 0.412463L5.88643 2.6308C5.91891 2.69983 5.93516 2.73435 5.95889 2.76115C5.97991 2.78487 6.00512 2.8041 6.03312 2.81775C6.06474 2.83318 6.10105 2.83875 6.17367 2.84988L8.50883 3.20789C8.75473 3.24559 8.87768 3.26444 8.93458 3.32743C8.98409 3.38224 9.00737 3.45756 8.99794 3.53241C8.98711 3.61844 8.8981 3.70938 8.72007 3.89126L7.03097 5.61689C6.97832 5.67068 6.95199 5.69758 6.935 5.72958C6.91996 5.75791 6.91031 5.78904 6.90659 5.82124C6.90239 5.8576 6.9086 5.8956 6.92102 5.97158L7.31957 8.40896C7.36161 8.66604 7.38263 8.79457 7.34313 8.87085C7.30876 8.93722 7.24767 8.98376 7.17688 8.99753C7.09551 9.01335 6.98546 8.95265 6.76537 8.83125L4.67777 7.67972C4.61273 7.64384 4.5802 7.6259 4.54594 7.61885C4.5156 7.61261 4.4844 7.61261 4.45406 7.61885C4.4198 7.6259 4.38728 7.64384 4.32223 7.67972L2.23463 8.83125C2.01454 8.95265 1.90449 9.01335 1.82312 8.99753C1.75233 8.98376 1.69124 8.93722 1.65687 8.87085C1.61737 8.79457 1.63839 8.66604 1.68043 8.40896L2.07898 5.97158C2.0914 5.8956 2.09761 5.8576 2.09341 5.82124C2.08969 5.78904 2.08004 5.75791 2.065 5.72958C2.04801 5.69758 2.02168 5.67068 1.96903 5.61689L0.279927 3.89126C0.101901 3.70938 0.0128882 3.61844 0.00205647 3.53241C-0.00736774 3.45756 0.0159145 3.38224 0.0654208 3.32743C0.122321 3.26444 0.245272 3.24559 0.491175 3.20789L2.82633 2.84988C2.89895 2.83875 2.93526 2.83318 2.96688 2.81775C2.99488 2.8041 3.02009 2.78487 3.04111 2.76115C3.06484 2.73435 3.08109 2.69983 3.11357 2.6308L4.15752 0.412463Z" fill="black"/>
              </svg>
              {{ $props.project.ratingAvg }}

              <svg class="sep" xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                <circle cx="1" cy="1" r="1" fill="#D9D9D9"/>
              </svg>
            </div>

            <div class="testimonials" v-tippy="{ content: 'Отзывов' }" v-if="$props.project.reviewsCount > 0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                <path d="M2.77778 3.38357H5M2.77778 4.90039H6.33333M3.97056 7.50065H6.86667C7.6134 7.50065 7.98677 7.50065 8.27199 7.35895C8.52287 7.2343 8.72684 7.0354 8.85468 6.79077C9 6.51265 9 6.14858 9 5.42044V3.08021C9 2.35207 9 1.988 8.85468 1.70988C8.72684 1.46525 8.52287 1.26635 8.27199 1.14171C7.98677 1 7.6134 1 6.86667 1H3.13333C2.3866 1 2.01323 1 1.72801 1.14171C1.47713 1.26635 1.27316 1.46525 1.14532 1.70988C1 1.988 1 2.35207 1 3.08021V8.5128C1 8.74373 1 8.85919 1.04855 8.91849C1.09077 8.97007 1.15479 9.00007 1.22246 9C1.30028 8.99992 1.39274 8.92779 1.57767 8.78353L2.63787 7.95649C2.85445 7.78754 2.96274 7.70307 3.08333 7.64299C3.19031 7.5897 3.30419 7.55075 3.42187 7.5272C3.55452 7.50065 3.6932 7.50065 3.97056 7.50065Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ $props.project.reviewsCount || 0}}

              <svg class="sep" xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                <circle cx="1" cy="1" r="1" fill="#D9D9D9"/>
              </svg>
            </div>

            <div class="views" v-tippy="{ content: 'Просмотров' }">
              <svg viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.42012 8.71318C1.28394 8.49754 1.21584 8.38972 1.17772 8.22342C1.14909 8.0985 1.14909 7.9015 1.17772 7.77658C1.21584 7.61028 1.28394 7.50246 1.42012 7.28682C2.54553 5.50484 5.8954 1 11.0004 1C16.1054 1 19.4553 5.50484 20.5807 7.28682C20.7169 7.50246 20.785 7.61028 20.8231 7.77658C20.8517 7.9015 20.8517 8.0985 20.8231 8.22342C20.785 8.38972 20.7169 8.49754 20.5807 8.71318C19.4553 10.4952 16.1054 15 11.0004 15C5.8954 15 2.54553 10.4952 1.42012 8.71318Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.0004 11C12.6573 11 14.0004 9.65685 14.0004 8C14.0004 6.34315 12.6573 5 11.0004 5C9.34355 5 8.0004 6.34315 8.0004 8C8.0004 9.65685 9.34355 11 11.0004 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ $props.project.viewCount || 0 }}

              <svg class="sep" xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                <circle cx="1" cy="1" r="1" fill="#D9D9D9"/>
              </svg>
            </div>
            <div class="swap" v-if="$props.project.type === 'exchanger'" v-tippy="{ content: 'Резерв валюты' }">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
                <path d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ $props.project.reserve }}₽
              <svg class="sep" xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                <circle cx="1" cy="1" r="1" fill="#D9D9D9"/>
              </svg>
            </div>

            <div class="reserve" v-if="$props.project.type === 'exchanger'" v-tippy="{ content: 'Минимальный обмен' }">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12" fill="none">
                <path d="M7.05 2.11111C7.05 2.72476 5.69566 3.22222 4.025 3.22222C2.35434 3.22222 1 2.72476 1 2.11111M7.05 2.11111C7.05 1.49746 5.69566 1 4.025 1C2.35434 1 1 1.49746 1 2.11111M7.05 2.11111V4.58731C6.37817 4.7911 5.95 5.09941 5.95 5.44444M1 2.11111V8.77778C1 9.39143 2.35434 9.88889 4.025 9.88889C4.7563 9.88889 5.42698 9.79357 5.95 9.63492V5.44444M1 4.33333C1 4.94698 2.35434 5.44444 4.025 5.44444C4.7563 5.44444 5.42698 5.34913 5.95 5.19047M1 6.55556C1 7.16921 2.35434 7.66667 4.025 7.66667C4.7563 7.66667 5.42698 7.57135 5.95 7.41269M12 5.44444C12 6.05809 10.6457 6.55556 8.975 6.55556C7.30434 6.55556 5.95 6.05809 5.95 5.44444M12 5.44444C12 4.83079 10.6457 4.33333 8.975 4.33333C7.30434 4.33333 5.95 4.83079 5.95 5.44444M12 5.44444V9.88889C12 10.5025 10.6457 11 8.975 11C7.30434 11 5.95 10.5025 5.95 9.88889V5.44444M12 7.66667C12 8.28032 10.6457 8.77778 8.975 8.77778C7.30434 8.77778 5.95 8.28032 5.95 7.66667" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ $props.project.minValueToExchange }}₽
            </div>
          </div>

        <div class="project-links" @click.stop>

          <a class="link-wrapper"
             v-for="(link, index) of $props.project.links"
             target="_blank"
             :href="link.link">
            <div class="link"
                 :class="{
                    mirror: link.name === 'Зеркало',
                    darknet: link.name === 'Onion',
                    blockchain: link.name === 'Blockchain',
                    telegram: link.name === 'Канал' || link.name === 'Бот'
                 }"
                 v-if="index < 3">
              <div class="dot">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" fill="none">
                  <circle cx="3" cy="3" r="3" fill="#8B4BDD"/>
                </svg>
              </div>
              <div class="link-name">
                {{ link.name }}
              </div>
            </div>

          </a>

          <a class="link-wrapper" v-if="$props.project.links.length > 3"
             @click="this.$router.push(`/project/${$props.project.id}`)">
            <div class="link">
              <div class="link-name">
                Показать еще
              </div>
            </div>


          </a>


        </div>



        <div class="project-bottom">

          <div class="links" @click.stop>
            <div class="admin-menu">

              <svg v-if="userInfo.token !== null"
                   v-tippy="{ content: 'Выделить проект' }"
                   @click="updateProjectPayedStatus($props.project.id, !$props.project.payed)"
                   viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 15C1 17.2091 2.79086 19 5 19H9C11.2091 19 13 17.2091 13 15C13 12.7909 11.2091 11 9 11H5C2.79086 11 1 9.20914 1 7C1 4.79086 2.79086 3 5 3H9C11.2091 3 13 4.79086 13 7M7 1V21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-if="userInfo.token !== null"

                   v-tippy="{ content: 'Удалить проект' }" @click="() => {
                this.actionModal.show = true,
                this.actionModal.type = 'delete',
                this.actionModal.headline = 'Удалить проект?',
                this.actionModal.description = 'Вы уверены что хотите удалить проект ' + $props.project.name + '?',
                this.actionModal.itemToDeleteId = $props.project.id

              }" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <span class="flag"
                    v-tippy="{ content: 'Это ваш проект!' }"
                    v-if="project.userData.username === userInfo.username">
                <svg v-if="$props.project.userData.username" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 14C1 14 2 13 5 13C8 13 10 15 13 15C16 15 17 14 17 14V2C17 2 16 3 13 3C10 3 8 1 5 1C2 1 1 2 1 2L1 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>



            </div>

          </div>


        </div>
      </div>
    </div>
  <action-modal
      v-if="actionModal.show === true"
      v-bind:actionModal="actionModal"
      @deleteConfirmed="() => {
                     $emit('removeProjectFromList', project.id)

                   }"
      @changeModal="(emit) => {
        this.actionModal.show = false
      }"
  ></action-modal>

</template>

<script>
import {modalSetting} from "../../../assets/js/modal.js";
import actionModal from "../PageParts/actionModal.vue";


import ProjectsView from "../../pages/ProjectDetailed.vue";
import { directive } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import config from "../../../assets/js/config.js";
import {userInfo} from "../../../assets/js/userService.js";
import {useFetch} from "../../../assets/js/fetchRequest.js";


export default {
  name: "ProjectCard.vue",

  props: ['project', 'fadeAnimate', 'favorite'],
  emits: ['updated'],
  components: { ProjectsView, actionModal },

  setup(props, emits) {
  },

  directives: {
    tippy: directive,
  },
  data () {
    return {
      favorite: false,
      isAdmin: false,
      reviewsLength: 0,
      counter: 0,
      isLogin: false,
      reviewsCount: 0,
      isFavourite: false,
      username: '',
      actionModal: {},
      payed: false,
      config, userInfo, modalSetting, useFetch


    }
  },

  mounted() {
    this.$props.project.favorite === 1 || this.$props.favorite === true ? this.isFavourite = true : this.isFavourite = false
    this.userInfo.token !== null ? this.isLogin = true : this.isLogin = false
    this.payed = this.$props.project.payed
  },
  methods: {

    addFavorite(projectId) {
      useFetch(`user/project/${projectId}`, "POST" )
    },

    deleteFavorite(projectId) {
      useFetch(`user/project/${projectId}`, "DELETE" )
    },

    updateProjectPayedStatus (projectId, status) {
      useFetch(`projects/${projectId}`, "PUT", {payed: status})
          .then(result => {
            this.payed = !this.payed
            console.log(result)
          })

    }
  }
}
</script>

<style scoped lang="scss">
.project {
  width: 24%;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #ececec;
  margin-bottom: 10px;
  transition: .3s ease;
  padding: 10px;
  z-index: 0;
  position: relative;
  background-color: white;

  &.paid {
    border: 1px solid #FFC700;
  }
  .owner {
    border: 1px solid #b9d06b;
  }

  &.paid {
    --borderWidth: 3px;
    position: relative;
    border-color:  #FFC700;
  }



  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }


  .avatar {
    width: 100%;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    flex-grow: 0;
    display: block;
    box-sizing: border-box;
    position: relative;
    border-radius: 10px;
    overflow: hidden;

    figure {
      background: linear-gradient(45deg, rgb(239, 239, 239) 0%, rgb(200, 210, 215) 33%, rgb(239, 239, 239) 66%, rgb(218, 218, 218) 100%);
      background-size: 400% 400%;
      animation: gradient 2s linear infinite;
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0;
      display: block;
      box-sizing: border-box;
    }

    @keyframes gradient {
      0% {
        background-position: 100% 0%
      }
      100% {
        background-position: 15% 100%
      }
    }

    .cover img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      margin-top: 50%;
      margin-left: 50%;
      translate: -50% -50%;
      transition: all .3s ease;
    }




    img {
      object-fit: cover;

    }
    .favorite {
      position: absolute;
      right: 5px;
      top: 5px;
      border-radius: 400px;
      padding: 4px;
      transition: .3s ease;

      svg {

      }
    }
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    z-index: 20;

    .avatar {
      .cover {
        img {
          width: 110%;
          height: 110%;
        }
      }
    }
  }
  .dropdown {
    color: var(--new-dark, transparent);
    text-align: right;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px; /* 138.889% */

  }
  .project-body {
    margin-top: 10px;
    width: 100%;

    .project-name {
      color: #000;
      font-family: "PT Sans Caption";
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      word-wrap: break-word;
      width: 100%;
      max-width: 250px;

      svg {
        width: 16px;
        height: 16px;
        position: relative;
        top: 2px;
      }

    }
    .project-info {
      margin-top: 5px;
      display: flex;
      color: var(--gray, #A8A8A8);
      font-family: "PT Sans Caption";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      gap: 5px;
      align-items: center;

      .rating, .testimonials, .views {
        display: flex;
        align-items: center;
        gap: 3px;
      }

      svg {
        width: 11px;
        path {
          stroke: #A8A8A8
        }
        &.sep {
          width: 2px;
        }
      }
      .rating {
        color: black;
        .empty {
          font-size: 10px;
        }
        svg {
          path {
            stroke: transparent;
            fill: black;
          }
        }
      }
    }

    .project-links {
      display: flex;
      flex-wrap: wrap;
      margin-top: 5px;

      .link-wrapper {


        .link {
          margin-right: 5px;
          margin-bottom: 5px;
          border-radius: 30px;
          background: var(--lightgray, #F2F5F7);
          padding: 5px 10px;
          display: flex;
          gap: 3px;
          align-items: center;

          .dot {

            svg {
              width: 5px;
              height: 5px;
              position: relative;
              top: -2px;

              circle {
                transition: .3s ease;
                fill: #7c7c7c;
              }
            }
          }
          &.mirror {
            svg {
              circle {
                fill: #FFC700;
              }
            }

          }
          &.darknet {
            svg {
              circle {
                fill: #8B4BDD;
              }
            }

          }
          &.blockchain {
            svg {
              circle {
                fill: #B7DD4B;
              }
            }

          }
          &.telegram {
            svg {
              circle {
                fill: #4BBADD;
              }
            }

          }
          .link-name {
            color: #000;
            font-family: "PT Sans Caption";
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            transition: .3s ease;
          }

          transition: .3s ease;
          border: 1px solid transparent;

          &:hover {
            background-color: #7c7c7c;
            .link-name {
              color: #fff;
            }
            .dot {
              svg {
                circle {
                  fill: #fff;
                }
              }
            }

            &.mirror {
              background-color: #FFC700;
            }

            &.darknet {
              background-color: #8B4BDD;

            }
            &.blockchain {
              background-color: #B7DD4B;
            }
            &.telegram {
              background-color: #4BBADD;
            }
          }
        }
      }
    }


    .project-bottom {
      position: absolute;
      bottom: 5px;
      right: 5px;


      .admin-menu {
        display: flex;
        justify-content: end;
        align-items: center;



        svg {
          margin-left: 5px;
          transition: .1s ease;
          width: 14px;
          height: 14px;
          path {
            transition: .3s ease;
            stroke: #c4c4c4;
          }

          &:hover {

            path {
              stroke: #6e6e6e;
            }
          }
        }
      }
    }


  }
}
.flag {
  cursor: default;
  svg {
    width: 12px!important;
    height: 12px!important;
  }
}
@media screen and (max-width: 768px)  {

  .project {
    max-width: 300px;
  }


}
@media screen and (max-width: 500px){
  .project {
    width: 48%;
    .project-body {
      .project-links {
        gap: 0px;
        align-items: center;
        margin-bottom: 10px;
        .link-wrapper {

          .link {

            padding: 2px 4px;
            .link-name {
              font-size: 11px;
            }
          }
        }
      }
    }
  }

}
</style>