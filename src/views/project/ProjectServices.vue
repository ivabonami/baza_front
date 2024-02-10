<template>
  <div >
    {{ this.services }}
  </div>
  <services-card >

  </services-card>

</template>

<script>
import ServicesCard from "./ServicesCard.vue";

export default {
  name: "ProjectServices.vue",
  components: {ServicesCard},
  data () {
    return {
      services: null
    }
  },

  props: ['id'],

}
</script>

<style scoped>

</style>