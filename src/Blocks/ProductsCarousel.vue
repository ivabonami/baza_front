<template>

  <div :style="{ height: height > 300 ? `${height}px` : 'auto' }"
       ref="carouselWrapper"
       class="products-carousel">

    <div class="products-carousel_switch">
      <button-switch
          :active="this.sort === null"
          @pressed="() => {
            if (this.sort !== null) {
              this.sort = null
              this.collectProducts()
            }
          }"
      >
        <template #text>
          Рекомендации
        </template>
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none">
            <path d="M8.42682 0.307982L7.39447 6.04637C7.37107 6.16978 7.43541 6.29318 7.54069 6.33865L11.9596 8.18C12.1146 8.24495 12.1614 8.46253 12.0473 8.59893L4.21553 17.9161C4.05469 18.1077 3.77101 17.9453 3.8178 17.6888L4.85015 11.9504C4.87355 11.827 4.80921 11.7036 4.70392 11.6581L0.285003 9.82C0.130004 9.75505 0.0832122 9.53747 0.197268 9.40107L8.02908 0.0839021C8.18993 -0.107702 8.47361 0.0546743 8.42682 0.311229V0.307982Z" fill="#8654CC"/>
          </svg>
        </template>
      </button-switch>

      <button-switch
          :active="this.sort === 'newest'"
          @pressed="() => {
            if (this.sort !== 'newest') {
              this.sort = 'newest'
              this.collectProducts()
            }
          }"
      >
        <template #text>
          Новые
        </template>
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M11.0999 7.24085C10.795 6.45946 10.3518 5.75812 9.79807 5.18072L9.3411 4.70324C9.32558 4.68747 9.30691 4.67628 9.28671 4.67065C9.26651 4.66502 9.24541 4.66512 9.22525 4.67095C9.2051 4.67678 9.1865 4.68815 9.17111 4.70407C9.15571 4.71999 9.14398 4.73997 9.13695 4.76225L8.93281 5.42929C8.80561 5.84776 8.57163 6.27516 8.24028 6.69542C8.2183 6.72224 8.19317 6.72939 8.1759 6.73118C8.15863 6.73297 8.13193 6.72939 8.10837 6.70436C8.08639 6.6829 8.0754 6.65071 8.07697 6.61852C8.13507 5.54196 7.85241 4.32769 7.23369 3.00613C6.72175 1.90811 6.01039 1.05151 5.12157 0.45421L4.47301 0.0196502C4.38821 -0.0375757 4.27986 0.0375333 4.28457 0.150197L4.31912 1.00859C4.34267 1.59515 4.283 2.11376 4.14167 2.54475C3.96893 3.0723 3.72082 3.56229 3.4036 4.00222C3.18285 4.30795 2.93264 4.58449 2.65769 4.82663C1.99548 5.40634 1.45702 6.14915 1.08263 6.99943C0.709157 7.85713 0.514616 8.80144 0.51416 9.75879C0.51416 10.6029 0.660203 11.4201 0.949147 12.1909C1.22815 12.933 1.63077 13.6065 2.13476 14.1741C2.64356 14.7464 3.23401 15.197 3.89198 15.51C4.57352 15.8355 5.29588 16 6.04179 16C6.78771 16 7.51007 15.8355 8.1916 15.5118C8.84796 15.2007 9.44481 14.7469 9.94882 14.1759C10.4576 13.6037 10.8565 12.9348 11.1344 12.1927C11.4229 11.424 11.571 10.5965 11.5694 9.76058C11.5694 8.88789 11.4124 8.04023 11.0999 7.24085Z" fill="#FFC700"/>
          </svg>
        </template>
      </button-switch>
    </div>

    <transition-group
        v-if="!loading && Object.keys(productsStore.products).length > 0"
        name="list">
      <div
          ref="carouselItemsWrapper"
          class="products-carousel_items"
          :style="carousel.styles"
      >
        <router-link
            :to="`/project/${item.ProjectId}`"
            @click="() => {
              highlightedProject.push(item)
            }"
            v-for="item in productsStore.products"
            class="products-carousel_items_item">
          <services-card
              ref="sliderItem"
              :item="item"
          >
          </services-card>
        </router-link>
      </div>
    </transition-group>

    <base-loader v-else />

    <div class="products-carousel_navigation">
      <div class="next"
           @click="next">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
          <path d="M1 1L11 11L1 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>

      <div class="prev"
           @click="prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
          <path d="M11 21L1 11L11 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>


    </div>
  </div>

</template>

<script>
import {ref, watch} from 'vue'
import servicesCard from "./ProductCard.vue";
import 'vue3-carousel/dist/carousel.css'
import {productsStore} from "../Store/productsStore.js";
import {getProducts} from "../API/products.js";
import buttonSwitch from "../components/Buttons/ButtonSwitch.vue";
import baseLoader from "../Layouts/BaseLoader.vue";
import {highlightedProject} from "../Store/highlightedProject.js";



export default {
  name: "Recommended.vue",
  components: {
    servicesCard,
    buttonSwitch,
    baseLoader

  },
  data() {
    return {
      carousel: {
        wrapperWidth: 0,
        slideStep: 0,
        styles: {}
      },
      loading: false,
      sort: null,
      productsStore,
      height: null,
      highlightedProject
    }
  },
  setup() {
    watch(productsStore, (value, oldValue) => {
    }, {immediate: true})

  },

  methods: {
    next() {
      this.carousel.wrapperWidth = this.$refs.carouselItemsWrapper.scrollWidth
      this.carousel.slideStep = this.$refs.carouselItemsWrapper.scrollWidth / Object.keys(productsStore.products).length

      this.carousel.styles = {
        transform: `translateX(-${this.carousel.slideStep}px)`,
        transition: `.15s ease`
      }

      this.afterTransition(() => {
        const product = productsStore.products.shift()
        productsStore.products.push(product)
        this.resetTranslate()
      })

    },
    prev() {
      this.carousel.wrapperWidth = this.$refs.carouselItemsWrapper.scrollWidth
      this.carousel.slideStep = this.$refs.carouselItemsWrapper.scrollWidth / Object.keys(productsStore.products).length

      this.carousel.styles = {
        transform: `translateX(${this.carousel.slideStep}px)`,
        transition: `.15s ease`
      }

      this.afterTransition(() => {
        const product = productsStore.products.pop()
        productsStore.products.unshift(product)
        this.resetTranslate()
      })
    },

    afterTransition (callback) {
      const listener = () => {
        callback()
        this.$refs.carouselItemsWrapper.removeEventListener('transitionend', listener)
      }
      this.$refs.carouselItemsWrapper.addEventListener('transitionend', listener)
    },

    resetTranslate () {
      this.carousel.slideStep = 0
      this.carousel.styles = {
        transform: `translateX(${this.carousel.slideStep}px)`,
        transition: `none`
      }
    },

    collectProducts () {
      this.getHeight()
      productsStore.products.splice(0, productsStore.products.length)

      if (Object.keys(productsStore.products).length <= 0) {
        getProducts({sort: this.sort || 'random'}).then(result => {

          for (const item of result.data.products) {
            productsStore.products.push(item)
          }


        }).catch(e => e)
      }
    },

    getHeight() {
      this.height = this.$refs.carouselWrapper.clientHeight
    }

  },
  mounted() {
    this.collectProducts()
  },

}
</script>

<style scoped lang="scss">

.products-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
  height: v-bind(height + 'px');

  .products-carousel_switch {

    display: flex;
    gap: 20px;
    align-items: center;
  }

  .products-carousel_items {
    display: flex;
    gap: 28px;
    position: relative;

    .products-carousel_items_item {
      width: 210px;

    }
  }
  .products-carousel_navigation {


    .prev, .next {
      position: absolute;
      top: 50%;
      transform: translateY(-100%);
      background-color: rgba(255,255,255, .3);
      padding: 5px 10px 5px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      transition: .15s ease;
      cursor: pointer;

      &:hover {
        background-color: rgba(255,255,255, .8);
      }
    }
    .prev {
      left: 10px;
    }
    .next {
      right: 10px;
    }
  }
}

@media screen and (max-width: 500px){
  .products-carousel .products-carousel_items .products-carousel_items_item {
    width: 175px;
  }
}
</style>