<template v-cloak>

  <div class="wrapper" ref="wrapper">
    <div class="project">

      <div class="project-header" :class="{owner: isOwner === true}">
        <div class="avatar">
          <figure class="cover">
            <img :src="config.api.url + this.project.avatarFilePath"
                 alt="" class="can-be-hovered"
                 v-if="this.project.avatarFilePath !== ''">
          </figure>
          <div class="favorite"
               v-if="isFavourite === false && userInfo.token !== null"
               v-on:click="() => {
               useFetch(`user/project/${project.id}`, `POST`)
               this.isFavourite = true
             }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#00192E" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278M7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.5 21.5 0 0 0 12 19.91a21.6 21.6 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5" clip-rule="evenodd"></path><path fill="white" fill-rule="evenodd" d="M12 22c-.285-.018-.512-.123-.764-.24l-.084-.038a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568q.3-.418.666-.78A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278m0-17.959A7.18 7.18 0 0 1 17 2a7 7 0 0 1 7 7c0 4.897-3.061 8.41-5.75 10.562a24.6 24.6 0 0 1-4.989 3.07c-.566.258-.92.368-1.261.368h-.032l-.033-.002c-.484-.032-.881-.218-1.12-.33l-.077-.036a24.5 24.5 0 0 1-4.991-3.07C3.056 17.408 0 13.895 0 9a7 7 0 0 1 7-7c1.918 0 3.701.776 5 2.041M3 9a4 4 0 0 1 4-4c1.957 0 3.652 1.396 4.02 3.2a1 1 0 0 0 1.96 0C13.348 6.396 15.043 5 17 5a4 4 0 0 1 4 4c0 3.552-2.22 6.295-4.625 8.22A21.6 21.6 0 0 1 12 19.91a21.5 21.5 0 0 1-4.377-2.69C5.217 15.295 3 12.551 3 9" clip-rule="evenodd"></path></svg>
          </div>

          <div class="favorite"
               v-else-if="isFavourite === true || userInfo.token !== null"
               v-on:click="() => {
               useFetch(`user/project/${project.id}`, `DELETE`)
               this.isFavourite = false
             }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#F8104B" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278" clip-rule="evenodd"></path></svg>
          </div>
        </div>

        <div class="project-info">
          <div class="name">
            <span>
              {{ project.name }}

              <svg xmlns="http://www.w3.org/2000/svg" @click="() => {
                      modalSetting.show = true
                      modalSetting.image = config.api.url + this.project.avatarFilePath
                      modalSetting.headline = this.project.name
                      modalSetting.description = this.project.description
                      modalSetting.type = 'info'
                      modalSetting.modalSize = 'large'
                   }"
                   width="22" v-tippy="{ content: 'Посмотреть описание проекта'}" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 15V11M11 7H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#D8D8D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="flag"
                    v-tippy="{ content: 'Это ваш проект!' }"
                    v-if="isOwner">
                <svg viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 14C1 14 2 13 5 13C8 13 10 15 13 15C16 15 17 14 17 14V2C17 2 16 3 13 3C10 3 8 1 5 1C2 1 1 2 1 2L1 21" stroke="#D8D8D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>


            </span>


          </div>

          <div class="project-stats">

            <div class="rating" v-tippy="{ content: 'Рейтинг проекта' }" >
              <svg v-if="projectRating !== null" xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M4.15752 0.412463C4.26756 0.178639 4.32258 0.0617278 4.39727 0.0243745C4.46225 -0.00812482 4.53775 -0.00812482 4.60273 0.0243745C4.67742 0.0617278 4.73244 0.178639 4.84248 0.412463L5.88643 2.6308C5.91891 2.69983 5.93516 2.73435 5.95889 2.76115C5.97991 2.78487 6.00512 2.8041 6.03312 2.81775C6.06474 2.83318 6.10105 2.83875 6.17367 2.84988L8.50883 3.20789C8.75473 3.24559 8.87768 3.26444 8.93458 3.32743C8.98409 3.38224 9.00737 3.45756 8.99794 3.53241C8.98711 3.61844 8.8981 3.70938 8.72007 3.89126L7.03097 5.61689C6.97832 5.67068 6.95199 5.69758 6.935 5.72958C6.91996 5.75791 6.91031 5.78904 6.90659 5.82124C6.90239 5.8576 6.9086 5.8956 6.92102 5.97158L7.31957 8.40896C7.36161 8.66604 7.38263 8.79457 7.34313 8.87085C7.30876 8.93722 7.24767 8.98376 7.17688 8.99753C7.09551 9.01335 6.98546 8.95265 6.76537 8.83125L4.67777 7.67972C4.61273 7.64384 4.5802 7.6259 4.54594 7.61885C4.5156 7.61261 4.4844 7.61261 4.45406 7.61885C4.4198 7.6259 4.38728 7.64384 4.32223 7.67972L2.23463 8.83125C2.01454 8.95265 1.90449 9.01335 1.82312 8.99753C1.75233 8.98376 1.69124 8.93722 1.65687 8.87085C1.61737 8.79457 1.63839 8.66604 1.68043 8.40896L2.07898 5.97158C2.0914 5.8956 2.09761 5.8576 2.09341 5.82124C2.08969 5.78904 2.08004 5.75791 2.065 5.72958C2.04801 5.69758 2.02168 5.67068 1.96903 5.61689L0.279927 3.89126C0.101901 3.70938 0.0128882 3.61844 0.00205647 3.53241C-0.00736774 3.45756 0.0159145 3.38224 0.0654208 3.32743C0.122321 3.26444 0.245272 3.24559 0.491175 3.20789L2.82633 2.84988C2.89895 2.83875 2.93526 2.83318 2.96688 2.81775C2.99488 2.8041 3.02009 2.78487 3.04111 2.76115C3.06484 2.73435 3.08109 2.69983 3.11357 2.6308L4.15752 0.412463Z" fill="#A8A8A8"/>
              </svg>
              {{ projectRating || 'Нет оценок' }}
            </div>

            <div class="sep"></div>
            <div class="rating" v-if="project.reviewsCount > 0" v-tippy="{ content: 'Оценок проекта' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.77778 3.38357H5M2.77778 4.90039H6.33333M3.97056 7.50065H6.86667C7.6134 7.50065 7.98677 7.50065 8.27199 7.35895C8.52287 7.2343 8.72684 7.0354 8.85468 6.79077C9 6.51265 9 6.14858 9 5.42044V3.08021C9 2.35207 9 1.988 8.85468 1.70988C8.72684 1.46525 8.52287 1.26635 8.27199 1.14171C7.98677 1 7.6134 1 6.86667 1H3.13333C2.3866 1 2.01323 1 1.72801 1.14171C1.47713 1.26635 1.27316 1.46525 1.14532 1.70988C1 1.988 1 2.35207 1 3.08021V8.5128C1 8.74373 1 8.85919 1.04855 8.91849C1.09077 8.97007 1.15479 9.00007 1.22246 9C1.30028 8.99992 1.39274 8.92779 1.57767 8.78353L2.63787 7.95649C2.85445 7.78754 2.96274 7.70307 3.08333 7.64299C3.19031 7.5897 3.30419 7.55075 3.42187 7.5272C3.55452 7.50065 3.6932 7.50065 3.97056 7.50065Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.reviewsCount || 0 }}
            </div>
            <div class="sep" v-if="project.reviewsCount > 0"></div>
            <div class="rating" v-if="project.viewCount > 0" v-tippy="{ content: 'Просмотров проекта' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                <path d="M1.12062 4.30565C1.05837 4.21323 1.02724 4.16702 1.00982 4.09575C0.996728 4.04221 0.996728 3.95779 1.00982 3.90425C1.02724 3.83298 1.05837 3.78677 1.12062 3.69435C1.63507 2.93065 3.16638 1 5.5 1C7.83362 1 9.36493 2.93065 9.87938 3.69435C9.94163 3.78677 9.97276 3.83298 9.99018 3.90425C10.0033 3.95779 10.0033 4.04221 9.99018 4.09575C9.97276 4.16702 9.94163 4.21323 9.87938 4.30565C9.36493 5.06935 7.83362 7 5.5 7C3.16638 7 1.63507 5.06935 1.12062 4.30565Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.5 5.28571C6.25739 5.28571 6.87137 4.71008 6.87137 4C6.87137 3.28992 6.25739 2.71429 5.5 2.71429C4.74261 2.71429 4.12863 3.28992 4.12863 4C4.12863 4.71008 4.74261 5.28571 5.5 5.28571Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.viewCount || 0 }}
            </div>
            <div class="sep"></div>
            <div class="rating" v-tippy="{ content: 'Категории проекта' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1V9M3.13333 1H6.86667C7.6134 1 7.98677 1 8.27199 1.14532C8.52287 1.27316 8.72684 1.47713 8.85468 1.72801C9 2.01323 9 2.3866 9 3.13333V6.86667C9 7.6134 9 7.98677 8.85468 8.27199C8.72684 8.52287 8.52287 8.72684 8.27199 8.85468C7.98677 9 7.6134 9 6.86667 9H3.13333C2.3866 9 2.01323 9 1.72801 8.85468C1.47713 8.72684 1.27316 8.52287 1.14532 8.27199C1 7.98677 1 7.6134 1 6.86667V3.13333C1 2.3866 1 2.01323 1.14532 1.72801C1.27316 1.47713 1.47713 1.27316 1.72801 1.14532C2.01323 1 2.3866 1 3.13333 1Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span
                  v-for="category of project.categories"
              >{{category.name}}</span>

            </div>
            <div class="sep" v-if="isOwner || isAdmin"></div>
            <div class="rating edit-project" v-if="isOwner || isAdmin" @click="() => {
              this.$router.push({name: 'ProjectEdit'})
              editableProject.project = project
            }" v-tippy="{ content: 'Изменить название, описание и другое в проекте' }">
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Редактировать
            </div>
          </div>


        </div>


        <div class="exchanger-rates" v-if="isExchanger === true">
          <div class="rate">
            <div class="top">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.minValueToExchange }} p.
            </div>
            <div class="bottom">
              мин. обмен
            </div>
          </div>

          <div class="rate">
            <div class="top">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ project.reserve }} p.
            </div>
            <div class="bottom">
              резерв валюты
            </div>
          </div>
        </div>

        <div class="button">
          <button class="baza-button primary" @click="() => {
            modalSetting.show = true
            modalSetting.type = 'links'
            modalSetting.headline = 'Выберите ссылку'
            modalSetting.links = project.links
          }">
            Ссылки на проект
          </button>
        </div>
      </div>

      <div class="project-banner">
        <img :src="api + project.bannerFilePath"
             alt=""
             v-if="project.bannerFilePath !== null">

      </div>

      <div class="project-body">



        <div class="tabs-body">

          <div class="products"  v-if="products.length > 0 || isOwner === true || isAdmin === true">
            <div class="block-heading">
              <div class="left">
                <h3>Витрина</h3>
                <div class="action" v-if="isOwner === true || isAdmin === true">
                  <button class="action-button"
                          @click="() => {
                            modalSetting.show = true
                            modalSetting.type = 'service'
                            modalSetting.headline = 'Добавить услугу'
                          }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 4V8M4 6H8M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Добавить услугу
                  </button>
                </div>
              </div>
            </div>
            <div class="cards-wrapper" ref="service">
              <transition-group name="list" tag="div" class="tabs-content">
                <div class="shop-view" v-for="item in products" v-if="products.length > 0"
                >
                  <services-card
                      v-bind:productId="item.id"
                      v-bind:name="item.name"
                      v-bind:description="item.description"
                      v-bind:image="`${config.api.url}${item.avatarFilePath}`"
                      v-bind:id="item.id"
                      v-bind:projectId="item.ProjectId"
                      v-bind:isOwner="isOwner || isAdmin"

                      @productDeleted="(emit) => {
                          this.products.splice(this.products.indexOf(item), 1)

                          console.log(this.products.indexOf(item))
                        }"

                      @editService="(emit) => {
                          this.tab = 'editService'
                          this.editProduct = {
                            name: item.name,
                            image: item.avatarFilePath,
                            description: item.description,
                            id: item.id
                          }
                        }"
                      @serviceAdded="() => {
                        this.offset = 0
                        getProducts( this.limit,this.offset)
                      }"
                      @click="() => {
                        console.log(item)
                        modalSetting.show = true
                        modalSetting.modalSize = 'large'
                        modalSetting.type = 'info'
                        modalSetting.headline = item.name
                        modalSetting.description = item
                        }"

                  >
                  </services-card>
                </div>

              </transition-group>
              <div class="" v-if="this.products.length <= 0"></div>
<!--              <Waypoint @change="(way) => {-->

<!--                          if (way.going === 'IN' || way.direction === 'UP' || emptyResponse === false) {-->
<!--                            this.offset += this.limit-->
<!--                            getProducts(this.limit, this.offset)-->
<!--                          }-->
<!--                        }"-->
<!--                        v-if="emptyResponse === false">-->
<!--                <div class="loadmore btn btn-outlined" ref="loadmore"-->

<!--                     v-on:click="() => {-->
<!--                         this.offset += this.limit-->
<!--                           getProducts(this.limit, this.offset)-->

<!--                       }">-->
<!--                  Загрузить еще-->
<!--                </div>-->
<!--              </Waypoint>-->

            </div>
          </div>


          <div class="project-reviews" >
            <div class="block-heading">
              <div class="left">
                <h3>Отзывы</h3>
                <div class="action" v-if="userInfo.token !== null">
                  <button class="action-button"

                          @click="() => {
                            modalSetting.show = true
                            modalSetting.type = 'testimonial'
                            modalSetting.headline = 'Оцените проект'
                          }"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3.5 5.06291H3.50556M6 5.06291H6.00556M8.5 5.06291H8.50556M3.22222 9.12581V10.391C3.22222 10.6797 3.22222 10.824 3.2829 10.8981C3.33568 10.9626 3.41571 11.0001 3.5003 11C3.59757 10.9999 3.71315 10.9097 3.94431 10.7294L5.26956 9.69561C5.54029 9.48443 5.67565 9.37883 5.82638 9.30374C5.96011 9.23713 6.10246 9.18844 6.24956 9.159C6.41537 9.12581 6.58872 9.12581 6.93542 9.12581H8.33333C9.26675 9.12581 9.73346 9.12581 10.09 8.94868C10.4036 8.79287 10.6586 8.54425 10.8183 8.23846C11 7.89082 11 7.43573 11 6.52555V3.60026C11 2.69008 11 2.235 10.8183 1.88735C10.6586 1.58156 10.4036 1.33294 10.09 1.17713C9.73346 1 9.26675 1 8.33333 1H3.66667C2.73325 1 2.26654 1 1.91002 1.17713C1.59641 1.33294 1.34144 1.58156 1.18166 1.88735C1 2.235 1 2.69008 1 3.60026V6.95893C1 7.46272 1 7.71461 1.05679 7.92127C1.2109 8.48211 1.66015 8.92016 2.2353 9.07044C2.44725 9.12581 2.70557 9.12581 3.22222 9.12581ZM3.77778 5.06291C3.77778 5.2125 3.65341 5.33377 3.5 5.33377C3.34659 5.33377 3.22222 5.2125 3.22222 5.06291C3.22222 4.91332 3.34659 4.79205 3.5 4.79205C3.65341 4.79205 3.77778 4.91332 3.77778 5.06291ZM6.27778 5.06291C6.27778 5.2125 6.15341 5.33377 6 5.33377C5.84659 5.33377 5.72222 5.2125 5.72222 5.06291C5.72222 4.91332 5.84659 4.79205 6 4.79205C6.15341 4.79205 6.27778 4.91332 6.27778 5.06291ZM8.77778 5.06291C8.77778 5.2125 8.65341 5.33377 8.5 5.33377C8.34659 5.33377 8.22222 5.2125 8.22222 5.06291C8.22222 4.91332 8.34659 4.79205 8.5 4.79205C8.65341 4.79205 8.77778 4.91332 8.77778 5.06291Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Оставить отзыв
                  </button>
                </div>
              </div>

              <div class="right">
                <div class="stars">
                  <div class="star"
                       v-for="star of projectRating"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                      <path d="M8.70843 0.823678C8.93892 0.356738 9.05416 0.123269 9.21061 0.0486752C9.34673 -0.0162251 9.50487 -0.0162251 9.64099 0.0486752C9.79744 0.123269 9.91268 0.356738 10.1432 0.823677L12.3298 5.25364C12.3979 5.3915 12.4319 5.46042 12.4816 5.51394C12.5257 5.56132 12.5785 5.59971 12.6371 5.62698C12.7033 5.65778 12.7794 5.6689 12.9315 5.69113L17.8228 6.40607C18.3378 6.48135 18.5954 6.519 18.7146 6.6448C18.8183 6.75425 18.867 6.90466 18.8473 7.05414C18.8246 7.22594 18.6382 7.40754 18.2653 7.77074L14.7272 11.2168C14.6169 11.3242 14.5618 11.3779 14.5262 11.4418C14.4947 11.4984 14.4745 11.5606 14.4667 11.6249C14.4579 11.6975 14.4709 11.7734 14.4969 11.9251L15.3317 16.7925C15.4198 17.3059 15.4638 17.5625 15.3811 17.7149C15.3091 17.8474 15.1811 17.9403 15.0328 17.9678C14.8624 17.9994 14.6319 17.8782 14.1709 17.6358L9.79816 15.3362C9.66191 15.2645 9.59379 15.2287 9.52202 15.2146C9.45848 15.2022 9.39312 15.2022 9.32957 15.2146C9.2578 15.2287 9.18968 15.2645 9.05344 15.3362L4.6807 17.6358C4.2197 17.8782 3.98919 17.9994 3.81875 17.9678C3.67046 17.9403 3.5425 17.8474 3.47052 17.7149C3.38778 17.5625 3.43181 17.3058 3.51986 16.7925L4.35467 11.9251C4.38069 11.7734 4.39371 11.6975 4.3849 11.6249C4.3771 11.5606 4.35689 11.4984 4.32539 11.4418C4.2898 11.3779 4.23466 11.3242 4.12437 11.2168L0.586341 7.77074C0.213444 7.40754 0.0269959 7.22594 0.00430753 7.05414C-0.0154326 6.90466 0.0333348 6.75425 0.137032 6.6448C0.256216 6.519 0.513753 6.48135 1.02882 6.40607L5.92009 5.69113C6.07221 5.6689 6.14826 5.65778 6.2145 5.62698C6.27315 5.59971 6.32594 5.56132 6.36997 5.51394C6.41969 5.46042 6.45371 5.3915 6.52175 5.25364L8.70843 0.823678Z" fill="black"/>
                    </svg>

                  </div>
                </div>
                <h3 class="rating-avg">
                  <span v-if="project.ratingAvg !== null">
                    {{ project.ratingAvg }} / 5
                  </span>
                  <span v-else>
                    Нет оценок
                  </span>

                </h3>
              </div>

            </div>
            <div class="project-reviews">
              <project-reviews
                  v-bind:isAdmin="this.isAdmin"
                  v-bind:project="this.project">
              </project-reviews>
            </div>
          </div>

            <Transition>
              <div class="flex"
                   v-if="this.tab === 'editService'">

                <edit-service
                v-bind:product="this.editProduct"

                v-on:updated="(emit) => {
                      this.tab = 'services'
                    }"
                >

                </edit-service>

              </div>
            </Transition>

            <Transition>
              <div class="flex"
                   v-if="this.tab === 'editProject'">

                <edit-project
                    v-bind:isAdmin="this.isAdmin"
                    v-on:switchTabBack="() => {
                      this.tab = 'description'
                      this.getProjectFullInfo()
                    }"

                    v-bind:project="this.project">

                </edit-project>
              </div>
            </Transition>

            <Transition>
            <div class="flex"
                 v-if="this.tab === 'addService'">

              <div class="services">

              </div>

              <add-service
                  v-bind:projectId="project.id"
                  v-on:added="() => {
                    this.tab = 'services'
                    this.limit = 8
                    this.offset = 0
                    this.products = this.products.splice(this.products.length, this.products.length)
                    this.getProducts(6, 0)


                    this.showModal = true
                    this.modal = {
                      iconType: 'ok',
                      heading: 'Услуга успешно добавлена!',
                      description: `Спасибо!`,
                      descriptionType: 'text',
                      exit: true,
                      close: true,
                      confirm: false

                    }

                  }"

              >

              </add-service>
            </div>
            </Transition>
          </div>

        </div>


      </div>

    </div>

  <action-modal
      v-if="actionModal.show === true"
      v-bind:actionModal="actionModal"
      @deleteConfirmed="(emit) => {

      }"
  ></action-modal>


</template>
<script>

import servicesCard from "../TemplateParts/Cards/ServicesCard.vue";
import {ref} from 'vue'
import AddService from "../Controllers/ProductControllers/Product_Add.vue";
import config from '../../assets/js/config.js'
import {isLogin} from '../../assets/js/config.js'
import projectDescriptionTab from "../TemplateParts/Project Tabs/DescriptionTab.vue";
import projectReviews from "../TemplateParts/Project Tabs/ReviewsTab.vue";
import editProject from "../Controllers/ProjectControllers/Project_Edit.vue";
import editService from "../Controllers/ProductControllers/Product_Edit.vue";
import {editableProject} from "../../assets/js/projectController.js";
import {Waypoint} from "vue-waypoint";
import {highlight} from "../../assets/js/productController.js";
import {userInfo} from "../../assets/js/userService.js";
import actionModal from "../TemplateParts/PageParts/actionModal.vue";
import {modalSetting} from "../../assets/js/modal.js";
import {directive} from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import {store} from "../../assets/js/store.js";
import {useFetch} from "../../assets/js/fetchRequest.js";


export default {

  name: "ProjectsView.vue",
  components: {
    actionModal,
    editProject,
    AddService,
    servicesCard,
    projectDescriptionTab,
    projectReviews,
    editService,
    Waypoint
  },
  emits: ['updated', 'high'],
  directives: {
    tippy: directive,
  },
  data() {
    return {
      modal: {},
      api: config.api.url,
      project: {},
      projectRating: 0,
      products: [],
      actionModal: {
        show: false
      },
      isFavourite: false,
      isExchanger: false,
      isOwner: false,
      isAdmin: false,

      limit: 8,
      offset: 0,
      emptyResponse: false,
      editProduct: {},

      config, highlight, userInfo, modalSetting, store, useFetch, editableProject
    }
  },
  props: ['selectedId', 'highlight', 'tab'],
  setup() {
    const el = ref(null);
    const starOne = ref(null);

    return {
      el
    }
  },
  methods: {


    deleteProduct(id) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);


      fetch(`${config.api.url}products/${id}`, {
        method: "DELETE",
        headers: myHeaders
      })
          .then((response) => response.json())
          .then(response => {
            this.limit = 8
            this.offset = 0
            this.products = this.products.slice(this.products.length, this.products.length)
            this.getProducts(this.limit, this.offset)
            this.$refs.wrapper.scrollIntoView({behavior: "smooth", block: "center"})
          })
          .catch((error) => {
            console.error(error)
          });
    },

    getProducts(limit, offset) {
      const projectId = window.location.pathname.replace('/project/', '');

      let url = `products?projectId=${projectId}getlimit=${limit}&offset=${offset}&sort=newest`
      useFetch(url, "GET").then(result => {
        for (let product of result.products) {
          this.products.push(product)
        }
      })
    },

    getProjectFullInfo() {
      const projectId = window.location.pathname.replace('/project/', '');

      useFetch(`projects/${projectId}`, 'GET').then(result => {
        this.project = result.project

        result.project.favorite === 1 ? this.isFavourite = true : this.isFavourite = false
        result.project.userData.username === userInfo.username ? this.isOwner = true : this.isOwner = false
        this.projectRating = Math.round(this.project.ratingAvg)
        result.project.categories.find(category => category.id === store.exchanger) ? this.isExchanger = true : this.isExchanger = false
      }).catch(err => {
        modalSetting.show = true
        modalSetting.type = 'error'
      })


    },


  },
  mounted() {
    this.getProducts(this.limit, this.offset)
    this.getProjectFullInfo()
    userInfo.role === 'admin' ? this.isAdmin = true : this.isAdmin = false


  }
}
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity .1s ease, max-height .3s, transform 0.3s;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(5px);
  max-height: 0;
  opacity: 0;
}

.wrapper {
  position: relative;
}
.addService {
  width: 100%;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
[v-cloak] {
  display: block;
  padding: 50px 0;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #333;
    animation: spinner .6s linear infinite;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div {
    display: none;
  }
}

input[type='text'] {
  border-radius: 5px;
  border: 1px solid var(--new-dark, transparent);
  background: var(--neutral, #FFF);
  color: #000;
  padding: 0px 5px;
  width: 100%;
  box-sizing: border-box;

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  get.bad {
    background-color: #fff3f3;
    border: 1px solid #984a5a;
    get.ok {
      background-color: #ffffff;
    }
  }

  &::placeholder {
    opacity: .3;
  }
}
.reviewTextError {
  background-color: #ffd6d6;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;
  padding: 10px;

}
textarea {
  border-radius: 5px;
  border: 1px solid var(--new-dark, transparent);
  background: var(--neutral, #FFF);
  padding: 10px 15px;

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-style: normal;
  height: 280px;
  font-weight: 400;
  line-height: normal;
  resize: none;

  box-sizing: border-box;

  width: 100%;

  &::placeholder {
    opacity: .3;
  }
}


.set-rating {
  svg {
    opacity: .3;
    transition: .3s ease;
    path {
      cursor: pointer;
    }

    get.active {
      opacity: 1!important;
    }
  }
}

.flex {
  width: 100%;
  box-sizing: border-box;
}

.project-header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--gray-2, #D8D8D8);
  padding: 10px;
  margin-bottom: 10px;

  get.owner {
    border-color: #FFC700;
  }
  .button {
    margin-left: auto;
  }

  .baza-button {
    margin-left: 20px;
    padding-left: 20px;
    padding-right: 20px;


  }

  .exchanger-rates {
    width: 20%;
    display: flex;
    gap: 15px;
    margin-left: auto;
    .rate {
      .top {
        display: flex;
        align-items: center;

        color: #000;
        font-family: "PT Sans Caption";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 125% */

        svg {
          width: 10px;
          height: 10px;
          margin-right: 5px;
          path {
            stroke-width: 1px;
            stroke: #000;
          }
        }
      }
      .bottom {
        color: var(--gray, #A8A8A8);
        font-family: "PT Sans Caption";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
    }
  }

  .avatar {

    width: 80px;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    flex-grow: 0;
    display: block;
    box-sizing: border-box;
    position: relative;
    border-radius: 15px;
    overflow: hidden;

    figure {
      width: 100%;
      height: 100%;
      text-align: center;
      margin: 0;
      display: block;
      box-sizing: border-box;
    }

    .cover img {
      object-fit: cover;
      height: 100%;
      width: inherit;
    }


    img {
      object-fit: cover;

    }
    .favorite {
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 5px;
      border-radius: 400px;
      padding: 4px;
      transition: .3s ease;

      svg {

      }
    }
  }
}

.project-info {
  width: 50%;
  cursor: default;
  .name {
    width: 100%;
    color: #000;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
      span {
        word-break: break-word;
      }

    font-family: "PT Sans Caption";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-left: 5px;

    svg {
      cursor: pointer;
      width: 18px;
      height: 18px;
      position: relative;
      margin-left: 10px;
      path {
        transition: .3s ease;
      }

      &:hover {
        path {
          stroke: #7c7c7c;
        }
      }
    }
  }
  .project-stats {

    padding-left: 5px;

    display: flex;
    align-items: center;
    justify-content: start;

    .rating {
      display: flex;
      gap: 10px;
      align-items: center;

      color: var(--gray, #A8A8A8);
      font-family: "PT Sans Caption";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &.edit-project {
        cursor: pointer;
      }

    }
    .sep {
      width: 3px;
      height: 3px;
      margin-right: 10px;
      margin-left: 10px;
      border-radius: 200px;
      background-color: #A8A8A8;
    }
    svg {
      width: 12px;
      height: 12px;

    }
  }
}
.services {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  .project {
    width: 30%;

  }
}

.content {
  padding: 0;
}

.project {
  width: 100%;


  .project-banner {
    width: 100%;
    height: auto;
    max-height: 500px;
    overflow: hidden;
    border-radius: 20px;
    position: relative;

    .owner {
      position: absolute;
      z-index: 15;
      text-align: right;
      right: 10px;
      bottom: 10px;
      font-size: 12px;
      color: #ffffff;
      background-color: #000;
      padding: 5px 10px;
      border-radius: 10px;
      p {
        color: #ffffff;
      }
      svg {
        width: 12px;
        height: 12px;
        margin-left: 3px;
        path {
          fill: #fff;
        }
      }
    }



    img {
      width: 100%;
      min-height: 100%;
    }
  }



  .project-body {

    padding: 10px;
    .tabs-body {
      .project-reviews {


      }
    }

  }

  .block-heading {
    display: flex;
    align-items: center;
    .left {
      width: 75%;
      display: flex;
      gap: 20px;
      align-items: end;
      .action {

        .action-button {
          cursor: pointer;
          background: none;
          border: none;
          color: var(--gray, #A8A8A8);
          font-family: "PT Sans Caption";
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

      }

    }
    .right {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: end;

      svg {
        width: 18px;
        height: 18px;
      }

      .stars {
        display: flex;
        gap: 4px;
        align-items: center;
        margin-right: 20px;
      }
      .rating-avg {
        color: #000;
        text-align: right;
        font-family: "PT Sans Caption";
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  .recommend-project {
    svg {
      width: 22px;
      height: 22px;

      path {
        fill: #0a58ca;
      }
    }
  }

}

h3 {
  color: #000;
  font-family: "PT Sans Caption";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.favorite {
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 400px;
  padding: 5px;
  transition: .3s ease;

}

.notReviews {
  svg {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
    flex-basis: 100%;

    path {
      fill: #c8b56b;
    }
  }
  span {
    color: #c8b56b;
    flex-basis: 100%;
  }
}



.cards-wrapper {
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;


  .tabs-content {
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 20px;

    .shop-view {
      width: 18.5%;
    }
  }
  .card {

  }
}

.waypoint {
  width: 100%;
  display: flex;
  justify-content: center;
  .loadmore {
    width: fit-content;

  }
}

@media screen and (max-width: 768px) {
  .project {
    .project-body {

    }
    .project-banner {
      padding: 0 10px;
      max-height: 400px;
      img {
        border-radius: 10px;
      }
      .owner {
        p {
          font-size: 10px;
        }
      }
    }

  }

  .cards-wrapper {
    .tabs-content {
      display: flex;

      .shop-view {
        width: 46%;
        justify-content: center;
        display: flex;
      }
    }
  }

  .name {
    font-size: 16px;
  }
  .tab-stats {
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 100%;
    justify-content: start;
    gap: 0px;
    margin-left: 0;
    margin-right: 0;
    background-color: transparent;
    box-shadow: none;



    .stat {
      font-size: 14px;
      margin-right: 10px;
      width: auto;
      margin-bottom: 5px;

      svg {
        margin-right: 5px;
      }
    }
  }

}
@media screen and (max-width: 500px) {
  .project {
    .project-header {
      flex-wrap: wrap;
      .avatar {
        width: 120px;
      }
      .button {
        margin-left: 0;
        width: 100%;
      }
      .baza-button {
        width: 100%;
        box-sizing: border-box;
        margin-left: 0;
      }
    }
    .project-info {
      width: calc(100% - 130px);
      .project-stats {
        flex-wrap: wrap;
        gap: 1px;

        .sep {
          display: none;
        }

        .rating {
          min-width: 47%;
        }
      }
    }
    .project-body {
      padding-left: 10px;
      padding-right: 10px;
      .tabs-body {
        .project-reviews {
          .block-heading {
            .left {
              width: 60%;
            }
            .right {
              width: 40%;
            }
          }
        }
      }
    }
  }


}
</style>