<template>
  <div class="wrapper">
    <loader v-if="this.loadingComponents.wrapper === true"></loader>
    <div class="left" v-else>
      <div class="reviews">
        <div class="sort">


<!--          <div v-if="userInfo.role === 'admin'" class="check">-->
<!--            <button class="btn btn-outlined"-->
<!--                    v-on:click="() => {-->
<!--                                  this.reviews = this.reviews.splice(this.reviews.length, this.reviews.length)-->
<!--                                  this.offset = 0-->
<!--                                  this.limit = 5-->
<!--                                  this.showNotReviewed = true-->
<!--                                  this.loadingComponents.reviews = true-->
<!--                                  this.editReview = false-->
<!--                                  getReviews(this.limit, this.offset,'newest', this.showNotReviewed)-->
<!--                                }"-->
<!--                    v-if="this.showNotReviewed === false">-->
<!--             Проверить отзывы-->
<!--            </button>-->

<!--            <button class="btn btn-outlined"-->
<!--                    v-on:click="() => {-->
<!--                      this.reviews = this.reviews.splice(this.reviews.length, this.reviews.length)-->
<!--                      this.offset = 0-->
<!--                      this.limit = 5-->
<!--                      this.loadingComponents.reviews = true-->
<!--                      this.editReview = false-->

<!--                      this.showNotReviewed = false-->
<!--                      getReviews(this.limit,this.offset,'newest', this.showNotReviewed)-->
<!--                                }"-->
<!--                    v-if="this.showNotReviewed === true">-->
<!--              Показать проверенные-->
<!--            </button>-->

<!--          </div>-->
        </div>


        <div class="sort-icon">


          <div class="btns" v-if="reviews.length > 1">
      <span class="currentSort"
            ref="currentSort"
            v-click-outside="onClickOutside"
            v-on:click="() => {
              this.showSort = !this.showSort
              this.arrowDate === 'down' ? this.arrowDate = 'up' : this.arrowDate = 'down'


            }">
        {{ this.activeSortName }}
        <svg id="a" xmlns="http://www.w3.org/2000/svg" :class="{
            up: arrowDate === 'up',
            down: arrowDate === 'down'
          }" class="arrow"
             viewBox="0 0 15.96 8.57"><path class="b"
                                            d="M.6,8.57c-.15,0-.31-.06-.42-.18-.23-.23-.23-.61,0-.85L7.56,.17c.23-.22,.62-.22,.85,0l7.38,7.38c.23,.23,.23,.61,0,.85-.23,.24-.61,.23-.85,0L7.98,1.44,1.02,8.4c-.12,.12-.27,.18-.42,.18Z"/></svg>

      </span>
            <div class="sortFilter box-shadow" v-if="this.showSort === true">

                  <span class="filter" :class="{active: this.activeSortName === 'Сначала старые'}" v-on:click=" () => {
                if (this.activeSortName !== 'Сначала старые') {
                  this.activeSortName = 'Сначала старые'
                  this.review.sort = 'oldest'
                  this.getOffset = 0
                  this.reviews = this.reviews.slice(this.reviews.length, this.reviews.length)
                  this.clicked = true
                  this.activeSortTab = 'oldest'
                  this.getReviews(this.limit, this.offset, 'oldest', false)}
              }
              ">Сначала старые
           <svg id="a" v-if="this.activeSortName === 'Сначала старые'" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 213.47 166.37">
            <path class="b"
                  d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
          </svg>

        </span>

              <span class="filter" :class="{active: this.activeSortName === 'Сначала новые'}" v-on:click=" () => {
                if (this.activeSortName !== 'Сначала новые') {
                  this.activeSortName = 'Сначала новые'
                  this.review.sort = 'newest'
                  this.getOffset = 0
                  this.reviews = this.reviews.slice(this.reviews.length, this.reviews.length)
                  this.clicked = true
                  this.activeSortTab = 'newest'
                  this.getReviews(this.limit, this.offset, 'newest', false)
                }
              }">Сначала новые
           <svg id="a" v-if="this.activeSortName === 'Сначала новые'" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 213.47 166.37">
            <path class="b"
                  d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
          </svg>

        </span>

              <span class="filter" :class="{active: this.activeSortName === 'С высоким рейтингом'}" v-on:click=" () => {
                if (this.activeSortName !== 'С высоким рейтингом') {
                  this.activeSortName = 'С высоким рейтингом'
                  this.review.sort = 'highestRating'
                  this.getOffset = 0
                  this.reviews = this.reviews.slice(this.reviews.length, this.reviews.length)
                  this.clicked = true
                  this.activeSortTab = 'highestRating'
                  this.getReviews(this.limit, this.offset, 'highestRating', false)
                }
              }">С высоким рейтингом
           <svg id="a" v-if="this.activeSortName === 'С высоким рейтингом'" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 213.47 166.37">
            <path class="b"
                  d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
          </svg>
        </span>



              <span class="filter" :class="{active: this.activeSortName === 'С низким рейтингом'}" v-on:click="() => {
                  if (this.activeSortName !== 'С низким рейтингом') {
                    this.activeSortName = 'С низким рейтингом'
                    this.review.sort = 'lowestRating'
                    this.getOffset = 0
                    this.reviews = this.reviews.slice(this.reviews.length, this.reviews.length)
                    this.clicked = true
                    this.activeSortTab = 'lowestRating'
                    this.getReviews(this.limit, this.offset, 'lowestRating', false)
                  }
                }">С низким рейтингом
                     <svg id="a" v-if="this.activeSortName === 'С низким рейтингом'" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 213.47 166.37">
                      <path class="b"
                            d="M77.45,100.37c1.51-1.42,2.84-2.62,4.11-3.88,30.17-30.16,60.34-60.34,90.51-90.51,7.98-7.98,13.68-7.98,21.67,0,5.07,5.06,10.18,10.09,15.17,15.23,5.98,6.15,6.09,12.43,.13,18.4-40.72,40.81-81.48,81.58-122.26,122.32-5.99,5.98-12.81,5.91-18.88-.14-21.01-20.94-41.98-41.91-62.92-62.91-6.66-6.68-6.63-12.84-.04-19.51,5.27-5.33,10.57-10.64,15.91-15.91,6.67-6.58,12.78-6.56,19.5,.13,11.11,11.05,22.16,22.15,33.25,33.21,1.15,1.15,2.39,2.22,3.84,3.57Z"/>
                    </svg>

                  </span>
            </div>
          </div>
        </div>
        <transition-group name="list" tag="div" >
          <div class="reviews-wrapper" v-for="(review, index) of reviews" v-if="reviews.length > 0 && this.loadingComponents.reviews === false">
            <div class="review" >


              <div class="review-body" ref="clickedReview" >
                <div class="review-header">
                  <div class="review-nickname">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M4.3163 18.4384C4.92462 17.0052 6.34492 16 8 16H14C15.6551 16 17.0754 17.0052 17.6837 18.4384M15 8.5C15 10.7091 13.2091 12.5 11 12.5C8.79086 12.5 7 10.7091 7 8.5C7 6.29086 8.79086 4.5 11 4.5C13.2091 4.5 15 6.29086 15 8.5ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ review.userData.username }}

                    <span class="date">
                      {{ new Date(review.createdAt).toLocaleString('ru-ru', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour12: false
                    }) }}
                    </span>

                  </div>
                  <div class="rating">
                    <div class="review-rating">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.08141 0.504121C5.2159 0.218337 5.28315 0.0754451 5.37444 0.029791C5.45386 -0.00993033 5.54614 -0.00993033 5.62556 0.029791C5.71685 0.0754451 5.7841 0.218337 5.91859 0.504121L7.19452 3.21543C7.23423 3.29979 7.25408 3.34198 7.28309 3.37473C7.30878 3.40373 7.33959 3.42723 7.37381 3.44392C7.41246 3.46277 7.45684 3.46958 7.5456 3.48319L10.3997 3.92075C10.7002 3.96683 10.8505 3.98987 10.92 4.06686C10.9805 4.13385 11.009 4.22591 10.9975 4.31739C10.9842 4.42254 10.8755 4.53369 10.6579 4.75598L8.59341 6.86508C8.52906 6.93083 8.49688 6.9637 8.47612 7.00282C8.45773 7.03745 8.44594 7.0755 8.44139 7.11485C8.43625 7.15929 8.44384 7.20573 8.45903 7.2986L8.94615 10.2776C8.99753 10.5918 9.02321 10.7489 8.97494 10.8422C8.93293 10.9233 8.85827 10.9802 8.77174 10.997C8.67229 11.0163 8.53779 10.9421 8.26879 10.7937L5.71727 9.38632C5.63777 9.34247 5.59803 9.32054 5.55615 9.31192C5.51907 9.3043 5.48093 9.3043 5.44385 9.31192C5.40198 9.32054 5.36223 9.34247 5.28273 9.38632L2.73121 10.7937C2.46221 10.9421 2.32771 11.0163 2.22826 10.997C2.14173 10.9802 2.06707 10.9233 2.02506 10.8422C1.97679 10.7489 2.00248 10.5918 2.05385 10.2776L2.54097 7.2986C2.55616 7.20573 2.56375 7.15929 2.55861 7.11485C2.55406 7.0755 2.54227 7.03745 2.52388 7.00282C2.50312 6.9637 2.47094 6.93083 2.40659 6.86508L0.342133 4.75598C0.124546 4.53369 0.0157523 4.42254 0.00251347 4.31739C-0.00900502 4.22591 0.019451 4.13385 0.0799588 4.06686C0.149504 3.98987 0.299777 3.96683 0.600324 3.92075L3.4544 3.48319C3.54316 3.46958 3.58754 3.46277 3.62619 3.44392C3.66041 3.42723 3.69122 3.40373 3.71691 3.37473C3.74592 3.34198 3.76577 3.29979 3.80548 3.21543L5.08141 0.504121Z" fill="black"/>
                      </svg>
                      {{ review.rating }}

                    </div>
                  </div>
                </div>
                <div class="review-post">

                  {{ review.comment }}

                </div>
                <div class="review-menu"  v-if="review.userData.username === this.username || this.isAdmin === true ">


                  <div class="menu">


                    <div class="item edit" v-on:click="() => {
                                editComment(review.comment, review.rating, review.id, review.isReviewed)
                                this.clickedReviewIndex = index

                            }">
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Редактировать
                    </div>

                    <div class="item delete" v-on:click="() => {
                          this.reviewToDeleteId = review.id
                          this.reviewToDeleteUsername = review.userData.username
                          deleteReview()
                        }">
                      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
                        <path d="M5.33333 2.4V2.12C5.33333 1.72796 5.33333 1.53194 5.26067 1.38221C5.19676 1.25049 5.09477 1.14341 4.96933 1.0763C4.82672 1 4.64004 1 4.26667 1H3.73333C3.35996 1 3.17328 1 3.03067 1.0763C2.90523 1.14341 2.80324 1.25049 2.73933 1.38221C2.66667 1.53194 2.66667 1.72796 2.66667 2.12V2.4M1 2.4H7M6.33333 2.4V6.32C6.33333 6.90806 6.33333 7.20208 6.22434 7.42669C6.12847 7.62426 5.97549 7.78489 5.78732 7.88556C5.57341 8 5.29339 8 4.73333 8H3.26667C2.70661 8 2.42659 8 2.21268 7.88556C2.02451 7.78489 1.87153 7.62426 1.77566 7.42669C1.66667 7.20208 1.66667 6.90806 1.66667 6.32V2.4" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Удалить
                    </div>

                    <div class="item approve"
                         v-if="review.isReviewed === false"
                         v-on:click="() => {
                                approveReview(review.id, review.rating, review.comment)
                                getReviews()
                            }">
                      <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>
                      Одобрить
                    </div>

                    <div class="item approve"
                         v-if="review.isReviewed === true"
                         v-on:click="() => {
                                disapproveReview(review.id, review.rating, review.comment)
                                getReviews()
                            }">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                        <path d="M4.48905 1.81368C4.65419 1.79031 4.82454 1.77778 5 1.77778C7.07432 1.77778 8.43548 3.52966 8.89277 4.22265C8.94812 4.30653 8.97579 4.34847 8.99128 4.41315C9.00291 4.46173 9.00291 4.53837 8.99126 4.58695C8.97576 4.65163 8.9479 4.69384 8.89216 4.77828C8.77032 4.96284 8.58456 5.22221 8.33846 5.50351M2.85615 2.44474C1.97763 3.01511 1.38122 3.80754 1.10762 4.22205C1.05202 4.30628 1.02423 4.3484 1.00873 4.41308C0.997094 4.46165 0.997089 4.53828 1.00872 4.58686C1.02421 4.65154 1.05188 4.69348 1.10722 4.77735C1.56451 5.47034 2.92567 7.22222 5 7.22222C5.8364 7.22222 6.55685 6.9374 7.14885 6.55201M1.34301 1L8.65699 8M4.13804 3.67504C3.91744 3.88617 3.781 4.17783 3.781 4.5C3.781 5.14433 4.32677 5.66667 5 5.66667C5.33662 5.66667 5.64136 5.53608 5.86196 5.32496" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Снять с публикации
                    </div>
                  </div>

                </div>
              </div>
            </div>


            <div class="notReviews" v-if="this.reviews.length === 0 && this.showNotReviewed === false && this.loadingComponents.reviews === false">

              <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                <g clip-path="url(#clip0_380_7664)">
                  <path d="M26.8089 0C28.2705 0 29.7295 0 31.1911 0C31.4772 0.0721778 31.7608 0.172711 32.0521 0.211378C44.129 1.84569 52.2593 8.43964 56.4353 19.8308C57.2473 22.0503 57.4922 24.476 58 26.8089V31.1911C57.9252 31.5185 57.8144 31.8433 57.7809 32.1758C56.6364 43.5309 48.4313 53.4812 37.4448 56.7008C35.4084 57.2963 33.2791 57.5747 31.1911 58H26.8089C26.5202 57.9278 26.2366 57.8196 25.9453 57.7912C14.0515 56.5874 4.02907 48.0343 1.01564 36.4524C0.567111 34.7278 0.332533 32.9466 0 31.1911C0 29.7295 0 28.2705 0 26.8089C0.0747556 26.4815 0.172711 26.1593 0.219111 25.8293C1.85084 14.0927 8.18444 6.02169 19.2302 1.7864C21.6327 0.866133 24.2749 0.577422 26.8089 0ZM3.35111 28.8685C3.35369 43.2628 14.6882 54.6412 29.0284 54.6489C43.1881 54.654 54.6515 43.2061 54.6489 29.0619C54.6489 14.8428 43.2577 3.35369 29.1572 3.35111C14.8377 3.34853 3.34853 14.7114 3.35111 28.8685Z" fill="#C8716B"/>
                  <path d="M29.0079 13.2653C29.8225 13.4999 30.668 13.6623 31.4439 13.9871C32.3719 14.3763 32.756 15.1857 32.6761 16.1833C32.3409 20.416 31.9981 24.6487 31.6527 28.8815C31.5135 30.5905 31.3537 32.2996 31.2093 34.0086C31.0985 35.3388 30.3793 36.0477 29.0775 36.0915C27.7293 36.1379 26.9173 35.4316 26.7936 34.0422C26.2986 28.5309 25.7934 23.0222 25.3397 17.5083C25.0922 14.4975 26.1001 13.4019 29.0079 13.2627V13.2653Z" fill="#C8716B"/>
                  <path d="M28.7914 44.5957C27.2138 44.49 25.9172 43.0052 26.0409 41.4482C26.1672 39.8629 27.6546 38.5611 29.1987 38.69C30.7737 38.8189 32.0806 40.3217 31.9595 41.8581C31.8332 43.4408 30.3767 44.7013 28.794 44.5957H28.7914Z" fill="#C8716B"/>
                </g>
                <defs>
                  <clipPath id="clip0_380_7664">
                    <rect width="58" height="58" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span>У проекта еще нет отзывов.</span>
            </div>
            <div class="notReviewed" v-if="this.showNotReviewed === true && this.loadingComponents.reviews === false && this.reviews.length === 0">

              <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>
              <span>Все отзывы к проекту проверены</span>
            </div>
            <loader v-else-if="this.loadingComponents.reviews === true"></loader>
          </div>
        </transition-group>

          <div v-if="reviews.length <= 0" class="no-reviews">

            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
              <g clip-path="url(#clip0_380_7664)">
                <path d="M26.8089 0C28.2705 0 29.7295 0 31.1911 0C31.4772 0.0721778 31.7608 0.172711 32.0521 0.211378C44.129 1.84569 52.2593 8.43964 56.4353 19.8308C57.2473 22.0503 57.4922 24.476 58 26.8089V31.1911C57.9252 31.5185 57.8144 31.8433 57.7809 32.1758C56.6364 43.5309 48.4313 53.4812 37.4448 56.7008C35.4084 57.2963 33.2791 57.5747 31.1911 58H26.8089C26.5202 57.9278 26.2366 57.8196 25.9453 57.7912C14.0515 56.5874 4.02907 48.0343 1.01564 36.4524C0.567111 34.7278 0.332533 32.9466 0 31.1911C0 29.7295 0 28.2705 0 26.8089C0.0747556 26.4815 0.172711 26.1593 0.219111 25.8293C1.85084 14.0927 8.18444 6.02169 19.2302 1.7864C21.6327 0.866133 24.2749 0.577422 26.8089 0ZM3.35111 28.8685C3.35369 43.2628 14.6882 54.6412 29.0284 54.6489C43.1881 54.654 54.6515 43.2061 54.6489 29.0619C54.6489 14.8428 43.2577 3.35369 29.1572 3.35111C14.8377 3.34853 3.34853 14.7114 3.35111 28.8685Z" fill="#C8716B"/>
                <path d="M29.0079 13.2653C29.8225 13.4999 30.668 13.6623 31.4439 13.9871C32.3719 14.3763 32.756 15.1857 32.6761 16.1833C32.3409 20.416 31.9981 24.6487 31.6527 28.8815C31.5135 30.5905 31.3537 32.2996 31.2093 34.0086C31.0985 35.3388 30.3793 36.0477 29.0775 36.0915C27.7293 36.1379 26.9173 35.4316 26.7936 34.0422C26.2986 28.5309 25.7934 23.0222 25.3397 17.5083C25.0922 14.4975 26.1001 13.4019 29.0079 13.2627V13.2653Z" fill="#C8716B"/>
                <path d="M28.7914 44.5957C27.2138 44.49 25.9172 43.0052 26.0409 41.4482C26.1672 39.8629 27.6546 38.5611 29.1987 38.69C30.7737 38.8189 32.0806 40.3217 31.9595 41.8581C31.8332 43.4408 30.3767 44.7013 28.794 44.5957H28.7914Z" fill="#C8716B"/>
              </g>
              <defs>
                <clipPath id="clip0_380_7664">
                  <rect width="58" height="58" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span v-if="this.showNotReviewed === true">Нет непроверенных отзывов</span>
            <span v-if="this.showNotReviewed === false">Нет отзывов </span>

          </div>

        <Waypoint @change="(way) => {

                          if (way.going === 'IN' && way.direction === 'UP' && emptyResponse === false) {
                            this.offset += this.limit

                            getReviews(this.limit, this.offset, this.review.sort, this.showNotReviewed)
                          }
                        }"
                  v-if="emptyResponse === false">
          <div class="loadmore btn btn-outlined" ref="loadmore"

               v-on:click="() => {
                         this.offset += this.limit
                           getReviews(this.limit, this.offset, this.review.sort, this.showNotReviewed)

                       }">
            Загрузить еще
          </div>
        </Waypoint>



      </div>

    </div>

  </div>

</template>

<script>
import config from "../../../assets/js/config.js";
import {ref} from "vue";
import loader from "../PageParts/Loader.vue";
import Modal from "../PageParts/Modal.vue";
import vClickOutside from 'click-outside-vue3'
import {Waypoint} from "vue-waypoint";
import {userInfo} from "../../../assets/js/userService.js";


export default {
  name: "projectReviews.vue",
  props: ['isAdmin', 'project', ],

  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      loadingComponents: {
        reviews: false,
        wrapper: true,
      },
      showSort: false,


      reviewToDeleteId: 0,
      reviewToDeleteUsername: '',
      starsCount: 0,

      modalSettings: {},
      clickedReviewIndex: 0,

      clicked: false,
      reviews: [],
      showNotReviewed: false,
      editReview: false,

      isAdmin: userInfo.role === 'admin',
      isReviewed: false,
      reviewID: ref(Number),
      isProjectReviewed: false,

      username: userInfo.username,

      activeSortName: 'Сначала новые',
      activeSortTab: 'newest',
      arrowDate: 'up',
      arrowRating: 'up',

      reviewedCount: {},
      totalReviews: 0,

      review: {
        sort:'newest',
        text: ref(String),
        editMode: false,
        id: ref(null),
        isReviewed: false,
      },

      isLoading: false,

      reviewText: '',
      reviewTextError: '',

      limit: 5,
      offset: 0,
      emptyResponse: false, userInfo
    }
  },
  components: {loader, vClickOutside, Waypoint },
  methods: {

    reviewSended(target) {
      this.isProjectReviewed = true


      setTimeout(() => {
        this.isProjectReviewed = false
      }, 2000)
    },

    getReviewsCount() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const projectId = window.location.pathname.replace('/project/', '');


      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`${config.api.url}reviews-count?projectId=${projectId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.reviewedCount = result.ratingCount
            this.totalReviews = result.totalReviews
            const lastDigit = (num) => num % 10

            if (lastDigit(this.totalReviews) === 1) {
              this.reviewedText = 'Оценил'
              this.reviewedHumanText = 'человек'
            } else if (lastDigit(this.totalReviews) === 5 || lastDigit(this.totalReviews) === 6 || lastDigit(this.totalReviews) === 7 || lastDigit(this.totalReviews) === 8 || lastDigit(this.totalReviews) === 9 || lastDigit(this.totalReviews) === 0){
              this.reviewedText = 'Оценило'
              this.reviewedHumanText = 'человек'
            }
            else {
              this.reviewedText = 'Оценило'
              this.reviewedHumanText = 'человека'
            }

          })
          .catch((error) => console.error(error));
    },

    deleteReview (id, username) {

      this.modalShow = true
      this.modalSettings = {
        iconType: 'warning',
        heading: `Вы собираетесь удалить отзыв от пользователя ${this.reviewToDeleteUsername}`,
        description: `Вы уверены что хотите это сделать?`,
        descriptionType: 'text',
        close: false,
        confirm: true
      }

    },
    deleteReviewConfirmed() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}reviews/${this.reviewToDeleteId}`, {
        method: "DELETE",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then(() => {
            this.isProjectReviewed = false
            this.getReviews(this.limit, this.offset)
          })
          .catch((error) => {console.error(error)});
    },
    getReviews (limit, offset, reviewsSort, isNotReviewed) {
      this.loadingComponents.reviews = true
      reviewsSort === ''? reviewsSort = 'newest' : reviewsSort
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      myHeaders.append("Content-Type", "application/json");

      const projectId = parseInt(this.$route.path.replace('/project/', ''))
      let url = `${config.api.url}reviews?projectId=${projectId}&sort=${reviewsSort}&limit=${limit}&offset=${offset}`

      isNotReviewed === true ? url += `&showNotReviewed=true` : url

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(url, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if(result.message === "No reviews found for this project") {
              this.loadingComponents.reviews = false
              this.loadingComponents.wrapper = false
            } else {
              for (let review of result.reviews) {
                this.reviews.push(review)
              }

              this.loadingComponents.reviews = false
              this.loadingComponents.wrapper = false


              for (let review of this.reviews) {

                localStorage.getItem('username') === review.userData.username ? this.isProjectReviewed = true : ''

              }

            }
            result.reviews.length < this.limit ? this.emptyResponse = true : this.emptyResponse = false
          })
          .catch((error) => console.error(error));
    },

    editComment(text, dataStars, id, reviewed) {
      this.editReview = true
      this.dataStars = dataStars

      setTimeout(()=> {
        this.$refs.sendForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.reviewText = text
        this.reviewID = id
        this.isReviewed = reviewed

        this.setOpacity()
      }, 20)

    },

    clearTextarea () {
      this.reviewText = ''
      this.dataStars = 0
      this.setOpacity()
    },
    sendReview () {
      const review = {
        rating: this.dataStars,
        comment: this.reviewText,
        projectId: this.$props.project.id,
        isReviewed: this.$props.isAdmin
      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}reviews`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(review)
      })
          .then((response) => response.json())
          .then((result) => {
            if (result.success === true) {
              this.dataStars = 0;
              this.reviewText = '';

              this.modalShow = true
              if (this.isAdmin === true) {
                this.modalSettings = {
                  iconType: 'ok',
                  heading: 'Отзыв успешно добавлен!',
                  description: `Спасибо ${this.username}! Поскольку ты админ то он уже опубликован!`,
                  descriptionType: 'text',
                  close: true,

                }
              } else {
                this.modalSettings = {
                  iconType: 'ok',
                  heading: 'Отзыв успешно добавлен!',
                  description: `Спасибо ${this.username}! Мы получили твой отзыв, ожидай одобрения администратором!`,
                  descriptionType: 'text',
                  close: true,

                }
              }
              this.getReviews(this.limit, this.offset)
              this.getReviewsCount()

            } else if (result.message === "This user already rated this project.") {
              this.reviewTextError = 'Вы уже оставляли отзыв к этому проекту, но он еще не проверен модератором. Пожалуйста, ожидайте одобрения.'
              this.reviewText = ''
              this.dataStars = 0
            }
            else {
              this.reviewTextError = 'Вы заполнили не все поля, или заполнили их не правильно. Пожалуйста проверьте правильность введенных данных'

            }

          })
          .catch((error) => {console.error(error)});

    },
    updateReview (id, reviewed) {

      const review = {
        rating: this.dataStars,
        comment: this.reviewText,
        isReviewed: reviewed || false
      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}reviews/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(review)
      })

          .then((response) => response.json())
          .then((result) => {
            if (result.success === true) {
              this.showNotReviewed === true ? this.getReviews(this.limit, this.offset, this.review.sort, true) : this.getReviews(this.limit, this.offset, this.review.sort, false)

              this.reviewTextError = ''
              this.editReview = false

              if (this.isAdmin === true) {
                this.modalShow = true
                this.modalSettings = {
                  iconType: 'ok',
                  heading: 'Отзыв успешно обновлен!',
                  description: `Спасибо ${this.username}! Отзыв обновлен!`,
                  descriptionType: 'text',
                  close: true,

                }

                this.editReview = false
                this.dataStars = 0
                this.reviewText = ''

              } else {
                this.modalShow = true
                this.modalSettings = {
                  iconType: 'ok',
                  heading: 'Отзыв успешно обновлен!',
                  description: `Спасибо ${this.username}! Отзыв обновлен, но он должен пройти модерацию. Пожалуйста ожидайте!`,
                  descriptionType: 'text',
                  close: true,

                }

                this.editReview = false
                this.dataStars = 0
                this.reviewText = ''
              }



              this.dataStars = 0;
              this.reviewText = '';
              this.reviewID = null;
              this.isReviewed = false;


              this.$refs.clickedReview[this.clickedReviewIndex].scrollIntoView( { behavior: 'smooth', block: 'center' })
              this.$refs.clickedReview[this.clickedReviewIndex].classList.add('updated')

              setTimeout(() => {
                this.$refs.clickedReview[this.clickedReviewIndex].classList.remove('updated')
              }, 1500)



            }
            else {
              this.reviewTextError = 'Вы заполнили не все поля, или заполнили их не правильно. Пожалуйста проверьте правильность введенных данных'

            }

          })
          .catch((error) => {
            console.error(error)
          });



    },

    approveReview (id, rating, comment) {
      const review = {
        rating: rating,
        comment: comment,
        isReviewed: true
      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}reviews/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(review)
      })

          .then((response) => response.json())
          .then((result) => {
            if (result.success === true) {
              this.modalShow = true
              this.modalSettings = {
                iconType: 'ok',
                heading: 'Отзыв успешно одобрен!',
                description: `Спасибо ${this.username}! Отзыв одобрен и опубликован!`,
                descriptionType: 'text',
                close: true,

              }

              this.isProjectReviewed = false
              this.editReview = false
              window.scrollTo( { top: 400, behavior: 'smooth' })
              this.reviewTextError = ''
              this.dataStars =''
              this.showNotReviewed === true ? this.getReviews(this.limit, this.offset, this.review.sort, true) : this.getReviews(this.limit, this.offset, this.review.sort, false)
            }
            else {
              this.reviewTextError = 'Вы заполнили не все поля, или заполнили их не правильно. Пожалуйста проверьте правильность введенных данных'

            }

          })
          .catch((error) => {
            console.error(error)
          });



    },
    disapproveReview (id, rating, comment) {
      const review = {
        rating: rating,
        comment: comment,
        isReviewed: false
      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}reviews/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(review)
      })

          .then((response) => response.json())
          .then((result) => {
            if (result.success === true) {

              this.isProjectReviewed = false
              this.editReview = false
              this.reviewTextError = ''
              this.dataStars =''
              this.showNotReviewed === true ? this.getReviews(this.limit, this.offset, this.review.sort, true) : this.getReviews(this.limit, this.offset, this.review.sort, false)

              this.modalShow = true
              this.modalSettings = {
                iconType: 'ok',
                heading: 'Отзыв снят с публикации',
                description: `Спасибо ${this.username}! Отзыв снят с публикации!`,
                descriptionType: 'text',
                close: true,
              }
            }
            else {
              this.reviewTextError = 'Вы заполнили не все поля, или заполнили их не правильно. Пожалуйста проверьте правильность введенных данных'

            }

          })
          .catch((error) => {
            console.error(error)
          });



    },
    onClickOutside (event) {

      if (event.target.classList[0] !== 'filter') {
        this.showSort = false
        this.arrowDate = 'up'
      } else {

      }
    },
  },
  mounted() {
    this.getReviews(this.limit, this.offset, this.review.sort, false)
    this.getReviewsCount()

    this.starsCount = Math.round(this.$props.project.ratingAvg)

  },
}
</script>

<style scoped lang="scss">
.reviewTextError {
  background-color: #ffd6d6;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;
  padding: 10px;

}



.notReviewed, .sended, .notReviews {
  margin-bottom: 30px;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-wrap: wrap;

  svg {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    flex-basis: 100%;

    path {
      fill: #9ec86b;
    }
  }
  span {
    color: #9ec86b;
    flex-basis: 100%;
  }

}
.flex {
  flex-wrap: nowrap;
}
.wrapper {
  display: flex;
  width: 100%;
  gap: 4%;
  .left {
    width: 100%;
  }

}
.tab-rating {
  margin-top: 30px;
  width: 18%;

  .onsite {
    color: var(--86868B, #494A4E);
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    width: 100%;
    text-align: right;
    margin-bottom: 15px;

  }

  .project-detailed-rating, .tab-stats, .project-links {
    background-color: #fff;
    border-radius: 15px;
    margin-bottom: 30px;
    padding: 10px;
  }

  .project-detailed-rating {
    .heading {
      color: var(--secondary, #2B2B2B);
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 25px; /* 178.571% */
    }

    .five-stars {

      .project-review-stars {
        margin-bottom: 5px;
        display: flex;
        align-items: center;

        svg {
          width: 18px !important;
          height: 18px !important;

          path {
            fill: #0a58ca;
          }

          &.op3 {
            opacity: .3;
          }

          margin-right: 8px;
        }

        span {
          margin-left: 5px;
          color: var(--secondary, #2B2B2B);
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
        }
      }
    }
  }

  .tab-stats {
    .stat {
      color: var(--86868B, #494A4E);
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 200% */
      display: flex;
      align-items: center;

      svg {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        path {
          fill: transparent;
        }
      }
    }

  }

  .project-links {
    .links-heading {
      color: var(--secondary, #2B2B2B);
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 36px; /* 257.143% */
      margin-bottom: 5px;
    }

    .links-links {
      width: 100%;

      a {
        display: block;
        width: 100%;
        border: 1px solid transparent;
        border-radius: 5px;
        margin-bottom: 5px;

        color: var(--new-dark, transparent);
        text-align: center;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 36px; /* 257.143% */
      }
    }
  }
}
h3 {
  .project-rating {
    display: flex;
    margin-top: 5px;

    .rating-average {

      font-size: 45px;
      margin-right: 10px;

    }

    .rating-description {
      display: flex;
      flex-wrap: wrap;
      span {
        width: 100%;
        font-weight: 400;
        color: #969696;
        line-height: 0;
        font-size: 14px;
      }
    }
    svg {
      width: 18px;
      height: 18px;
      margin-right: 5px;
      margin-top: 8px;

      path {
        fill: black;
      }
    }
  }
}
.reviews {

  width: 100%;
  padding-top: 20px;


  .reviews-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;

    .review {
      width: 49%;

      .review-body {
        width: 100%;
        box-sizing: border-box;
        transition: .1s ease;

        &.updated {
          background-color: #e9ffe9;
          border-color: #e9ffe9;
        }
        &.reviewNotReviewed {
          background-color: #f8f8f8 ;

        }


        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          align-items: center;

          .review-nickname {
            color: #000;
            font-family: "PT Sans Caption";
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            display: flex;
            align-items: end;
            gap: 10px;
          }



        }
        .review-post {
          color: #6B6B6B;
          font-family: "PT Sans Caption";
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          word-break: break-all;
          margin-bottom: 10px;
        }
        .date {
          color: var(--gray, #A8A8A8);
          font-family: "PT Sans Caption";
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .review-menu {
        padding-top: 10px;
        border-top: 1px solid #D8D8D8;
        .menu {
          display: flex;
          width: 100%;
          gap: 15px;

          .item {
            color: var(--gray, #A8A8A8);
            font-family: "PT Sans Caption";
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            transition: .3s ease;
            cursor: pointer;

            &.approve {
              margin-left: auto;
            }

            svg {
              path {
                transition: .3s ease;
                stroke: #A8A8A8;
              }
            }

            &:hover {
              color: #7c7c7c;

              svg {
                path {
                  stroke: #7c7c7c;
                }
              }
            }
          }
        }
      }
    }
  }
  .no-reviews {
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-weight: bold;
    text-align: center;
    svg {
      width: 100px;
      height: 100px;
      margin-bottom: 30px;
      flex-basis: 100%;
    }
  }
  .sort-icon {
    margin-bottom: 20px;

    span {
      color: #000;

      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

  }
  .sort {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;

    .left {
      display: flex;
      gap: 20px;
      align-items: center;
    }



    select {
      color: #000;
      margin-left: 10px;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      appearance: none;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 6px;
      border: 1px solid #0a58ca;
      background-color: #ffffff;


      option {
        padding: 10px;
      }


      &:focus {
        outline: none;
      }
    }
  }

  .review-rating {
    color: #000;
    text-align: right;
    font-family: "PT Sans Caption";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    svg {
      width: 12px;
      height: 12px;

      path {
        fill: #000;
      }
    }


    span {
      background-color: transparent;
      padding: 5px 15px;
      color: #fff;
      font-weight: 700;
      border-radius: 5px;
    }
  }


}
.send-review {
  border-radius: 30px;
  background: var(--neutral, #FFF);
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  h3 {
    color: var(--main, #131313);
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 10px;
  }
  p {
    color: var(--main, #131313);
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    margin-bottom: 30px;
  }
  textarea {
    color: var(--86868B, #494A4E);
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    resize: none;
    width: 100%;
    height: 130px;
    background-color: #F6F8FF;
    border-radius: 5px;
    padding: 10px;
    border: none;
    box-sizing: border-box;
    &::placeholder {
      opacity: .5;
      padding: 0;

    }
  }
}
.send-header {
  display: flex;
  align-items: start;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;

  p {
    margin-top: -15px;
    width: 100%;
  }

  svg {
    width: 25px;
    height: 25px;
    margin-left: 8px;
    opacity: .3;
    cursor: pointer;
    transition: .3s ease;
    path {
      fill: #0a58ca;
    }

    &:hover {
      opacity: .7;
    }
  }
}
.buttons {
  display: flex;
  align-items: center;
  gap: 10px;

  .btn-filled {
    display: flex;
    align-items: center;
    gap: 10px;
    svg {
      width: 20px;
      height: 20px;
      path {
        fill: #fff;
      }
    }
  }
}
.btns {
  display: flex;
  gap: 10px;
  position: relative;
  align-items: center;

  .currentSort {
    width: 220px;
    border: 1px solid transparent;
    outline: none;
    color: #000;
    background-color: #fff;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    transition: all 0.2s ease-in-out;
    border-radius: 10px;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    svg {
      position: relative;
      top: 2px;
      margin-left: 5px;
      width: 15px;
      height: 15px;
    }

  }

  .sortFilter {
    position: absolute;
    border-radius: 10px;
    background-color: #fff;
    z-index: 10;
    top: 45px;



    .sep {
      width: 100%;
      height: 1px;
      background-color: rgba(0,0,0,.2);
    }

    .filter {
      display: flex;
      padding: 10px;
      font-size: 14px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: .3s ease;
      width: 220px;



      svg {
        width: 15px;
        height: 15px;

        path {
          fill: #000;
        }
      }

      &.active {
        color: #000;
      }

      &:hover {
        background-color: rgba(10, 88, 202, 0.11);
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .wrapper {
    flex-wrap: wrap;
    .left,.tab-rating {
      width: 100%;
    }
    .left {
      order: 2;
    }
    .tab-rating {
      order: 1;
      .onsite {
        text-align: center;
      }
      .project-detailed-rating {
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto 30px;
        .heading {
          text-align: center;
        }
        .project-review-stars {
          justify-content: center;
        }
      }
    }
  }
  .reviews {
    .review {
      .date {
        flex-wrap: wrap;
        svg {
          margin-left: 0;
        }
        .menu {
          margin-top: 10px;
          width: 100%;
        }
      }
    }
    .sort {
      .left {
        order: 1;
      }
      .check {
        order: 2;
        width: 50%;
        display: flex;
        justify-content: end;
        .btn {

        }
      }
    }
  }
  .send-header {
    align-items: start;

    .set-rating {
      margin-top: 5px;
    }
    svg {
      margin-left: 4px;
      width: 18px;
      height: 18px;
    }
    .text {
      width: 50%;

    }
  }
  .send-review {
    textarea {
      height: 150px;
    }
  }

}
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.5s;
  max-height: 220px;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  opacity: 0;
  max-height: 0;
}
</style>