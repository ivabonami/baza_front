<template>
  <div class="products-carousel">
    <div class="top-carousel-navigation">
      <div class="products-carousel-swapper">
        <span>Рекомендованные</span>
        <span>Новые</span>
      </div>

      <div class="exchanger">
        <TheExchanger />
      </div>
    </div>
  </div>
</template>

<script>
import TheExchanger from "@/components/Blocks/TheExchanger.vue";

export default {
  name: "ProductsCarouselMenu.vue",
  data() {
    return {}
  },

  components: {TheExchanger},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.products-carousel {
  .top-carousel-navigation {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .exchanger {
      border-radius: 44.5px;
      padding: 7px;
      background: #FFF;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    }
  }
  .products-carousel-swapper {
    display: flex;
  }
}
</style>