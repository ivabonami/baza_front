<template>
  <div class="empty-store">
    <h3>
      <slot name="header"/>
    </h3>
    <img src="../assets/images/cat%20sleep.png" alt="">
    <span>
      <slot name="text"/>
    </span>

  </div>
</template>

<script>
export default {
  name: "EmptyStore.vue",
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
.empty-store {
  width: 100%;
  text-align: center;
  margin-top: 50px;

  h3 {
    width: 100%;
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;
  }

  img {
    display: inline-block;
    width: 150px;
    height: 150px;
  }

  svg {
    margin-left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    flex-basis: 100%;

  }
  span {
    color: #000;
    width: 100%;
    font-family: "PT Sans Caption";
    font-size: 16px;
    font-style: normal;
    display: block;
    font-weight: 400;
    line-height: normal;
  }
}
</style>