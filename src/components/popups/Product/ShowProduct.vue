<template>
  <div class="product-info">
    <img :src="api.url + props.data.avatarFilePath" alt="">
    <p v-html="wrapLinks(props.data.description)">

    </p>
  </div>
</template>

<script setup>
import {api} from "@/API/apiurl.js";

const props = defineProps({
  data: null
})

const wrapLinks = (text) => {

    let wrappedText = text;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a class="link-in-description" href="' + url + '">' + url + '</a>';
    })

}

</script>

<style scoped lang="scss">
.product-info {
  max-width: 350px;
  white-space: pre-line;
  img {
    width: 100%;
    max-width: 350px;
    margin-bottom: 20px;
  }
  p {
    font-size: 14px;
    word-break: break-word;

    a {
      background-color: #e7e7e7;
    }
  }
}
</style>