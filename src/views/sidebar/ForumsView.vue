<template>
<h1>Форумы</h1>
  <div class="wrapper">

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
  name: "ForumsView.vue",
  components: { recommended, ShopsRow },
}
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>