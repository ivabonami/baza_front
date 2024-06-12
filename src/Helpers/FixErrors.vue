<template>
  <div class="errors" v-if="Object.keys($props.errors).length > 0">
    <h2>Исправьте ошибки</h2>
    <ul>
      <li v-for="error of $props.errors">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FormErrors.vue",
  props: ['errors'],
  data() {
    return {
    }
  },
  components: {},
  mounted() {
    console.log('errors', this.$props.errors)
  },
}
</script>

<style scoped lang="scss">
.errors {
  margin-top: 10px;
}

h2 {
  font-family: "PT Sans Caption";
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #984a5a;
}

ul {
  list-style: -moz-ethiopic-numeric;
  padding-left: 20px;

  li {
    color: #984a5a;
  }

}
.errors {
  margin-bottom: 10px;
}

</style>