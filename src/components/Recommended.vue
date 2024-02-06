<template>
  <div class="tabs">
    <div class="tabs-links">
      <button
         v-on:click="switchTabs('recommended')"
         class="recommended active">
        Рекомендовано для вас
      </button>
      <button
         v-on:click="switchTabs('fresh')"
         class="fresh">
        Свежее
      </button>
    </div>
    <div class="tabs-content" >
      <div class="shop-view"
           v-for="item in this.recommendedShops"
           v-if="this.tab === 'recommended'"
           v-on:click="$router.push(`/project/id${item.id}`)"
      >
        <img :src="item.image" alt="">
        <div class="shop-heading">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="shop-view"
           v-for="item in this.freshShops"
           v-if="this.tab === 'fresh'"
           v-on:click="$router.push(`/project/id${item.id}`)">
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
          name: 'Space X',
          id: 1
        },{
          image: "https://media.istockphoto.com/id/1035676256/photo/background-of-galaxy-and-stars.jpg?s=612x612&w=0&k=20&c=dh7eWJ6ovqnQZ9QwQQlq2wxqmAR7mgRlQTgaIylgBwc=",
          name: 'Взлом аккаунтов',
          id: 2
        },{
          image: "https://media.istockphoto.com/id/1035676256/photo/background-of-galaxy-and-stars.jpg?s=612x612&w=0&k=20&c=dh7eWJ6ovqnQZ9QwQQlq2wxqmAR7mgRlQTgaIylgBwc=",
          name: 'Документы',
          id: 3
        },
      ],
      freshShops: [
        {
          image: "https://res.cloudinary.com/momentum-media-group-pty-ltd/image/upload/v1686795211/Space%20Connect/space-exploration-sc_fm1ysf.jpg",
          name: 'Ебать магазик',
          id: 4
        },{
          image: "https://res.cloudinary.com/momentum-media-group-pty-ltd/image/upload/v1686795211/Space%20Connect/space-exploration-sc_fm1ysf.jpg",
          name: 'Лучший обнал',
          id: 5
        },{
          image: "https://res.cloudinary.com/momentum-media-group-pty-ltd/image/upload/v1686795211/Space%20Connect/space-exploration-sc_fm1ysf.jpg",
          name: 'Крипта дешево',
          id: 6
        },

      ],
      tab: 'recommended'
    }
  }, methods: {
    switchTabs(tab) {
      if (tab === 'recommended') {
        this.tab = 'recommended'
        document.querySelector('.recommended').classList.add('active')
        document.querySelector('.fresh').classList.remove('active')

      } else if (tab === 'fresh') {
        this.tab = 'fresh'
        document.querySelector('.recommended').classList.remove('active')
        document.querySelector('.fresh').classList.add('active')

      }
    }
  }
}
</script>

<style scoped lang="scss">
.tabs-links {
  margin-top: 30px;
  color: #000;
  border-bottom: 1px solid #000;
  width: fit-content;

  button {
    &.recommended {
      margin-right: 30px;
    }
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    background-color: transparent;
    border: none;
    border-bottom: 5px solid transparent;
    cursor: default;
    transition: .3s ease;

    &:hover {
      opacity: .8;
    }
    &.active {
      border-bottom-color: #6C7AFF;
    }

  }
}
.tabs-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;

  .shop-view {
    max-width: 32%;
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