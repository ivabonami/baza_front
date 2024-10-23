<template>
  <div class="search">
    <input-search @projectSelected="emit => this.$router.push('/project/' + emit.id)" />
  </div>
</template>

<script setup>
import InputSearch from "@/components/Inputs/InputSearch.vue";

</script>

<style scoped lang="scss">
.search {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>