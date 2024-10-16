<template>
  <div class="default-header">
    <h2>
      <slot />
    </h2>
    <div class="back" @click="closePopup">

      Закрыть

      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
  </div>
</template>

<script>
import logo from '@/assets/lgbt-logo.png'
import {closePopup} from "@/js/controllers/popupController.js";

export default {
  name: "AuthHeader.vue",
  data() {
    return {
      logo,
      closePopup
    }
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">

h2 {
  font-size: 25px;
  color: #fff;
  padding: 50px 10px 10px;
  text-align: center;
  word-break: break-all;
}

.default-header {
  border-radius: 8px;
  background: #7773FB;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 40px;
  .back {
    padding: 6px 19px;
    border-radius: 8px;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #5D599F;
    color: #B3B4C9;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: absolute;
    right: 12px;
    top: 12px;
    cursor: pointer;
    transition: .15s ease;

    svg {
      path {
        stroke: #B3B4C9;
        transition: .15s ease;
      }
    }

    &:hover {
      color: #191B2A;
      svg {
        path {
          stroke: #191B2A;
        }
      }

    }
  }

  .default-header_logo {
    filter: grayscale(2);
    margin-top: 10px;
    width: 184px;
    height: 83px;
    position: relative;
    z-index: 1;
  }

  .default-header_overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: -50%;
    top: -50%;
    transform: translate(50%, 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
  }


}
@media screen and (max-width: 500px){
  h2 {
    padding: 50px 20px 20px;
    font-size: 22px;
  }
  .default-header .default-header_overlay {

  }
}
</style>