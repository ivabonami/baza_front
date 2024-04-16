<template>
  <transition name="list">
  <div class="tabs" v-if="this.products.length > 0">
    <div class="tabs-links">
      <button
         v-on:click=" () => {
           this.products = this.products.slice(this.products.length, this.products.length)
           getProducts('random')
           this.tab = 'recommended'
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
            this.products = this.products.slice(this.products.length, this.products.length)
           getProducts('newest')
           this.tab = 'fresh'
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
      <transition-group name="list" tag="div" class="tabs-content" v-else>

        <Carousel v-bind="settings" :breakpoints="breakpoints" :wrap-around="true">
          <Slide class="shop-view" v-for="item in products" v-if="products.length > 0 && loading === false" >
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
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>


      </transition-group>

    </div>

  </div>
  </transition>
</template>

<script>
import { ref } from 'vue'
import servicesCard from "../Cards/ServicesCard.vue";
import loader from "./Loader.vue";
import config from "../../../assets/js/config.js";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

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
      recommendedShops: ref(null),
      tab: 'recommended',
      products: [],
      loading: true,
      disableSliderArrows: false,
      config,

      settings: {
        itemsToShow: 3.5,
        snapAlign: 'start',
        autoplay: 5000,
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
      this.loading = true

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      const projectId = window.location.pathname.replace('/project/', '');

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`${config.api.url}products?limit=8&sort=${sort}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            for (let product of result.products) {
              this.products.push(product)
            }

            if (this.products.length < 5) {
              this.disableSliderArrows = true
            }

            this.loading = false
          })
          .catch((error) => console.error(error));

  },

},
  mounted() {
    this.getProducts('random')


  },


}
</script>

<style scoped lang="scss">
.tabs-links {
  display: flex;

  button {
    display: flex;
    align-items: center;
    margin-right: 10px;
    svg {
      width: 15px;
      height: 15px;
      margin-right: 5px;
      path, polygon {
        stroke: black;
        fill: black;
      }
    }

    &.active {
      svg {
        path, polygon {
          stroke: white ;
          fill: white;
        }
      }
    }
  }

}
.tabs-content-wrapper {
  width: 100%;
}

.carousel__next, .carousel__prev {
  background-color: #fff!important;
  padding: 10px;
  border-radius: 200px;
}

.tabs-content {
  width: 100%;
  justify-content: start;
  margin-top: 30px;

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
    width: 25%;
    gap: 20px;
    min-height: 200px;
    color: var(--vc-clr-white);
    font-size: 20px;
    overflow-y: visible;
    border-radius: 8px;
    justify-content: start;
    align-items: stretch;
  }
}

@media screen and (max-width: 768px) {
  .tabs-content {
    flex-wrap: wrap;
    .shop-view {
      width: 100%;
    }
  }
}

</style>