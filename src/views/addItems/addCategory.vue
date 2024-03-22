<template>
  <div class="form-wrapper">
    <loading v-model:active="isLoading"
             v-bind:color="red"
             :is-full-page="fullPage"/>
    <h1><button
        v-on:click="this.$router.go(-1)"
        class="back">
      <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.52 137.91"><path d="M26.75,68.29c14.02,13.92,26.77,26.57,39.5,39.23,3.54,3.52,7.15,6.98,10.53,10.65,4.87,5.29,4.82,11.95,.1,16.49-4.67,4.49-11.53,4.36-16.53-.62C41.46,115.25,22.61,96.41,3.83,77.51c-4.97-5-5.17-11.48-.22-16.49C22.7,41.7,41.91,22.5,61.2,3.38c4.71-4.67,11.74-4.38,16.15,.11,4.28,4.36,4.32,11.35-.42,16.15-14.74,14.95-29.61,29.77-44.5,44.57-1.41,1.4-3.26,2.36-5.69,4.08Z"/></svg>
    </button>
      Добавить категорию
    </h1>

    <div class="form">
      <input type="text"
             v-model="categoryName"
             placeholder="Название категории">
      <div class="allowFront">
        <input type="checkbox"
               v-model="canHasFront"
               id="checkbox"
               checked
        >
        <label for="checkbox">Может иметь витрину?</label>
      </div>

      <button class="btn btn-submit"
      v-on:click="addCategory()">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
          <path d="M7.69655 17V0H10.3034V17H7.69655ZM0 9.70283V7.33727H18V9.70283H0Z" fill="white"/>
        </svg>
        Добавить категорию
      </button>

    </div>
    <div class="state-message">
      {{ addStateMessage }}
    </div>

    <div class="categories">
      <h1>
        Список категорий
      </h1>
      <div class="category-list">

        <shops-categories
            v-on:someChanges="(emit) => { console.log('ace', emit)}"
            v-bind:is-editable="true">

        </shops-categories>


        <div class="category"
             v-for="category of categories">
          <span class="name">
            {{ category.name }}
          </span>
<!--          <span class="id">-->
<!--            / id: {{ category.id }}-->
<!--          </span>-->

              <span class="delete"
                    v-on:click="() => {
            showModal = !showModal;
            this.category = {
              id: category.id,
              name: category.name
            }
          }">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
              <path
                  d="M14.3066 10.5404C14.3066 11.9891 14.3153 13.4375 14.3039 14.8862C14.2936 16.1901 13.6839 17.1536 12.5161 17.7756C12.0391 18.0298 11.517 18.1295 10.9784 18.1303C8.71443 18.1341 6.45046 18.1469 4.18689 18.1264C2.73366 18.1133 1.69388 17.4252 1.0885 16.1337C0.912373 15.7578 0.853533 15.3464 0.853928 14.9299C0.854717 11.9041 0.859851 8.878 0.849189 5.85224C0.847214 5.26656 1.28595 4.90264 1.80919 4.96677C2.1575 5.00926 2.48526 5.32683 2.50777 5.6726C2.5133 5.75604 2.51014 5.83988 2.51014 5.92371C2.51014 8.87877 2.51922 11.8338 2.50501 14.7889C2.50027 15.7489 3.24584 16.5096 4.25087 16.5003C6.46823 16.4795 8.68639 16.4787 10.9042 16.5003C11.9171 16.5104 12.6615 15.7458 12.6563 14.7746C12.6397 11.7875 12.65 8.79996 12.6504 5.81284C12.6504 5.25729 13.0382 4.91461 13.6021 4.96831C13.9248 4.99883 14.2265 5.26424 14.281 5.57833C14.3027 5.70428 14.3054 5.83447 14.3054 5.96273C14.307 7.48875 14.3066 9.01437 14.3062 10.5404H14.3066Z"
                  fill="#494A4E"/>
              <path
                  d="M7.58574 4.10691C5.35494 4.10691 3.12415 4.10691 0.893745 4.10691C0.435265 4.10691 0.177395 3.92263 0.0316763 3.49418C-0.102195 3.10128 0.205828 2.58746 0.625212 2.51483C0.747237 2.49358 0.873605 2.48817 0.998394 2.48779C1.98525 2.48586 2.9725 2.48161 3.95936 2.49049C4.15918 2.49242 4.22276 2.43254 4.21723 2.23744C4.20459 1.78698 4.21052 1.33613 4.21447 0.885667C4.21921 0.358323 4.55764 0.00830615 5.09747 0.00560182C6.74894 -0.00212483 8.40081 -0.00135216 10.0523 0.00482915C10.6032 0.00676082 10.9424 0.35446 10.9471 0.89378C10.9507 1.34424 10.9554 1.79509 10.9448 2.24556C10.9404 2.42945 10.9989 2.49126 11.1908 2.4901C12.2041 2.48238 13.2174 2.48701 14.2307 2.48624C14.4732 2.48624 14.7003 2.5214 14.8855 2.69641C15.1627 2.95834 15.2306 3.26779 15.0821 3.62979C14.9621 3.92147 14.671 4.10613 14.3176 4.10652C12.0738 4.10729 9.82996 4.10691 7.58613 4.10691H7.58574ZM7.59995 1.64017C7.09329 1.64017 6.58624 1.64365 6.07958 1.63786C5.94334 1.63631 5.88766 1.6819 5.89319 1.81596C5.8999 1.97667 5.89635 2.13777 5.89438 2.29887C5.8928 2.42366 5.93979 2.48817 6.07958 2.48779C7.07987 2.48508 8.08055 2.48508 9.08083 2.48779C9.22063 2.48817 9.26762 2.42366 9.26604 2.29887C9.26406 2.14434 9.25893 1.98942 9.26801 1.83527C9.2771 1.68306 9.2147 1.63477 9.06109 1.63708C8.57417 1.64481 8.08687 1.63979 7.59995 1.63979V1.64017Z"
                  fill="#494A4E"/>
              <path
                  d="M8.42743 10.3022C8.42743 9.34373 8.42545 8.38485 8.42861 7.42636C8.4298 7.0493 8.68925 6.7186 9.03242 6.63979C9.46088 6.54127 9.83091 6.69001 10.0098 7.05587C10.0667 7.17254 10.09 7.31587 10.0904 7.44722C10.0955 9.34527 10.0904 11.2429 10.0959 13.141C10.0975 13.6822 9.70572 13.9975 9.26264 14.0044C8.78126 14.0118 8.42901 13.6359 8.42782 13.1205C8.42585 12.1813 8.42743 11.2418 8.42743 10.3026V10.3022Z"
                  fill="#494A4E"/>
              <path
                  d="M6.73258 10.3095C6.73258 11.268 6.73495 12.2268 6.731 13.1853C6.72982 13.5234 6.50986 13.8375 6.21842 13.9441C5.85511 14.0766 5.50207 13.9897 5.25289 13.7096C5.08979 13.5265 5.0661 13.3066 5.0661 13.0779C5.06689 11.2251 5.0661 9.37222 5.0665 7.51937C5.0665 7.48731 5.0665 7.45486 5.06729 7.42279C5.08269 6.93601 5.4227 6.60377 5.90013 6.60995C6.37559 6.61613 6.72863 6.95881 6.7314 7.434C6.73614 8.39249 6.73298 9.35136 6.73258 10.3099V10.3095Z"
                  fill="#494A4E"/>
            </svg>
            Удалить
              </span>


        </div>
      </div>
      <div class="state">
        {{deleteStateMessage}}
      </div>

    </div>

  </div>



</template>

<script>
import modalWindowBackdrop from "../../components/page components/ModalWindowBackdrop.vue";
import shopsCategories from "../../components/reusable/ShopsCategories.vue";
import config from "../../assets/js/config.js";
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: "addCategory.vue",
  components: { modalWindowBackdrop, shopsCategories },

  emits: ['confirmAction', 'forceReload'],

  data () {
    return {
      categoryName: '',
      categories: '',
      addStateMessage: '',
      deleteStateMessage: '',
      showModal: this.$emit.showModal,
      category: '',
      canHasFront: true,
      componentKey: 0,
      isLoading: false,
      fullPage: true
    }
  },
  mounted() {
    this.$forceUpdate()
    console.log(config.categories)
    console.log('type:', typeof(getCategoriesList))
  },
  created() {
    this.isLoading = true
  },
  updated() {
    this.isLoading = false
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    addCategory () {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      console.log(config.api.url)

      fetch(`${config.api.url}categories`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          name: this.categoryName,
          allowShopfront: this.canHasFront
        }),
      })
          .then((response) => response.json())
          .then((response) => {
            const catName = this.categoryName;
            this.addStateMessage = `Категория: ${catName} успешно добавлена!`
            this.categoryName = ''
            setTimeout(() => {
              this.addStateMessage = ''

            }, 10000)

          })
          .catch((error) => {console.error(error)});


    },


  }
}
</script>

<style scoped lang="scss">


.state-message {
  color: #0b5348;
}
.form {
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 10px;
}


.category-list {

  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;

  .category {
    width: 45%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;


    &:hover {
      background-color: rgba(108, 122, 255, 0.1);
    }


    .id {
      font-weight: 300;
      opacity: .5;
    }

  }
}
.allowFront {
  padding-left: 10px;
  display: flex;
  width: 40%;
  input {
    transform: scale(1.5);
  }
  label {
    font-size: 14px;
    margin-left: 10px;
  }
}

</style>