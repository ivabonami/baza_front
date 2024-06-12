<template>
  <div class="service-card">
    <div class="service-card_image">
      <img :src="api.url + $props.item.avatarFilePath" alt="name">
    </div>
    <div class="service-card_text">
      {{ text }}
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import {api} from "../assets/js/config.js";


export default {
  name: "ServicesCard.vue",
  props: {
    item: {
      projectId: ref(Number) ,
      UserId: ref(Number),
      avatarFilePath: ref(String),
      createdAt: ref(Date),
      updatedAt: ref(Date),
      description: ref(String),
      id: ref(Number),
      name: ref(String),

    }
  },
  components: {},

  data() {
    return {
      text: null,
      api
    }
  },
  mounted() {
    this.textTransform()
  },
  watch: {
    item: function(newVal, oldVal) {
      this.textTransform()
    }
  },
  methods: {
    textTransform() {
      this.text = this.$props.item.name.substring(0,90)
      this.text > 90 ? this.text += '...' : null
    }
  }
}
</script>

<style scoped lang="scss">
.service-card {
  width: 210px;
  cursor: pointer;

  .service-card_image {
    aspect-ratio: 1/1;
    border-radius: 10px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;
    background: lightgray 50% / cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-height: 100%;
      position: relative;
      scale: 1;
      transition: .15s ease;
    }


  }
  .service-card_text {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    -webkit-line-clamp: 3;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 65px;
    line-height: normal;
  }

  &:hover {
    .service-card_image {
      img {
        scale: 1.05;
      }
    }
  }

}
</style>