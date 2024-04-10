<template>
  <transition name="list">
  <div class="tabs">
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