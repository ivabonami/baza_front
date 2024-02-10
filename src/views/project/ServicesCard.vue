<template>
  <div class="service-card" v-if="$props.name !== ''">
    <div class="image">
      <img :src="$props.image" alt="">
    </div>
    <div class="service-header"
         >
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
  props: ['name', 'image', 'description'],

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
  width: 29%;
  margin-bottom: 5px;
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
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 100% */
    &.highlight {
      background-color: #0a58ca;
    }

  }
  .service-description {
    color: var(--secondary, #2B2B2B);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
}
</style>