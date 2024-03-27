<template>
  <button
      v-on:click="this.$router.go(-1)"
      class="back">
    <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.52 137.91"><path d="M26.75,68.29c14.02,13.92,26.77,26.57,39.5,39.23,3.54,3.52,7.15,6.98,10.53,10.65,4.87,5.29,4.82,11.95,.1,16.49-4.67,4.49-11.53,4.36-16.53-.62C41.46,115.25,22.61,96.41,3.83,77.51c-4.97-5-5.17-11.48-.22-16.49C22.7,41.7,41.91,22.5,61.2,3.38c4.71-4.67,11.74-4.38,16.15,.11,4.28,4.36,4.32,11.35-.42,16.15-14.74,14.95-29.61,29.77-44.5,44.57-1.41,1.4-3.26,2.36-5.69,4.08Z"/></svg>
    Назад
  </button>
<h1>Добавление проекта</h1>

  <div v-if="userLoggined === false" class="not-registered">


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
    <div class="text">
      Вы не вошли в аккаунт. <br><br>Что бы добавить проект Вам нужно

      <span
          v-on:click="() => {
              this.showModal = !showModal
              this.modal = {
                iconType: 'user',
                descriptionType: 'sign-in',
                tab: 'signup'
              }

            }">
        <br>
      зарегистрироваться</span> или
      <span v-on:click="() => {
              this.showModal = !showModal
              this.modal = {
                iconType: 'user',
                descriptionType: 'sign-in',
                tab: 'signin'
              }

            }">
    войти</span> в аккаунт.
    </div>


  </div>

  <div class="add-project form-wrapper" v-else>
    <div class="left">
      <div class="input-wrapper">
        <div class="field-name">Название проекта *</div>
        <input
            type="text"
            placeholder="Название проекта"
            v-model="projectName"
            minlength="5" maxlength="255"
            ref="projectName"
            required>
        <span class="help">
          Введите название проекта, которое коротко и ясно отражает его суть. От 5 до 255 символов.
        </span>
      </div>

      <div class="input-wrapper categories" ref="projectMultiCategories">
        <h3>Категории проекта: </h3>
        <div class="category"
             v-for="category of categories"
             >

          <input :id="category.id"
                 v-model="projectMultiCategories"
                 type="checkbox"
                 :value="category.id"
                 v-on:change="() => {
                  delete this.errors.projectCategoryErr
                  this.$refs.projectMultiCategories.style.borderColor = 'transparent'
                  this.projectMultiCategories.includes(exchangersCategory) ? exchangerSelected = true : exchangerSelected = false

                 }"
                 class="projectMultiCategories">
          <label :for="category.id">{{category.name}}</label>
        </div>

        <span class="help">
          Выберите категорию, к которой относится проект.

        </span>
      </div>
      <div class="input-wrapper double">
        <div class="left">
          <div class="fake-input">
            <div class="field-name">Аватар *</div>
            <input type="file"
                   ref="projectAvatar"
                   v-on:change="uploadAvatar($event)"
                   accept="image/*"
            >


          </div>
          <div class="loader" v-if="avatarLoader === true">
            <loader></loader>
          </div>
          <div class="loaded" v-if="avatarLoaded === true">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>

            Аватар загружен!
          </div>
          <span class="help">
            Загрузите аватар проекта, размеры 110x110px, форматы: jpeg, jpg, gif. webp
          </span>
        </div>
        <div class="right">
          <div class="fake-input">
            <div class="field-name">Баннер</div>
            <input type="file"

                   v-on:change="uploadBanner($event)"
                   accept="image/*" ref="projectBanner">
          </div>
          <div class="loader" v-if="bannerLoader === true">
            <loader></loader>
          </div>
          <div class="loaded" v-if="bannerLoaded === true">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>

            Аватар загружен!
          </div>
          <span class="help">
          Загрузите аватар проекта, размеры 1060х220px, форматы: jpeg, jpg, gif. webp
        </span>
        </div>


      </div>



    </div>
    <div class="input-wrapper">
      <div class="field-name">Описание проекта *</div>
      <textarea
                required
                ref="projectDescription"
                v-model="projectDescription" maxlength="65535"></textarea>
      <span class="help">
        Предоставьте подробное описание проекта, включая его цель, описание продаваемых товаров, что бы пользователь точно понимал что он покупает.
        От 30 до 65535 символов.
      </span>
    </div>
    <div class="advanced" v-if="this.exchangerSelected === true">
      <div class="input-wrapper">
        <label for="min" >Минимальный обмен</label>
        <input
            type="number"
            id="min"
            placeholder="Минимальный обмен"
            v-model="projectExchangeRate"
            ref="projectExchangeRate"
            max="6">
        <span class="help">
          Введите размер минимальной суммы обмена
        </span>
      </div>

      <div class="input-wrapper">
        <label for="rate">Курс обмена</label>
        <input
            type="number"
            id="rate"
            placeholder="Курс"
            v-model="minValueToExchange"
            ref="minValueToExchange"
            max="6">
        <span class="help">
          Введите текущий курс вашего обмена
        </span>
      </div>

      <div class="input-wrapper">
        <label for="res">Резерв</label>
        <input
            type="number"
            id="res"
            placeholder="Резерв"
            v-model="projectReserve"
            ref="projectReserve"
            max="6">
        <span class="help">
          Введите резерв валюты.
        </span>
      </div>


    </div>

    <div class="bottom">
      <div class="heading">
        Ссылки на проект *
      </div>
      <div class="help description">
        Одна ссылка обязательно, максимум 12 ссылок.
      </div>

      <div class="input-wrapper triple" >
        <div class="left">
          <div class="field-name">Имя ссылки</div>
          <div class="leftW" v-if="this.addedLinksCount < 13">
            <input
                v-on:keydown.enter="checkLinks()"
                type="text"
                v-model="addName"
                ref="addName"
                maxlength="20"
                required>
            <span class="help">
              Название ссылки (например: Зеркало, Onion, WWH и другое)
            </span>
          </div>
        </div>
        <div class="middle">
          <div class="rightW" v-if="this.addedLinksCount < 13">
            <div class="field-name">Ссылка</div>
            <input
                v-on:keydown.enter="checkLinks()"
                type="text"
                v-model="addLink"
                ref="addLink"

                maxlength="100"
                required>
            <span class="help" >
              Сама ссылка, https://myproject.com и аналогичное
            </span>
          </div>
        </div>
        <div class="right">
          <button class="add"
                  v-if="Object.keys(this.linksToAdd).length < 13"
                  v-on:click="checkLinks()">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
              <path opacity="0.3" d="M7.69655 17V0H10.3034V17H7.69655ZM0 9.70283V7.33727H18V9.70283H0Z" fill="black"/>
            </svg>
            Добавить ссылку в проект
          </button>

        </div>


        <div class="links-to-add">
          <h3 v-if="Object.keys(this.linksToAdd).length > 0">
            Добавленные ссылки</h3><br>
          <p class="name" v-for="(link, index) of this.linksToAdd" v-if="Object.keys(this.linksToAdd).length > 0">

            <a :href="link.link" target="_blank" title="Проверить работоспособность">
              {{ link.name }}
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M0.742943 8.0844C0.742943 6.8414 0.734787 5.59839 0.747837 4.35539C0.751371 3.9996 0.785353 3.63796 0.856581 3.29027C1.03547 2.41702 1.85595 1.65407 2.72373 1.57727C3.36315 1.52058 4.008 1.52588 4.65069 1.51024C4.95871 1.5027 5.267 1.50243 5.57475 1.51388C5.92953 1.52728 6.20574 1.75432 6.31122 2.09614C6.40637 2.40501 6.29817 2.76274 6.04316 2.97471C5.87271 3.11657 5.6718 3.15902 5.45812 3.1593C4.80103 3.1593 4.14421 3.15651 3.48712 3.16293C3.29328 3.16488 3.09591 3.17438 2.90696 3.21376C2.59704 3.27827 2.38798 3.52737 2.37547 3.85327C2.35454 4.40175 2.3453 4.95106 2.34448 5.50009C2.34149 7.56246 2.34285 9.62482 2.3453 11.6872C2.3453 11.9056 2.35672 12.1245 2.37493 12.3423C2.40538 12.7085 2.66066 12.983 3.01979 12.9947C3.74403 13.0184 4.46881 13.0265 5.19332 13.0282C7.01018 13.0321 8.8273 13.0299 10.6442 13.0274C10.8521 13.0271 11.0606 13.0148 11.2684 12.9992C11.6294 12.9718 11.9042 12.7048 11.9181 12.3348C11.9407 11.7397 11.942 11.1437 11.9496 10.5483C11.9529 10.2878 11.9434 10.0267 11.951 9.76641C11.9611 9.41789 12.1057 9.14756 12.4227 8.99704C12.7296 8.85126 13.0156 8.90655 13.2736 9.11991C13.4615 9.27546 13.5534 9.48882 13.5523 9.73178C13.5485 10.6115 13.5612 11.4923 13.5207 12.3703C13.4737 13.3868 12.9536 14.0953 12.047 14.4924C11.6973 14.6454 11.3159 14.6667 10.9391 14.6694C10.0376 14.6767 9.13587 14.6798 8.2341 14.6789C6.57574 14.6773 4.91738 14.6759 3.25903 14.665C2.7656 14.6616 2.28277 14.5843 1.85785 14.2941C1.27036 13.8931 0.866368 13.3547 0.803568 12.6199C0.74974 11.9815 0.747293 11.3375 0.739953 10.6961C0.730166 9.82561 0.737506 8.95487 0.737506 8.0844H0.742943Z" fill="white"/>
                <path d="M11.6108 2.32875C10.9026 2.32875 10.2275 2.3321 9.5525 2.32735C9.16592 2.32484 8.87828 2.08942 8.77797 1.71018C8.65155 1.23152 8.98812 0.723258 9.46986 0.702593C9.97661 0.68081 10.4844 0.689747 10.9917 0.688909C11.8122 0.687513 12.6324 0.690584 13.4526 0.687513C13.7481 0.686395 14.0051 0.759842 14.1943 1.01509C14.3161 1.17986 14.3604 1.36696 14.3607 1.56412C14.3636 2.9004 14.3655 4.23668 14.3607 5.57268C14.3587 6.12115 13.9752 6.48141 13.4624 6.43644C13.0853 6.40321 12.7694 6.07228 12.7629 5.67377C12.7523 5.00829 12.7578 4.34224 12.7561 3.67676C12.7561 3.63096 12.7561 3.58516 12.7561 3.50194C12.6822 3.5765 12.6292 3.62928 12.5767 3.6829C11.2361 5.05744 9.89559 6.43253 8.55477 7.80679C8.27258 8.09611 7.93166 8.17123 7.6144 8.0168C7.10819 7.77049 6.98912 7.11366 7.38277 6.69532C7.74816 6.30714 8.12387 5.9293 8.49496 5.54699C9.49677 4.51567 10.4989 3.48434 11.5007 2.45302C11.5317 2.42118 11.5599 2.38656 11.6105 2.32931L11.6108 2.32875Z" fill="white"/>
              </svg>
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" v-on:click="deleteLink(index)" width="16" height="19" viewBox="0 0 16 19" fill="none">
              <path d="M14.3066 10.5404C14.3066 11.9891 14.3153 13.4375 14.3039 14.8862C14.2936 16.1901 13.6839 17.1536 12.5161 17.7756C12.0391 18.0298 11.517 18.1295 10.9784 18.1303C8.71443 18.1341 6.45046 18.1469 4.18689 18.1264C2.73366 18.1133 1.69388 17.4252 1.0885 16.1337C0.912373 15.7578 0.853533 15.3464 0.853928 14.9299C0.854717 11.9041 0.859851 8.878 0.849189 5.85224C0.847214 5.26656 1.28595 4.90264 1.80919 4.96677C2.1575 5.00926 2.48526 5.32683 2.50777 5.6726C2.5133 5.75604 2.51014 5.83988 2.51014 5.92371C2.51014 8.87877 2.51922 11.8338 2.50501 14.7889C2.50027 15.7489 3.24584 16.5096 4.25087 16.5003C6.46823 16.4795 8.68639 16.4787 10.9042 16.5003C11.9171 16.5104 12.6615 15.7458 12.6563 14.7746C12.6397 11.7875 12.65 8.79996 12.6504 5.81284C12.6504 5.25729 13.0382 4.91461 13.6021 4.96831C13.9248 4.99883 14.2265 5.26424 14.281 5.57833C14.3027 5.70428 14.3054 5.83447 14.3054 5.96273C14.307 7.48875 14.3066 9.01437 14.3062 10.5404H14.3066Z" fill="#494A4E"/>
              <path d="M7.58574 4.10691C5.35494 4.10691 3.12415 4.10691 0.893745 4.10691C0.435265 4.10691 0.177395 3.92263 0.0316763 3.49418C-0.102195 3.10128 0.205828 2.58746 0.625212 2.51483C0.747237 2.49358 0.873605 2.48817 0.998394 2.48779C1.98525 2.48586 2.9725 2.48161 3.95936 2.49049C4.15918 2.49242 4.22276 2.43254 4.21723 2.23744C4.20459 1.78698 4.21052 1.33613 4.21447 0.885667C4.21921 0.358323 4.55764 0.00830615 5.09747 0.00560182C6.74894 -0.00212483 8.40081 -0.00135216 10.0523 0.00482915C10.6032 0.00676082 10.9424 0.35446 10.9471 0.89378C10.9507 1.34424 10.9554 1.79509 10.9448 2.24556C10.9404 2.42945 10.9989 2.49126 11.1908 2.4901C12.2041 2.48238 13.2174 2.48701 14.2307 2.48624C14.4732 2.48624 14.7003 2.5214 14.8855 2.69641C15.1627 2.95834 15.2306 3.26779 15.0821 3.62979C14.9621 3.92147 14.671 4.10613 14.3176 4.10652C12.0738 4.10729 9.82996 4.10691 7.58613 4.10691H7.58574ZM7.59995 1.64017C7.09329 1.64017 6.58624 1.64365 6.07958 1.63786C5.94334 1.63631 5.88766 1.6819 5.89319 1.81596C5.8999 1.97667 5.89635 2.13777 5.89438 2.29887C5.8928 2.42366 5.93979 2.48817 6.07958 2.48779C7.07987 2.48508 8.08055 2.48508 9.08083 2.48779C9.22063 2.48817 9.26762 2.42366 9.26604 2.29887C9.26406 2.14434 9.25893 1.98942 9.26801 1.83527C9.2771 1.68306 9.2147 1.63477 9.06109 1.63708C8.57417 1.64481 8.08687 1.63979 7.59995 1.63979V1.64017Z" fill="#494A4E"/>
              <path d="M8.42743 10.3022C8.42743 9.34373 8.42545 8.38485 8.42861 7.42636C8.4298 7.0493 8.68925 6.7186 9.03242 6.63979C9.46088 6.54127 9.83091 6.69001 10.0098 7.05587C10.0667 7.17254 10.09 7.31587 10.0904 7.44722C10.0955 9.34527 10.0904 11.2429 10.0959 13.141C10.0975 13.6822 9.70572 13.9975 9.26264 14.0044C8.78126 14.0118 8.42901 13.6359 8.42782 13.1205C8.42585 12.1813 8.42743 11.2418 8.42743 10.3026V10.3022Z" fill="#494A4E"/>
              <path d="M6.73258 10.3095C6.73258 11.268 6.73495 12.2268 6.731 13.1853C6.72982 13.5234 6.50986 13.8375 6.21842 13.9441C5.85511 14.0766 5.50207 13.9897 5.25289 13.7096C5.08979 13.5265 5.0661 13.3066 5.0661 13.0779C5.06689 11.2251 5.0661 9.37222 5.0665 7.51937C5.0665 7.48731 5.0665 7.45486 5.06729 7.42279C5.08269 6.93601 5.4227 6.60377 5.90013 6.60995C6.37559 6.61613 6.72863 6.95881 6.7314 7.434C6.73614 8.39249 6.73298 9.35136 6.73258 10.3099V10.3095Z" fill="#494A4E"/>
            </svg>


          </p>


        </div>


      </div>

    </div>

    <button class="btn-filled btn disabled"

    v-on:click="() => {
       checkForm ()
    }">
      Добавить проект
    </button>
  </div>
  <div class="errors" ref="errors" v-if="Object.keys(this.errors).length > 0">
    <h3>Устраните ошибки:</h3>

    <div class="error" v-for="error of errors" >
      {{ error }}

    </div>
  </div>



  <modal-window-backdrop
      v-if="showModal === true"
      v-on:changeModal="(emitShowModal) => {
        this.showModal = emitShowModal
        this.goHome === true ? this.$router.push('/') : ''
      }"

      v-bind:tab="this.modal.tab"
      v-bind:icon-type="this.modal.iconType"
      v-bind:descriptionType="this.modal.descriptionType"
      v-bind:heading="this.modal.heading"
      v-bind:description="this.modal.description"
      v-bind:close="this.modal.close"
      v-bind:confirmAction="this.modal.confirm"
      v-bind:exit="this.modal.exit"

  >

  </modal-window-backdrop>
</template>

<script>
import modalWindowBackdrop from "../../components/page components/ModalWindowBackdrop.vue";
import config from "../../assets/js/config.js";
import { ref, watch } from "vue";
import loader from "../../components/reusable/loader.vue";
export default {
  name: "AddProject.vue",
  components: {modalWindowBackdrop,loader},
  emits: ['changeModal'],

  data () {
    return {
      categories: '',
      selectedOption: '',
      count: 1,
      exchangerSelected: false,
      tab: '',
      modal: {},

      showModal: false,

      projectName: '',
      projectDescription: '',
      projectCategory: [],
      projectCategoryName: [],
      projectAvatar: '',
      projectBanner: '',

      exchangersCategory: 0,

      projectLinks: [],
      errorMessage: '',

      projectExchangeRate: 100,
      projectReserve: 10000,
      minValueToExchange: 10,

      projectMultiCategories: [],
      userLoggined: false,

      errors: {},
      avatarError: false,
      avatarErrorPushed: false,
      bannerError: false,
      bannerErrorPushed: false,
      linksToAdd: [],

      addLink: '',
      addName: '',
      addedLinksCount: 0,
      linkErr: false,
      goHome: false,
      linkError: false,

      avatarLoader: false,
      avatarLoaded: false,
      bannerLoader: false,
      bannerLoaded: false
    }
  },
  mounted() {
    this.getCategoryList()

    console.log(this.reviewedCount)
    localStorage.getItem('token') ? this.userLoggined = true : this.userLoggined = false
  },
  updated() {

  },


  methods: {
    uploadAvatar(e){
      this.avatarLoaded = false
      this.projectAvatar = e.target;
      const image = e.target.files[0]
      const reader = new FileReader();

      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "image/webp");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const formData = new FormData();
      formData.append("image-upload", image );


      if (e.target.files[0].type !== "image/jpeg" &&
          e.target.files[0].type !== "image/jpg" &&
          e.target.files[0].type !== "image/gif" &&
          e.target.files[0].type !== "image/png" &&
          e.target.files[0].type !== "image/webp") {
        this.avatarError = true

        if (this.avatarError === true) {
          this.$refs.projectAvatar.value = null
          this.errors.projectAvatarTypeErr = 'Формат аватарки не поддерживается'
          this.avatarErrorPushed = true
        } else {
          delete this.errors.projectAvatarTypeErr
        }


        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'

      } else {
        if (parseInt(image.size) > 1048576) {
          this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
          this.$refs.projectAvatar.value = null
          this.errors.projectAvatarLengthErr = 'Слишком большой размер, рекомендуем загружать аватар до 512х512px и весом не более 1024Кб'
          this.avatarErrorPushed = true

        } else {
          this.avatarError = false
          delete this.errors.projectAvatarLengthErr
          this.$refs.projectAvatar.parentElement.style.borderColor = 'rgb(0, 115, 236)'

          console.dir();
          reader.addEventListener('progress', () => {

          })
          this.avatarLoader = true
          fetch(`${config.api.url}image-upload`, {
            method: "POST",
            headers: myHeaders,
            body: formData,
            redirect: "follow"
          })
              .then((response) => response.json())
              .then((result) => {
                this.avatarLoader = false
                this.avatarLoaded = true
                this.projectAvatar = result.filePath
              })
              .catch((error) => console.error(error));
        }



      }

    },
    uploadBanner(e){
      this.bannerLoaded = false
      this.projectBanner = e.target;
      const image = e.target.files[0]

      console.log(image)
      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "image/webp");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const formData = new FormData();
      formData.append("image-upload", image );

      console.log(formData)

      if (e.target.files[0].type !== "image/jpeg" &&
          e.target.files[0].type !== "image/jpg" &&
          e.target.files[0].type !== "image/gif" &&
          e.target.files[0].type !== "image/png" &&
          e.target.files[0].type !== "image/webp") {

        this.bannerError = true
        if (this.bannerError === true) {
          this.$refs.projectBanner.value = null
          this.errors.bannerTypeErr = 'Формат баннера не поддерживается'

        }
        this.$refs.projectBanner.parentElement.style.borderColor = 'red'
      } else {

        if (parseInt(image.size) > 1048576) {
          this.$refs.projectBanner.parentElement.style.borderColor = 'red'
          this.$refs.projectBanner.value = null
          this.errors.bannerLenghtErr = 'Слишком большой размер, рекомендуем загружать баннер до 1060х220px и весом не более 1024Кб'

        } else {
          this.bannerError = false
          delete this.errors.bannerLenghtErr
          this.$refs.projectBanner.parentElement.style.borderColor = 'rgb(0, 115, 236)'
          this.bannerLoader = true
          fetch(`${config.api.url}image-upload`, {
            method: "POST",
            headers: myHeaders,
            body: formData,
            redirect: "follow"
          })
              .then((response) => response.json())
              .then((result) => {
                this.bannerLoader = false
                this.bannerLoaded = true
                this.projectBanner = result.filePath
              })
              .catch((error) => console.error(error));
        }

      }

    },
    addLinkToProject() {

      this.linksToAdd.push({
        name: this.addName,
        link: this.addLink
      })
      this.addName = ''
      this.addLink = ''

    },
    previewBeforeUpload () {


      let projectType =''

      this.addName !== '' && this.addLink !== '' ? this.checkLinks() : ''

      if (this.projectCategory === this.exchangersCategory) {

        projectType = 'exchanger'
        console.log('pts', this.projectCategory)
      } else {
        projectType = 'project'
        console.log('pte', this.projectCategory)
      }

      if (this.projectCategory === this.exchangersCategory) {
        projectType = 'exchanger'
        console.log(projectType)
      } else {
        projectType = 'project'
        console.log(projectType)
      }


      const project = {
        name: this.projectName,
        description: this.projectDescription,
        categoryIds: this.projectMultiCategories,
        avatarFilePath: this.projectAvatar,
        bannerFilePath: this.projectBanner || null,
        type: projectType,
        links:  this.linksToAdd,
        minValueToExchange: this.minValueToExchange || null,
        exchangeRate: this.projectExchangeRate || null,
        reserve: this.projectReserve || null,
        payed: false


      };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


        fetch(`http://62.113.96.171:3000/projects`, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(project)
        })
            .then((response) => {

              if (response.ok === false) {
                this.showModal = true
                this.modal = {
                  iconType: 'warning',
                  heading: `Ошибка при добавлении`,
                  description: `Вы хотите добавить слишком много информации, мы получили ошибку от сервера об этом. Стоит сократить количество информации или перестать баловаться. Код ошибки ${response.status}}`,
                  descriptionType: 'text',
                  exit: true,
                  close: true,
                  confirm: false
                }
                return response.json()
              } else {
                return response.json()
              }
            })
            .then(response => {
              console.log(response)

              if (response.success === true) {
                this.goHome = true
                this.showModal = true
                this.modal = {
                  iconType: 'ok',
                  heading: 'Проект успешно добавлен!',
                  description: `Он появится в результатах выдачи сразу после модерации.`,
                  descriptionType: 'text',
                  exit: true,
                  close: true,
                  confirm: false

                }
              } else {
                this.showModal = true
                this.modal = {
                  iconType: 'warning',
                  heading: `Ошибка при добавлении`,
                  description: `${response.message}`,
                  descriptionType: 'text',
                  exit: true,
                  close: true,
                  confirm: false
                }
              }
            })
            .catch((error) => {console.error(error)});


    },
    getCategoryList() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch(`${config.api.url}categories`, {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            this.categories = result.categories
            this.projectCategory = result.categories[0].id
            console.log(this.categories.find(ex => {
              if (ex.name === 'Обменники') {
                this.exchangersCategory = ex.id
              }


            } ))
          })
          .catch((error) => {console.error(error)});
    },

    deleteLink(index) {
      console.log(this.linksToAdd, index)
      this.addedLinksCount--
      this.linksToAdd.splice(index, 1)
    },

    checkLinks() {
      this.checkForm()

      if (this.addName < 3) {
        this.errors.linkError = 'Имя ссылки не может быть меньше 3х символов'
        this.linkErr = true
        this.$refs.addName.style.borderColor = 'red'
      } else {
        this.linkErr = false
        delete this.errors.linkError
        this.$refs.addName.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.addLink < 10 ) {
        this.errors.linkLengthError = 'Сама ссылка не может быть меньше, чем 10 символов'
        this.$refs.addLink.style.borderColor = 'red'
        this.linkErr = true
      } else {
        this.linkErr = false
        delete this.errors.linkLengthError
        this.$refs.addLink.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (/(http(s?)):\/\/+[a-z0-9._]+\.+[a-z0-9._]/i.test(this.addLink) === true) {
        this.linkErr = false
        delete this.errors.linkTypeError
      } else {
        this.errors.linkTypeError = 'Ссылка не валидная, введите ссылку формата https://example.com'
        this.linkErr = true
        this.$refs.addLink.style.borderColor = 'red'
      }

      if (this.linkErr === true) {
        setTimeout(()=> {
          this.$refs.errors.scrollIntoView({ behavior: 'smooth', block: 'start'})
        }, 20)
      } else {
        console.log(this.linkErr)
        delete this.errors.linksToAddEmpty
        this.addLinkToProject()

      }

    },
    checkForm () {
      this.addLinkToProject()
      if (this.projectName.length < 5) {
        this.errors.projectNameErr = 'Название проекта должно быть не менее 5 символов'
        this.$refs.projectName.style.borderColor = 'red'
      } else {
        delete this.errors.projectNameErr
        this.$refs.projectName.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.avatarLoader === true) {
        this.errors.avatarLoaderErr = 'Аватар еще не загружен, дождитесь завершения загрузки'
        this.$refs.projectAvatar.style.borderColor = 'red'
      } else {
        delete this.errors.avatarLoaderErr
        this.$refs.projectAvatar.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.bannerLoader === true) {
        this.errors.bannerLoaderErr = 'Баннер еще не загружен, дождитесь завершения загрузки'
        this.$refs.projectBanner.style.borderColor = 'red'
      } else {
        delete this.errors.bannerLoaderErr
        this.$refs.projectBanner.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.projectDescription.length < 30 || this.projectDescription.length > 65535) {
        this.errors.descriptionErr = 'Описание проекта должно быть не менее 30 символов и не более 65535'
        this.$refs.projectDescription.style.borderColor = 'red'
      } else {
        delete  this.errors.descriptionErr
        this.$refs.projectDescription.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.projectMultiCategories.length === 0) {
        this.errors.projectCategoryErr = 'Не выбрана категория проекта'
        this.$refs.projectMultiCategories.style.borderColor = 'red'
      } else {
        delete this.errors.projectCategoryErr
        this.$refs.projectMultiCategories.style.borderColor = 'transparent'
      }

      if (this.linksToAdd.length === 0) {
        this.$refs.addLink.value.length === 0 ?  this.$refs.addLink.style.borderColor = 'red' : this.$refs.addLink.parentElement.style.borderColor = 'rgb(0, 115, 236)'
        this.$refs.addName.value.length === 0 ?  this.$refs.addName.style.borderColor = 'red' : this.$refs.addName.parentElement.style.borderColor = 'rgb(0, 115, 236)'

        this.errors.linksToAddEmpty = 'Не добавлено ни одной ссылки'

      } else {
        delete this.errors.linksToAddEmpty
        this.$refs.addLink.parentElement.style.borderColor = 'rgb(0, 115, 236)'
        this.$refs.addName.parentElement.style.borderColor = 'rgb(0, 115, 236)'
      }
      console.log('links: ',this.linksToAdd)

      if (this.projectAvatar.length === 0) {
        this.$refs.projectAvatar.parentElement.style.borderColor = 'red'
        this.errors.projectAvatarEmpty = 'Аватар не загружен'

      } else {
        delete this.errors.projectAvatarEmpty
        this.$refs.projectAvatar.parentElement.style.borderColor = 'rgb(0, 115, 236)'
      }

      if (this.projectMultiCategories.includes(this.exchangersCategory)) {
        if (this.projectExchangeRate < 10) {
          this.errors.projectExchangeRateErr = 'Минимальный обмен не должен быть меньше 10$'
          this.$refs.projectExchangeRate.style.borderColor = 'red'
        } else if (this.projectExchangeRate > 10000000) {
          this.$refs.projectExchangeRate.style.borderColor = 'red'
          this.errors.projectExchangeRateMaxErr = 'Минимальный обмен не может быть на столько большим'
        }
        else {
          delete this.errors.projectExchangeRateErr
          this.$refs.projectExchangeRate.style.borderColor = 'rgb(0, 115, 236)'
        }

        if (this.minValueToExchange < 10) {
          this.errors.minValueToExchangeErr = 'Текущий курс вашего обмена не должен быть меньше 10$'
          this.$refs.minValueToExchange.style.borderColor = 'red'
        } else if (this.minValueToExchange > 10000000) {
          this.$refs.minValueToExchange.style.borderColor = 'red'
          this.errors.minValueToExchangeErr = 'Текущий курс вашего обмена не может быть на столько большим'
        }
        else {
          delete this.errors.minValueToExchangeErr
          this.$refs.minValueToExchange.style.borderColor = 'rgb(0, 115, 236)'
        }

        if (this.projectReserve < 500 ) {
          this.$refs.projectReserve.style.borderColor = 'red'
          this.errors.projectReserveErr = 'Резерв не может быть меньше 500$'


        } else if (this.projectReserve > 10000000) {
          delete this.errors.projectReserveErr
          this.$refs.projectReserve.style.borderColor = 'red'
          this.errors.projectReserveMaxErr = 'Резерв не может быть на столько большим'

        }

        else {
          delete this.errors.projectReserveErr
          delete this.errors.projectReserveMaxErr
          this.$refs.projectReserve.style.borderColor = 'rgb(0, 115, 236)'
        }

      }

      console.log(this.errors)
      if (Object.keys(this.errors).length > 0) {
        setTimeout(()=> {
          this.$refs.errors.scrollIntoView({ behavior: 'smooth', block: 'start'})
        }, 20)
      } else {
        this.previewBeforeUpload();
        this.showModal = true
      }
    }
  },
}
</script>

<style scoped lang="scss">
.not-registered {
  margin-top: 10px;
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

    path {
      fill: #c86b6b;
    }
  }
  span {

    flex-basis: 100%;
  }

  span {
    cursor: pointer;
    border-bottom: 1px solid rgba(0,0,0,.3);
  }
}
.errors {
  margin-top: 10px;
  background-color: #ffdada;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;

  .error {
    margin-bottom: 5px;
    margin-top: 5px;
  }
}
.add {
  border-radius: 5px;
  border: 1px solid #DFDFDF;
  background: #FFF;
  margin-top: 0px;

  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 1;
  cursor: pointer;
  height: auto;
  align-items: center;
  padding: 10px;
  width: 100%;
  position: relative;
  top: 4px;
  svg {
    position: relative;
    top: 2px;
  }
  transition: .3s ease;

  &:hover {
    opacity: 1;
  }
}

.top-heading {
  display: flex;
  width: 100%;



}
.bottom {
  margin-top: 20px;
  width: 100%;

  .heading {
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    opacity: 1;
  }

}
.help {
  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  margin-top: 7px;

  opacity: 1;
  display: block;

  &.description {
    margin-bottom: 20px;
  }
}

.add-project {
  display: flex;
  gap: 2%;
  flex-wrap: wrap;
  justify-content: space-between;
  .left {
    width: 100%;
  }
  .right {
    width: 100%;
  }


}
.input-wrapper {

}
.links {
  .links-to-add {
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    h3 {
      width: 100%;
    }

    .name {
      padding: 0 15px;
      display: flex;
      gap: 10px;
      align-items: center;
      border-radius: 5px;
      background: rgb(0, 115, 236);
      width: auto;
      margin: 10px 0px;
      a {
        color: #fff;
      }

      color: var(--neutral, #FFF);
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 36px; /* 257.143% */
      text-decoration: none;
      transition: .3s ;

    }

    svg {
      position: relative;

      margin-left: 5px;
      cursor: pointer;
      path {
        transition: .3s ease;
        fill: #ffffff;
      }

      &:hover {
        path {
          opacity: .8;
        }
      }
    }

    p {
      margin-bottom: 5px;
    }
  }
}


</style>