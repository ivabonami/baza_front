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
      sort: 'newest'
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
}
</style>