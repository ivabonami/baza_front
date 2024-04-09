<template v-cloak>

  <div class="wrapper" ref="wrapper">
    <div class="project">
      <div class="project-banner">
        <img :src="api + project.bannerFilePath"
             alt=""
             v-if="project.bannerFilePath !== null">

        <img src="/src/assets/images/banner.webp"
             alt=""
             v-else>

<!--        <div class="owner">-->
<!--          <p class="ownerText">-->
<!--            Владелец: <b><span ref="owner"></span></b>-->
<!--          </p>-->
<!--&lt;!&ndash;          <p class="ratingText" v-if="this.tab !== 'testimonials'">&ndash;&gt;-->
<!--&lt;!&ndash;            Рейтинг:&ndash;&gt;-->
<!--&lt;!&ndash;            <svg xmlns="http://www.w3.org/2000/svg" v-if="project.ratingAvg" width="16" height="16" viewBox="0 0 16 16" fill="none">&ndash;&gt;-->
<!--&lt;!&ndash;              <path&ndash;&gt;-->
<!--&lt;!&ndash;                  d="M8.93325 0.7084L10.1489 4.61808C10.2802 5.04057 10.6571 5.32648 11.0822 5.32648H15.0168C15.9674 5.32648 16.3627 6.59722 15.5936 7.18118L12.4105 9.59732C12.0665 9.85835 11.9227 10.3211 12.054 10.7436L13.2697 14.6533C13.5635 15.5978 12.5287 16.3833 11.7597 15.7996L8.57651 13.3835C8.23253 13.1224 7.7669 13.1224 7.42292 13.3835L4.23977 15.7996C3.47071 16.3833 2.43593 15.5978 2.72972 14.6533L3.94542 10.7436C4.07671 10.3211 3.93294 9.85835 3.58896 9.59732L0.406373 7.18088C-0.362688 6.59722 0.0326187 5.32618 0.983169 5.32618H4.91752C5.3426 5.32618 5.71947 5.04028 5.85077 4.61778L7.06675 0.7084C7.36053 -0.236133 8.63947 -0.236133 8.93325 0.7084Z"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </svg>&ndash;&gt;-->
<!--&lt;!&ndash;              {{ project.ratingAvg || 'Нет оценок'}}&ndash;&gt;-->
<!--&lt;!&ndash;          </p>&ndash;&gt;-->

<!--        </div>-->


      </div>
      <div class="project-header">
        <div class="left">
          <div class="avatar">
            <figure class="cover">
              <img :src="'http://62.113.96.171:3000/' + this.project.avatarFilePath"
                   alt="" class="can-be-hovered"
                   v-if="this.project.avatarFilePath !== ''">

              <img src="/src/assets/images/avatar.webp"
                   alt="" class="can-be-hovered"
                   v-else>
            </figure>
            <div class="favorite"
                 v-if="project.favorite === 0 && this.isLogin === true"
                 v-on:click="() => {
               addFavorite(project.id)
               this.isFavourite = true
             }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#00192E" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278M7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.5 21.5 0 0 0 12 19.91a21.6 21.6 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5" clip-rule="evenodd"></path><path fill="white" fill-rule="evenodd" d="M12 22c-.285-.018-.512-.123-.764-.24l-.084-.038a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568q.3-.418.666-.78A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278m0-17.959A7.18 7.18 0 0 1 17 2a7 7 0 0 1 7 7c0 4.897-3.061 8.41-5.75 10.562a24.6 24.6 0 0 1-4.989 3.07c-.566.258-.92.368-1.261.368h-.032l-.033-.002c-.484-.032-.881-.218-1.12-.33l-.077-.036a24.5 24.5 0 0 1-4.991-3.07C3.056 17.408 0 13.895 0 9a7 7 0 0 1 7-7c1.918 0 3.701.776 5 2.041M3 9a4 4 0 0 1 4-4c1.957 0 3.652 1.396 4.02 3.2a1 1 0 0 0 1.96 0C13.348 6.396 15.043 5 17 5a4 4 0 0 1 4 4c0 3.552-2.22 6.295-4.625 8.22A21.6 21.6 0 0 1 12 19.91a21.5 21.5 0 0 1-4.377-2.69C5.217 15.295 3 12.551 3 9" clip-rule="evenodd"></path></svg>
            </div>

            <div class="favorite"
                 v-else-if="project.favorite === 1  && this.isLogin === true"
                 v-on:click="() => {
               deleteFavorite(project.id)
               this.isFavourite = false
             }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#F8104B" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278" clip-rule="evenodd"></path></svg>
            </div>
          </div>
          <div class="name">
            <input type="text" v-if="isEditable === false"
                   v-model="projectName" v-on:keydown.enter="checkAndUpdateProject()">
            <span v-else>
              {{ project.name }}

            </span>


          </div>
        </div>


<!--        <div class="rating">-->
<!--          <div class="stars">-->

<!--            <div class="project-rating"-->
<!--                 v-if="project.ratingAvg !== null"-->
<!--                 >-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">-->
<!--                <path-->
<!--                    d="M8.93325 0.7084L10.1489 4.61808C10.2802 5.04057 10.6571 5.32648 11.0822 5.32648H15.0168C15.9674 5.32648 16.3627 6.59722 15.5936 7.18118L12.4105 9.59732C12.0665 9.85835 11.9227 10.3211 12.054 10.7436L13.2697 14.6533C13.5635 15.5978 12.5287 16.3833 11.7597 15.7996L8.57651 13.3835C8.23253 13.1224 7.7669 13.1224 7.42292 13.3835L4.23977 15.7996C3.47071 16.3833 2.43593 15.5978 2.72972 14.6533L3.94542 10.7436C4.07671 10.3211 3.93294 9.85835 3.58896 9.59732L0.406373 7.18088C-0.362688 6.59722 0.0326187 5.32618 0.983169 5.32618H4.91752C5.3426 5.32618 5.71947 5.04028 5.85077 4.61778L7.06675 0.7084C7.36053 -0.236133 8.63947 -0.236133 8.93325 0.7084Z"/>-->
<!--              </svg>-->
<!--              {{ project.ratingAvg }}-->

<!--            </div>-->

<!--            <div class="project-rating-no" v-else>-->
<!--              Нет оценок-->
<!--            </div>-->

<!--          </div>-->


<!--        </div>-->

      </div>

      <div class="project-body">
        <div class="tabs-links">
          <div class="left">
            <button
                v-if="this.allowShopFront === true"
                v-on:click="switchTabs('services')"
                class="fresh" ref="services"
                :class="{
                active: this.tab === 'services'
          }">
              Витрина
            </button>

            <button
                v-on:click="switchTabs('description')"
                class="recommended" ref="description"
                :class="{
                active: this.tab === 'description'
          }">
              Описание
            </button>
            <button
                v-if="isLogin === true"
                v-on:click="switchTabs('testimonials')"
                class="recommended" ref="description"
                :class="{
                active: this.tab === 'testimonials'
          }">
              Отзывы
            </button>
            <button
                v-if="isOwner && allowShopFront === true || isAdmin && allowShopFront && allowShopFront === true"
                v-on:click="switchTabs('addService')"
                class="recommended" ref="description"
                :class="{
                active: this.tab === 'addService'
          }">
              Добавить услугу
            </button>
            <button
                v-if="isOwner || isAdmin"
                v-on:click="switchTabs('editProject')"
                class="recommended" ref="description"
                :class="{
                active: this.tab === 'editProject'
          }">
              Изменить проект
            </button>
          </div>




        </div>



        <div class="tabs-body">
          <div class="tab-content">
            <Transition>
              <div class="flex"
                   v-if="this.tab === 'description'">

                <project-description-tab
                    v-bind:isAdmin="this.isAdmin"
                    v-bind:project="this.project">

                </project-description-tab>

              </div>
            </Transition>

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
                 v-if="this.tab === 'testimonials'">

              <project-reviews
                  v-bind:isAdmin="this.isAdmin"
                  v-bind:project="this.project"

              >

              </project-reviews>

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

                 v-if="this.tab === 'services' && this.products.length > 0 ">
              <div class="cards-wrapper" ref="service">
                <transition-group name="list" tag="div" class="tabs-content">
                  <div class="shop-view" v-for="item in products" v-if="products.length > 0"
                  >
                    <services-card
                        v-bind:productId="item.id"
                        v-bind:name="item.name"
                        v-bind:image="`${config.api.url}${item.avatarFilePath}`"
                        v-bind:id="item.id"
                        v-bind:projectId="item.ProjectId"
                        v-bind:isOwner="isOwner || isAdmin"
                        v-bind:clickable="false"

                        v-on:deleteService="(emit) => {
                          this.showModal = true
                          this.waitForDeleteProductId = item.id
                          this.modal = {
                            iconType: 'warning',
                            heading: `Вы собираетесь удалить услугу`,
                            description: `Вы уверены что хотите удалить ${item.name} ?`,
                            descriptionType: 'text',
                            confirm: true
                          }
                        }"

                        v-on:editService="(emit) => {
                          this.tab = 'editService'
                          this.editProduct = {
                            name: item.name,
                            image: item.avatarFilePath,
                            description: item.description,
                            id: item.id
                          }
                        }"
                        v-on:click="() => {
                          this.showModal = true
                          this.highlight = 0
                          this.modal= {

                            iconType: 'service',
                            large: true,
                            image: `${config.api.url}${item.avatarFilePath}`,
                            heading: item.name,
                            description: item.description,
                            descriptionType: 'text',
                            exit: true,
                            close: false,
                            confirm: false
                          }
                        }"

                    >
                    </services-card>



                  </div>


                </transition-group>
                <Waypoint @change="(way) => {

                          if (way.going === 'IN' && way.direction === 'UP' && emptyResponse === false) {
                            this.offset += this.limit
                            getProducts(this.limit, this.offset)
                          }
                        }"
                          v-if="emptyResponse === false">
                  <div class="loadmore btn btn-outlined" ref="loadmore"

                       v-on:click="() => {
                         this.offset += this.limit
                           getProducts(this.limit, this.offset)

                       }">
                    Загрузить еще
                  </div>
                </Waypoint>


              </div>








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

    <div class="tab-stats box-shadow">
      <div class="stat">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="11" viewBox="0 0 20 11" fill="none">
          <path
              d="M0 5.5522C5.36282 -1.78782 14.5224 -1.91065 20 5.54408C17.4576 8.73988 14.3273 10.9954 10.0053 11C5.67922 11.0041 2.55604 8.73235 0 5.55277V5.5522ZM10.0195 9.10372C12.0303 9.09387 13.6915 7.46063 13.6886 5.49716C13.6862 3.54005 12.0149 1.89291 10.0207 1.8819C7.99811 1.87089 6.29192 3.55164 6.31557 5.53192C6.33923 7.5064 8.0058 9.11357 10.0195 9.10372ZM1.48264 5.49889C2.94518 7.21151 4.67739 8.49191 6.86262 9.16861C5.82057 8.14777 5.21497 6.95716 5.20788 5.50816C5.20078 4.06554 5.81702 2.88189 6.81176 1.83613C4.6632 2.54122 2.92211 3.77759 1.48264 5.49831V5.49889ZM18.502 5.5267C17.1903 3.79671 14.4674 1.94563 13.1817 1.8958C15.3877 4.44328 15.3794 6.27119 13.0682 9.25436C15.3232 8.49075 17.0554 7.20977 18.502 5.5267Z"
              fill="transparent"/>
          <path
              d="M9.85082 4.00324C10.8514 3.96266 11.5608 4.30421 11.879 4.95173C12.1707 5.54545 11.9218 6.24541 11.2733 6.65171C10.6036 7.07123 9.62661 7.11638 8.88706 6.76206C8.12098 6.39452 7.8377 5.78348 8.08964 5.03974C9.41204 5.29875 9.91713 5.01329 9.85022 4.00324H9.85082Z"
              fill="transparent"/>
        </svg>
        Просмотры: {{ project.viewCount }}
      </div>

      <div class="stat" >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
          <path d="M5.11204 17.16V0.23999H6.26404V17.16H5.11204ZM5.56204 15.144C4.60204 15.144 3.68404 15 2.80804 14.712C1.93204 14.412 1.24204 14.028 0.738037 13.56L1.40404 12.156C1.88404 12.576 2.49604 12.924 3.24004 13.2C3.98404 13.476 4.75804 13.614 5.56204 13.614C6.29404 13.614 6.88804 13.53 7.34404 13.362C7.80004 13.194 8.13604 12.966 8.35204 12.678C8.56804 12.378 8.67604 12.042 8.67604 11.67C8.67604 11.238 8.53204 10.89 8.24404 10.626C7.96804 10.362 7.60204 10.152 7.14604 9.99599C6.70204 9.82799 6.21004 9.68399 5.67004 9.56399C5.13004 9.44399 4.58404 9.30599 4.03204 9.14999C3.49204 8.98199 2.99404 8.77199 2.53804 8.51999C2.09404 8.26799 1.73404 7.93199 1.45804 7.51199C1.18204 7.07999 1.04404 6.52799 1.04404 5.85599C1.04404 5.20799 1.21204 4.61399 1.54804 4.07399C1.89604 3.52199 2.42404 3.08399 3.13204 2.75999C3.85204 2.42399 4.76404 2.25599 5.86804 2.25599C6.60004 2.25599 7.32604 2.35199 8.04604 2.54399C8.76604 2.73599 9.39004 3.01199 9.91804 3.37199L9.32404 4.81199C8.78404 4.45199 8.21404 4.19399 7.61404 4.03799C7.01404 3.86999 6.43204 3.78599 5.86804 3.78599C5.16004 3.78599 4.57804 3.87599 4.12204 4.05599C3.66604 4.23599 3.33004 4.47599 3.11404 4.77599C2.91004 5.07599 2.80804 5.41199 2.80804 5.78399C2.80804 6.22799 2.94604 6.58199 3.22204 6.84599C3.51004 7.10999 3.87604 7.31999 4.32004 7.47599C4.77604 7.63199 5.27404 7.77599 5.81404 7.90799C6.35404 8.02799 6.89404 8.16599 7.43404 8.32199C7.98604 8.47799 8.48404 8.68199 8.92804 8.93399C9.38404 9.18599 9.75004 9.52199 10.026 9.94199C10.302 10.362 10.44 10.902 10.44 11.562C10.44 12.198 10.266 12.792 9.91804 13.344C9.57004 13.884 9.03004 14.322 8.29804 14.658C7.57804 14.982 6.66604 15.144 5.56204 15.144Z" fill="transparent"/>
        </svg>
        Депозит: {{ project.deposit || 0 }}$
      </div>

      <div class="stat" v-if="project.type === 'exchanger'">
        <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 332.02 345"><path d="M331.96,56.65c-.83-17.38-10.77-29.29-24.33-38.62-15.59-10.72-33.29-15.55-51.92-18.03h-26.97c-16.86,2.27-32.92,6.57-47.72,15.18-13.02,7.57-22.18,18.41-28.03,32.12-.94,2.21-1.19,4.85-1.2,7.29-.09,20.99-.05,41.98-.05,62.97,0,1.93,0,3.86,0,5.03-11.57-3.74-22.65-8.59-34.23-10.83-34.21-6.6-66.97-3.13-96.27,17.72-9.65,6.86-16.06,16.33-20.18,27.29-.96,2.56-.99,5.57-.99,8.37C0,204.96,.1,244.77,0,284.59c-.05,19.33,10.08,32.57,25.22,42.73,14.96,10.05,31.78,14.95,49.58,16.82,1.28,.13,2.53,.56,3.79,.86h23c8.6-1.69,17.34-2.91,25.78-5.18,15.86-4.27,30.04-11.71,41.09-24.26,7.55-8.57,11.6-18.54,11.76-30.01,.04-2.76,0-5.52,0-8.21,9.46,3.48,18.08,7.57,27.17,9.82,31.92,7.92,63.15,6.12,92.68-9.41,14.25-7.5,25.57-18.14,29.92-34.39,1.14-4.27,1.47-8.87,1.47-13.32,.09-52.31,.04-104.62,.07-156.93,0-5.49,.68-11,.42-16.46ZM32.96,154.41c9.51-9.93,21.92-14.32,34.97-16.81,8.13-1.55,16.48-1.98,20.71-2.46,20.6,.87,36.51,3.73,50.78,12.69,1.97,1.23,3.69,2.85,5.63,4.12,9.45,6.18,9.13,23.92-.11,30.82-10.89,8.13-22.97,12.51-36.12,14.65-20.33,3.31-40.26,1.92-59.19-6.49-5.96-2.65-11.73-6.49-16.48-10.96-8.32-7.84-8.12-17.29-.19-25.56Zm-6.29,70.52c.18-4.8,.04-9.62,.04-15.03,41.71,21.17,82.86,21.5,124.82,1.35,0,7.8,.47,15.53-.25,23.14-.25,2.69-3.08,5.44-5.3,7.57-7.88,7.59-17.65,11.76-28.12,14.28-25.42,6.11-50.16,4.57-73.73-7.43-3.8-1.93-7.3-4.64-10.52-7.47-4.87-4.27-7.18-9.81-6.93-16.42Zm108.68,82.94c-28.68,14.46-58.59,14.19-87.85,1.39-18.4-8.05-22.7-17.61-19.94-38.79,19.74,11.59,40.8,16.27,62.98,16.19,21.96-.08,42.91-4.48,62.16-15.88,2.2,18.92,2.22,27.21-17.36,37.08ZM184.26,46.63c4.27-4.46,9.52-8.65,15.15-11.04,30.41-12.9,60.74-12.83,90.45,2.49,3.19,1.65,5.98,4.19,8.73,6.57,8.69,7.51,8.27,20.33-.34,28.01-8.97,8-19.59,12.56-31.11,14.9-8.27,1.68-16.76,2.25-25.15,3.31-16.16-.53-31.61-3.27-45.76-11.14-4.29-2.39-8.39-5.53-11.76-9.11-7.31-7.77-7.56-16.33-.22-24Zm104.95,206.81c-18.24,10.6-38.23,13.35-58.78,10.88-9.77-1.17-19.27-4.6-28.88-7.09-1.26-.33-2.43-1.06-3.61-1.67-16.07-8.23-19.96-15.94-17.21-34.15,41.28,19.87,82.42,19.8,123.41-.88,2.7,16.07-1.07,24.85-14.93,32.9Zm-3.55-53.76c-28.67,13.45-57.83,13.17-86.85,.62-2.72-1.18-5.29-2.81-7.75-4.49-7.22-4.94-12.46-10.86-10.85-20.65,.63-3.86,.1-7.91,.1-12.85,20.18,11.44,41.01,15.76,62.75,15.56,21.53-.2,42.14-4.67,61.01-15.91,3.21,19.64-1.14,29.63-18.4,37.73Zm-3.13-57.04c-27.9,11.41-56.1,11.16-83.77-1.32-4.32-1.95-8.31-4.92-11.95-8.01-5.57-4.72-8.68-10.77-8.15-18.43,.31-4.46,.06-8.96,.06-13.97,42.15,21.37,83.76,21.39,125.5,1.12,4.09,20.33-1.74,32.47-21.67,40.62Z"/></svg>
        Резерв: {{ project.reserve }}$
      </div>

      <div class="stat" v-if="project.type === 'exchanger'">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
          <path d="M5.11204 17.16V0.23999H6.26404V17.16H5.11204ZM5.56204 15.144C4.60204 15.144 3.68404 15 2.80804 14.712C1.93204 14.412 1.24204 14.028 0.738037 13.56L1.40404 12.156C1.88404 12.576 2.49604 12.924 3.24004 13.2C3.98404 13.476 4.75804 13.614 5.56204 13.614C6.29404 13.614 6.88804 13.53 7.34404 13.362C7.80004 13.194 8.13604 12.966 8.35204 12.678C8.56804 12.378 8.67604 12.042 8.67604 11.67C8.67604 11.238 8.53204 10.89 8.24404 10.626C7.96804 10.362 7.60204 10.152 7.14604 9.99599C6.70204 9.82799 6.21004 9.68399 5.67004 9.56399C5.13004 9.44399 4.58404 9.30599 4.03204 9.14999C3.49204 8.98199 2.99404 8.77199 2.53804 8.51999C2.09404 8.26799 1.73404 7.93199 1.45804 7.51199C1.18204 7.07999 1.04404 6.52799 1.04404 5.85599C1.04404 5.20799 1.21204 4.61399 1.54804 4.07399C1.89604 3.52199 2.42404 3.08399 3.13204 2.75999C3.85204 2.42399 4.76404 2.25599 5.86804 2.25599C6.60004 2.25599 7.32604 2.35199 8.04604 2.54399C8.76604 2.73599 9.39004 3.01199 9.91804 3.37199L9.32404 4.81199C8.78404 4.45199 8.21404 4.19399 7.61404 4.03799C7.01404 3.86999 6.43204 3.78599 5.86804 3.78599C5.16004 3.78599 4.57804 3.87599 4.12204 4.05599C3.66604 4.23599 3.33004 4.47599 3.11404 4.77599C2.91004 5.07599 2.80804 5.41199 2.80804 5.78399C2.80804 6.22799 2.94604 6.58199 3.22204 6.84599C3.51004 7.10999 3.87604 7.31999 4.32004 7.47599C4.77604 7.63199 5.27404 7.77599 5.81404 7.90799C6.35404 8.02799 6.89404 8.16599 7.43404 8.32199C7.98604 8.47799 8.48404 8.68199 8.92804 8.93399C9.38404 9.18599 9.75004 9.52199 10.026 9.94199C10.302 10.362 10.44 10.902 10.44 11.562C10.44 12.198 10.266 12.792 9.91804 13.344C9.57004 13.884 9.03004 14.322 8.29804 14.658C7.57804 14.982 6.66604 15.144 5.56204 15.144Z" fill="transparent"/>
        </svg>
        Курс: {{ project.exchangeRate }}$
      </div>

      <div class="stat" v-if="project.type === 'exchanger'">
        <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 222.87 270.23"><path d="M166.56,52.77c-8.26-8.17-16.51-16.36-24.8-24.5-5.17-5.08-6.66-11.15-4.18-17.82,4.29-11.56,18.15-14.01,27.34-4.9,14.55,14.43,29,28.97,43.48,43.46,3.18,3.18,6.46,6.28,9.5,9.59,6.67,7.27,6.67,16.22-.27,23.23-17.59,17.76-35.25,35.44-53.02,53.02-7.2,7.12-16.99,7.09-23.63,.35-6.3-6.39-6.05-16.22,.82-23.28,6.97-7.17,14.13-14.16,21.19-21.24,1.15-1.15,2.22-2.37,4.21-4.52-2.86,0-4.59,0-6.32,0-77.5,0-64.99,0-142.49,0-9.42,0-15.05-3.61-17.51-11.08-3.51-10.68,4.03-21.08,15.66-21.16,20.5-.15,41-.06,61.5-.05,58.33,0,26.66,0,85,.01,.98,0,1.95,0,2.93,0,.2-.37,.41-.74,.61-1.11Z"/><path d="M56.31,217.46c8.26,8.17,16.51,16.36,24.8,24.5,5.17,5.08,6.66,11.15,4.18,17.82-4.29,11.56-18.15,14.01-27.34,4.9-14.55-14.43-29-28.97-43.48-43.46-3.18-3.18-6.46-6.28-9.5-9.59-6.67-7.27-6.67-16.22,.27-23.23,17.59-17.76,35.25-35.44,53.02-53.02,7.2-7.12,16.99-7.09,23.63-.35,6.3,6.39,6.05,16.22-.82,23.28-6.97,7.17-14.13,14.16-21.19,21.24-1.15,1.15-2.22,2.37-4.21,4.52,2.86,0,4.59,0,6.32,0,77.5,0,64.99,0,142.49,0,9.42,0,15.05,3.61,17.51,11.08,3.51,10.68-4.03,21.08-15.66,21.16-20.5,.15-41,.06-61.5,.05-58.33,0-26.66,0-85-.01-.98,0-1.95,0-2.93,0-.2,.37-.41,.74-.61,1.11Z"/></svg>

        Мин. обмен: {{ project.minValueToExchange }}$
      </div>

      <div class="stat">
        Владелец:&ensp;<b> <span ref="owner"></span></b>
      </div>

    </div>




  </div>
  <modal-window-backdrop
      v-if="showModal === true"
      v-on:changeModal="(emitShowModal) => {
        this.showModal = emitShowModal
      }"
      v-bind:icon-type="this.modal.iconType"
      v-bind:descriptionType="this.modal.descriptionType"
      v-bind:heading="this.modal.heading"
      v-bind:description="this.modal.description"
      v-bind:close="this.modal.close"
      v-bind:image="this.modal.image || null"
      v-bind:large="this.modal.large || false"
      v-bind:confirmAction="this.modal.confirm"
      v-bind:exit="this.modal.exit"
      ref="modal"
      tabindex="0"
      v-on:confirmAction="(emit)=> {
        deleteProduct(waitForDeleteProductId)
      }"

  >

  </modal-window-backdrop>

</template>
<script>
import servicesCard from "../TemplateParts/Cards/ServicesCard.vue";
import { ref } from 'vue'
import AddService from "../Controllers/ProductControllers/Product_Add.vue";
import config from '../../assets/js/config.js'
import { isLogin } from '../../assets/js/config.js'
import projectDescriptionTab from "../TemplateParts/Project Tabs/DescriptionTab.vue";
import projectReviews from "../TemplateParts/Project Tabs/ReviewsTab.vue";
import editProject from "../Controllers/ProjectControllers/Project_Edit.vue";
import editService from "../Controllers/ProductControllers/Product_Edit.vue";
import modalWindowBackdrop from "../TemplateParts/Page Parts/Modal.vue";
import {Waypoint} from "vue-waypoint";
import {highlight} from "../../assets/js/productController.js";

export default {

  name: "ProjectsView.vue",
  components: {editProject, AddService, servicesCard, modalWindowBackdrop, projectDescriptionTab, projectReviews, editService, Waypoint },
  emits: ['updated', 'high'],

  data() {
    return {
      waitForDeleteProductId: 0,
      modal: {},
      showModal:false,
      allowShopFront: true,
      api: config.api.url,

      isLogin: isLogin(),
      services: {},
      tab: '',
      favorite: false,
      project: {},

      isOwner: false,

      projectName: '',
      projectDescription: '',

      reviews: {},

      username: '',

      isAdmin: false,

      highlighted: '',
      products: [],

      isFavourite: false,

      limit: 8,
      offset: 0,
      emptyResponse: false,
      editProduct: {},

      config, highlight
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

    highlightProject() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      const projectId = window.location.pathname.replace('/project/', '');

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`${config.api.url}products?projectId=${projectId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.highlighted = result.products[result.products.length - 1]
          })
          .catch((error) => console.error(error));
    },
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
          .catch((error) => {console.error(error)});
    },
    addFavorite(projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}user/project/${projectId}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(
            {
              status: 'favorite'
            }
        )
      })
          .then((response) => response.json())
          .then(() => { this.getProjectFullInfo() })
          .catch((error) => {console.error(error)});
    },

    deleteFavorite(projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}user/project/${projectId}`, {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify(
            {
              status: 'favorite'
            }
        )
      })
          .then((response) => response.json())
          .then(() => { this.getProjectFullInfo() })
          .catch((error) => {console.error(error)});
    },
    getProducts(limit, offset) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${config.token}`);
      const projectId = window.location.pathname.replace('/project/', '');

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`${config.api.url}products?projectId=${projectId}&limit=${limit}&offset=${offset}&sort=newest`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            for (let product of result.products) {
              this.products.push(product)
            }
            result.products.length < this.limit ? this.emptyResponse = true : this.emptyResponse = false
            if(this.products.length <= 0) {
              this.switchTabs('description')
            } else {
              this.switchTabs('services')
            }

            for (let product of this.products) {
              if (parseInt(this.$route.query.highlight) === product.id) {
                product.highlighted = true

              }
            }

          })
          .catch((error) => console.error(error));
    },

    getProjectFullInfo() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const projectId = window.location.pathname.replace('/project/', '');
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`${config.api.url}projects/` + projectId, {
        method: "GET",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then((result) => {
            this.project = result.project
            this.projectDescription = this.project.description
            this.projectName = this.project.name
            this.$refs.owner.innerHTML = ' ' + this.project.userData.username
            if (this.$refs.owner.innerHTML === localStorage.getItem('username')) {
              this.isOwner = true
            }
            for (let category of this.project.categories) {
              if (category.allowShopfront === false) {
                this.allowShopFront = false
                break
              } else {

              }

            }
          })
          .catch((error) => console.error(error));


    },
    switchTabs(tab) {
      this.tab = tab

    },





  },
  mounted(emits) {
    setTimeout(() => {
      this.$refs.wrapper.scrollIntoView({behavior: 'smooth', block: 'start'})
    },20)

    this.getProducts(this.limit, this.offset)

    this.getProjectFullInfo()



    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true
    }

    // this.username = localStorage.getItem('username');

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })


  },
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

  &.bad {
    background-color: #fff3f3;
    border: 1px solid #984a5a;
    &.ok {
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

    &.active {
      opacity: 1!important;
    }
  }
}

.flex {
  width: 100%;
  box-sizing: border-box;
}



.tabs-links {
  margin-bottom: 20px;
  display: flex;

  align-items: center;
  justify-content: space-between;
  width: 100%;
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
    height: 220px;
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

  .project-header {
    display: flex;
    width: 100%;
    align-items: flex-end;

    position: relative;
    margin-top: -30px;
    flex-basis: border-box;
    flex-grow: 1;
    flex-shrink: 1;

    .left {

      width: 100%;
      display: flex;
      padding-left: 20px;
      align-items: end;

      .avatar {
        flex-basis: 110px;
        width: 110px;
        height: 110px;
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

      .name {
        margin-left: 10px;
      }
    }

    .rating {
      width: 12%;
      justify-content: end;
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      .stars {
        margin-right: 20px;

        font-family: 'Montserrat', sans-serif;
        font-size: 13px;
        font-style: normal;
        font-weight: 200;
        line-height: normal;
        color: #3e4b5b;

        .owner {
          font-size: 14px;
          font-weight: 400;
        }

        .project-rating {
          display: flex;
          justify-content: end;
          color: #000;
          font-weight: 700;
          border-radius: 5px;
          font-size: 14px;
          text-align: end;
          align-items: center;

          svg {
            width: 12px;
            height: 12px;
            margin-right: 10px;

            path {
              fill: #000;
            }
          }

          &.goodGreen {
            background-color: #10c44c;
          }
          &.green {
            background-color: #27c75c;
          }
          &.yellow {
            background-color: #73c410;
          }
          &.orange {
            background-color: #c1d770;
          }
          &.red {
            background-color: #eeb5b5;
          }
          &.badRed {
            background-color: #e58787;
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
    }
  }

  .project-body {
    padding-left: 30px;
    margin-top: 40px;
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

.name {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  top: -5px;
  word-break: break-all;

  padding: 5px 5px 0px 5px;
  border-radius: 5px;

  color: var(--secondary, #2B2B2B);
  font-family: 'Gilroy-Bold', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  width: 100%;

  input {
    width: 100%;
  }

  .verified {
    width: 17px;
    height: 17px;

  }
}

.tabs-body {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  .tab-content {
    width: 100%;
  }


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
    width: 100%;
    display: flex;
    gap: 5%;
    flex-wrap: wrap;
    justify-content: start;

    .shop-view {
      width: 28%
    }
  }
  .card {

  }
}

.tab-stats {
  background-color: #fff;
  width: fit-content;
  border-radius: 15px;
  padding: 10px 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 30px 20px;

  .stat {
    color: var(--86868B, #494A4E);
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
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
        fill: #0a58ca;
      }
    }
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
      padding: 0;
    }
    .project-banner {
      max-height: 80px;
      .owner {
        p {
          font-size: 10px;
        }
      }
    }
    .project-header {
      margin-top: -5px;
      .left {
        .avatar {

          height: 80px;
          flex-basis: 80px;
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
  .tabs-links {
    flex-wrap: wrap;
    justify-content: start;
    width: fit-content;


    .left {
      order: 2;
      flex-wrap: nowrap;
      display: flex;
      width: 94vw;
      box-sizing: border-box;
      overflow: scroll;
      margin-bottom: 5px;

    }
    button {
      font-size: 12px;
      word-wrap: normal;
    }
    .back {
      order: 1;
      margin-bottom: 10px;
    }
  }
  .name {
    font-size: 16px;
  }
  .project {
    .project-header {
      flex-wrap: wrap;
      .rating {
        position: absolute;
        margin-left: 20px;

        justify-content: start;
        width: 100%;
      }
    }
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

</style>