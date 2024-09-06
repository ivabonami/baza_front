<template>

  <div ref="projectReviewsAll" :style="saveHeight">
    <div class="project-reviews">
      <div class="project-reviews_heading">
        <h2>Отзывы</h2>
<!--        <button-action-->
<!--            v-if="!projectReviewsStore.reviews.find(review => review.userData.username === userInfo.username)"-->
<!--            @click="() => {-->
<!--            if (userInfo.username) {-->
<!--              modalReviewsController.show = true-->
<!--              modalReviewsController.mode = 'add'-->
<!--              modalReviewsController.buttonConfirmText = 'Оставить отзыв'-->
<!--              modalReviewsController.product = null-->
<!--              modalReviewsController.projectId = this.$props.project.id-->
<!--            } else {-->
<!--              modalAuth.show = true-->
<!--            }-->


<!--          }"-->
<!--        >-->
<!--          <template #text>-->
<!--            Оставить-->
<!--          </template>-->
<!--          <template #icon>-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">-->
<!--              <path d="M9 5.8V12.2M5.8 9H12.2M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#4E4E4E" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--            </svg>-->
<!--          </template>-->
<!--        </button-action>-->
        <div class="filter">
          <sort
              :sort="sorts"
              v-show="projectReviewsStore.reviews.length > 0"
              @sortChanged="(emit) => {
                projectReviewsStore.reviews.splice(0, projectReviewsStore.reviews.length)
                this.selectedSort = emit
                this.loading = true
                this.loadingError = false

                this.saveHeight['min-height'] = this.$refs.projectReviewsAll.clientHeight.toString() + 'px'


                getReviews({projectId: this.$props.project.id, sort: emit.sort}).then((result) => {
                  this.loading = false
                  for (let review of result.data.reviews) {
                    projectReviewsStore.reviews.push(review)
                  }
                }).catch(err => {

                  this.loading = false
                  this.loadingError = true
                })
            }"
          />
        </div>
        <div class="project-rating" ref="stars">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
            <path d="M8.70843 0.823678C8.93892 0.356738 9.05416 0.123269 9.21061 0.0486752C9.34673 -0.0162251 9.50487 -0.0162251 9.64099 0.0486752C9.79744 0.123269 9.91268 0.356738 10.1432 0.823677L12.3298 5.25364C12.3979 5.3915 12.4319 5.46042 12.4816 5.51394C12.5257 5.56132 12.5785 5.59971 12.6371 5.62698C12.7033 5.65778 12.7794 5.6689 12.9315 5.69113L17.8228 6.40607C18.3378 6.48135 18.5954 6.519 18.7146 6.6448C18.8183 6.75425 18.867 6.90466 18.8473 7.05414C18.8246 7.22594 18.6382 7.40754 18.2653 7.77074L14.7272 11.2168C14.6169 11.3242 14.5618 11.3779 14.5262 11.4418C14.4947 11.4984 14.4745 11.5606 14.4667 11.6249C14.4579 11.6975 14.4709 11.7734 14.4969 11.9251L15.3317 16.7925C15.4198 17.3059 15.4638 17.5625 15.3811 17.7149C15.3091 17.8474 15.1811 17.9403 15.0328 17.9678C14.8624 17.9994 14.6319 17.8782 14.1709 17.6358L9.79816 15.3362C9.66191 15.2645 9.59379 15.2287 9.52202 15.2146C9.45848 15.2022 9.39312 15.2022 9.32957 15.2146C9.2578 15.2287 9.18968 15.2645 9.05344 15.3362L4.6807 17.6358C4.2197 17.8782 3.98919 17.9994 3.81875 17.9678C3.67046 17.9403 3.5425 17.8474 3.47052 17.7149C3.38778 17.5625 3.43181 17.3058 3.51986 16.7925L4.35467 11.9251C4.38069 11.7734 4.39371 11.6975 4.3849 11.6249C4.3771 11.5606 4.35689 11.4984 4.32539 11.4418C4.2898 11.3779 4.23466 11.3242 4.12437 11.2168L0.586341 7.77074C0.213444 7.40754 0.0269959 7.22594 0.00430753 7.05414C-0.0154326 6.90466 0.0333348 6.75425 0.137032 6.6448C0.256216 6.519 0.513753 6.48135 1.02882 6.40607L5.92009 5.69113C6.07221 5.6689 6.14826 5.65778 6.2145 5.62698C6.27315 5.59971 6.32594 5.56132 6.36997 5.51394C6.41969 5.46042 6.45371 5.3915 6.52175 5.25364L8.70843 0.823678Z" fill="#D8D8D8"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
            <path d="M8.70843 0.823678C8.93892 0.356738 9.05416 0.123269 9.21061 0.0486752C9.34673 -0.0162251 9.50487 -0.0162251 9.64099 0.0486752C9.79744 0.123269 9.91268 0.356738 10.1432 0.823677L12.3298 5.25364C12.3979 5.3915 12.4319 5.46042 12.4816 5.51394C12.5257 5.56132 12.5785 5.59971 12.6371 5.62698C12.7033 5.65778 12.7794 5.6689 12.9315 5.69113L17.8228 6.40607C18.3378 6.48135 18.5954 6.519 18.7146 6.6448C18.8183 6.75425 18.867 6.90466 18.8473 7.05414C18.8246 7.22594 18.6382 7.40754 18.2653 7.77074L14.7272 11.2168C14.6169 11.3242 14.5618 11.3779 14.5262 11.4418C14.4947 11.4984 14.4745 11.5606 14.4667 11.6249C14.4579 11.6975 14.4709 11.7734 14.4969 11.9251L15.3317 16.7925C15.4198 17.3059 15.4638 17.5625 15.3811 17.7149C15.3091 17.8474 15.1811 17.9403 15.0328 17.9678C14.8624 17.9994 14.6319 17.8782 14.1709 17.6358L9.79816 15.3362C9.66191 15.2645 9.59379 15.2287 9.52202 15.2146C9.45848 15.2022 9.39312 15.2022 9.32957 15.2146C9.2578 15.2287 9.18968 15.2645 9.05344 15.3362L4.6807 17.6358C4.2197 17.8782 3.98919 17.9994 3.81875 17.9678C3.67046 17.9403 3.5425 17.8474 3.47052 17.7149C3.38778 17.5625 3.43181 17.3058 3.51986 16.7925L4.35467 11.9251C4.38069 11.7734 4.39371 11.6975 4.3849 11.6249C4.3771 11.5606 4.35689 11.4984 4.32539 11.4418C4.2898 11.3779 4.23466 11.3242 4.12437 11.2168L0.586341 7.77074C0.213444 7.40754 0.0269959 7.22594 0.00430753 7.05414C-0.0154326 6.90466 0.0333348 6.75425 0.137032 6.6448C0.256216 6.519 0.513753 6.48135 1.02882 6.40607L5.92009 5.69113C6.07221 5.6689 6.14826 5.65778 6.2145 5.62698C6.27315 5.59971 6.32594 5.56132 6.36997 5.51394C6.41969 5.46042 6.45371 5.3915 6.52175 5.25364L8.70843 0.823678Z" fill="#D8D8D8"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
            <path d="M8.70843 0.823678C8.93892 0.356738 9.05416 0.123269 9.21061 0.0486752C9.34673 -0.0162251 9.50487 -0.0162251 9.64099 0.0486752C9.79744 0.123269 9.91268 0.356738 10.1432 0.823677L12.3298 5.25364C12.3979 5.3915 12.4319 5.46042 12.4816 5.51394C12.5257 5.56132 12.5785 5.59971 12.6371 5.62698C12.7033 5.65778 12.7794 5.6689 12.9315 5.69113L17.8228 6.40607C18.3378 6.48135 18.5954 6.519 18.7146 6.6448C18.8183 6.75425 18.867 6.90466 18.8473 7.05414C18.8246 7.22594 18.6382 7.40754 18.2653 7.77074L14.7272 11.2168C14.6169 11.3242 14.5618 11.3779 14.5262 11.4418C14.4947 11.4984 14.4745 11.5606 14.4667 11.6249C14.4579 11.6975 14.4709 11.7734 14.4969 11.9251L15.3317 16.7925C15.4198 17.3059 15.4638 17.5625 15.3811 17.7149C15.3091 17.8474 15.1811 17.9403 15.0328 17.9678C14.8624 17.9994 14.6319 17.8782 14.1709 17.6358L9.79816 15.3362C9.66191 15.2645 9.59379 15.2287 9.52202 15.2146C9.45848 15.2022 9.39312 15.2022 9.32957 15.2146C9.2578 15.2287 9.18968 15.2645 9.05344 15.3362L4.6807 17.6358C4.2197 17.8782 3.98919 17.9994 3.81875 17.9678C3.67046 17.9403 3.5425 17.8474 3.47052 17.7149C3.38778 17.5625 3.43181 17.3058 3.51986 16.7925L4.35467 11.9251C4.38069 11.7734 4.39371 11.6975 4.3849 11.6249C4.3771 11.5606 4.35689 11.4984 4.32539 11.4418C4.2898 11.3779 4.23466 11.3242 4.12437 11.2168L0.586341 7.77074C0.213444 7.40754 0.0269959 7.22594 0.00430753 7.05414C-0.0154326 6.90466 0.0333348 6.75425 0.137032 6.6448C0.256216 6.519 0.513753 6.48135 1.02882 6.40607L5.92009 5.69113C6.07221 5.6689 6.14826 5.65778 6.2145 5.62698C6.27315 5.59971 6.32594 5.56132 6.36997 5.51394C6.41969 5.46042 6.45371 5.3915 6.52175 5.25364L8.70843 0.823678Z" fill="#D8D8D8"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
            <path d="M8.70843 0.823678C8.93892 0.356738 9.05416 0.123269 9.21061 0.0486752C9.34673 -0.0162251 9.50487 -0.0162251 9.64099 0.0486752C9.79744 0.123269 9.91268 0.356738 10.1432 0.823677L12.3298 5.25364C12.3979 5.3915 12.4319 5.46042 12.4816 5.51394C12.5257 5.56132 12.5785 5.59971 12.6371 5.62698C12.7033 5.65778 12.7794 5.6689 12.9315 5.69113L17.8228 6.40607C18.3378 6.48135 18.5954 6.519 18.7146 6.6448C18.8183 6.75425 18.867 6.90466 18.8473 7.05414C18.8246 7.22594 18.6382 7.40754 18.2653 7.77074L14.7272 11.2168C14.6169 11.3242 14.5618 11.3779 14.5262 11.4418C14.4947 11.4984 14.4745 11.5606 14.4667 11.6249C14.4579 11.6975 14.4709 11.7734 14.4969 11.9251L15.3317 16.7925C15.4198 17.3059 15.4638 17.5625 15.3811 17.7149C15.3091 17.8474 15.1811 17.9403 15.0328 17.9678C14.8624 17.9994 14.6319 17.8782 14.1709 17.6358L9.79816 15.3362C9.66191 15.2645 9.59379 15.2287 9.52202 15.2146C9.45848 15.2022 9.39312 15.2022 9.32957 15.2146C9.2578 15.2287 9.18968 15.2645 9.05344 15.3362L4.6807 17.6358C4.2197 17.8782 3.98919 17.9994 3.81875 17.9678C3.67046 17.9403 3.5425 17.8474 3.47052 17.7149C3.38778 17.5625 3.43181 17.3058 3.51986 16.7925L4.35467 11.9251C4.38069 11.7734 4.39371 11.6975 4.3849 11.6249C4.3771 11.5606 4.35689 11.4984 4.32539 11.4418C4.2898 11.3779 4.23466 11.3242 4.12437 11.2168L0.586341 7.77074C0.213444 7.40754 0.0269959 7.22594 0.00430753 7.05414C-0.0154326 6.90466 0.0333348 6.75425 0.137032 6.6448C0.256216 6.519 0.513753 6.48135 1.02882 6.40607L5.92009 5.69113C6.07221 5.6689 6.14826 5.65778 6.2145 5.62698C6.27315 5.59971 6.32594 5.56132 6.36997 5.51394C6.41969 5.46042 6.45371 5.3915 6.52175 5.25364L8.70843 0.823678Z" fill="#D8D8D8"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
            <path d="M8.70843 0.823678C8.93892 0.356738 9.05416 0.123269 9.21061 0.0486752C9.34673 -0.0162251 9.50487 -0.0162251 9.64099 0.0486752C9.79744 0.123269 9.91268 0.356738 10.1432 0.823677L12.3298 5.25364C12.3979 5.3915 12.4319 5.46042 12.4816 5.51394C12.5257 5.56132 12.5785 5.59971 12.6371 5.62698C12.7033 5.65778 12.7794 5.6689 12.9315 5.69113L17.8228 6.40607C18.3378 6.48135 18.5954 6.519 18.7146 6.6448C18.8183 6.75425 18.867 6.90466 18.8473 7.05414C18.8246 7.22594 18.6382 7.40754 18.2653 7.77074L14.7272 11.2168C14.6169 11.3242 14.5618 11.3779 14.5262 11.4418C14.4947 11.4984 14.4745 11.5606 14.4667 11.6249C14.4579 11.6975 14.4709 11.7734 14.4969 11.9251L15.3317 16.7925C15.4198 17.3059 15.4638 17.5625 15.3811 17.7149C15.3091 17.8474 15.1811 17.9403 15.0328 17.9678C14.8624 17.9994 14.6319 17.8782 14.1709 17.6358L9.79816 15.3362C9.66191 15.2645 9.59379 15.2287 9.52202 15.2146C9.45848 15.2022 9.39312 15.2022 9.32957 15.2146C9.2578 15.2287 9.18968 15.2645 9.05344 15.3362L4.6807 17.6358C4.2197 17.8782 3.98919 17.9994 3.81875 17.9678C3.67046 17.9403 3.5425 17.8474 3.47052 17.7149C3.38778 17.5625 3.43181 17.3058 3.51986 16.7925L4.35467 11.9251C4.38069 11.7734 4.39371 11.6975 4.3849 11.6249C4.3771 11.5606 4.35689 11.4984 4.32539 11.4418C4.2898 11.3779 4.23466 11.3242 4.12437 11.2168L0.586341 7.77074C0.213444 7.40754 0.0269959 7.22594 0.00430753 7.05414C-0.0154326 6.90466 0.0333348 6.75425 0.137032 6.6448C0.256216 6.519 0.513753 6.48135 1.02882 6.40607L5.92009 5.69113C6.07221 5.6689 6.14826 5.65778 6.2145 5.62698C6.27315 5.59971 6.32594 5.56132 6.36997 5.51394C6.41969 5.46042 6.45371 5.3915 6.52175 5.25364L8.70843 0.823678Z" fill="#D8D8D8"/>
          </svg>

          <span class="rating">
          {{ project.ratingAvg || 0 }}
        </span>

          <span class="onThe">
          оценок: {{ project.reviewsCount }}
        </span>

        </div>
      </div>

    </div>


    <div v-if="!loading && !loadingError" class="project-reviews_items"

    >
      <div class="project-reviews_items_item"
           v-for="review of projectReviewsStore.reviews"
      >

        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4.3163 18.4384C4.92462 17.0052 6.34492 16 8 16H14C15.6551 16 17.0754 17.0052 17.6837 18.4384M15 8.5C15 10.7091 13.2091 12.5 11 12.5C8.79086 12.5 7 10.7091 7 8.5C7 6.29086 8.79086 4.5 11 4.5C13.2091 4.5 15 6.29086 15 8.5ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="project-reviews_items_item_data">
          <div class="project-reviews_items_item_heading">
            <div class="info">

          <span>
            {{ userName(review) }}
          </span>
            </div>
            <div class="rating" ref="ratingStars">


              <svg :class="{active: review.rating >= 1}" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9634 5.06925C13.8712 4.78577 13.6198 4.58507 13.3235 4.55826L9.28209 4.19135L7.68491 0.452034C7.56698 0.17731 7.29867 0 7.00002 0C6.70137 0 6.43295 0.17731 6.31577 0.452034L4.71859 4.19135L0.676564 4.55826C0.380264 4.5856 0.129359 4.7863 0.0366454 5.06925C-0.0555345 5.35274 0.0295957 5.66367 0.25369 5.86021L3.30866 8.53898L2.4079 12.5062C2.342 12.7979 2.45522 13.0996 2.69726 13.2745C2.82736 13.3691 2.98021 13.4163 3.13359 13.4163C3.2654 13.4163 3.39731 13.3813 3.51513 13.3108L7.00002 11.227L10.4843 13.3108C10.7399 13.4635 11.0613 13.4495 11.3028 13.2745C11.5448 13.0996 11.658 12.7979 11.5921 12.5062L10.6914 8.53898L13.7463 5.86021C13.9703 5.66367 14.0556 5.35338 13.9634 5.06925Z" fill="#191B2A"/>
              </svg>
              <svg :class="{active: review.rating >= 2}" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9634 5.06925C13.8712 4.78577 13.6198 4.58507 13.3235 4.55826L9.28209 4.19135L7.68491 0.452034C7.56698 0.17731 7.29867 0 7.00002 0C6.70137 0 6.43295 0.17731 6.31577 0.452034L4.71859 4.19135L0.676564 4.55826C0.380264 4.5856 0.129359 4.7863 0.0366454 5.06925C-0.0555345 5.35274 0.0295957 5.66367 0.25369 5.86021L3.30866 8.53898L2.4079 12.5062C2.342 12.7979 2.45522 13.0996 2.69726 13.2745C2.82736 13.3691 2.98021 13.4163 3.13359 13.4163C3.2654 13.4163 3.39731 13.3813 3.51513 13.3108L7.00002 11.227L10.4843 13.3108C10.7399 13.4635 11.0613 13.4495 11.3028 13.2745C11.5448 13.0996 11.658 12.7979 11.5921 12.5062L10.6914 8.53898L13.7463 5.86021C13.9703 5.66367 14.0556 5.35338 13.9634 5.06925Z" fill="#191B2A"/>
              </svg>
              <svg :class="{active: review.rating >= 3}" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9634 5.06925C13.8712 4.78577 13.6198 4.58507 13.3235 4.55826L9.28209 4.19135L7.68491 0.452034C7.56698 0.17731 7.29867 0 7.00002 0C6.70137 0 6.43295 0.17731 6.31577 0.452034L4.71859 4.19135L0.676564 4.55826C0.380264 4.5856 0.129359 4.7863 0.0366454 5.06925C-0.0555345 5.35274 0.0295957 5.66367 0.25369 5.86021L3.30866 8.53898L2.4079 12.5062C2.342 12.7979 2.45522 13.0996 2.69726 13.2745C2.82736 13.3691 2.98021 13.4163 3.13359 13.4163C3.2654 13.4163 3.39731 13.3813 3.51513 13.3108L7.00002 11.227L10.4843 13.3108C10.7399 13.4635 11.0613 13.4495 11.3028 13.2745C11.5448 13.0996 11.658 12.7979 11.5921 12.5062L10.6914 8.53898L13.7463 5.86021C13.9703 5.66367 14.0556 5.35338 13.9634 5.06925Z" fill="#191B2A"/>
              </svg>
              <svg :class="{active: review.rating >= 4}" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9634 5.06925C13.8712 4.78577 13.6198 4.58507 13.3235 4.55826L9.28209 4.19135L7.68491 0.452034C7.56698 0.17731 7.29867 0 7.00002 0C6.70137 0 6.43295 0.17731 6.31577 0.452034L4.71859 4.19135L0.676564 4.55826C0.380264 4.5856 0.129359 4.7863 0.0366454 5.06925C-0.0555345 5.35274 0.0295957 5.66367 0.25369 5.86021L3.30866 8.53898L2.4079 12.5062C2.342 12.7979 2.45522 13.0996 2.69726 13.2745C2.82736 13.3691 2.98021 13.4163 3.13359 13.4163C3.2654 13.4163 3.39731 13.3813 3.51513 13.3108L7.00002 11.227L10.4843 13.3108C10.7399 13.4635 11.0613 13.4495 11.3028 13.2745C11.5448 13.0996 11.658 12.7979 11.5921 12.5062L10.6914 8.53898L13.7463 5.86021C13.9703 5.66367 14.0556 5.35338 13.9634 5.06925Z" fill="#191B2A"/>
              </svg>
              <svg :class="{active: review.rating >= 5}" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9634 5.06925C13.8712 4.78577 13.6198 4.58507 13.3235 4.55826L9.28209 4.19135L7.68491 0.452034C7.56698 0.17731 7.29867 0 7.00002 0C6.70137 0 6.43295 0.17731 6.31577 0.452034L4.71859 4.19135L0.676564 4.55826C0.380264 4.5856 0.129359 4.7863 0.0366454 5.06925C-0.0555345 5.35274 0.0295957 5.66367 0.25369 5.86021L3.30866 8.53898L2.4079 12.5062C2.342 12.7979 2.45522 13.0996 2.69726 13.2745C2.82736 13.3691 2.98021 13.4163 3.13359 13.4163C3.2654 13.4163 3.39731 13.3813 3.51513 13.3108L7.00002 11.227L10.4843 13.3108C10.7399 13.4635 11.0613 13.4495 11.3028 13.2745C11.5448 13.0996 11.658 12.7979 11.5921 12.5062L10.6914 8.53898L13.7463 5.86021C13.9703 5.66367 14.0556 5.35338 13.9634 5.06925Z" fill="#191B2A"/>
              </svg>

            </div>

            <div class="date">
              {{ normalizeData(review.createdAt) }}
            </div>



          </div>

          <div class="project-reviews_items_item_body" v-if="review.comment">
            {{ review.comment }}
          </div>

          <div class="menu" v-if="userInfo.role === 'admin'">
            <button-action
                @click="() => { onEditReview(review) }"
            >
              <template #text>
                Редактировать
              </template>
              <template #icon>
                <svg data-v-76b04a54="" xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" style="width: 15px; height: 15px;"><path data-v-76b04a54="" d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </template>
            </button-action>

            <button-action
                @click="() => { onDeleteReview(review) }"
            >
              <template #text>
                Удалить
              </template>
              <template #icon>
                <svg data-v-76b04a54="" xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none" style="width: 15px; height: 15px;"><path data-v-76b04a54="" d="M6.77778 2.8V2.44C6.77778 1.93595 6.77778 1.68393 6.68089 1.49141C6.59567 1.32206 6.45969 1.18438 6.29244 1.09809C6.10229 1 5.85338 1 5.35556 1H4.64444C4.14662 1 3.89771 1 3.70756 1.09809C3.54031 1.18438 3.40433 1.32206 3.31911 1.49141C3.22222 1.68393 3.22222 1.93595 3.22222 2.44V2.8M1 2.8H9M8.11111 2.8V7.84C8.11111 8.59607 8.11111 8.97411 7.96579 9.26289C7.83796 9.51691 7.63398 9.72343 7.3831 9.85286C7.09788 10 6.72451 10 5.97778 10H4.02222C3.27549 10 2.90212 10 2.6169 9.85286C2.36602 9.72343 2.16204 9.51691 2.03421 9.26289C1.88889 8.97411 1.88889 8.59607 1.88889 7.84V2.8" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </template>
            </button-action>

          </div>
        </div>




      </div>
    </div>
    <div v-if="loading && !loadingError">
      <loader-small />
    </div>
    <div v-if="!loading && loadingError">
      <h4 style="text-align: center; margin-top: 30px; margin-bottom: 30px">Произошла ошибка получения отзывов, пожалуйста повторите попытку позже или перезагрузите страницу</h4>

    </div>

    <Waypoint v-show="showMoreButton"
              @change="way => {
            if (way.going === 'IN') {
              this.onReviews()
            }
          }">

      <button-primary
          class="mt20"
          @click="() => {
this.onReviews()
            }"
          :style="'outline'">
        <template #default>
          Загрузить еще
        </template>
      </button-primary>

    </Waypoint>

    <div class="add-review" :class="{mt: projectReviewsStore.reviews.length > 0}">
      <empty-store
          :show-button="true"
          :show-button-for-users="true"
          :showButtonForUnauthorised="true"
          :hideReviewButton="alreadyReviewed"
          @click="() => {
              modalReviewsController.show = true
              modalReviewsController.mode = 'add'
              modalReviewsController.buttonConfirmText = 'Оставить отзыв'
              modalReviewsController.product = null
              modalReviewsController.projectId = this.$props.project.id
          }">
        <template #header>
          <span v-if="projectReviewsStore.reviews.length <= 0">Никто еще не оставил отзывов о</span>
          <span v-else>Оставьте отзыв о </span>
        </template>
        <template #text>
          {{ $props.project.name }}
        </template>
        <template #buttonText>
          Оставить отзыв
        </template>
        <template #left-icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="163" height="109" viewBox="0 0 163 109" fill="none">
            <path d="M8.90353 62.2004C-5.87284 69.9729 -11.5716 88.3196 -3.79914 103.096L9.41629 128.22C9.90262 129.145 11.0477 129.5 11.9723 129.014L37.0965 115.799C51.8728 108.026 57.5716 89.6795 49.7991 74.9031C42.0267 60.1267 23.6799 54.428 8.90353 62.2004ZM28.1991 94.8183L14.7995 101.867C13.8749 102.353 12.7298 101.997 12.2435 101.073C11.7572 100.148 12.1129 99.003 13.0374 98.5166L26.437 91.4684C27.3616 90.9821 28.5066 91.3378 28.993 92.2623C29.4793 93.1869 29.1236 94.332 28.1991 94.8183ZM32.9626 79.4825L9.51331 91.8169C8.58874 92.3032 7.44367 91.9475 6.95734 91.0229C6.47101 90.0984 6.82669 88.9533 7.75126 88.467L31.2005 76.1326C32.1251 75.6462 33.2701 76.0019 33.7565 76.9265C34.2428 77.8511 33.8871 78.9961 32.9626 79.4825Z" fill="#E1E1E1"/>
            <path d="M90.7897 17.7702C84.6554 13.9689 76.5713 15.8671 72.7701 22.0015L66.3068 32.4316C66.0689 32.8154 66.1874 33.32 66.5712 33.5578L77.0014 40.0211C83.1357 43.8224 91.2198 41.9241 95.021 35.7898C98.8223 29.6555 96.9241 21.5714 90.7897 17.7702ZM82.8674 32.1079L77.3046 28.6608C76.9208 28.423 76.8023 27.9184 77.0402 27.5346C77.278 27.1508 77.7826 27.0323 78.1664 27.2701L83.7291 30.7172C84.113 30.9551 84.2314 31.4596 83.9936 31.8434C83.7557 32.2273 83.2512 32.3457 82.8674 32.1079ZM89.6247 30.5212L79.8899 24.4888C79.5061 24.2509 79.3876 23.7464 79.6255 23.3625C79.8633 22.9787 80.3679 22.8602 80.7517 23.0981L90.4865 29.1305C90.8703 29.3683 90.9888 29.8729 90.751 30.2567C90.5131 30.6405 90.0086 30.759 89.6247 30.5212Z" fill="#E1E1E1"/>
            <path d="M131.393 61.7335C137.616 58.0795 145.652 60.1699 149.306 66.3931L155.519 76.9743C155.748 77.3637 155.617 77.8653 155.228 78.0939L144.647 84.3068C138.423 87.9608 130.387 85.8704 126.733 79.6472C123.079 73.424 125.169 65.3875 131.393 61.7335ZM138.971 76.256L144.614 72.9425C145.004 72.7138 145.134 72.2123 144.906 71.8229C144.677 71.4335 144.175 71.303 143.786 71.5316L138.143 74.8452C137.753 75.0738 137.623 75.5754 137.851 75.9648C138.08 76.3542 138.582 76.4846 138.971 76.256ZM132.253 74.5087L142.129 68.71C142.519 68.4813 142.649 67.9798 142.42 67.5904C142.192 67.201 141.69 67.0705 141.301 67.2991L131.425 73.0978C131.036 73.3265 130.905 73.828 131.134 74.2174C131.362 74.6068 131.864 74.7373 132.253 74.5087Z" fill="#E1E1E1"/>
            <path d="M30.7881 3.67764C27.8425 5.45943 26.8956 9.30585 28.6774 12.2514L31.707 17.2598C31.8185 17.4441 32.0585 17.5032 32.2428 17.3917L37.2512 14.3622C40.1968 12.5804 41.1437 8.73396 39.3619 5.78837C37.5801 2.84278 33.7337 1.89585 30.7881 3.67764ZM35.1614 10.1535L32.4903 11.7693C32.306 11.8808 32.0659 11.8217 31.9544 11.6374C31.843 11.453 31.9021 11.213 32.0864 11.1015L34.7575 9.48572C34.9418 9.37423 35.1819 9.43333 35.2934 9.61764C35.4049 9.80195 35.3458 10.042 35.1614 10.1535ZM35.953 6.93833L31.2785 9.76592C31.0942 9.87741 30.8541 9.81831 30.7426 9.634C30.6311 9.44969 30.6902 9.20963 30.8745 9.09814L35.549 6.27054C35.7333 6.15906 35.9734 6.21816 36.0849 6.40246C36.1964 6.58677 36.1373 6.82684 35.953 6.93833Z" fill="#E1E1E1"/>
            <path d="M150.342 3.23135C147.397 5.01314 146.45 8.85957 148.232 11.8052L151.261 16.8135C151.373 16.9978 151.613 17.0569 151.797 16.9455L156.805 13.9159C159.751 12.1341 160.698 8.28767 158.916 5.34208C157.134 2.39649 153.288 1.44956 150.342 3.23135ZM154.716 9.70722L152.044 11.323C151.86 11.4345 151.62 11.3754 151.509 11.1911C151.397 11.0068 151.456 10.7667 151.641 10.6552L154.312 9.03943C154.496 8.92794 154.736 8.98704 154.848 9.17135C154.959 9.35566 154.9 9.59573 154.716 9.70722ZM155.507 6.49204L150.833 9.31963C150.648 9.43112 150.408 9.37202 150.297 9.18771C150.185 9.00341 150.244 8.76334 150.429 8.65185L155.103 5.82425C155.287 5.71277 155.528 5.77187 155.639 5.95618C155.751 6.14048 155.691 6.38055 155.507 6.49204Z" fill="#E1E1E1"/>
          </svg>
        </template>
        <template #right-icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="156" height="109" viewBox="0 0 156 109" fill="none">
            <path d="M153.244 62.2004C168.02 69.9729 173.719 88.3196 165.947 103.096L152.731 128.22C152.245 129.145 151.1 129.5 150.175 129.014L125.051 115.799C110.275 108.026 104.576 89.6795 112.348 74.9031C120.121 60.1267 138.468 54.428 153.244 62.2004ZM133.949 94.8183L147.348 101.867C148.273 102.353 149.418 101.997 149.904 101.073C150.39 100.148 150.035 99.003 149.11 98.5166L135.711 91.4684C134.786 90.9821 133.641 91.3378 133.155 92.2623C132.668 93.1869 133.024 94.332 133.949 94.8183ZM129.185 79.4825L152.634 91.8169C153.559 92.3032 154.704 91.9475 155.19 91.0229C155.677 90.0984 155.321 88.9533 154.396 88.467L130.947 76.1326C130.023 75.6462 128.877 76.0019 128.391 76.9265C127.905 77.8511 128.26 78.9961 129.185 79.4825Z" fill="#E1E1E1"/>
            <path d="M71.3579 17.7702C77.4922 13.9689 85.5763 15.8671 89.3776 22.0015L95.8409 32.4316C96.0787 32.8154 95.9602 33.32 95.5764 33.5578L85.1463 40.0211C79.0119 43.8224 70.9279 41.9241 67.1266 35.7898C63.3253 29.6555 65.2236 21.5714 71.3579 17.7702ZM79.2803 32.1079L84.843 28.6608C85.2269 28.423 85.3453 27.9184 85.1075 27.5346C84.8696 27.1508 84.3651 27.0323 83.9813 27.2701L78.4185 30.7172C78.0347 30.9551 77.9162 31.4596 78.1541 31.8434C78.3919 32.2273 78.8965 32.3457 79.2803 32.1079ZM72.5229 30.5212L82.2577 24.4888C82.6415 24.2509 82.76 23.7464 82.5222 23.3625C82.2843 22.9787 81.7798 22.8602 81.3959 23.0981L71.6611 29.1305C71.2773 29.3683 71.1588 29.8729 71.3967 30.2567C71.6345 30.6405 72.1391 30.759 72.5229 30.5212Z" fill="#E1E1E1"/>
            <path d="M30.755 61.7325C24.5319 58.0785 16.4953 60.1689 12.8413 66.3921L6.62846 76.9733C6.39983 77.3627 6.5303 77.8643 6.91968 78.0929L17.5009 84.3058C23.7241 87.9598 31.7606 85.8694 35.4146 79.6462C39.0686 73.4231 36.9782 65.3865 30.755 61.7325ZM23.1766 76.255L17.5333 72.9415C17.1439 72.7129 17.0134 72.2113 17.2421 71.8219C17.4707 71.4325 17.9723 71.302 18.3617 71.5307L24.005 74.8442C24.3944 75.0728 24.5249 75.5744 24.2962 75.9638C24.0676 76.3532 23.566 76.4837 23.1766 76.255ZM29.8943 74.5077L20.0184 68.709C19.6291 68.4804 19.4986 67.9788 19.7272 67.5894C19.9559 67.2 20.4574 67.0695 20.8468 67.2982L30.7226 73.0968C31.112 73.3255 31.2425 73.8271 31.0139 74.2165C30.7852 74.6058 30.2836 74.7363 29.8943 74.5077Z" fill="#E1E1E1"/>
            <path d="M131.36 3.67764C134.305 5.45943 135.252 9.30585 133.47 12.2514L130.441 17.2598C130.329 17.4441 130.089 17.5032 129.905 17.3917L124.896 14.3622C121.951 12.5804 121.004 8.73396 122.786 5.78837C124.567 2.84278 128.414 1.89585 131.36 3.67764ZM126.986 10.1535L129.657 11.7693C129.842 11.8808 130.082 11.8217 130.193 11.6374C130.305 11.453 130.246 11.213 130.061 11.1015L127.39 9.48572C127.206 9.37423 126.966 9.43333 126.854 9.61764C126.743 9.80195 126.802 10.042 126.986 10.1535ZM126.195 6.93833L130.869 9.76592C131.053 9.87741 131.294 9.81831 131.405 9.634C131.517 9.44969 131.457 9.20963 131.273 9.09814L126.599 6.27054C126.414 6.15906 126.174 6.21816 126.063 6.40246C125.951 6.58677 126.01 6.82684 126.195 6.93833Z" fill="#E1E1E1"/>
            <path d="M11.8053 3.23135C14.7509 5.01314 15.6978 8.85957 13.916 11.8052L10.8865 16.8135C10.775 16.9978 10.5349 17.0569 10.3506 16.9455L5.34224 13.9159C2.39665 12.1341 1.44972 8.28767 3.23151 5.34208C5.0133 2.39649 8.85972 1.44956 11.8053 3.23135ZM7.432 9.70722L10.1031 11.323C10.2874 11.4345 10.5275 11.3754 10.639 11.1911C10.7505 11.0068 10.6914 10.7667 10.5071 10.6552L7.83594 9.03943C7.65164 8.92794 7.41157 8.98704 7.30008 9.17135C7.18859 9.35566 7.24769 9.59573 7.432 9.70722ZM6.64048 6.49204L11.315 9.31963C11.4993 9.43112 11.7393 9.37202 11.8508 9.18771C11.9623 9.00341 11.9032 8.76334 11.7189 8.65185L7.04442 5.82425C6.86011 5.71277 6.62005 5.77187 6.50856 5.95618C6.39707 6.14048 6.45617 6.38055 6.64048 6.49204Z" fill="#E1E1E1"/>
          </svg>
        </template>
      </empty-store>
    </div>

    <popup-reviews-controller
        v-if="modalReviewsController.show"
        :modal="modalReviewsController"
        :options="modalReviewsController.product"
        :projectId="$props.project.id"
        :mode="modalReviewsController.mode"
        :dataReview="reviewToEdit"
        @closeModal="modalReviewsController.show = false"
        @reviewAdded="emit => {
          modalInfo.show = true
        }"
        @userRegistration="(emit) => {
          modalReviewsController.show = false
          modalAuth.show = true
          this.notice.show = true
          this.notice.text = {error: emit}
        }"
    >
      <template #header>
        Оставить отзыв
      </template>
      <template #buttonConfirm>
        {{ modalReviewsController.buttonConfirmText }}
      </template>
      <template #buttonSecondary>
        Закрыть
      </template>
    </popup-reviews-controller>

    <popup-delete
        @click.stop
        v-if="modalDelete"
        :modal="modalDelete"
        @closeModal="modalDelete.show = false"
        @deleteConfirmed="() => {
        deleteReview(reviewToDelete)
        project.reviewsCount--
      }"

    >
      <template #header>
        Удалить отзыв?
      </template>
      <template #text @click.stop>
        Вы действительно хотите удалить отзыв?
      </template>
      <template #buttonConfirm @click.stop>
        Да, удалить
      </template>
      <template #buttonSecondary>
        Отменить
      </template>
    </popup-delete>

    <popup-info
        :modal="modalInfo"
        v-if="modalInfo.show"
        @closeModal="() => {
        modalInfo.show = false
      }"


    >
      <template #header>
        Отзыв успешно добавлен
      </template>

      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
          <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </template>

      <template #text>
        <span v-if="userInfo.role === 'admin'">Спасибо за добавление отзыва.</span>
        <span v-else>Спасибо за добавление отзыва, он появится после проверки модератором.</span>
      </template>

      <template #button>
        Закрыть
      </template>
    </popup-info>

    <popup-auth
        v-if="modalAuth.show === true"
        @closeModal="modalAuth.show = false"
        v-bind:modal="modalAuth" />

    <notice v-if="notice.show" :notice="notice"
            @closeNotice="notice.show = false"
    />
  </div>
</template>

<script>
import emptyStore from "../Blocks/EmptyStore.vue";
import buttonAction from "../components/Buttons/ButtonAction.vue";
import popupReviewsController from "../components/Popups/PopupReviewsController.vue";
import {projectReviewsStore} from "../Store/projectReviews.js";
import {disapproveReview, getReviews, deleteReview, editReview} from "../API/reviews.js";
import {userInfo} from "../Store/userInfo.js";
import popupDelete from "../components/Popups/PopupDelete.vue";
import popupInfo from "../components/Popups/PopupInfo.vue";
import popupAuth from "../components/Popups/PopupAuth.vue";

import sort from "../Helpers/Sort.vue";
import notice from "../components/Popups/Notice.vue";
import loaderSmall from "../components/Loaders/LoaderSmall.vue";
import buttonPrimary from "../components/Buttons/ButtonPrimary.vue";
import {Waypoint} from "vue-waypoint";
export default {
  name: "ProjectReviews.vue",
  emits: ['productAdded', 'productUpdated', 'reviewAdded'],
  props: {
    project: {
      name: null,
      id: null,
    }
  },
  data() {
    return {
      saveHeight: {"min-height": 0},
      loading: false,
      loadingError: false,
      modalReviewsController: {
        show: false,
        review: null,
        buttonConfirmText: "Добавить отзыв"
      },
      modalAuth: {
        show: false
      },
      options: {
        limit: 5,
        offset: 0
      },
      modalDelete: {
        show: false,
        review: null,
        buttonConfirmText: "Добавить отзыв"
      },
      months: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      notice: {
        show: false,
        color: null,
        text: {}
      },
      showMoreButton: true,
      alreadyReviewed: false,
      sorts: [
        {
          name: 'Сначала новые',
          sort: 'newest'
        },
        {
          name: 'Сначала старые',
          sort: 'oldest'
        },
        {
          name: 'С высоким рейтингом',
          sort: 'highestRating'
        },
        {
          name: 'С низким рейтингом',
          sort: 'lowestRating'
        },
      ],
      selectedSort: {
        name: 'Сначала новые',
        sort: 'newest'
      },
      getReviews,
      modalInfo: {
        show: false,
      },
      reviewToEdit: null,
      projectReviewsStore,
      userInfo,
      deleteReview,
      reviewToDelete: null
    }
  },

  components: {
    emptyStore,
    buttonAction,
    popupReviewsController,
    popupDelete,
    popupInfo,
    popupAuth,
    sort,
    notice,
    loaderSmall,
    buttonPrimary,
    Waypoint
  },

  methods: {
    userName(review) {
      if( review.userData ) {
        return review.userData.username
      } else {

        return 'user' + review.anonId
      }

    },

    normalizeData(date) {
      let reviewDate = Date.parse(date)
      return new Date(reviewDate).getDate() + ' ' + this.months[new Date(reviewDate).getMonth()] + ' ' + new Date(reviewDate).getFullYear()
    },

    onEditReview(review) {
      this.modalReviewsController.show = true
      this.modalReviewsController.mode = 'edit'
      this.modalReviewsController.buttonConfirmText = 'Изменить отзыв'
      this.reviewToEdit = review
      this.modalReviewsController.projectId = this.$props.project.id

    },
    onDeleteReview(review) {
      this.modalDelete.show = true
      this.reviewToDelete = review
    },
    onDisapproveReview(review) {
      disapproveReview(review)

    },

    onReviews() {
      getReviews({
        projectId: this.project.id,
        sort: this.selectedSort.sort,
        limit: this.options.limit,
        offset: this.options.offset
      }).then((result) => {
        this.loading = false
        for (let review of result.data.reviews) {
          projectReviewsStore.reviews.push(review)
        }
        if (result.data.reviews.length < this.options.limit) {
          this.showMoreButton = false
        }
        this.options.offset = this.options.offset + this.options.limit
      }).catch(err => {

        this.loading = false
        this.loadingError = true
        this.showMoreButton = false
      })



    }


  },
  watch: {
    project: function (newVal, oldVal) {
      this.onReviews()
    },
  },

  beforeUnmount() {
    projectReviewsStore.reviews.length > 0 ?  projectReviewsStore.reviews.splice(0, projectReviewsStore.reviews.length): null
  },

  mounted() {
    this.loading = true
    this.loadingError = false
    this.onReviews()

    for (let i = 0; i < this.project.ratingAvg; i++) {
      this.$refs.stars.childNodes[i].classList.add('active')
    }
  }


}
</script>

<style scoped lang="scss">
.project-reviews {
  margin-top: 25px;
  margin-bottom: 10px;

  .filter {
    margin-top: -2px;
    width: 150px;
  }

  .project-reviews_heading {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: flex;
    gap: 20px;

    align-items: end;
    margin-bottom: -5px;

    h2 {
      margin-top: -10px;
      line-height: 2;
    }

    .project-rating {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: end;





      svg {
        &.active {
          path {
            fill: #FFC700;
          }
        }
        path {
          fill: #dadada;
        }
      }
      .onThe {
        font-size: 12px;
        width: 100%;
        text-align: right;
      }

      .rating {
        color: #000;
        text-align: right;
        font-family: "PT Sans Caption";
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 0;

      }
    }

  }

  .project-products_items {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: space-between;

    &::after {
      content: "";
      flex: auto;
    }

    .project-products_items_item {
      .project-products_admin-menu {
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }
  }
}

@media screen and (max-width: 768px){

  .project-products .project-products_items {
    justify-content: space-between;

    .project-products_items_item {
      width: 20%;
    }
  }
}
.project-reviews {

  .project-reviews_heading {
    align-items: center;
    gap: 10px;
    h2 {
      margin-top: 0;
      font-size: 20px;
      line-height: 1.2;
      position: relative;

    }
  }
  .filter {
    width: auto;
  }
}


.project-reviews_items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  ;

  .project-reviews_items_item {
    width: 100%;
    border-radius: 20px;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    padding: 15px;
    display: flex;
    gap: 20px;
    box-sizing: border-box;

    .icon {
      width: 50px;

      svg {
        width: 50px;
        height: 50px;
      }
    }
    .project-reviews_items_item_data {
      width: 100%;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
    }

    .project-reviews_items_item_body {
      word-break: break-word;
      color: #191B2A;
      font-family: "PT Sans Caption";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 154.183%; /* 21.586px */
    }
    .project-reviews_items_item_heading {
      display: flex;
      justify-content: start;
      width: 100%;
      align-items: center;
      gap: 10px;
      box-sizing: border-box;

      span {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        position: relative;
        display: inline-block;
        text-align: left;
        text-decoration: none;
        white-space: nowrap;
        font-weight: bold;
      }

      .info {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #000;
        font-family: "PT Sans Caption";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;


      }
      .date {
        color: #B3B4C9;
        font-size: 14px;
      }
      .rating {
        display: flex;
        justify-content: end;
        align-items: start;
        gap: 2px;
        margin-left: auto;
        color: #000;
        text-align: right;
        font-family: "PT Sans Caption";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        svg {
          path {
            fill: #b6b6b6;
          }

          &.active {
            path {
              fill: #000000
            }
          }
        }

      }
    }

    .menu {
      display: flex;
      gap: 10px;
      margin-top: 0;
      margin-left: auto;

    }

  }

}

.add-review {
  &.mt {
    margin-top: 50px;
  }
}

@media screen and (max-width: 768px){
  .project-reviews_items {
    .project-reviews_items_item {
      width: 100%;
      gap: 10px;
      .icon {
        width: 40px;
        svg {
          width: 100%;
        }
      }
      .menu {
        gap: 5px;
      }

      .project-reviews_items_item_heading {
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 5px;
        span {
          width: 50px;
        }
        .rating {
          margin-left: -0px;
          width: 25%;
        }

      }
      .project-reviews_items_item_body {
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .menu {
        width: 100%;
        margin: 0;
      }
    }
  }

  .project-reviews {
    .project-reviews_heading {

      gap: 15px;
      h2 {
        font-size: 16px;
      }
      .project-rating {
        gap: 2px;

        .rating {
          font-size: 14px;
        }
        svg {
          width: 12px;
        }
        .onThe {
          font-size: 10px;
        }
      }
    }
  }
  .project-reviews_items .project-reviews_items_item .project-reviews_items_item_heading .date {
    font-size: 12px;
  }
}
.mt20 {
  margin-top: 20px;
}
</style>