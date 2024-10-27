<template>
  <div class="disapprove">
    <p>Вы собираетесь скрыть отзыв {{ props.data.comment }} от {{ props.data.username || props.data.anonId }}, подтвердите действие.</p>
    <button-black
        style="margin-top: 20px;"
        :type="'button'"
        @buttonPressed="onDisapproveReview()"
        :style="'filled'">
      <div class="button-content">
        Скрыть отзыв
      </div>
    </button-black>
  </div>
</template>

<script setup>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {disapproveReview} from "@/API/reviews.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup', 'disapproveReview'])
const onDisapproveReview = () => {
  disapproveReview(props.data)
  emits('disapproveReview', props.data.id)
  emits('closePopup')
}

</script>

<style scoped lang="scss">

</style>