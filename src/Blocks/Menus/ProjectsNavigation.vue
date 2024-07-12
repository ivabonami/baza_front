<template>
<div class="project-navigation">
  <menu-main
      :activeCategory="currentCategory"
      @projectsCategory="emit => {
        $emit('categoryChanged', emit)
        this.currentCategory = emit
      }"/>

  <sort
      :sort="$props.sort"
      @sortChanged="(emit) => {
                $emit('sortChanged', emit)
              }"
  />


</div>
</template>

<script>
import menuMain from "./MenuMain.vue";
import sort from "../../Helpers/Sort.vue";

export default {
  name: "ProjectsNavigation.vue",
  props: {
    sort: {
      name: 'Популярные',
      sort: 'popularity'
    },

  },
  data() {
    return {
      currentCategory: 0,
    }
  },

  components: {menuMain, sort},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.project-navigation {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  gap: 40px;


}
@media screen and (max-width: 500px){

  .project-navigation {
    flex-wrap: wrap;
    gap: 0;
    align-items: center;
    justify-content: space-between;
    margin-top: -20px;

    .categories-menu {
      margin-bottom: 0;
      width: 80%;
    }
    .filter {
      width: 15%;
    }
  }

}
</style>