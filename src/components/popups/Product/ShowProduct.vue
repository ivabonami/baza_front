<template>
  <div class="product-info">
    <img :src="api.url + props.data.avatarFilePath" alt="">
    <p>
      {{ props.data.description }}
    </p>
  </div>
</template>

<script setup>
import {api} from "@/API/apiurl.js";

const props = defineProps({
  data: null
})

</script>

<style scoped lang="scss">
.product-info {
  max-width: 550px;
  img {
    width: 100%;
  }
  p {
    font-size: 14px;
    word-break: break-word;
  }
}
</style>