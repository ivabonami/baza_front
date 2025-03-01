<template>

  <div ref="carouselWrapper"
       class="products-carousel">

      <the-loader v-if="pageConfig.isLoading"></the-loader>

      <Carousel v-bind="carouselConfig" v-else>
          <Slide v-for="product of productsCarousel.items" :key="product.id">
              <product-card :item="product" @click="console.log(router.push('/project/' + product.ProjectId))" />

          </Slide>

          <template #addons>
              <Navigation />
          </template>
      </Carousel>

  </div>

</template>

<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import ProductCard from "@/components/Layout/Product/ProductCard.vue";
import {getProducts} from "@/API/productsController.js";
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import {useRouter} from "vue-router";


const props = defineProps(['sort'])

const carouselConfig = {
    itemsToShow: 2,
    wrapAround: true,
    breakpointMode: 'viewport',
    gap: 20,
    autoplay: 3000,
    snapAlign: 'start',
    pauseAutoplayOnHover: true,
    breakpoints: {
        1024: {
            itemsToShow: 5,
        },
        768: {
            itemsToShow: 3,
        },
        525: {
            itemsToShow: 2,
        }
    }
}

const pageConfig = reactive({
    isLoading: true
})

const productsCarousel = reactive({
    items: []
})

const router = useRouter()

const setProducts = () => {
    pageConfig.isLoading = true
    getProducts({limit: 30, sort: props.sort || 'random'}).then(result => {
        productsCarousel.items = result.data.products
        pageConfig.isLoading = false
    })
}

onMounted(() => {
    setProducts()
})


watch(() => props.sort, () => setProducts())

</script>

<style scoped lang="scss">

.products-carousel {
  margin-top: 20px;
  width: 100%;
  position: relative;
  min-height: 280px;
  .carousel {
    width: 100%;
    min-height: 200px;
  }
}

@media screen and (max-width: 900px){
  .products-carousel {
    width: 100%;
    .products-carousel_items {
      width: 100%;
      box-sizing: border-box;
      justify-content: space-between;

    }
  }
}

@media screen and (max-width: 500px){
  .products-carousel {
    min-height: 230px;
  }
}
</style>