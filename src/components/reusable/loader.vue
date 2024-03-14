<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: "loader.vue",
  data() {
    return {}
  },
  components: {},
  mounted() {

  },
}
</script>

<style scoped lang="scss">
.loader {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #050000; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 20px auto;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>