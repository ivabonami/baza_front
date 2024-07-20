<template>
  <div>
    <div class="popup" :class="{show: $props.modal.show}">
      <div class="popup_icon">
        <slot class="icon" name="icon"></slot>
      </div>

      <div class="popup_header">
        <slot name="header"></slot>
      </div>

      <div class="popup_text">
        <slot name="text"></slot>
      </div>

      <div class="popup_button">
        <button-primary @close="closeModal()">
          <template #default>
            <slot name="button"></slot>
          </template>
        </button-primary>
      </div>

      <div class="popup_close" @click="closeModal()">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="backdrop"
         @click="closeModal()"
         :class="{show: $props.modal.show}"></div>
  </div>
</template>

<script>
import ButtonPrimary from "../Buttons/ButtonPrimary.vue";

export default {
  name: "Popup.vue",
  emits: ['closeModal', 'actionConfirmed'],
  props: ['modal'],

  data() {
    return {

    }
  },
  components: {ButtonPrimary},
  mounted() {
    document.body.style.overflow = 'hidden hidden'
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', true)

      document.body.style.overflow = 'hidden scroll'
    }
  }
}
</script>

<style scoped lang="scss">

.popup {
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  background: #FFF;
  padding: 15px;
  position: fixed;
  z-index: 51;
  width: 300px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  scale: 0;
  transition: .15s ease;

  visibility: hidden;
  opacity: 0;

  &.show {
    scale: 1;
    visibility: visible;
    opacity: 1;
  }

  .popup_icon {
    margin-bottom: 20px;
  }

  .popup_header {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
  }
  .popup_text {
    color: var(--gray, #A8A8A8);
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
    word-wrap: break-word;
  }
  .popup_button {

  }
  .popup_close {
    position: absolute;
    right: 14px;
    top: 14px;
    cursor: pointer;
  }
}
.backdrop {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  height: 100%;
  width: 100%;
  z-index: 50;

  background: rgba(217, 217, 217, 0.60);
  backdrop-filter: blur(3px);

  visibility: hidden;
  opacity: 0;


  &.show {
    visibility: visible;
    opacity: 1;
  }
}
@media screen and (max-width: 768px){
  .popup {
    width: 90%;
    flex-wrap: wrap;
    max-height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 10px;
    .popup_body {
      width: 100%;
      .popup_image {
        width: 140px;
      }
      .popup_header {
        font-size: 14px;
      }
      .popup_text {
        font-size: 12px;
      }
    }
  }
}
</style>
