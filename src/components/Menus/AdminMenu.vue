<template>
  <div class="menu-items">
    <router-link :to="item.link" class="menu-items-item"
         v-for="item of adminMenu"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'AdminMenu',
  props: {
    adminMenu: {}
  }
}
</script>
<style lang="scss" scoped >
.menu-items {
  max-width: fit-content;

  .menu-items-item {
    display: block;
  }
}
</style>
