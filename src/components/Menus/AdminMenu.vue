<template>
  <div class="menu-items">
    <router-link :to="item.link" class="menu-items-item"
         v-for="item of adminMenu"
                 @click="$emit('close', true)"
    >
      <inline-svg :src="item.icon" class="categoryIcon" />
      {{ item.name }}
    </router-link>
  </div>
</template>
<script>

export default {
  name: 'AdminMenu',
  components: {

  },

  props: {
    adminMenu: {}
  }

}
</script>
<style lang="scss" scoped >
.menu-items {
  max-width: fit-content;
  width: 220px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 10px;

  .menu-items-item {
    transition: .3s ease;
    color: #5D599F;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover {
      color: #191B2A;


    }
  }
}
</style>
