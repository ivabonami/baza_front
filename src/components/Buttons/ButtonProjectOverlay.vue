<template>
  <button
      @click="$emit('pressed', true)"
      class="project-overlay_item">

    <slot name="icon"/>

  </button>
</template>

<script>
export default {
  name: "ButtonProjectOverlay.vue",
  data() {
    return {}
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">

</style>