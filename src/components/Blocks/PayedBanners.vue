<template>
  <div class="banners" v-if="this.$route.path === '/'">
    <a class="payed-banner" href="https://Bitmafia.io" target="_blank">
      <img data-v-ca4db2f6=""
           :src="banner2"
           alt="">
    </a>
    <a class="payed-banner" href="https://t.me/+gq4aV6_JH8liNDky" target="_blank"><img data-v-ca4db2f6=""
                                                                                       :src="banner4"
                                                                                       alt=""></a>

    <a class="payed-banner" href="https://kra11.cc/shop/catalog/1da1b4bd-647f-4536-936e-b95c5cf4e681/" target="_blank"><img data-v-ca4db2f6=""
                                                                                :src="banner3"
                                                                                alt=""></a>


    <a class="payed-banner" href="https://t.me/SprayCoin" target="_blank"><img data-v-ca4db2f6=""
                                                                                :src="banner1"
                                                                                alt=""></a>
  </div>
</template>

<script>
import banner1 from '@/assets/payed_banners/djhrfyyth_8-ezgif.com-optimize.gif'
import banner2 from '@/assets/payed_banners/BitMafia x MixMafiaCROP-min.gif'
import banner3 from '@/assets/payed_banners/IMG-3083-DU_WZax1-min.gif'
import banner4 from '@/assets/payed_banners/3-min.gif'
export default {
  name: "PayedBanners.vue",
  data() {
    return {
      banner1,
      banner2,
      banner3,
      banner4
    }
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
}
.payed-banner {
  max-height: 165px;
  width: 100%;
  margin-bottom: 14px;
  position: relative;
  display: block;
  overflow: hidden;

  video, img {
    border-radius: 30px;
    height: 100%;
    width: 100%;
  }
}
</style>