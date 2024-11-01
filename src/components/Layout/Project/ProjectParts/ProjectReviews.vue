<template>
  <div class="reviews">
    <div class="reviews-navigation">
      <div class="reviews-navigation_buttons">
        <button-black
            :type="'button'"
            @buttonPressed="setComponent(AddReview, projectId)"
            :style="'filled'">
          <div class="button-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.9478 2.05081C9.21358 -0.683398 4.78814 -0.683809 2.05355 2.05081C-0.145162 4.24949 -0.560642 7.51876 0.739241 10.1223L0.0185891 13.2922C-0.0750806 13.7043 0.29418 14.0737 0.706349 13.98L3.87626 13.2594C8.48529 15.5605 13.997 12.229 13.997 6.99796C13.997 5.12922 13.2693 3.37228 11.9478 2.05081ZM8.46011 8.74017H4.08174C3.76437 8.74017 3.50708 8.48288 3.50708 8.1655C3.50708 7.84813 3.76437 7.59084 4.08174 7.59084H8.46011C8.77749 7.59084 9.03477 7.84813 9.03477 8.1655C9.03477 8.48288 8.77749 8.74017 8.46011 8.74017ZM9.91959 6.40504H4.08174C3.76437 6.40504 3.50708 6.14776 3.50708 5.83038C3.50708 5.51301 3.76437 5.25572 4.08174 5.25572H9.91959C10.237 5.25572 10.4942 5.51301 10.4942 5.83038C10.4942 6.14776 10.2369 6.40504 9.91959 6.40504Z" fill="white"/>
            </svg>
            Оставить отзыв
          </div>
        </button-black>

        <div class="count">
          Отзывов: <span>{{ reviewsCount || 0 }}</span>
        </div>
      </div>
      <div class="reviews-navigation_stars">

      </div>
      <div class="reviews-navigation_filter">
        <base-sort :sorts="projectReviewsSort" @sortChanged="emit => onSortReviews(emit)"/>
      </div>
    </div>

    <div class="reviews-list" v-if="loading.loaded">
      <project-review v-for="review of reviews"
                      v-if="reviews.length > 0"
                      :key="review"
                      @reviewEdited="emit => {
                        review.comment = emit.comment
                        review.rating = emit.rating}"
                      @reviewDeleted="emit => {
                        try {
                          reviews.splice(reviews.findIndex(item => item.id === emit), 1)
                          this.$emit('reviewCountChanged')
                        } catch (e) {
                          addNotice({name: 'Не удалось реактивно удалить отзыв', type: 'warning'})
                        }
                      }"
                      @disapproveReview="emit => {
                        try {
                          reviews.splice(reviews.findIndex(item => item.id === emit), 1)
                          this.$emit('reviewCountChanged')
                        } catch (e) {
                          addNotice({name: 'Не удалось реактивно скрыть отзыв', type: 'warning'})
                        }
                      }"
                      :review="review" />
    </div>

    <Waypoint v-if="hasMore.show" @change="way => { way.going === 'IN' ? onLoadReviews() : null }" style="margin-top: 20px;">
      <button-black
          :type="'button'"
          @click="onLoadReviews()"
          :style="'outline'">
        <div class="button-content">
          Еще
        </div>
      </button-black>

    </Waypoint>

    <Teleport to="body" v-if="popup.show">
      <the-baza-popup
          :headline="'Оставить отзыв'"
          @closePopup="popup.show = false"
      >
        <component :is="popup.component" :data="popup.data" @closePopup="popup.show = false" />
      </the-baza-popup>
    </Teleport>
  </div>
</template>
<script setup>
import ProjectReview from "@/components/Layout/Review/ProjectReview.vue";
import {reactive, ref, shallowRef, watch} from "vue";
import {getReviews} from "@/API/reviewsController.js";
import BaseSort from "@/components/ReUsable/BaseSort.vue";
import {projectReviewsSort} from "@/Stores/allSorts.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {addNotice} from "@/js/notifications.js";
import {Waypoint} from "vue-waypoint";
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue"
import AddReview from "@/components/popups/Reviews/AddReview.vue"

const props = defineProps({
  reviewsCount: ref(null),
  projectId: ref(null)
})

const hasMore = reactive({
  show: true
})

const requestOptions = {
  limit: 10,
  offset: 0,
  sort: 'highestRating',
  projectId: props.projectId
}

const popup = reactive({
  show: false,
  component: null,
  data: null
})

const setComponent = (component, data) => {
  popup.component = shallowRef(component)
  popup.data = data
  popup.show = true
}
let reviews = reactive([])

const onSortReviews = (sort) => {

  if (sort.slug !== requestOptions.sort) {
    reviews.splice(0, reviews.length)
    requestOptions.sort = sort.slug
    requestOptions.offset = 0
    onLoadReviews()
  }
}

const loading = reactive({
  loaded: false
})

const onLoadReviews = () => {
  reviews.length <= 0 ? loading.loaded = false : loading.loaded = true
  getReviews(requestOptions)
      .then(result => {
        for(let review of result.data.reviews) {
          reviews.push(review)
        }
        result.data.reviews.length < requestOptions.limit ? hasMore.show = false : hasMore.show = true
        requestOptions.offset = requestOptions.offset + requestOptions.limit
        loading.loaded = true
      })
      .catch(error => {
        console.log(error)
        addNotice({name: 'Произошла ошибка, повторите позже', type: 'danger'})
        loading.loaded = true
      })
}

watch(props, (value, oldValue) => {
  console.log(value, oldValue)
  reviews.splice(0, reviews.length)
  requestOptions.projectId = value.projectId
  requestOptions.offset = 0
  onLoadReviews()

})

</script>
<style scoped lang="scss">

.button-text {
  color: #F8F7FC;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 15px;
  align-items: center;

}
.reviews-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
.reviews {
  margin-top: 20px;
  gap: 20px;
  width: 100%;

  .reviews-navigation {
    border-radius: 20px;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;

    .reviews-navigation_buttons {
      display: flex;
      align-items: center;
      gap: 10px;

      .count {
        width: fit-content;
        display: block;
        white-space: nowrap;
        color: #B3B4C9;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        span {
          color: #191B2A;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }
    }
  }
}
@media screen and (max-width: 992px) {
}

@media screen and (max-width: 500px) {
  .button-text {
    font-size: 11px;
    gap: 5px;
  }
  .reviews .reviews-navigation .reviews-navigation_buttons .count {
    font-size: 11px;
    span {
      font-size: 11px;
    }
  }
}
</style>