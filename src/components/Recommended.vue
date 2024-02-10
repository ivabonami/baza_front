<template>
  <div class="tabs">
    <div class="tabs-links">
      <button
         v-on:click="switchTabs('recommended')"
         class="recommended active">
        Рекомендовано
      </button>
      <button
         v-on:click="switchTabs('fresh')"
         class="fresh">
        Новое
      </button>
    </div>
    <div class="tabs-content" >
      <div class="shop-view"
           v-for="(item, index, selectedId) in this.recommendedShops"
           v-if="this.tab === 'recommended'"



      >
        <services-card
            v-on:click="$router.push(`/project/id2/`);"
            v-bind:tab="description"
            v-bind:selectedId="1"

        >
          <img :src="item.image" alt="" >
          <div class="shop-heading">
            <span>{{ item.name }}</span>
          </div>
        </services-card>

      </div>

      <div class="shop-view"
           v-for="(item, index) in this.recommendedShops"
           v-if="this.tab === 'fresh'"
           v-on:click="$router.push(`/project/id${item.id}`)">
        <img :src="item.image" alt=""v-if="index < 4">
        <div class="shop-heading"v-if="index < 4">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
import ProjectsView from "../views/project/ProjectsView.vue";
import ServicesCard from "../views/project/ServicesCard.vue";

export default {
  name: "Recommended.vue",
  components: {},


  data() {
    return {
      recommendedShops: ref(null),
      tab: 'recommended'
    }
  }, methods: {
    switchTabs(tab) {
      if (tab === 'recommended') {
        this.tab = 'recommended'
        document.querySelector('.recommended').classList.add('active')
        document.querySelector('.fresh').classList.remove('active')

      } else if (tab === 'fresh') {
        this.tab = 'fresh'
        document.querySelector('.recommended').classList.remove('active')
        document.querySelector('.fresh').classList.add('active')

      }
    },

  },
  created() {


  },

  mounted() {
    fetch('https://run.mocky.io/v3/6bab9566-ba3c-4c66-aa0d-62fa77e610e8')
        .then((res) => res.json())
        .then((json) => {
          this.recommendedShops = json
        })

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
    max-width: 230px;

    img {
      width: 100%;
      border-radius: 15px;

    }
    .shop-heading {
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      margin-top: 10px;
    }
  }
}

</style>