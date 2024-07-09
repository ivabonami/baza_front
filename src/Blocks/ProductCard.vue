<template>
  <div class="service-card" :class="{highlighted: $props.highlighted}" @mouseover="highlightedProject.splice(0, highlightedProject.length)">
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
import {productsStore} from "../Store/productsStore.js";
import {highlightedProject} from "../Store/highlightedProject.js";


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

    },
    highlighted: ref(Boolean)
  },
  components: {},

  data() {
    return {
      text: null,
      api,
      highlightedProject,
      productsStore
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
  width: 190px;
  cursor: pointer;
  border-radius: 20px;
  background: #FFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  padding: 14px;
  margin-bottom: 50px;

  &.highlighted {
    background: #fff7d6;
  }

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
    font-family: "PT Sans Caption";
    -webkit-line-clamp: 3;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 65px;
    word-break: break-word;
    color: #191B2A;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
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

@media screen and (max-width: 768px){
  .service-card {
    width: 170px;
  }
}
</style>