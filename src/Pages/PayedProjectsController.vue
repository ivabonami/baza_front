<template>

  <div class="placeholders">
    <h2 class="heading2">Редактор заглушек</h2>

    <div class="selectCategory">

      <div class="category"
           @click="changeCategory(category.id)"
           v-for="category of categories.allCategories">
        <inline-svg :src="category.icon" class="categoryIcon" />
        <span class="categoryName">{{ category.name }}</span>
      </div>

    </div>

    <div class="stats">
      <div class="stats-count">
        Заглушек в категории:
        <span>{{ placeholders.categoryPlaceholders.length }}</span>
      </div>

      <button-black
          :type="'button'"
          @buttonPressed="callAddPlaceholdersPopup()"
      >
        Добавить
      </button-black>

    </div>

    <div class="projects">

        <div class="project-placeholder" v-for="placeholder of placeholders.categoryPlaceholders">
          <ThePlaceholder :placeholder="placeholder"

          />
          <AdminMenu @click.prevent
                     :advanced-menu="true"
                     :placeholder-menu="true"
                     :project="{placeholderId: -1 }"
                     :placeholder="placeholder"
          />
        </div>


    </div>

    <Teleport to="body" v-if="addPopup.isVisible">
      <the-baza-popup
          :headline="'Добавить'"
          @close-popup="addPopup.isVisible = false">

        <placeholder-add :category="category" @close-popup="addPopup.isVisible = false"/>

      </the-baza-popup>
    </Teleport>
  </div>

</template>

<script>
import {addNotice} from "@/js/notifications.js";
import {getPlaceholders, placeholders} from "@/API/placeholders.js";
import {categories} from "@/Stores/categories.js";
import ThePlaceholder from "@/components/Layout/Project/ThePlaceholder.vue";
import buttonBlack from "@/components/Buttons/ButtonBlack.vue";
import {popup} from "@/js/controllers/popupController.js";
import {userStore} from "@/Stores/userStore.js";
import {defineAsyncComponent} from "vue";

import PlaceholderAdd from '@/components/popups/Placeholder/PlaceholderAdd.vue'
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";


export default {
  name: "PayedProjectsController",
  data() {
    return {
      categories,
      placeholders,
      categoryId: null,
      placeholdersCount: 0,
      editPlaceholderCount: {
        show: false,
        newCount: 0
      },
      popup,
      addPopup: {
        isVisible: false
      },
      category: null
    }
  },

  components: {
    ThePlaceholder,
    buttonBlack,
    TheBazaPopup,
    PlaceholderAdd,
    AdminMenu: defineAsyncComponent({
      loader: () => import("@/components/Layout/Project/ProjectControllers/ProjectMenuController.vue"),
      delay: 200,
      timeout: 3000
    }),
  },

  methods: {
    changeCategory(categoryId) {
      this.category = categories.allCategories.find(item => item.id === categoryId)
      this.onGetPlaceholders(categoryId)
    },
    callAddPlaceholdersPopup() {
      this.addPopup.isVisible = true

    },
    onGetPlaceholders(categoryId) {

      getPlaceholders(categoryId)
          .then(result => {
            placeholders.categoryId = categoryId
            placeholders.categoryPlaceholders = result
          })
          .catch(() => {

            addNotice({name: 'Ошибка получения заглушек', type: 'danger'})
            this.placeholdersCount = 0
          })
    }
  },

  mounted() {

    if (userStore.role !== 'admin') {
      addNotice({name: 'У вас нет прав для просмотра этой страницы', type: 'danger'})
      this.$router.replace('/')
    } else {
      this.onGetPlaceholders()
    }

  }

}
</script>

<style scoped lang="scss">

.placeholders {
  .stats {
    margin: 20px auto 0;
    width: 40%;
    text-align: center;
    color: #5D599F;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;

    .stats-count {
      font-size: 14px;
      display: block;
      width: 100%;
    }

  }
  .selectCategory {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    border-radius: 44.5px;
    box-sizing: border-box;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    gap: 20px;
    overflow: auto hidden;

    .category {
      cursor: pointer;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      transition: .3s ease;
      gap: 5px;

      span {
        color: #B3B4C9;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        transition: 0.3s ease;
        text-align: center;
        width: 100%;
        display: block;
      }
      &:hover {
        span {
          color: #1e1e1e;
        }
      }
    }


  }
}
.projects {
  display: flex;
  margin-top: 30px;
  justify-content: start;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;


  .project-placeholder {
    position: relative;
    width: 23%;
  }
}

@media screen and (max-width: 500px){
  .placeholders {
    .selectCategory {
      gap: 20px;
      overflow-y: hidden;
      overflow-x: scroll;

    }
    .stats {
      width: 100%;
    }
  }
  .projects {
    .project-placeholder {
      width: 100%;
    }
  }
}
</style>