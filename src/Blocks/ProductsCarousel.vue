<template>

  <div
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

        name="list">
      <div
          @mousedown="(e) => {

            this.position = e.screenX
            this.dragSlide()

          }"
          v-if="!loading && Object.keys(productsStore.products).length > 0"
          @touchstart="e => this.position = e.targetTouches[0].screenX"
          @touchend="stopDrag"
          @touchmove="e => mobileDrag(e)"
          @mouseup="stopDrag"
          @mouseleave="stopDrag"
          :key="1"
          ref="carouselItemsWrapper"
          :style="carousel.styles"
          class="products-carousel_items"


      >
        <router-link
            :to="`/project/${item.ProjectId}`"
            @click="() => {
              highlightedProject.push(item)
            }"
            :class="colClass"
            v-for="(item, index) in productsStore.products"
            v-show="index < visibleItems"
            :key="index"
            class="products-carousel_items_item">
          <div ref="sliderItem">
            <services-card

                :item="item"

            >
            </services-card>
          </div>

        </router-link>
      </div>
    </transition-group>

    <base-loader v-if="loading" />
    <div v-else-if="!loading && loadingError">
      <h4 style="text-align: center; margin-top: 85px;">Произошла ошибка получения витрин, пожалуйста повторите попытку позже или перезагрузите страницу</h4>

    </div>

    <div class="products-carousel_navigation">
      <div class="next"
           v-if="!loading && Object.keys(productsStore.products).length > 0"
           @click="next">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
          <path d="M1 1L11 11L1 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>

      <div class="prev"
           v-if="!loading && Object.keys(productsStore.products).length > 0"
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
    baseLoader,

  },
  data() {
    return {
      position: null,
      carousel: {
        wrapperWidth: 0,
        slideStep: 0,
        styles: {}
      },

      loading: false,
      loadingError: false,
      sort: null,
      productsStore,
      height: null,
      highlightedProject,
      visibleItems: 5,
      colClass: 'col-5',
    }
  },
  setup() {
    watch(productsStore, (value, oldValue) => {
    }, {immediate: true})

  },

  methods: {

    mobileDrag(e) {
      if (e.targetTouches[0].screenX - 200 > this.position) {
        this.prev()
        this.stopDrag()
        this.position = e.targetTouches[0].screenX
      } else if (e.targetTouches[0].screenX< this.position -200) {
        this.next()
        this.stopDrag()
        this.position = e.targetTouches[0].screenX
      }
      this.stopDrag()
    },
    dragSlide() {
      window.addEventListener('mousemove', this.dragToSlide)

    },
    stopDrag() {
      window.removeEventListener('mousemove', this.dragToSlide)
    },
    dragToSlide(event) {
      if (window.innerWidth > 768) {
        if (event.screenX - 200 > this.position) {
          this.prev()
          this.position = event.screenX

        } else if (event.screenX < this.position -200) {
          this.next()
          this.position = event.screenX

        }

      } else {
        if (event.screenX - 50 > this.position) {
          this.prev()
          this.position = event.screenX

        } else if (event.screenX < this.position - 50) {
          this.next()
          this.position = event.screenX

        }
      }


    },
    next() {
      this.carousel.wrapperWidth = this.$refs.carouselItemsWrapper.scrollWidth
      this.carousel.slideStep = this.$refs.sliderItem[1].scrollWidth + 20
      this.$refs.sliderItem[0].style.display = "none"

      this.carousel.styles = {
        transform: `translateX(-${this.carousel.slideStep}px)`,
        transition: `.15s ease`
      }

      this.afterTransition(() => {
        const product = productsStore.products.shift()
        productsStore.products.push(product)
        this.resetTranslate()
        this.$refs.sliderItem[0].style.display = "flex"
      })

    },
    prev() {
      this.carousel.wrapperWidth = this.$refs.carouselItemsWrapper.scrollWidth
      this.carousel.slideStep = this.$refs.sliderItem[1].scrollWidth + 20
      this.$refs.sliderItem[4].style.display = "none"

      this.carousel.styles = {
        transform: `translateX(${this.carousel.slideStep}px)`,
        transition: `.15s ease`
      }

      this.afterTransition(() => {
        const product = productsStore.products.pop()
        productsStore.products.unshift(product)
        this.resetTranslate()
        this.$refs.sliderItem[4].style.display = "flex"
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
      this.loading = true
      this.loadingError = false


      productsStore.products.splice(0, productsStore.products.length)

      if (Object.keys(productsStore.products).length <= 0) {
        getProducts({sort: this.sort|| 'random', limit: 50}).then(result => {

          for (const item of result.data.products) {
            productsStore.products.push(item)
          }
          this.loading = false
          this.loadingError = false

        }).catch(e => e)
      }
    },

    getHeight() {
      if (this.$refs.carouselItemsWrapper) {
        this.height = this.$refs.carouselWrapper.offsetHeight.toString() + 'px'
        this.$refs.carouselItemsWrapper.style.display = 'none'
      }


    },

    setVisibleItems(width) {
      if (width >= 1000) {
        this.visibleItems = 5
        this.colClass = 'col-5'
      } else if (width < 1000 && width >= 800) {
        this.visibleItems = 4
        this.colClass = 'col-4'
      } else if (width < 800 && width >= 500) {
        this.visibleItems = 3
        this.colClass = 'col-3'
      } else if (width < 500) {
        this.visibleItems = 2
        this.colClass = 'col-2'
      }
    }

  },
  mounted() {
    this.collectProducts()

    window.addEventListener("resize", e => this.setVisibleItems(e.target.innerWidth));
    this.setVisibleItems(window.innerWidth)
  },
  beforeUnmount() {
    window.removeEventListener("resize", e => this.setVisibleItems(e.target.innerWidth));
  }

}
</script>

<style scoped lang="scss">

.products-carousel {
  width: 100%;
  position: relative;
  min-height: v-bind(height);

  .products-carousel_switch {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 10px;
  }

  .products-carousel_items {
    margin-top: 10px;
    display: flex;
    position: relative;
    align-items: stretch;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-sizing: border-box;
    gap: 10px;
    cursor: grab;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */


    .products-carousel_items_item {
      box-sizing: border-box;
      min-width: 0;

      &.col-5 {
        flex-basis: 18%;
      }
      &.col-4 {
        flex-basis: 23%;
      }
      &.col-3 {
        width: 32%;
      }
      &.col-2 {
        flex-basis: 48%;
      }

    }
  }
  .products-carousel_navigation {


    .prev, .next {
      position: absolute;
      top: 50%;
      background-color: rgba(255,255,255, .7);
      z-index: 1;
      padding: 5px 10px 5px 10px;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      transition: .15s ease;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      svg {
        width: 11px;
      }

      &:hover {
        background-color: rgba(255,255,255, 1);
      }
    }
    .prev {
      left: -8px;
    }
    .next {
      right: -8px;
    }
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

}
</style>