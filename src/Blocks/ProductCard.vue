<template>
  <div class="service-card" :class="{highlighted: false}">
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
      productsStore
    }
  },
  mounted() {
    this.textTransform()
    //todo highlight
    console.log(productsStore.products.find(product => product.id = this.$props.item.id))
  },
  watch: {
    item: function(newVal, oldVal) {
      this.textTransform()
      console.log(productsStore.products.find(product => product.id = this.$props.item.id))
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
  width: 208px;
  cursor: pointer;
  border-radius: 20px;
  background: #FFF;

  padding: 14px;

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
    width: 190px;
  }
}
</style>