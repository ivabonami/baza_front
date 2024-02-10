<template>
<h1>Обменники</h1>
  <div class="wrapper">

    <recommended></recommended>
  </div>

  <div class="projects-wrapper">
    <shops-row></shops-row>
  </div>
</template>

<script>
import recommended from "../../components/Recommended.vue";
import shopsRow from "../../components/ShopsRow.vue";
export default {
  name: "ExchangersView.vue",
  components: {recommended, shopsRow}
}
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>