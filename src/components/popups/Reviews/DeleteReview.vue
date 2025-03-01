<template>
  <div class="delete-review">
    Вы собираетесь удалить отзыв {{ data.comment }} от {{ data.userData ? data.userData.username : data.anonId }}, подтвердите действие!

    <button-black
        style="margin-top: 20px;"
        :type="'button'"
        @buttonPressed="onDeleteReview(props.data)"
        :style="'filled'">
      <div class="button-content">
        Удалить
      </div>
    </button-black>
  </div>
</template>

<script setup>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {deleteReview} from "@/API/reviews.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup', 'reviewDeleted'])

const onDeleteReview = (review) => {
  deleteReview(review)
  emits('reviewDeleted', review.id)
  emits('closePopup')
}

</script>

<style scoped lang="scss">

</style>