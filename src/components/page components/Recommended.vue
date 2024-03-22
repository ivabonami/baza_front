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
    <div class="tabs-content-wrapper" >
      <loader v-if="loading === true"></loader>
      <transition-group name="list" tag="div" class="tabs-content" v-else>
        <div class="shop-view" v-for="item in products" v-if="products.length > 0 && loading === false"
        >
          <services-card

              v-bind:name="item.name"
              v-bind:image="`http://62.113.96.171:3000/${item.avatarFilePath}`"
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
  </transition>
</template>

<script>
import { ref } from 'vue'
import servicesCard from "../../views/project/ServicesCard.vue";
import loader from "../reusable/loader.vue";



export default {
  name: "Recommended.vue",
  components: {servicesCard, loader},


  data() {
    return {
      recommendedShops: ref(null),
      tab: 'recommended',
      products: [],
      loading: true,
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

      fetch(`http://62.113.96.171:3000/products?limit=4&sort=${sort}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            for (let product of result.products) {
              this.products.push(product)
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

.tabs-content {
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
  min-height: 270px;
  gap: 20px;
  display: flex;
  flex-wrap: nowrap;


  .shop-view {
    display: flex;
    width: 100%;
    flex-basis: 24%;
    gap: 20px;

  }
}

@media screen and (max-width: 500px) {
  .tabs-content {
    flex-wrap: wrap;
    .shop-view {
      flex-wrap: wrap;
      width: 100%;
      flex-basis: 100%;
    }
  }
}

</style>