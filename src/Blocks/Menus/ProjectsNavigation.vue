<template>
<div class="project-navigation">
  <menu-main
      v-if="categoriesStore.categories"
      :categories="categoriesStore.categories"
      :activeCategory="currentCategory"
      @projectsCategory="emit => {
        $emit('categoryChanged', emit)
        this.currentCategory = emit
      }"/>

  <div v-else-if="!categoriesStore.categories">
    <h4 style="text-align: left; ">Произошла ошибка получения категорий, перезагрузите страницу</h4>

  </div>



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
import {categoriesStore} from "../../Store/categories.js";

export default {
  name: "ProjectsNavigation.vue",
  props: {
    sort:  {
      name: 'С наибольшим количеством оценок',
      sort: 'highestRatingCount'
    },

  },
  data() {
    return {
      currentCategory: 0,
      categoriesStore
    }
  },

  components: {menuMain, sort},


  mounted() {

  }

}
</script>

<style scoped lang="scss">
.project-navigation {
  box-sizing: border-box;
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;

  .categories-menu {
    margin-bottom: 0;
    flex-basis: 84%;
  }
  .filter {
    flex-basis: 15%;
    justify-content: end;
    display: flex;
  }


}
@media screen and (max-width: 600px){

  .project-navigation {
    margin-top: 20px;
    flex-wrap: wrap;
    gap: 0;
    align-items: center;
    justify-content: space-between;

    .categories-menu {
      margin-bottom: 0;
      flex-basis: 79%;
    }
    .filter {
      padding-left: 0;
      flex-basis: 20%;
    }
  }

}
</style>