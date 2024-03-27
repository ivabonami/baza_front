<template>
  <div class="modal box-shadow" ref="modal" :class="{large: this.$props.large}"
       v-scroll-lock="false">
    <div class="close"
         ref="modalBackdrop"
         @click="$emit('changeModal', false)">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M1 1L23.1778 23.1778M23.1778 1L1 23.1778" stroke="black"/>
      </svg>
    </div>
    <div class="modal-header">
      <div class="icon">
        <Vue3Lottie :animationData="user" :height="120" :width="120" :loop="1" v-if="$props.iconType === 'user'" />
        <Vue3Lottie :animationData="warning" :height="120" :width="120" :loop="1" v-if="$props.iconType === 'warning'" />
        <Vue3Lottie :animationData="ok" :height="120" :width="120" :loop="1" v-if="$props.iconType === 'ok'"/>


      </div>


      <div class="image" v-if="this.$props.image">
        <img :src="this.$props.image" alt="">
      </div>


    </div>
    <div class="h2"
         v-if="$props.descriptionType !== ''">
      {{ $props.heading }}
    </div>


    <div class="modal-body">
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

  <div class="backdrop"
         @click="$emit('changeModal', false)"> </div>

</template>

<script>
import signInView from "../Auth.vue";
import { Vue3Lottie } from 'vue3-lottie'
import ok from '/src/assets/lottie/ok.json'
import warning from '/src/assets/lottie/warning.json'
import user from '/src/assets/lottie/user.json'
import VScrollLock from "v-scroll-lock";
import { useScrollLock } from '@vueuse/core'
import {ref} from "vue";
export default {
  name: "ModalWindowBackdrop.vue",
  components: {signInView, Vue3Lottie, VScrollLock},

  props: ['close', 'large', 'image', 'iconType', 'exit', 'heading', 'descriptionType', "description", "show", 'confirmAction', 'textApprove', 'tab'],
  emits: ['close'],

  data (props) {
    return {
      modalShow: props.show,
      forceReload: true,

    }
  },
  setup() {

    return {
      ok, warning, user
    }
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
  },
  beforeUnmount() {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'scroll'
  },


  methods: {
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
  backdrop-filter: blur(3px);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  overflow: hidden;
  transition: .3s ease;
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
  border-radius: 30px;
  width: 250px;
  padding: 20px;
  max-height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
  top: 50%;
  left: 50%;
  text-align: center;
  transition: all .3s ease, height 1s;
  transform: translate(-50%, -50%);

  &.large {
    width: 75%;
    max-width: 300px;
    .h2 {
      text-align: left;
    }

    .modal-body {
      text-align: left;
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
    position: fixed;
    right: 5px;
    cursor: pointer;
    top: 4px;
    padding: 14px 15px;
    margin-bottom: 0;
    border-radius: 50px;

    svg {
      top: 2px;
      position: relative;
      width: 20px;
      height: 20px;
    }

  }
  .h2 {
    color: #000;
    word-wrap: break-word;
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    margin-top: 20px;
    line-height: 1;
  }
  .modal-body {
    margin-top: 20px;
    .text {
      color: #000;
      word-wrap: break-word;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

    }
  }
}

</style>