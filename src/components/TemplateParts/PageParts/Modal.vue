<template>
  <div class="modal box-shadow" ref="modal" :class="modalSetting.modalSize"
       v-if="modalSetting.show === true"
       v-scroll-lock="false">
    <div class="close"
         ref="modalBackdrop"
         @click="() => {
           modalSetting.show = false
           modalSetting.headline = ''
           modalSetting.description = ''
           modalSetting.image = ''
           modalSetting.modalSize = 'small'
         }">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div class="modal-body">

      <div class="info-modal" v-if="modalSetting.type === 'error'">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M36.1 19.9L19.9 36.1M19.9 19.9L36.1 36.1M55 28C55 42.9117 42.9117 55 28 55C13.0883 55 1 42.9117 1 28C1 13.0883 13.0883 1 28 1C42.9117 1 55 13.0883 55 28Z" stroke="#9A2929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>
          {{ modalSetting.headline }}
        </h2>
        <p>
          {{ modalSetting.description }}
        </p>
        <button class="baza-button outline" @click="() => {
           modalSetting.show = false
           modalSetting.headline = ''
           modalSetting.description = ''
           modalSetting.image = ''
           modalSetting.modalSize = 'small'
         }">
          Понял
        </button>

      </div>

      <div class="info-modal" v-if="modalSetting.type === 'ok'">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
            <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>
          {{ modalSetting.headline }}
        </h2>
        <p>
          {{ modalSetting.description }}
        </p>
        <button class="baza-button outline" @click="() => {
           modalSetting.show = false
           modalSetting.headline = ''
           modalSetting.description = ''
           modalSetting.image = ''
           modalSetting.modalSize = 'small'
           this.$router.go(-1)
         }">
          Отлично, спасибо
        </button>

      </div>

      <div class="info-modal" v-if="modalSetting.type === 'signout'">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 15 14" fill="none">
            <path d="M11.4 4.33333L14 7M14 7L11.4 9.66667M14 7H5.55M9.45 1.80269C8.62141 1.29218 7.65941 1 6.63333 1C3.52213 1 1 3.68629 1 7C1 10.3137 3.52213 13 6.63333 13C7.65941 13 8.62141 12.7078 9.45 12.1973" stroke="#841717" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>
          {{ modalSetting.headline }}
        </h2>
        <p>
          {{ modalSetting.description }}
        </p>
        <button class="baza-button outline red" @click="() => {

              signOut()
              router.push('/')
              router.go()
        }">

          Выйти
        </button>

      </div>

      <div class="info-modal" v-if="modalSetting.type === 'delete'">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M36.1 19.9L19.9 36.1M19.9 19.9L36.1 36.1M55 28C55 42.9117 42.9117 55 28 55C13.0883 55 1 42.9117 1 28C1 13.0883 13.0883 1 28 1C42.9117 1 55 13.0883 55 28Z" stroke="#9A2929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>
          {{ modalSetting.headline }}
        </h2>
        <p>
          {{ modalSetting.description }}
        </p>
        <div class="buttons">
          <button class="baza-button outline red" @click="() => {
            modalSetting.show = false
            this.$emit('deleteConfirmed', true)
        }">

            Удалить проект
          </button>
          <button class="baza-button special" @click="modalSetting.show = false">
            Отмена
          </button>
        </div>

      </div>

      <div class="info-modal" v-if="modalSetting.type === 'info'">
        <div class="image">
          <img :src="modalSetting.image" alt="">
        </div>

        <div class="body">
          <h2>
            {{ modalSetting.headline }}
          </h2>
          <p>
            {{ modalSetting.description }}
          </p>

        </div>


      </div>

      <div class="info-modal" v-if="modalSetting.type === 'testimonial'">
        <div class="image">
          <img :src="modalSetting.image" alt="">
        </div>

        <div class="body">
          <h2>
            {{ modalSetting.headline }}
          </h2>
          <add-testimonial></add-testimonial>

        </div>


      </div>
      <div class="info-modal" :class="{links: modalSetting.type === 'links'}" v-if="modalSetting.type === 'links'">

        <div class="body">
          <h2>
            {{ modalSetting.headline }}
          </h2>
          <div>

                <div class="links-category-wrapper" >

                  <div class="links-category" v-if="this.projectLinks.clearNet.length > 0">

                    <div class="link-category-heading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8H15M1 8C1 11.866 4.13401 15 8 15M1 8C1 4.13401 4.13401 1 8 1M15 8C15 11.866 11.866 15 8 15M15 8C15 4.13401 11.866 1 8 1M8 1C9.7509 2.91685 10.7459 5.40442 10.8 8C10.7459 10.5956 9.7509 13.0832 8 15M8 1C6.2491 2.91685 5.25407 5.40442 5.2 8C5.25407 10.5956 6.2491 13.0832 8 15" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Клирнет
                    </div>

                    <div class="links-wrapper" >
                      <a :href="link.link"
                         v-for="link of this.projectLinks.clearNet"
                         class="link"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                          <circle cx="3" cy="3" r="3" fill="#FFC700"/>
                        </svg>
                        {{ link.name }}</a>
                    </div>

                  </div>

                  <div class="links-category" v-if="this.projectLinks.darknet.length > 0">

                    <div class="link-category-heading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1C10.1 2.4 10.7459 5.40442 10.8 8C10.7459 10.5956 10.1 13.6 8 15M8 1C5.9 2.4 5.25407 5.40442 5.2 8C5.25407 10.5956 5.9 13.6 8 15M8 1C4.13401 1 1 4.13401 1 8M8 1C11.866 1 15 4.13401 15 8M8 15C11.866 15 15 11.866 15 8M8 15C4.13401 15 1 11.866 1 8M15 8C13.6 10.1 10.5956 10.7459 8 10.8C5.40442 10.7459 2.4 10.1 1 8M15 8C13.6 5.9 10.5956 5.25407 8 5.2C5.40442 5.25407 2.4 5.9 1 8" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Даркнет
                    </div>

                    <div class="links-wrapper" >
                      <a :href="link.link"
                         v-for="link of this.projectLinks.darknet"
                         class="link"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                          <circle cx="3" cy="3" r="3" fill="#8B4BDD"/>
                        </svg>
                        {{ link.name }}</a>
                    </div>

                  </div>

                  <div class="links-category" v-if="this.projectLinks.blockchain.length > 0">

                    <div class="link-category-heading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
                        <path d="M1 7.75011L7 9.25L13 7.75M1 7.75011L7 1M1 7.75011L7 6.25006M13 7.75L7 1M13 7.75L7 6.25006M7 1V6.25006M2.125 10.75L7.00009 16L11.875 10.75L7 11.875L2.125 10.75Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Блокчейн
                    </div>

                    <div class="links-wrapper" >
                      <a :href="link.link"
                         v-for="link of this.projectLinks.blockchain"
                         class="link"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                          <circle cx="3" cy="3" r="3" fill="#B7DD4B"/>
                        </svg>
                        {{ link.name }}</a>
                    </div>

                  </div>

                  <div class="links-category" v-if="this.projectLinks.other.length > 0">

                    <div class="link-category-heading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                        <path d="M15 8.13876L9.09347 2.11514C8.68991 1.70359 8.48814 1.49781 8.25266 1.35066C8.0439 1.22019 7.81629 1.12404 7.57821 1.06575C7.30967 1 7.02431 1 6.4536 1L3.33333 1M1 6.31441L1 7.88059C1 8.2686 1 8.46261 1.04298 8.64518C1.08109 8.80705 1.14394 8.9618 1.22923 9.10374C1.32542 9.26383 1.45994 9.40101 1.72898 9.67538L7.79565 15.8623C8.41167 16.4905 8.71969 16.8047 9.07486 16.9224C9.38729 17.0259 9.72383 17.0259 10.0362 16.9224C10.3914 16.8047 10.6994 16.4905 11.3155 15.8623L13.2401 13.8995C13.8561 13.2713 14.1641 12.9572 14.2795 12.595C14.381 12.2763 14.381 11.9331 14.2795 11.6145C14.1641 11.2523 13.8561 10.9382 13.2401 10.3099L7.56231 4.51961C7.29328 4.24524 7.15876 4.10806 7.00178 4.00995C6.8626 3.92297 6.71086 3.85888 6.55214 3.82002C6.37311 3.77618 6.18288 3.77618 5.8024 3.77618H3.48889C2.6177 3.77618 2.1821 3.77618 1.84935 3.94909C1.55665 4.10118 1.31868 4.34387 1.16955 4.64237C1 4.98172 1 5.42595 1 6.31441Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Другое
                    </div>
                    <div class="links-wrapper" >
                      <a :href="link.link"
                         v-for="link of this.projectLinks.other"
                         class="link"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                          <circle cx="3" cy="3" r="3" fill="#4BBADD"/>
                        </svg>
                        {{ link.name }}</a>
                    </div>

                  </div>

                </div>

          </div>

        </div>


      </div>

      <div class="sign-in" v-if="modalSetting.type === 'singIn'">
        <div class="icon">
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.954 49.0837C12.5965 45.214 16.4313 42.5 20.9 42.5H37.1C41.5687 42.5 45.4035 45.2141 47.046 49.0837M39.8 22.25C39.8 28.2147 34.9647 33.05 29 33.05C23.0353 33.05 18.2 28.2147 18.2 22.25C18.2 16.2853 23.0353 11.45 29 11.45C34.9647 11.45 39.8 16.2853 39.8 22.25ZM56 29C56 43.9117 43.9117 56 29 56C14.0883 56 2 43.9117 2 29C2 14.0883 14.0883 2 29 2C43.9117 2 56 14.0883 56 29Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>
          Войти на BAZA
        </h2>
        <div class="form">
          <sign-in-view></sign-in-view>
        </div>


      </div>





      <div v-if="modalSetting.type === '1'">
        <div class="text"
             v-if="$props.descriptionType === 'text' || $props.descriptionType === 'textApprove'">
          {{ $props.description }}

        </div>

        <div class="confirm"
             v-if="$props.confirmAction === true">

          <div class="buttons">
            <button class="btn confirm"
                    :class="{ approve: $props.descriptionType === 'textApprove'}"
                    title="Действие безвозвратно!!!!"
                    @click="() => {
                    $emit('confirmAction', true)
                    $emit('changeModal', false)

                  }">
              <span v-if="$props.descriptionType === 'textApprove'">Опубликовать</span>
              <span v-else-if="$props.exit === true">Выйти</span>
              <span v-else>Удалить</span>

            </button>

            <button class="btn cancel"
                    @click="() => {
                    $emit('confirmAction', false)
                    $emit('changeModal', false)
                  }">
              <span v-if="$props.descriptionType === 'textApprove'">Отмена</span>
              <span v-else-if="$props.exit === true">Остаться</span>
              <span v-else>Не удалять</span>
            </button>
          </div>
        </div>

        <div class="confirm"
             v-if="$props.close === true">

          <div class="buttons">

            <button class="btn btn-secondary"
                    @click="() => {
                    $emit('changeModal', false)
                  }">
              <span>Закрыть</span>
            </button>
          </div>
        </div>


        <div class="form"
             v-if="$props.descriptionType === 'sign-in'">
          <div class="signin">

            <sign-in-view
                v-bind:tab="this.$props.tab"></sign-in-view>

          </div>
        </div>

      </div>

    </div>
  </div>

  <div class="backdrop"
       @click="() => {
           modalSetting.show = false
           modalSetting.headline = ''
           modalSetting.description = ''
           modalSetting.image = ''
           modalSetting.modalSize = 'small'
         }"> </div>

</template>

<script>

import signInView from "../Auth.vue";
import VScrollLock from "v-scroll-lock";
import {modalSetting} from "../../../assets/js/modal.js";
import {watch} from "vue";
import AddTestimonial from "../../Controllers/ProjectControllers/addTestimonial.vue";

export default {
  name: "Modal.vue",
  components: {AddTestimonial, signInView, VScrollLock},

  data () {
    return {
      modalSetting,
      projectLinks: {
        clearNet: [],
        darknet: [],
        blockchain: [],
        other: []
      }

    }
  },
  setup() {
    watch(modalSetting, (value, oldValue) => {
    }, { immediate: true })
  },

  mounted() {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'hidden'

    window.addEventListener("keydown", (e) => {
      {

        if(event.key === 'Escape'){
          this.$emit('changeModal', false)
        }
      }
    })

    if (modalSetting.links) {
      for (let link of modalSetting.links) {
        link.name === 'Зеркало' ? this.projectLinks.clearNet.push(link) : ''
        link.name === 'Blockchain' ? this.projectLinks.blockchain.push(link) : ''
        link.name === 'Onion' ? this.projectLinks.darknet.push(link) : ''
        link.name !== 'Зеркало' ||
        link.name !== 'Blockchain'  ||
        link.name !== 'Onion' ? this.projectLinks.other.push(link) : ''
      }
    }

  },
  beforeUnmount() {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'scroll'
  },


  methods: {
    signOut() {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      this.$router.push('/')
      this.$router.go()
    },
    changeModal () {
      this.modalShow = !this.modalShow
    },

  }
}
</script>

<style scoped lang="scss">
.confirm {
  .buttons {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    justify-content: space-around;

    .confirm {
      background-color: #C8716B;
      color: #fff;
      &:hover {
        background-color: #a41f1f;
      }

      &.approve {
        background-color: #85c86b;
        color: #fff;
        &:hover {
          background-color: #3168b9;
        }
      }


    }
    .cancel {

    }
  }

}
.backdrop {
  position: fixed;
  background-color: rgba(156, 158, 178, 0.25);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  overflow: hidden;
  transition: .3s ease;
  fill: rgba(217, 217, 217, 0.60);
  backdrop-filter: blur(3px);
}

::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

.modal {
  position: fixed;
  z-index: 25;
  background-color: #fff;
  border-radius: 10px;
  width: 400px;
  padding: 10px 20px;
  max-height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
  top: 50%;
  left: 50%;
  border: 1px solid var(--gray-2, #D8D8D8);
  transition: all .3s ease, height 1s;
  transform: translate(-50%, -50%);

  &.large {
    max-width: 800px;
    width: 100%;

    .info-modal {
      display: flex;
      align-items: center;

      .image {
        img {
          border-radius: 10px;
          width: 186px;
          aspect-ratio: 1 / 1;
        }
      }

      .body {
        padding-right: 10px;
        padding-left: 20px;

        h2 {
          width: 100%;
          word-break: break-word;
          color: #000;

          font-family: "PT Sans Caption";
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        p {
          width: 100%;
          word-break: break-word;
        }
      }



    }

  }

  .modal-body {
    .info-modal {
      &.links {
        .body {
          .links-category-wrapper {
            .links-category {
              width: 100%;

              .link-category-heading {
                margin-bottom: 10px;
                margin-top: 10px;
                display: flex;
                align-items: center;
                color: #000;
                font-family: "PT Sans Caption";
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;

                svg {
                  position: relative;
                  top: 1px;
                  margin-right: 10px;
                }
              }

              .links-wrapper {
                display: flex;
                align-items: center;
                gap: 5px;
                flex-wrap: wrap;

                a {
                  transition: .3s ease;

                  svg {
                    position: relative;
                    top: -2px;
                    margin-right: 3px;
                  }
                  border-radius: 30px;
                  background: var(--lightgray, #F2F5F7);

                  color: #000;
                  font-family: "PT Sans Caption";
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;
                  padding: 10px;

                  &:hover {
                    background: #e5e8ea;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .modal-header {
    display: flex;
    width: 100%;
    justify-content: center;
    .image {
      width: 100%;
      height: 160px;
      overflow: hidden;
      img {
        width: 100%;

      }
    }

    .icon {
      svg {
        width: 38px;
        height: 38px;
      }
    }
  }
  .close {
    position: absolute;
    right: 0;
    cursor: pointer;
    top: 0;
    padding: 12px;

    svg {
      width: 14px;
      height: 14px;
    }

  }
  .modal-body {
    text-align: left;
    word-wrap: break-word;

    .icon {
      margin-bottom: 10px;
    }

    h2 {
      color: #000;
      font-family: "PT Sans Caption";
      font-size: 22px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 10px;
    }

    p {
      color: var(--gray, #A8A8A8);
      font-family: "PT Sans Caption";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      margin-bottom: 25px;
    }

    .sign-in {

    }


  }
}

.buttons {
  display: flex;
  gap: 10px;
  align-items: center;
  .baza-button {
    width: 100%;
  }
}
@media screen and (max-width: 500px) {
  .modal {
    width: calc(100% - 20px);
    box-sizing: border-box;

    &.large {
      width: calc(300px);

      .info-modal {
        flex-wrap: wrap;
        .body {
          padding: 0px;
        }
      }

    }
  }
}

</style>