<template>
  <div class="send-review box-shadow"

       v-on:keydown.enter="() => {

       }">
    <div class="send-header">
      <div class="text">
        <h3 class="your-rating">
          Ваша оценка
        </h3>

      </div>
      <div class="set-rating"
           ref="el">
        stars
      </div>
      <p>
        Рейтинг зависит от данной оценки
      </p>
    </div>
    <input type="checkbox" name="isReviewed" id="isReviewed" v-model="isReviewed" hidden>
    <input type="number" name="reviewID" id="reviewID" v-model="reviewID" hidden>

    <h3 class="your-rating">
      Комментарий
    </h3>
    <textarea
        v-model="reviewText"
        maxlength="2000"
        placeholder="Этот магаз держит хороший парень, я vel sagittis mi, at vehicula eros. Duis fermentum pulvinar quam, ac congue augue euismod vitae. Nulla eu ante vel arcu interdum ultricies sed et eros. Nullam non vulputate dui, non imperdiet purus. Cras tempus urna."></textarea>
    <div class="reviewTextError" v-if="errors !== ''">
      {{ reviewTextError }}
    </div>
    <div class="buttons">
      <button class="btn btn-filled" v-on:click="(event) => {
                        if (this.reviewText.length < 0) {
                          this.reviewTextError = 'Отзыв должен содержать как минимум 5 символов.'
                        } else if (this.editReview === true) {

                          updateReview(reviewID, isReviewed)
                          getReviews()
                        } else {
                          sendReview()
                          reviewSended(event.target)
                          this.starsRating = 0
                          this.reviewText = ''
                          getReviews()
                        }
                      }"
      >
        <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141.26 112.65">
          <path
              d="M91.03,55.54c-9.84-1.08-19.67-2.18-29.51-3.22-10.77-1.14-21.56-2.07-32.29-3.5-2.05-.27-4.6-1.99-5.64-3.78C15.83,31.64,8.37,18.07,.92,4.49,.22,3.21,.29,1.51,0,0,1.55,.11,3.24-.15,4.61,.4,49.02,18.02,93.41,35.71,137.76,53.48c1.35,.54,2.34,1.96,3.5,2.97-1.11,.88-2.09,2.08-3.34,2.58C93.4,76.82,48.85,94.55,4.29,112.23c-1.25,.49-2.77,.29-4.16,.42,.22-1.5,.03-3.22,.71-4.46,7.36-13.43,14.96-26.74,22.23-40.22,1.75-3.25,4.03-4.24,7.47-4.57,19.4-1.9,38.77-4.01,58.15-6.07,.78-.08,1.55-.33,2.32-.51l.02-1.28Z"/>
        </svg>

        <span v-if="this.editReview === false">Отправить</span>
        <span v-else>Обновить</span>
      </button>
      <button class="btn btn-empty"
              v-on:click="clearTextarea()">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
          <path d="M1 0.5L13 12.5M1 12.5L13 0.5" stroke="#2B2B2B"/>
        </svg>
        Очистить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addTestimonial.vue",
  data() {
    return {
      reviewText: '',
      errors: {},
      dataStars: 0,

    }
  },
  components: {},
  methods: {
    setOpacity () {
      for (let i = 0; i < 5; i++) {
        this.$refs.el.childNodes[i].style.opacity = '0.3'
      }
      for (let i = 0; i < this.dataStars; i++) {
        this.$refs.el.childNodes[i].style.opacity = '1'
      }
    },
  },
  mounted() {

  },
}
</script>

<style scoped lang="scss">

</style>