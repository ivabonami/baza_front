<template>
  <div class="popup">
    <div class="popup-body">
      <div class="popup-body_content" ref="popupBody">
          <slot />
      </div>

    </div>

    <div class="popup-backdrop" @keydown.esc="emits('closePopup')" @mousedown="emits('closePopup')"></div>

  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import TheBazaPopupHeader from "@/components/popups/TheBazaPopupHeader.vue";

const props = defineProps({
  headline: ref(String)
})
const emits = defineEmits(['closePopup'])

const popupBody = ref(null)


onMounted(() => {
  document.body.style.maxHeight = '100vh'
  document.body.style.paddingRight = '10px'
  document.body.style.overflowY = 'hidden'
})
onUnmounted(() => {
  document.body.style.maxHeight = 'auto'
  document.body.style.paddingRight = '0'
  document.body.style.overflowY = 'scroll'
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
    position: fixed;
    box-sizing: border-box;
    outline: none;
    background-color: #fff;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    width: 90%;
    height: auto;
    max-height: 90vh;
    overflow: hidden auto;
    max-width: 1000px;
    left: 50%;
    top: 2%;
    translate: -50% 0;
    border-radius: 10px;
    padding-bottom: 5px;

  }


  .popup-body_content {
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    border-radius: 30px;
    width: 100%;

  }

}

</style>