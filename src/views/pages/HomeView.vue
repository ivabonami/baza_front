<template>
  <div class="wrapper">

    <recommended></recommended>
  </div>

  <div class="projects-wrapper">
    <projects-sort-filter>

    </projects-sort-filter>
    <shops-row></shops-row>
  </div>





</template>

<script>
import recommended from "../../components/Recommended.vue";
import ShopsRow from "../../components/ShopsRow.vue";
import ProjectsSortFilter from "../../components/ProjectsSortFilter.vue";
export default {
  name: "HomeView.vue",
  components: { recommended, ShopsRow, ProjectsSortFilter },
  mounted() {

  },
  methods: {

  }

}
</script>

<style scoped lang="scss">


</style>