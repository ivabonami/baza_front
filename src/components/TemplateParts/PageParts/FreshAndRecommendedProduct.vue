<template>
  <div class="row">

      <div class="tabs">
        <div class="tabs-links">
          <button
              v-on:click=" () => {
                 if(this.tab === 'fresh') {
                   getProducts('random')
                   this.tab = 'recommended'
                 }
         }"
              class="recommended"
              :class="{
           active: this.tab === 'recommended'
        }">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.96 55.43">

              <path class="b"
                    d="M28.36,.95l-3.53,17.67c-.08,.38,.14,.76,.5,.9l15.11,5.67c.53,.2,.69,.87,.3,1.29L13.96,55.17c-.55,.59-1.52,.09-1.36-.7l3.53-17.67c.08-.38-.14-.76-.5-.9L.52,30.24c-.53-.2-.69-.87-.3-1.29L27,.26c.55-.59,1.52-.09,1.36,.7Z"/>
            </svg>
            Рекомендации
          </button>
          <button
              v-on:click=" () => {
                  if(this.tab === 'recommended') {
                   getProducts('fresh')
                   this.tab = 'fresh'
                 }
         }"
              class="fresh"
              :class="{
           active: this.tab === 'fresh'
        }">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024">
              <path d="M834.1 469.2A347.49 347.49 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 0 1-47.5 46.1 352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9z"/>
            </svg>

            Новые
          </button>
        </div>
        <div class="tabs-content-wrapper" ref="productsWrapper">
          <loader v-if="loading === true"></loader>

          <transition-group name="list" tag="div" class="tabs-content">

            <div class="shop-view" v-for="item in products" v-if="products.length <= 5 || loading === false" >
              <services-card
                  ref="sliderItem"
                  v-bind:name="item.name"
                  v-bind:image="`${config.api.url}${item.avatarFilePath}`"
                  v-bind:id="item.id"
                  v-bind:projectId="item.ProjectId"
                  v-bind:isOwner="false"
                  v-bind:clickable="true"
              >
              </services-card>
            </div>

          </transition-group>

        </div>

      </div>
  </div>

</template>

<script>
import { ref } from 'vue'
import servicesCard from "../Cards/ServicesCard.vue";
import loader from "./Loader.vue";
import config from "../../../assets/js/config.js";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {useFetch} from "../../../assets/js/fetchRequest.js";

export default {
  name: "Recommended.vue",
  components: {servicesCard,
    loader,
    Carousel,
    Slide,
    Pagination,
    Navigation,},


  data() {
    return {
      clicked: false,
      tab: 'recommended',
      products: [],
      loading: true,
      disableSliderArrows: false,
      config,

      settings: {
        itemsToShow: 3.5,
        snapAlign: 'start',
        autoplay: 5000,
        itemsToScroll: 1,
      },
      breakpoints: {
        320: {
          itemsToShow: 2,
          snapAlign: 'start',
        },
        400: {
          itemsToShow: 2,
          snapAlign: 'start',
        },
        // 700px and up
        768: {
          itemsToShow: 2.3,
          snapAlign: 'start',
        },
        // 1024 and up
        1024: {
          itemsToShow: 3.5,
          snapAlign: 'start',
        },
      },
    }
  },
  methods: {


    switchTabs(tab) {
      this.tab = tab
    },

    getProducts(sort) {

      this.products.splice(0, this.products.length)


      useFetch('products?limit=8&sort=' + sort, 'GET')
          .then(result => {
            this.loading = true

            for (let product of result.products) {
              this.products.push(product)

            }
            this.loading = false

          })

  },

},
  mounted() {
    this.getProducts('random')


  },


}
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  height: 340px;
}
.tabs-links {
  display: flex;
  margin-top: 12px;

  button {
    color: #000;
    font-family: "PT Sans Caption", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: flex;
    justify-content: start;
    align-items: center;
    text-transform: capitalize;

    border: 2px solid transparent;
    opacity: .6;
    padding: 10px;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;

    svg {
      width: 15px;
      height: 15px;
      margin-right: 12px;
      path, polygon {
        stroke: black;
        fill: black;
      }
    }
    &:hover {
      opacity: .8;
    }
    &.recommended {
      svg {
        path {
          fill: blueviolet;
        }
      }
    }

    &.fresh {
      svg {
        path {
          fill: darkorange;
        }
      }
    }

    &.active {
      cursor: default;
      opacity: 1;
      svg {
      }
    }
  }

}
.tabs-content-wrapper {
  width: 100%;
  height: 300px;
}

.carousel__next, .carousel__prev {
  background-color: #fff!important;
  padding: 10px;
  border-radius: 200px;
}

.tabs-content {
  width: 100%;
  justify-content: start;
  margin-top: 10px;

  gap: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  left: v-bind('margin');
  transition: .3s ease;



  .carousel {
    width: 100%;


  }


  .shop-view {
    display: flex;

    gap: 20px;
    min-height: 200px;
    color: var(--vc-clr-white);
    font-size: 20px;
    overflow-y: visible;
    border-radius: 8px;
    justify-content: start;
    align-items: stretch;


  }
  &.static-banner {
    display: flex;
    flex-wrap: wrap;
    .shop-view {

    }
  }


}

@media screen and (max-width: 768px) {
  .tabs-content {
    flex-wrap: wrap;
    .shop-view {
      width: 100%;
    }

    &.static-banner {
      display: flex;
      flex-wrap: wrap;
      .shop-view {
        width: 47%;
      }
    }
  }


}

</style>