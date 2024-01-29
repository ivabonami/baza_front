<template>
  <div class="links justify-between">
    <router-link to="/about-project"
                 class="link"
                 v-slot="{isActive, isExactActive}">О проекте</router-link>
    <router-link to="/advertisement" class="link">Реклама</router-link>
    <router-link to="/guarantee" class="link">Гарант</router-link>
    <router-link to="/contacts" class="link">Контакты</router-link>
  </div>

</template>

<script>
export default {
  name: "TopMenu.vue",
  components: 'TopMenu'
}
</script>

<style scoped>

</style>