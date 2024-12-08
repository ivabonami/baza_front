<template>
  <div class="categories">

      <div class="all-categories">
          <div class="categories-list">
              <div class="header">
                  <h2>
                      Все категории
                  </h2>
                  <button-black
                          style="width: auto"
                          :type="'button'"
                          @click="onCategoryAdd()"
                          :style="'outline'">
                      <div class="button-content">
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 7V15M7 11H15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          добавить
                      </div>
                  </button-black>
              </div>


              <div class="category" v-for="category of categories.allCategories" :key="category.id">
                  <InlineSvg :src="category.icon" class="categoryIcon"/>
                  <p>
                      {{ category.name }}
                  </p>

                  <div class="menu">
                      <svg
                              @click="onCategoryEdit(category)"
                              width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 17L17.9999 18.094C17.4695 18.6741 16.7502 19 16.0002 19C15.2501 19 14.5308 18.6741 14.0004 18.094C13.4693 17.5151 12.75 17.1901 12.0002 17.1901C11.2504 17.1901 10.5312 17.5151 10 18.094M1.00003 19H2.67457C3.16376 19 3.40835 19 3.63852 18.9447C3.84259 18.8957 4.03768 18.8149 4.21663 18.7053C4.41846 18.5816 4.59141 18.4086 4.93732 18.0627L17.5001 5.49998C18.3285 4.67156 18.3285 3.32841 17.5001 2.49998C16.6716 1.67156 15.3285 1.67156 14.5001 2.49998L1.93729 15.0627C1.59139 15.4086 1.41843 15.5816 1.29475 15.7834C1.18509 15.9624 1.10428 16.1574 1.05529 16.3615C1.00003 16.5917 1.00003 16.8363 1.00003 17.3255V19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>


                      <svg
                              @click="onCategoryDelete(category)"
                              width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 1H13M1 4H19M17 4L16.2987 14.5193C16.1935 16.0975 16.1409 16.8867 15.8 17.485C15.4999 18.0118 15.0472 18.4353 14.5017 18.6997C13.882 19 13.0911 19 11.5093 19H8.49065C6.90891 19 6.11803 19 5.49834 18.6997C4.95276 18.4353 4.50009 18.0118 4.19998 17.485C3.85911 16.8867 3.8065 16.0975 3.70129 14.5193L3 4M8 8.5V13.5M12 8.5V13.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>



                  </div>

              </div>
          </div>
      </div>
      <Teleport to="body" v-if="popup.isVisible">
          <the-baza-popup
                  :headline="popup.headline"
                  @closePopup="popup.isVisible = false"
          >
              <component :is="popup.component" :data="popup.data" @close-popup="popup.isVisible = false"/>
          </the-baza-popup>
      </Teleport>

  </div>

</template>

<script setup>
import {categories} from "@/Stores/categories.js";
import InlineSvg from "vue-inline-svg";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";
import {reactive, shallowRef} from "vue";
import AddCategory from '@/components/popups/Category/AddCategory.vue'
import DeleteCategory from '@/components/popups/Category/DeleteCategory.vue'
import EditCategory from '@/components/popups/Category/EditCategory.vue'

const popup = reactive({
    isVisible: false,
    component: null,
    headline: 'Выполните действие',
    data: null
})


const onCategoryEdit = (category) => {
    popup.isVisible = true
    popup.component = shallowRef(EditCategory)
    popup.data = category
    popup.headline = 'Изменить категорию'
}

const onCategoryAdd = () => {
    popup.isVisible = true
    popup.component = shallowRef(AddCategory)
    popup.data = null
    popup.headline = 'Добавить категорию'
}

const onCategoryDelete = (category) => {
    popup.isVisible = true
    popup.component = shallowRef(DeleteCategory)
    popup.data = category
    popup.headline = 'Удалить категорию'
}

</script>

<style scoped lang="scss">
.categories {
  .all-categories {
    .categories-list {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: space-between;

      &::after {
        content: ' ';
        justify-content: start;
        width: 30%;
      }

      .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h2 {
          white-space: nowrap;

        }
        .button-content {
          display: flex;
          gap: 10px;
          color: #ffffff;
          cursor: pointer;

          svg {
            path {
              stroke: #ffffff;
            }
          }
        }
      }



      .category {
        align-items: center;
        justify-content: center;
        text-align: center;
        display: flex;
        gap: 10px;
        position: relative;
        width: 30%;

        p {
          width: 100%;
          color: #70718c;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          transition: 0.3s ease;
          text-align: left;
        }
        svg {
          width: 40px;
          height: 40px;
        }

        .menu {
          display: flex;
          gap: 10px;

          svg {
            width: 20px;
            cursor: pointer;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>