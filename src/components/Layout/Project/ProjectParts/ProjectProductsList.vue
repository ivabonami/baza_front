<template>
  <div class="project-products">
    <div class="heading">
      <button-black style="width: auto"
                    v-if="props.isEditable"
                    @buttonPressed="onCallPopup(AddProduct, 'Добавить', projectId)"
                    :type="'button'">
        <div class="button-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"
               fill="none">
            <path data-v-8829596c="" fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.96642 0.518847C8.12694 -0.172949 9.58202 -0.172949 10.7426 0.518847L15.5989 3.41371C16.6887 4.06339 17.3545 5.22611 17.3545 6.47992V12.5201C17.3545 13.7739 16.6887 14.9366 15.5989 15.5863L10.7425 18.4812C9.58202 19.1729 8.12694 19.1729 6.96642 18.4812L2.11013 15.5863C1.02024 14.9366 0.354492 13.7739 0.354492 12.5201V6.47992C0.354492 5.22611 1.02024 4.06339 2.11013 3.41371L6.96642 0.518847ZM10.0701 1.61092C9.3229 1.16551 8.38607 1.16551 7.63888 1.61092L2.78259 4.50578C2.52127 4.66156 2.29783 4.86313 2.12031 5.09645L8.67352 9.00287C8.7848 9.06922 8.92433 9.06922 9.03562 9.00287L15.5887 5.09653C15.4112 4.86315 15.1877 4.66156 14.9264 4.50578L10.0701 1.61092ZM1.65225 6.47992C1.65225 6.4243 1.65429 6.36898 1.65831 6.314L8.00106 10.0949C8.06742 10.1345 8.13587 10.169 8.20595 10.1986V17.6332C8.00947 17.5776 7.8187 17.4963 7.63888 17.3891L2.78259 14.4942C2.08088 14.0759 1.65225 13.3273 1.65225 12.5201V6.47992ZM9.50371 17.6331C9.69994 17.5775 9.89049 17.4961 10.0701 17.3891L14.9264 14.4942C15.6281 14.0759 16.0567 13.3273 16.0567 12.5201V6.47992C16.0567 6.42433 16.0547 6.36903 16.0507 6.3141L9.70808 10.0949C9.64189 10.1344 9.57359 10.1689 9.50371 10.1984V17.6331Z"
                  fill="white"></path>
          </svg>
          Добавить
        </div>
      </button-black>
      <div class="name">
        Витрина
      </div>
    </div>
    <empty-store v-if="products.length <= 0">
      <template #header>
        Витрина пуста
      </template>
      <template #text>
        витрина этого проекта пуста, ожидайте обновлений
      </template>
    </empty-store>
    <div class="project-product" v-else v-for="product of products" :key="product">

      <product-card :item="product"
                    :key="product"
                    :is-editable="username === userStore.username || userStore.role === 'admin'"
                    @edit-product="onCallPopup(EditProduct, 'Редактировать', product)"
                    @delete-product="onCallPopup(DeleteProduct, 'Удалить', product)"
                    @product-info="onCallPopup(ShowProduct, product.name, product)"
      />
    </div>


    <Waypoint @change="onGetProducts()" v-if="hasMore.show">
      <button-black @buttonPressed="onGetProducts()" :type="'button'">
        <div class="button-content">
          Загрузить еще
        </div>
      </button-black>
    </Waypoint>

    <Teleport to="body" v-if="popup.show">
      <the-baza-popup
          :headline="popup.headline"
          @closePopup="popup.show = false"
      >
        <component :is="popup.component"
                   :data="popup.data"
                   @close-popup="popup.show = false"
                   @product-added="emit => {
                     try { products.push(emit) }
                     catch (e) { addNotice({name: 'Не получилось реактивно добавить товар или услугу, перезагрузите страницу', type: 'warning'}) }
                   }"
                   @product-updated="emit => {
                     try {
                       products.find(item => item.id === emit.id).name = emit.name
                       products.find(item => item.id === emit.id).description = emit.description
                       products.find(item => item.id === emit.id).avatarFilePath = emit.avatarFilePath
                     } catch (e) { addNotice({name: 'Не получилось реактивно обновить товар или услугу, перезагрузите страницу', type: 'warning'}) }
                   }"

                   @product-deleted="emit => {
                     try {
                       products.splice(products.findIndex(item => item.id === emit.id), 1)
                     } catch (e) { addNotice({name: 'Не получилось реактивно удалить товар или услугу, перезагрузите страницу', type: 'warning'}) }
                   }"
        />
      </the-baza-popup>
    </Teleport>
  </div>
</template>

<script setup>
import EmptyStore from "@/components/Blocks/EmptyStore.vue";
import {onMounted, reactive, ref, shallowRef, watch} from "vue";
import ProductCard from "@/components/Layout/Product/ProductCard.vue";
import {getProducts} from "@/API/productsController.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {userStore} from "@/Stores/userStore.js";
import {Waypoint} from "vue-waypoint";
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";
import AddProduct from "@/components/popups/Product/AddProduct.vue";
import DeleteProduct from "@/components/popups/Product/DeleteProduct.vue";
import ShowProduct from "@/components/popups/Product/ShowProduct.vue";
import EditProduct from "@/components/popups/Product/EditProduct.vue";
import {addNotice} from "@/js/notifications.js";

const props = defineProps({
  projectId: ref(null),
  isEditable: ref(null)
})

const requestOptions = {
  limit: 10,
  offset: 0,
  projectId: props.projectId
}

const hasMore = reactive({
  show: true
})
let products = reactive([])

const onGetProducts = () => {
  getProducts(requestOptions).then(result => {
    for(const product of result.data.products) {
      products.push(product)
    }
    result.data.products.length < requestOptions.limit ? hasMore.show = false : hasMore.show = true
    requestOptions.offset = requestOptions.offset + requestOptions.limit
    products = result.data.products
  })
}

const popup = reactive({
  show: false,
  headline: 'Дадада',
  component: null,
  data: null
})

const onCallPopup = (component, headline, data) => {
  popup.component = shallowRef(component)
  popup.headline = headline
  popup.data = data
  popup.show = true
}

onMounted(() => onGetProducts())
watch(props, (value, oldValue, onCleanup) => {
  products.splice(0, products.length)
  requestOptions.projectId = value.projectId
  requestOptions.offset = 0
  onGetProducts()
})
</script>

<style scoped lang="scss">
.project-products {
  width: 100%;
  margin-top: 20px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  position: relative;
  z-index: 20;


  .heading {
    width: 100%;
    border-radius: 20px;
    background: #fff;
    box-shadow: -10px -12px 51.7px -40px #fff, 24px 21px 64.8px -23px #c1bfda;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 10px;
    padding: 10px;
    align-items: center;
    box-sizing: border-box;
    height: 60px;

    .name {
      width: fit-content;
      display: block;
      white-space: nowrap;
      color: #b3b4c9;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  .project-product {
    width: 24%;
  }
}

@media screen and (max-width: 500px){
  .project-products {
    .project-product {
      width: 47%;
    }
  }
}
</style>