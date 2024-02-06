<template>
  <div class="wrapper">
    <h1>Главная</h1>
    <recommended></recommended>
  </div>

  <div class="projects-wrapper">
    <shops-row></shops-row>
  </div>





</template>

<script>
import recommended from "../../components/Recommended.vue";
import ShopsRow from "../../components/ShopsRow.vue";
export default {
  name: "HomeView.vue",
  components: { recommended, ShopsRow },
  mounted() {

  },
  methods: {

  }

}
</script>

<style scoped lang="scss">
.projects-wrapper {
  margin-top: 50px;

}

</style>