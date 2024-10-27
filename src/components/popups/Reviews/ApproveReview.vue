<template>
  <div class="approve-review">
    <p>Вы собираетесь опубликовать отзыв {{ props.data.comment }} от {{ props.data.username || props.data.anonId }}, подтвердите действие.</p>
    <button-black
        style="margin-top: 20px;"
        :type="'button'"
        @buttonPressed="onDisapproveReview()"
        :style="'filled'">
      <div class="button-content">
        Опубликовать отзыв
      </div>
    </button-black>
  </div>
</template>

<script setup>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {approveReview} from "@/API/reviews.js";

const props = defineProps({
  data: null
})

const emits = defineEmits(['closePopup', 'disapproveReview'])
const onDisapproveReview = () => {
  approveReview(props.data).then(() => {
    addNotice({name: 'Отзыв успешно опубликован', type: 'success'})
  })
      .catch(() => {
        addNotice({name: 'Ошибка, повторите позже', type: 'danger'})
      })
  emits('approveReview', props.data.id)
  emits('closePopup')
}

</script>

<style scoped lang="scss">
.approve {
  max-width: 550px;
}
</style>