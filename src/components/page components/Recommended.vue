<template>
  <div class="tabs">
    <div class="tabs-links">
      <button
         v-on:click=" () => {
           getProducts('random')
           switchTabs('recommended')
         }"
         class="recommended"
        :class="{
           active: this.tab === 'recommended'
        }">
        Рекомендации
      </button>
      <button
         v-on:click=" () => {
           getProducts('newest')
           switchTabs('fresh')
         }"
         class="fresh"
         :class="{
           active: this.tab === 'fresh'
        }">
        Новые
      </button>
    </div>
    <div class="tabs-content" >
      <div class="shop-view"
           v-if="this.tab === 'recommended'"
      >
        <services-card
            v-for="(item, index) in products"
            v-bind:name="item.name"
            v-bind:image="`http://62.113.96.171:3000/${item.avatarFilePath}`"
            v-bind:description="item.description"
            v-bind:id="item.id"
            v-bind:projectId="item.ProjectId"
            v-bind:isOwner="false"
            v-bind:clickable="true"



        >
        </services-card>

      </div>

      <div class="shop-view"
           v-if="this.tab === 'fresh'"
           >
        <services-card
            v-for="(item, index) in products"
            v-bind:name="item.name"
            v-bind:image="`http://62.113.96.171:3000/${item.avatarFilePath}`"
            v-bind:description="item.description"
            v-bind:id="item.id"
            v-bind:projectId="item.ProjectId"
            v-bind:isOwner="false"
            v-bind:clickable="true"



        >
        </services-card>
      </div>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
import ProjectsView from "../../views/project/ProjectsView.vue";
import servicesCard from "../../views/project/ServicesCard.vue";


export default {
  name: "Recommended.vue",
  components: {servicesCard},


  data() {
    return {
      recommendedShops: ref(null),
      tab: 'recommended',
      products: []
    }
  },
  methods: {
    switchTabs(tab) {
      this.tab = tab
    },

    getProducts(sort) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      const projectId = window.location.pathname.replace('/project/', '');

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`http://62.113.96.171:3000/products?limit=3&sort=${sort}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.products = result.products
            console.log(result.products)
          })
          .catch((error) => console.error(error));

  },

},
  mounted() {
    this.getProducts('random')
  }

}
</script>

<style scoped lang="scss">

.tabs-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
  gap: 20px;

  .shop-view {
    display: flex;
    width: 100%;

  }
}

@media screen and (max-width: 500px) {
  .tabs-content {
    .shop-view {
      flex-wrap: wrap;
    }
  }
}

</style>