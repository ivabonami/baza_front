<template>
<h1>Главная</h1>
  <recommended></recommended>
</template>

<script>
import recommended from "../components/Recommended.vue";
export default {
  name: "HomeView.vue",
  components: { recommended },
  mounted() {
    this.getShops()
  },
  methods: {
    async getShops(count) {
      const response = fetch('.//assets/response.json').then( res => {
        console.log(res)
        // res.json()
      })
      // console.log(response)
    }
  }

}
</script>

<style scoped>

</style>