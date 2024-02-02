<template>
  <div class="tabs">
    <div class="tabs-links">
      <button
         v-on:click="this.tab = 'recommended'"
         class="recommended">
        Рекомендованное
      </button>
      <button
         v-on:click="this.tab = 'fresh'"
         class="fresh">
        Свежее
      </button>
    </div>
    <div class="tabs-content" >
      <div class="shop-view" v-for="item in this.recommendedShops" v-if="this.tab === 'recommended'">
        <img :src="item.image" alt="">
        <div class="shop-heading">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="shop-view" v-for="item in this.freshShops" v-if="this.tab === 'fresh'">
        <img :src="item.image" alt="">
        <div class="shop-heading">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommended.vue",


  data() {
    return {
      recommendedShops: [
        {
          image: "https://media.istockphoto.com/id/1035676256/photo/background-of-galaxy-and-stars.jpg?s=612x612&w=0&k=20&c=dh7eWJ6ovqnQZ9QwQQlq2wxqmAR7mgRlQTgaIylgBwc=",
          name: 'Space X'
        },{
          image: "https://media.istockphoto.com/id/1035676256/photo/background-of-galaxy-and-stars.jpg?s=612x612&w=0&k=20&c=dh7eWJ6ovqnQZ9QwQQlq2wxqmAR7mgRlQTgaIylgBwc=",
          name: 'Взлом аккаунтов'
        },{
          image: "https://media.istockphoto.com/id/1035676256/photo/background-of-galaxy-and-stars.jpg?s=612x612&w=0&k=20&c=dh7eWJ6ovqnQZ9QwQQlq2wxqmAR7mgRlQTgaIylgBwc=",
          name: 'Документы'
        },
      ],
      freshShops: [
        {
          image: "https://res.cloudinary.com/momentum-media-group-pty-ltd/image/upload/v1686795211/Space%20Connect/space-exploration-sc_fm1ysf.jpg",
          name: 'Ебать магазик'
        },{
          image: "https://res.cloudinary.com/momentum-media-group-pty-ltd/image/upload/v1686795211/Space%20Connect/space-exploration-sc_fm1ysf.jpg",
          name: 'Лучший обнал'
        },{
          image: "https://res.cloudinary.com/momentum-media-group-pty-ltd/image/upload/v1686795211/Space%20Connect/space-exploration-sc_fm1ysf.jpg",
          name: 'Крипта дешево'
        },

      ],
      tab: 'recommended'
    }
  }
}
</script>

<style scoped lang="scss">
.tabs-links {
  margin-top: 30px;
}
.tabs-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;

  .shop-view {
    max-width: 30%;
    img {
      width: 100%;

      border-radius: 15px;

    }
    .shop-heading {
      font-family: Montserrat;
      font-size: 26px;
      font-style: normal;
      font-weight: 600;
      margin-top: 10px;
    }
  }
}

</style>