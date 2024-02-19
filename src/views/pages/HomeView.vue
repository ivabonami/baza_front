<template>
  <div class="wrapper">

    <recommended></recommended>
  </div>

<!--  <modal-window-backdrop-->
<!--  v-bind:icon-type="'ok'"-->
<!--  v-bind:heading="'Проект успешно добавлен'"-->
<!--  v-bind:descriptionType="'text'"-->
<!--  v-bind:description="'Проект появится в результатах поиска после одобрения модератором.\n'+-->
<!--  '\n'+-->
<!--  'Так же после одобрения проекта вы сможете добавлять, редактировать и удалять услуги и ссылки проекта '"-->
<!--  >-->

<!--  </modal-window-backdrop>-->



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
import ModalWindowBackdrop from "../../components/ModalWindowBackdrop.vue";

export default {
  name: "HomeView.vue",
  components: { recommended, ShopsRow, ProjectsSortFilter, ModalWindowBackdrop },
  mounted() {

  },
  methods: {

  }

}
</script>

<style scoped lang="scss">


</style>