<template>
  <div class="popup">
    <div class="popup-body">
      <div class="popup-body_content" ref="popupBody">
        <div class="popup-body_content_header">
          <the-baza-popup-header @closePopup="emits('closePopup')">
            <div class="modal-header">
              {{ props.headline }}
            </div>
          </the-baza-popup-header>

        </div>
        <div class="popup-body_content_body" id="modalBody">
          <slot />
        </div>
      </div>

    </div>

    <div class="popup-backdrop" @keydown.esc="emits('closePopup')" @mousedown="emits('closePopup')">

    </div>

  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import TheBazaPopupHeader from "@/components/popups/TheBazaPopupHeader.vue";

const props = defineProps({
  headline: ref(String)
})
const emits = defineEmits(['closePopup'])

const popupBody = ref(null)

const closeByEsc = (e) => {
    if (e.key === 'Escape') {
        emits('closePopup')
    }
}

onMounted(() => {
  document.body.style.maxHeight = '100vh'
  document.body.style.paddingRight = '10px'
  document.body.style.overflowY = 'hidden'

    window.addEventListener('keydown', closeByEsc)
})
onBeforeUnmount(() => {
  document.body.style.maxHeight = 'auto'
  document.body.style.paddingRight = '0'
  document.body.style.overflowY = 'scroll'

    window.removeEventListener('keydown', closeByEsc)

})


</script>

<style scoped lang="scss">

.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  .popup-backdrop {
    background-color: rgba(112, 113, 140, 0.35);
    backdrop-filter: blur(5px);
    z-index: 50;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

  }

  .popup-body {
    z-index: 51;
    position: relative;
    box-sizing: border-box;
    outline: none;
    background-color: #fff;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    width: fit-content;
    min-width: 10vw;
    max-width: 80vw;
    height: fit-content;
    max-height: 80vh;
    min-height: 12vh;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 10px;

  }

  .popup-close {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 10px;
    top: 10px;
    transition: .3s ease;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;

  }

  .popup-body_content {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 30px;
    max-width: 900px;

    .popup-body_content_body {
      width: 100%;
      box-sizing: border-box;
      height: auto;
      padding: 10px;
      max-height: 68vh;
      overflow-x: clip;
      overflow-y: auto;
    }
  }

  .modal-header {
    max-width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    font-size: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

}

</style>