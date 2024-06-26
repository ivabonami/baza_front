<template>

  <div class="project-reviews">
    <div class="project-reviews_heading">
      <h2>Отзывы</h2>
      <button-action
          v-if="!projectReviewsStore.reviews.find(review => review.userData.username === userInfo.username) && userInfo.username"
          @click="() => {
            modalReviewsController.show = true
            modalReviewsController.mode = 'add'
            modalReviewsController.buttonConfirmText = 'Оставить отзыв'
            modalReviewsController.product = null
            modalReviewsController.projectId = this.$props.project.id

          }"
      >
        <template #text>
          Добавить
        </template>
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 5.8V12.2M5.8 9H12.2M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#4E4E4E" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </button-action>
    </div>
  </div>

  <empty-store
      v-if="projectReviewsStore.reviews <= 0"
      :show-button="true"
      :show-button-for-users="false"
      @click="() => {
            modalReviewsController.show = true
            modalReviewsController.mode = 'add'
            modalReviewsController.buttonConfirmText = 'Оставить отзыв'
            modalReviewsController.product = null
            modalReviewsController.projectId = this.$props.project.id

          }">
    <template #header>
      Никто еще не оставил отзывов о
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

  <div class="project-reviews_items"
       v-else
  >
    <div class="project-reviews_items_item"
         v-for="review of projectReviewsStore.reviews"
    >
      <div class="project-reviews_items_item_heading">
        <div class="info">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4.3163 18.4384C4.92462 17.0052 6.34492 16 8 16H14C15.6551 16 17.0754 17.0052 17.6837 18.4384M15 8.5C15 10.7091 13.2091 12.5 11 12.5C8.79086 12.5 7 10.7091 7 8.5C7 6.29086 8.79086 4.5 11 4.5C13.2091 4.5 15 6.29086 15 8.5ZM21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>
            {{ review.userData.username }}
          </span>
        </div>
        <div class="rating">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.08141 0.504121C5.2159 0.218337 5.28315 0.0754451 5.37444 0.029791C5.45386 -0.00993033 5.54614 -0.00993033 5.62556 0.029791C5.71685 0.0754451 5.7841 0.218337 5.91859 0.504121L7.19452 3.21543C7.23423 3.29979 7.25408 3.34198 7.28309 3.37473C7.30878 3.40373 7.33959 3.42723 7.37381 3.44392C7.41246 3.46277 7.45684 3.46958 7.5456 3.48319L10.3997 3.92075C10.7002 3.96683 10.8505 3.98987 10.92 4.06686C10.9805 4.13385 11.009 4.22591 10.9975 4.31739C10.9842 4.42254 10.8755 4.53369 10.6579 4.75598L8.59341 6.86508C8.52906 6.93083 8.49688 6.9637 8.47612 7.00282C8.45773 7.03745 8.44594 7.0755 8.44139 7.11485C8.43625 7.15929 8.44384 7.20573 8.45903 7.2986L8.94615 10.2776C8.99753 10.5918 9.02321 10.7489 8.97494 10.8422C8.93293 10.9233 8.85827 10.9802 8.77174 10.997C8.67229 11.0163 8.53779 10.9421 8.26879 10.7937L5.71727 9.38632C5.63777 9.34247 5.59803 9.32054 5.55615 9.31192C5.51907 9.3043 5.48093 9.3043 5.44385 9.31192C5.40198 9.32054 5.36223 9.34247 5.28273 9.38632L2.73121 10.7937C2.46221 10.9421 2.32771 11.0163 2.22826 10.997C2.14173 10.9802 2.06707 10.9233 2.02506 10.8422C1.97679 10.7489 2.00248 10.5918 2.05385 10.2776L2.54097 7.2986C2.55616 7.20573 2.56375 7.15929 2.55861 7.11485C2.55406 7.0755 2.54227 7.03745 2.52388 7.00282C2.50312 6.9637 2.47094 6.93083 2.40659 6.86508L0.342133 4.75598C0.124546 4.53369 0.0157523 4.42254 0.00251347 4.31739C-0.00900502 4.22591 0.019451 4.13385 0.0799588 4.06686C0.149504 3.98987 0.299777 3.96683 0.600324 3.92075L3.4544 3.48319C3.54316 3.46958 3.58754 3.46277 3.62619 3.44392C3.66041 3.42723 3.69122 3.40373 3.71691 3.37473C3.74592 3.34198 3.76577 3.29979 3.80548 3.21543L5.08141 0.504121Z" fill="black"/>
          </svg>
          {{ review.rating }}
        </div>

      </div>

      <div class="project-reviews_items_item_body" v-if="review.comment">
        {{ review.comment }}
      </div>

      <div class="menu">
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

        <button-action
            @click="() => { onDisapproveReview(review) }"
        >
          <template #text>
            Снять с публикации
          </template>
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 10 9" fill="none">
              <path d="M4.48905 1.81368C4.65419 1.79031 4.82454 1.77778 5 1.77778C7.07432 1.77778 8.43548 3.52966 8.89277 4.22265C8.94812 4.30653 8.97579 4.34847 8.99128 4.41315C9.00291 4.46173 9.00291 4.53837 8.99126 4.58695C8.97576 4.65163 8.9479 4.69384 8.89216 4.77828C8.77032 4.96284 8.58456 5.22221 8.33846 5.50351M2.85615 2.44474C1.97763 3.01511 1.38122 3.80754 1.10762 4.22205C1.05202 4.30628 1.02423 4.3484 1.00873 4.41308C0.997094 4.46165 0.997089 4.53828 1.00872 4.58686C1.02421 4.65154 1.05188 4.69348 1.10722 4.77735C1.56451 5.47034 2.92567 7.22222 5 7.22222C5.8364 7.22222 6.55685 6.9374 7.14885 6.55201M1.34301 1L8.65699 8M4.13804 3.67504C3.91744 3.88617 3.781 4.17783 3.781 4.5C3.781 5.14433 4.32677 5.66667 5 5.66667C5.33662 5.66667 5.64136 5.53608 5.86196 5.32496" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </button-action>
      </div>

    </div>
  </div>

  <popup-reviews-controller
      v-if="modalReviewsController.show"
      :modal="modalReviewsController"
      :options="modalReviewsController.product"
      :projectId="$props.project.id"
      :mode="modalReviewsController.mode"
      :data="this.reviewToEdit"
      @closeModal="modalReviewsController.show = false"
      @productAdded="emit => emit"
      @productUpdated="emit => emit"
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
  
</template>

<script>
import emptyStore from "../Blocks/EmptyStore.vue";
import buttonAction from "../components/Buttons/ButtonAction.vue";
import popupReviewsController from "../components/Popups/PopupReviewsController.vue";
import {projectReviewsStore} from "../Store/projectReviews.js";
import {disapproveReview, getReviews, deleteReview, editReview} from "../API/reviews.js";
import {userInfo} from "../Store/userInfo.js";



export default {
  name: "ProjectReviews.vue",
  props: {
    project: {
      name: null,
      id: null,
    }
  },
  data() {
    return {
      modalReviewsController: {
        show: false,
        review: null,
        buttonConfirmText: "Добавить отзыв"
      },
      reviewToEdit: null,
      projectReviewsStore,
      userInfo

    }
  },

  components: {
    emptyStore,
    buttonAction,
    popupReviewsController
  },

  methods: {

    onEditReview(review) {
      this.modalReviewsController.show = true
      this.modalReviewsController.mode = 'edit'
      this.modalReviewsController.buttonConfirmText = 'Изменить отзыв'
      this.reviewToEdit = review
      this.modalReviewsController.projectId = this.$props.project.id

    },
    onDeleteReview(review) {
      deleteReview(review)

    },
    onDisapproveReview(review) {
      disapproveReview(review)

    }


  },
  watch: {
    project: function (newVal, oldVal) {
      getReviews({projectId: newVal.id})
    },
  },

  beforeUnmount() {
    projectReviewsStore.reviews.length > 0 ?  projectReviewsStore.reviews.splice(0, projectReviewsStore.reviews.length): null
  },

  mounted() {
    // getReviews({projectId: this.$props.project.id})
  }

}
</script>

<style scoped lang="scss">
.project-reviews {
  margin-top: 40px;
  margin-bottom: 10px;

  .project-reviews_heading {
    color: #000;
    font-family: "PT Sans Caption";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: flex;
    gap: 20px;

    align-items: center;
    margin-bottom: 8px;

    h2 {
      margin-top: -10px;
    }

  }

  .project-products_items {
    display: flex;
    gap: 7px;
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
.project-reviews_items {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  .project-reviews_items_item {
    width: 49%;
    .project-reviews_items_item_heading {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
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
      .rating {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        color: #000;
        text-align: right;
        font-family: "PT Sans Caption";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

      }
    }

    .menu {
      display: flex;
      width: 100%;
      gap: 10px;

      button:nth-child(3) {
        margin-left: auto;
      }
    }

  }
}
</style>