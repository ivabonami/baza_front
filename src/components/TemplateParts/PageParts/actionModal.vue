<template>
  <div class="modal box-shadow" ref="modal" :class="{large: this.$props.large}"
       v-if="$props.actionModal.show === true"
       v-scroll-lock="false">
    <div class="close"
         ref="modalBackdrop"
         @click="">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div class="modal-body">

      <div class="info-modal" v-if="$props.actionModal.type === 'delete'">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M36.1 19.9L19.9 36.1M19.9 19.9L36.1 36.1M55 28C55 42.9117 42.9117 55 28 55C13.0883 55 1 42.9117 1 28C1 13.0883 13.0883 1 28 1C42.9117 1 55 13.0883 55 28Z" stroke="#9A2929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>
          {{ $props.actionModal.headline }}
        </h2>
        <p>
          {{ $props.actionModal.description }}
        </p>
        <div class="buttons">
          <button class="baza-button outline red" @click="() => {
            $props.actionModal.show = false
            this.$emit('deleteConfirmed', true)
        }">

            Удалить проект
          </button>
          <button class="baza-button special" @click="$emit('changeModal', false)">
            Отмена
          </button>
        </div>

      </div>

    </div>
  </div>

  <div class="backdrop"
       v-if="$props.actionModal.show === true"
       @click="$emit('changeModal', false)"> </div>
</template>

<script>
import signInView from "../Auth.vue";
import VScrollLock from "v-scroll-lock";
import {modalSetting} from "../../../assets/js/modal.js";
import {watch} from "vue";
import {useFetch} from "../../../assets/js/fetchRequest.js";

export default {
  name: "actionModal.vue",
  props: ['actionModal'],
  data() {
    return {useFetch}
  },
  components: {},
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
</style>