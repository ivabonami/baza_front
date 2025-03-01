<template>
    <div class="popup">
        <div class="popup-body">
            <div class="popup-body_content" >
                <div class="popup-body_content_header">
                    <span>
                        {{ popupSettings.headline }}
                    </span>
                    <svg @click="dismissPopup()" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </div>
                <div class="popup-body_content_body" id="modalBody">
                    <component :is="popupSettings.component" />
                </div>
            </div>

        </div>

        <div class="popup-backdrop" @mousedown="dismissPopup()"></div>

    </div>
</template>

<script setup>
import {onMounted, onUnmounted} from "vue";
import {dismissPopup, popupSettings} from "@/core/layout/popup/popupSettings.js";

const closeByEsc = (e) => {
    if (e.key === 'Esc') {
        dismissPopup()
    }
}

onMounted(() => {
    document.body.style.maxHeight = '100vh'
    document.body.style.paddingRight = '10px'
    document.body.style.overflowY = 'hidden'

    window.addEventListener("keydown", closeByEsc)
})
onUnmounted(() => {
    document.body.style.maxHeight = 'fit-content'
    document.body.style.paddingRight = '0'
    document.body.style.overflowY = 'scroll'

    window.removeEventListener("keydown", closeByEsc)
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
    position: absolute;
    display: flex;
    min-width: 300px;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    padding: 10px;
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
    row-gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    border-radius: 5px;
  }

  .popup-close {


  }

  .popup-body_content {
    width: 100%;

    .popup-body_content_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;

      span {
        color: var(--Lapis, #333);
        text-align: center;
        font-family: "SF Pro Display";
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
      svg {
        cursor: pointer;
        path {
          stroke: #333;
          transition: .3s ease;
          opacity: .5;
        }

        &:hover {
          path {
            opacity: 1;
          }
        }
      }
    }

    .popup-body_content_body {

    }
  }

  .modal-header {

  }

}

</style>