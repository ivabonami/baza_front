<template>
  <div class="service-card">
    <div class="image">
      <img :src="$props.image" alt="">
    </div>
    <div class="service-header">
      {{ $props.name }}
    </div>
    <div class="service-description">
      {{ $props.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicesCard.vue",
  props: ['name', 'description', 'image'],

  data() {
    return {
      project: {
        name: '',
        description: '',
        image: ''
      }

    }
  },
  setup(props){

  }
}
</script>

<style scoped lang="scss">
.service-card {
  width: 30%;
  margin-bottom: 20px;
  padding: 5px;

  .image {
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .service-header {
    margin-top: 10px;
    margin-bottom: 10px;
    color: var(--secondary, #2B2B2B);
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 100% */

  }
  .service-description {
    color: var(--secondary, #2B2B2B);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
}
</style>