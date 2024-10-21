<template>
  <div class="popup-header">
    <div class="popup-header-text">
      <slot />
    </div>
    <div class="popup-close" @click.stop @click="$emit('closePopup')">
      <svg data-auto="icon-cross" id="cross" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="_19BNt"><path d="M17 3L3 17" stroke="#9E9B98" stroke-width="2" stroke-linecap="round"></path><path d="M17 17L3 3" stroke="#9E9B98" stroke-width="2" stroke-linecap="round"></path></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheBazaPopupHeader.vue",
  data() {
    return {}
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.popup-header {
  width: 100%;
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  align-items: center;

  svg {
    cursor: pointer;
    transition: .3s ease;
    padding: 8px;
    border-radius: 30px;
    width: 40px;
    height: 40px;
    box-sizing: border-box;

    path {
      stroke: #70718c;
      transition: .3s ease;
    }

    &:hover {
      cursor: pointer;
      background-color: #e7e7e7;

      path {
        stroke: #191B2A;
      }
    }
  }

  .popup-header-text {
    color: #191B2A;
    text-align: center;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: 0 5px 0 5px;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
@media screen  and (max-width: 500px){
  .popup-header {
    .popup-header-text {
      font-size: 18px;
    }
  }
}
</style>