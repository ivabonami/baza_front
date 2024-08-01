<template>
  <div class="project-products">
    <div class="project-products_heading">
      <h2>Витрина</h2>
      <button-action
          v-if="userInfo.role === 'admin' || isAdmin"
          @click="() => {


            modalProductController.show = true
            productControllerOptions.mode = 'add'
            productControllerOptions.buttonConfirmText = 'Добавить'
            productControllerOptions.product = null
            productControllerOptions.projectId = this.$props.project.id

          }"
      >
        <template #text>
          Добавить
        </template>
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 5.8V12.2M5.8 9H12.2M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#4E4E4E" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </button-action>
    </div>
    <div class="project-products_items"
         ref="projectProducts"
         v-show="!loading || products.length > 0">
      <div v-for="product of products"
           class="project-products_items_item">
        <product-card
            :highlighted="highlightedProject.length > 0 ? highlightedProject[0].id === product.id : false"
            :item="product"
            @click="() => {
              modalShowFullInfo.show = !modalShowFullInfo.show
              modalShowFullInfo.data = product

            }"
        />

        <div class="project-products_admin-menu" v-if="userInfo.role === 'admin' || userInfo.username === $props.project.userData.username">
          <button-action
              @pressed="() => {
                productControllerOptions.mode = 'edit'
                productControllerOptions.product = product
                productControllerOptions.buttonConfirmText = 'Изменить'
                modalProductController.show = !modalProductController.show
              }"
          >
            <template #text>
              Редактировать
            </template>
            <template #icon>
              <svg :style="{width: '15px', height: '15px'}" xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </button-action>

          <button-action
              @pressed="() => {
                deleteModal.show = true
                deleteModal.options.name = product.name
                deleteModal.options.id = product.id
              }"
          >
            <template #text>
              Удалить
            </template>
            <template #icon>
              <svg :style="{width: '15px', height: '15px'}"  xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                <path d="M6.77778 2.8V2.44C6.77778 1.93595 6.77778 1.68393 6.68089 1.49141C6.59567 1.32206 6.45969 1.18438 6.29244 1.09809C6.10229 1 5.85338 1 5.35556 1H4.64444C4.14662 1 3.89771 1 3.70756 1.09809C3.54031 1.18438 3.40433 1.32206 3.31911 1.49141C3.22222 1.68393 3.22222 1.93595 3.22222 2.44V2.8M1 2.8H9M8.11111 2.8V7.84C8.11111 8.59607 8.11111 8.97411 7.96579 9.26289C7.83796 9.51691 7.63398 9.72343 7.3831 9.85286C7.09788 10 6.72451 10 5.97778 10H4.02222C3.27549 10 2.90212 10 2.6169 9.85286C2.36602 9.72343 2.16204 9.51691 2.03421 9.26289C1.88889 8.97411 1.88889 8.59607 1.88889 7.84V2.8" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </button-action>
        </div>
      </div>

      <Waypoint v-show="showLoadMore"
          @change="way => {
            if (way.going === 'IN') {
              options.offset += options.limit
              collectProducts()
            }
          }">

        <button-primary
            @click="() => {
              options.offset += options.limit
              collectProducts()
            }"
            :style="'outline'">
          <template #default>
            Загрузить еще
          </template>
        </button-primary>

      </Waypoint>
    </div>

    <empty-store
        :show-button="true"
        :show-button-for-users="false"
        @click="() => {

          if (userInfo.role === 'admin' || userInfo.username === $props.project.userData.username) {
               modalProductController.show = true
              productControllerOptions.mode = 'add'
              productControllerOptions.buttonConfirmText = 'Добавить'
              productControllerOptions.product = null
              productControllerOptions.projectId = this.$props.projectId
            }


          }"
        v-show="!loading && products.length <= 0">
      <template #header>
        Витрина пуста
      </template>
      <template #text>
        ожидайте обновлений
      </template>
      <template #buttonText>
        Добавить
      </template>
    </empty-store>

    <base-loader v-show="loading" />
  </div>

  <popup-show-full-info
      v-if="modalShowFullInfo.show"
      :modal="modalShowFullInfo"
      @closeModal="modalShowFullInfo.show = false"
  >
    <template #header>
      {{ modalShowFullInfo.data.name }}
    </template>

    <template #text>
      {{ modalShowFullInfo.data.description.replace(/(https?:\/\/[^\s]+)/g, `<a href="#">a</a>`) }}
    </template>

    <template #image>
      <img :src="api.url + modalShowFullInfo.data.avatarFilePath"
           style="height: 100%;"
           :alt="modalShowFullInfo.data.name">
    </template>

  </popup-show-full-info>

  <popup-products-controller
      v-if="modalProductController.show"
      :modal="modalProductController"
      :options="productControllerOptions.product"
      :projectId="$props.project.id"
      :mode="productControllerOptions.mode"
      @closeModal="modalProductController.show = false"
      @productAdded="emit => onProductAdded(emit)"
      @productUpdated="emit => onProductUpdated(emit)"
  >
    <template #header>
      Добавить
    </template>
    <template #buttonConfirm>
      {{ productControllerOptions.buttonConfirmText }}
    </template>
    <template #buttonSecondary>
      Закрыть
    </template>
  </popup-products-controller>

  <popup-delete
      @click.stop
      v-if="deleteModal"
      :modal="deleteModal"
      @closeModal="deleteModal.show = false"
      @deleteConfirmed="deleteProduct(deleteModal.options)"

  >
    <template #header>
      Удалить услугу?
    </template>
    <template #text @click.stop>
      Вы действительно хотите удалить услугу <b>{{ deleteModal.options.name }} {{ deleteModal.options.id }}</b>
    </template>
    <template #buttonConfirm @click.stop>
      Да, удалить
    </template>
    <template #buttonSecondary>
      Отменить
    </template>
  </popup-delete>


</template>

<script>
import buttonAction from "../components/Buttons/ButtonAction.vue";
import {deleteProduct, getProducts} from "../API/products.js";
import productCard from "../Blocks/ProductCard.vue";
import popupShowFullInfo from "../components/Popups/PopupShowFullInfo.vue";
import {api} from "../assets/js/config.js";
import {Waypoint} from "vue-waypoint";
import buttonPrimary from "../components/Buttons/ButtonPrimary.vue";
import baseLoader from "./BaseLoader.vue";
import popupProductsController from "../components/Popups/PopupProductsController.vue";
import {userInfo} from "../Store/userInfo.js";
import popupDelete from "../components/Popups/PopupDelete.vue";
import emptyStore from "../Blocks/EmptyStore.vue";
import {productsStore} from "../Store/productsStore.js";

import {highlightedProject} from "../Store/highlightedProject.js";

export default {
  name: "ProjectProducts.vue",
  props: {
    project: null
  },
  emits: ['productAdded', 'productUpdated', 'reviewAdded'],
  data() {
    return {
      products: [],
      modalShowFullInfo: {
        show: false,
        data: {}
      },
      highlightedProject,
      modalProductController: {
        show: false
      },
      deleteModal: {
        show: false,
        options: {
          name: null,
          id: null
        }
      },
      options: {
        projectId: null,
        limit: 5,
        offset: 0,
      },
      productData: {},
      productControllerOptions: {
        mode: null,
        buttonConfirmText: null,
        product: null
      },
      productsStore,
      height: 'auto',
      showLoadMore: false,
      loading: false,
      api,
      userInfo,
      isAdmin: false
    }
  },

  components: {
    buttonAction,
    productCard,
    popupShowFullInfo,
    Waypoint,
    buttonPrimary,
    baseLoader,
    popupProductsController,
    popupDelete,
    emptyStore
  },

  watch: {
    project: function (newVal, oldVal) {
      this.collectProducts()

      if (userInfo.username) {
        userInfo.username === this.$props.project.userData.username ? this.isAdmin = true :  this.isAdmin = false
      } else {
        this.isAdmin = false
      }
    },

  },

  methods: {

    collectProducts() {
      this.loading = true
      this.options.projectId = this.$props.project.id



      getProducts(this.options).then(result => {
        for (const product of result.data.products) {
          this.products.push(product)
        }
        result.data.products.length < this.options.limit ? this.showLoadMore = false : this.showLoadMore = true
        this.loading = false
        this.height = this.$refs.projectProducts.offsetHeight + 'px'
      })
    },
    onProductAdded () {
      this.options.offset = 0
      this.products.length % 5 === 0 ? this.options.limit = this.products.length : this.options.limit = this.products.length + 1
      this.products.splice(0, this.products.length)

      this.loading = true
      this.height = this.$refs.projectProducts.offsetHeight + 'px'
      getProducts(this.options).then(result => {
        for (const product of result.data.products) {
          this.products.push(product)
        }
        result.data.products.length < this.options.limit ? this.showLoadMore = false : this.showLoadMore = true
        this.options.limit = 5
        this.loading = false
      })
    },
    onProductUpdated(product) {
      this.options.offset = 0
      this.products.length % 5 === 0 ? this.options.limit = this.products.length : this.options.limit = this.products.length + 1
      this.products.splice(0, this.products.length)

      this.loading = true
      this.height = this.$refs.projectProducts.offsetHeight + 'px'
      getProducts(this.options).then(result => {
        for (const product of result.data.products) {
          this.products.push(product)
        }
        result.data.products.length < this.options.limit ? this.showLoadMore = false : this.showLoadMore = true
        this.options.limit = 5
        this.loading = false
      })


    },
    deleteProduct(product) {
      const productToDelete = this.products.findIndex(item => item.id === product.id)
      this.products.splice(productToDelete, 1)


      deleteProduct(product).then(result => result)
    }
  },
  mounted() {
    this.collectProducts(this.options)
  },

  updated() {
    this.productControllerOptions.projectId = this.$props.project.id
  }

}
</script>

<style scoped lang="scss">
.project-products {
  margin-top: 30px;
  margin-bottom: 10px;
  min-height: 170px;

  .project-products_heading {
    color: #000;
    font-family: "PT Sans Caption";

    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: flex;
    gap: 20px;

    align-items: center;
    margin-bottom: 8px;

    h2 {
      font-size: 20px;
      margin-top: -5px;
    }

  }

  .project-products_items {
    width: 100%;
    display: flex;
    gap: 1.2%;
    flex-wrap: wrap;
    box-sizing: border-box;


    &:after {
      content: '';
      flex: auto;
    }


    .project-products_items_item {
      width: 19%;
      margin-bottom: 10px;
      .project-products_admin-menu {
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .project-products .project-products_items {
    justify-content: space-between;

    .project-products_items_item {
      width: 24%;
    }
  }
}
@media screen and (max-width: 768px){
  .project-products .project-products_items {
    justify-content: space-between;

    .project-products_items_item {
      width: 32%;
    }
  }

  .project-products {
    .project-products_heading {
      h2 {
        margin-top: 0;
        font-size: 16px;
        line-height: 1.5;
        position: relative;
        top: -2px;
      }
    }
  }
}

@media screen and (max-width: 500px){
  .project-products .project-products_items {
    justify-content: space-between;

    .project-products_items_item {
      width: 49%;
    }
  }
}
</style>