<template>

    <div class="project"
         :class="{
      paid: $props.project.payed,
    }"
    >


      <div class="avatar">


        <figure class="cover">
          <img :src="'http://62.113.96.171:3000/' + $props.project.avatarFilePath"
               alt="" class="can-be-hovered"
               v-if="$props.project.avatarFilePath !== ''"
               v-on:click="$router.push('/project/' +$props.project.id)">

          <img src="/src/assets/images/avatar.webp"
               alt="" class="can-be-hovered"
               v-else
               v-on:click="$router.push('/project/' + $props.project.id)">
        </figure>




        <<div class="favorite"
              v-if="this.isFavourite === false && this.isLogin === true"
              v-on:click="() => {
               addFavorite($props.project.id)
               this.isFavourite = true
             }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#00192E" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278M7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.5 21.5 0 0 0 12 19.91a21.6 21.6 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5" clip-rule="evenodd"></path><path fill="white" fill-rule="evenodd" d="M12 22c-.285-.018-.512-.123-.764-.24l-.084-.038a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568q.3-.418.666-.78A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278m0-17.959A7.18 7.18 0 0 1 17 2a7 7 0 0 1 7 7c0 4.897-3.061 8.41-5.75 10.562a24.6 24.6 0 0 1-4.989 3.07c-.566.258-.92.368-1.261.368h-.032l-.033-.002c-.484-.032-.881-.218-1.12-.33l-.077-.036a24.5 24.5 0 0 1-4.991-3.07C3.056 17.408 0 13.895 0 9a7 7 0 0 1 7-7c1.918 0 3.701.776 5 2.041M3 9a4 4 0 0 1 4-4c1.957 0 3.652 1.396 4.02 3.2a1 1 0 0 0 1.96 0C13.348 6.396 15.043 5 17 5a4 4 0 0 1 4 4c0 3.552-2.22 6.295-4.625 8.22A21.6 21.6 0 0 1 12 19.91a21.5 21.5 0 0 1-4.377-2.69C5.217 15.295 3 12.551 3 9" clip-rule="evenodd"></path></svg>
      </div>

        <div class="favorite"
             v-else-if="this.isFavourite === true && this.isLogin === true"
             v-on:click="() => {
               deleteFavorite($props.project.id)
               this.isFavourite = false
             }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#F8104B" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278" clip-rule="evenodd"></path></svg>
        </div>
        <div class="mobileRating can-be-hovered" v-on:click="$router.push('/project/' + $props.project.id)">

          <div class="stars">
            <div class="project-rating">

                <span class="number"
                      v-if="$props.project.ratingAvg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" ><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
                  {{ $props.project.ratingAvg }}
                </span>
              <span class="text" v-else title="Проект пока не имеет оценок, но это не значит что он плохой или хороший.">
                  Нет оценок
                </span>

            </div>


          </div>

        </div>
      </div>
      <div class="project-body" v-on:click="$router.push('/project/' + $props.project.id)">
        <div class="project-top">
          <div class="name can-be-hovered">
            {{ $props.project.name }}



            <!--            <img src="./../../assets/images/verified.webp"-->
            <!--                 class="verified"-->
            <!--                 title="Проверенный магазин">-->

          </div>

          <div class="rating can-be-hovered" v-on:click="$router.push('/project/' + $props.project.id)">

            <div class="stars">
              <div class="project-rating">

                <span class="number"
                      v-if="$props.project.ratingAvg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" ><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>
                  {{ $props.project.ratingAvg }}
                </span>
                <span class="text" v-else title="Проект пока не имеет оценок, но это не значит что он плохой или хороший.">
                  Нет оценок
                </span>

              </div>


            </div>

          </div>

        </div>

        <div class="project-description can-be-hovered" v-on:click="$router.push('/project/' + $props.project.id)">
          <p v-if="$props.project.description.length < 190">
            {{ $props.project.description }}
          </p>
          <p v-else>
            {{ $props.project.description.substring(0,190)+"..." }}
          </p>
        </div>
        <div class="project-bottom">
          <div class="stats">
            <div class="testimonials can-be-hovered">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21" fill="none">
                <path d="M7.90289 18.3997C7.94974 18.3308 7.98652 18.2805 8.01942 18.2278C8.82354 16.944 9.62997 15.6618 10.4283 14.3745C10.5773 14.1341 10.7748 14.0323 11.0516 14.0326C13.4322 14.0357 15.8132 14.0388 18.1937 14.0326C19.7052 14.0288 20.9812 13.0744 21.3893 11.6397C21.4729 11.3458 21.5221 11.0322 21.5248 10.7272C21.5383 9.23701 21.5333 7.74648 21.5306 6.25595C21.5275 4.59236 20.2348 3.15836 18.5844 2.98569C18.3989 2.96633 18.2115 2.95549 18.0249 2.95549C14.7926 2.95356 11.5603 2.95472 8.3276 2.95201C8.21455 2.95201 8.09221 2.93962 7.99039 2.89626C7.76545 2.80025 7.64544 2.53582 7.6977 2.30314C7.75771 2.03678 7.94548 1.87457 8.21106 1.86141C8.26256 1.8587 8.31443 1.85986 8.36592 1.85986C11.6242 1.85986 14.8824 1.87767 18.1403 1.85328C20.205 1.83779 22.054 3.25515 22.5159 5.28382C22.5728 5.53353 22.6158 5.79214 22.6177 6.04689C22.6282 7.64698 22.6444 9.24707 22.622 10.8468C22.5964 12.6939 21.3707 14.3257 19.6123 14.9153C19.157 15.0679 18.6885 15.1465 18.2084 15.1465C15.9761 15.1472 13.7438 15.15 11.5115 15.1422C11.311 15.1414 11.2072 15.2076 11.1039 15.3753C10.2088 16.8232 9.30205 18.2642 8.40115 19.7087C8.29159 19.8844 8.16577 20.0335 7.94625 20.0629C7.68144 20.0985 7.48671 19.9859 7.34075 19.711C6.82971 18.7489 6.32061 17.7861 5.81034 16.8236C5.49017 16.22 5.17193 15.6153 4.84595 15.0148C4.81033 14.949 4.7391 14.8863 4.6698 14.8577C3.14985 14.2247 2.22378 13.1015 1.88425 11.4933C1.85134 11.3365 1.83121 11.1743 1.83005 11.014C1.82308 9.96253 1.82153 8.91064 1.82153 7.85914C1.82153 7.61601 1.952 7.42205 2.16416 7.34849C2.38135 7.27299 2.60164 7.29003 2.74915 7.47393C2.83819 7.58504 2.90594 7.74764 2.90788 7.88856C2.92181 8.7852 2.91446 9.68223 2.91523 10.5789C2.91601 12.179 3.79252 13.3884 5.30782 13.9122C5.45029 13.9614 5.59935 14.0926 5.67174 14.2258C6.39688 15.5627 7.10652 16.908 7.82043 18.251C7.84366 18.2948 7.86805 18.3374 7.90251 18.3993L7.90289 18.3997Z" fill="#2B2B2B"/>
                <path d="M1.24268 2.38211C1.54582 2.38211 1.84896 2.37708 2.1521 2.38405C2.33561 2.38831 2.43433 2.31088 2.48892 2.13588C2.66546 1.57103 2.85323 1.00966 3.03364 0.445972C3.08126 0.296532 3.1374 0.161804 3.32594 0.165288C3.50519 0.168773 3.55513 0.303888 3.60043 0.443262C3.78084 0.999985 3.96899 1.55438 4.13973 2.1142C4.20128 2.3163 4.31201 2.38869 4.51797 2.3856C5.10489 2.37669 5.69181 2.38366 6.27873 2.38211C6.42934 2.38172 6.57181 2.40069 6.6233 2.5664C6.67363 2.72784 6.58032 2.82888 6.4545 2.91909C5.97714 3.25978 5.50676 3.61054 5.02785 3.9493C4.86021 4.06776 4.81414 4.19707 4.88151 4.39529C5.07392 4.9617 5.2493 5.53352 5.43707 6.10147C5.48159 6.23658 5.48895 6.35544 5.36816 6.45029C5.2373 6.55288 5.11922 6.50604 4.99959 6.41815C4.52146 6.06701 4.03752 5.72399 3.56287 5.36859C3.39253 5.24083 3.25238 5.23464 3.07777 5.36588C2.60932 5.71857 2.12964 6.05694 1.65577 6.40267C1.53498 6.49094 1.41535 6.56372 1.27133 6.45377C1.12963 6.34576 1.16331 6.20909 1.20939 6.06817C1.39173 5.51184 1.56789 4.95356 1.75566 4.39917C1.82147 4.2052 1.78469 4.07396 1.61202 3.95317C1.12654 3.61248 0.652663 3.25552 0.170274 2.91096C0.0405785 2.81843 -0.0364644 2.71042 0.0173495 2.55285C0.0672919 2.40689 0.1966 2.38443 0.333651 2.38521C0.63679 2.38676 0.939929 2.3856 1.24307 2.3856V2.38327L1.24268 2.38211Z" fill="#2B2B2B"/>
                <path d="M14.8851 8.41039C13.7055 8.41039 12.5258 8.41117 11.3462 8.40962C11.0597 8.40962 10.8533 8.24276 10.7902 7.96981C10.7345 7.72901 10.858 7.46962 11.0965 7.36509C11.1875 7.32521 11.2959 7.31011 11.3961 7.31011C13.7167 7.30701 16.0373 7.30701 18.3583 7.30895C18.7051 7.30895 18.9374 7.4882 18.9781 7.76927C19.018 8.04647 18.8615 8.30276 18.5944 8.38407C18.5224 8.40613 18.4426 8.40884 18.3664 8.40923C17.2061 8.41078 16.0458 8.41039 14.8855 8.41039H14.8851Z" fill="#2B2B2B"/>
                <path d="M12.2319 10.4158C12.8634 10.4158 13.4944 10.4143 14.1259 10.4166C14.4728 10.4178 14.7217 10.6555 14.7143 10.9702C14.7066 11.2811 14.4627 11.5095 14.1298 11.5099C12.8607 11.5111 11.592 11.5115 10.3229 11.5099C9.98105 11.5099 9.7294 11.2684 9.73521 10.954C9.74101 10.64 9.97717 10.4186 10.319 10.417C10.9567 10.4143 11.5943 10.4162 12.2323 10.4162L12.2319 10.4158Z" fill="#2B2B2B"/>
                <path d="M7.94503 8.4104C7.46806 8.4104 6.99109 8.41157 6.51412 8.41002C6.17575 8.40886 5.93881 8.18779 5.93262 7.87227C5.92643 7.55248 6.15097 7.31399 6.49089 7.31167C7.46419 7.30509 8.43748 7.30509 9.41078 7.31051C9.74992 7.31245 9.99228 7.55325 9.99034 7.85872C9.98841 8.1754 9.73753 8.40924 9.39568 8.4104C8.91213 8.41157 8.42858 8.4104 7.94542 8.4104H7.94503Z" fill="#2B2B2B"/>
                <path d="M7.29969 10.4151C7.69923 10.4151 8.09915 10.412 8.49869 10.4158C8.83861 10.4193 9.07013 10.645 9.06935 10.9625C9.06819 11.2811 8.83435 11.5084 8.49792 11.5091C7.69226 11.5111 6.88621 11.5111 6.08055 11.5091C5.74721 11.5084 5.50796 11.2765 5.50757 10.9617C5.50757 10.6458 5.74257 10.4185 6.08133 10.4158C6.48745 10.4123 6.89357 10.4151 7.29969 10.4151Z" fill="#2B2B2B"/>
                <path d="M17.5858 10.4151C17.9532 10.4151 18.321 10.4124 18.6884 10.4159C19.0349 10.4194 19.2583 10.6358 19.2587 10.9602C19.2587 11.2866 19.0341 11.5084 18.6919 11.5092C17.9567 11.5115 17.2219 11.5111 16.4867 11.5092C16.1468 11.5084 15.9172 11.2854 15.916 10.9629C15.9145 10.6416 16.1406 10.4198 16.4832 10.4155C16.8506 10.4112 17.2184 10.4143 17.5858 10.4147V10.4151Z" fill="#2B2B2B"/>
              </svg>
              <span> <span class="descr">Отзывов: </span>{{ $props.project.reviewsCount || 0 }}</span>
            </div>
            <div class="views can-be-hovered">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="11" viewBox="0 0 20 11" fill="none">
                <path d="M0 5.5522C5.36282 -1.78782 14.5224 -1.91065 20 5.54408C17.4576 8.73988 14.3273 10.9954 10.0053 11C5.67922 11.0041 2.55604 8.73235 0 5.55277V5.5522ZM10.0195 9.10372C12.0303 9.09387 13.6915 7.46063 13.6886 5.49716C13.6862 3.54005 12.0149 1.89291 10.0207 1.8819C7.99811 1.87089 6.29192 3.55164 6.31557 5.53192C6.33923 7.5064 8.0058 9.11357 10.0195 9.10372ZM1.48264 5.49889C2.94518 7.21151 4.67739 8.49191 6.86262 9.16861C5.82057 8.14777 5.21497 6.95716 5.20788 5.50816C5.20078 4.06554 5.81702 2.88189 6.81176 1.83613C4.6632 2.54122 2.92211 3.77759 1.48264 5.49831V5.49889ZM18.502 5.5267C17.1903 3.79671 14.4674 1.94563 13.1817 1.8958C15.3877 4.44328 15.3794 6.27119 13.0682 9.25436C15.3232 8.49075 17.0554 7.20977 18.502 5.5267Z" fill="#2B2B2B"/>
                <path d="M9.85082 4.00324C10.8514 3.96266 11.5608 4.30421 11.879 4.95173C12.1707 5.54545 11.9218 6.24541 11.2733 6.65171C10.6036 7.07123 9.62661 7.11638 8.88706 6.76206C8.12098 6.39452 7.8377 5.78348 8.08964 5.03974C9.41204 5.29875 9.91713 5.01329 9.85022 4.00324H9.85082Z" fill="#2B2B2B"/>
              </svg>
              <span> <span class="descr">Просмотров: </span>{{ $props.project.viewCount === null ? 0 : $props.project.viewCount }} </span>
            </div>
            <!--            <div class="date can-be-hovered"  title="Дата создания" v-on:click="$router.push('/project/' + projectId)">-->
            <!--              {{ new Date($props.projectCreateDate).toLocaleString('ru-ru', { day: '2-digit', month: 'short', year: 'numeric' }) }}-->
            <!--            </div>-->



          </div>



          <div class="links"  >
            <div class="category" v-for="category of $props.project.categories" v-if="this.$route.path === '/'">
              {{ category.name }}
            </div>
            <div class="admin-menu-toggler" v-on:click.stop @click="($event) => {
              this.adminDropDownShow = !this.adminDropDownShow
              $event.target.scrollIntoView({ behavior: 'smooth', block: 'center'})
              closeOnEsc();
            }"
                 v-if="this.isAdmin === true"
                 :class="{ active: this.adminDropDownShow === true }">
              <span class="burger"></span>
              <span class="burger"></span>
              <span class="burger"></span>

              <div class="admin-menu" v-if="this.adminDropDownShow === true"
                   ref="dropdown">
                <button class="btn btn-approve" v-on:click="showModalApprove = true" v-if="$props.project.isReviewed === false">
                  <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>
                  Одобрить

                </button>
                <button class="btn btn-default" v-on:click="() => {
                  this.counter++


                  if ($props.project.payed === true) {
                    updateProjectPayedStatus($props.project.id, false)
                    this.adminDropDownShow = !this.adminDropDownShow
                  } else {
                    updateProjectPayedStatus($props.project.id, true)
                    this.adminDropDownShow = !this.adminDropDownShow


                  }

                }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
                    <path d="M5.11179 17.16V0.23999H6.26379V17.16H5.11179ZM5.56179 15.144C4.60179 15.144 3.68379 15 2.80779 14.712C1.93179 14.412 1.24179 14.028 0.737793 13.56L1.40379 12.156C1.88379 12.576 2.49579 12.924 3.23979 13.2C3.98379 13.476 4.75779 13.614 5.56179 13.614C6.29379 13.614 6.88779 13.53 7.34379 13.362C7.79979 13.194 8.13579 12.966 8.35179 12.678C8.56779 12.378 8.67579 12.042 8.67579 11.67C8.67579 11.238 8.53179 10.89 8.24379 10.626C7.96779 10.362 7.60179 10.152 7.14579 9.99599C6.70179 9.82799 6.20979 9.68399 5.66979 9.56399C5.12979 9.44399 4.58379 9.30599 4.03179 9.14999C3.49179 8.98199 2.99379 8.77199 2.53779 8.51999C2.09379 8.26799 1.73379 7.93199 1.45779 7.51199C1.18179 7.07999 1.04379 6.52799 1.04379 5.85599C1.04379 5.20799 1.21179 4.61399 1.54779 4.07399C1.89579 3.52199 2.42379 3.08399 3.13179 2.75999C3.85179 2.42399 4.76379 2.25599 5.86779 2.25599C6.59979 2.25599 7.32579 2.35199 8.04579 2.54399C8.76579 2.73599 9.38979 3.01199 9.91779 3.37199L9.32379 4.81199C8.78379 4.45199 8.21379 4.19399 7.61379 4.03799C7.01379 3.86999 6.43179 3.78599 5.86779 3.78599C5.15979 3.78599 4.57779 3.87599 4.12179 4.05599C3.66579 4.23599 3.32979 4.47599 3.11379 4.77599C2.90979 5.07599 2.80779 5.41199 2.80779 5.78399C2.80779 6.22799 2.94579 6.58199 3.22179 6.84599C3.50979 7.10999 3.87579 7.31999 4.31979 7.47599C4.77579 7.63199 5.27379 7.77599 5.81379 7.90799C6.35379 8.02799 6.89379 8.16599 7.43379 8.32199C7.98579 8.47799 8.48379 8.68199 8.92779 8.93399C9.38379 9.18599 9.74979 9.52199 10.0258 9.94199C10.3018 10.362 10.4398 10.902 10.4398 11.562C10.4398 12.198 10.2658 12.792 9.91779 13.344C9.56979 13.884 9.02979 14.322 8.29779 14.658C7.57779 14.982 6.66579 15.144 5.56179 15.144Z" fill="transparent"/>
                  </svg>
                  <span class="text" v-if="$props.project.payed === false">
                    Сделать платным</span>
                  <span class="text" v-else>
                    Сделать бесплатным</span>
                </button>
                <button class="btn btn-delete" v-on:click="showModalDelete = true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                    <path d="M14.3066 10.5404C14.3066 11.9891 14.3153 13.4375 14.3039 14.8862C14.2936 16.1901 13.6839 17.1536 12.5161 17.7756C12.0391 18.0298 11.517 18.1295 10.9784 18.1303C8.71443 18.1341 6.45046 18.1469 4.18689 18.1264C2.73366 18.1133 1.69388 17.4252 1.0885 16.1337C0.912373 15.7578 0.853533 15.3464 0.853928 14.9299C0.854717 11.9041 0.859851 8.878 0.849189 5.85224C0.847214 5.26656 1.28595 4.90264 1.80919 4.96677C2.1575 5.00926 2.48526 5.32683 2.50777 5.6726C2.5133 5.75604 2.51014 5.83988 2.51014 5.92371C2.51014 8.87877 2.51922 11.8338 2.50501 14.7889C2.50027 15.7489 3.24584 16.5096 4.25087 16.5003C6.46823 16.4795 8.68639 16.4787 10.9042 16.5003C11.9171 16.5104 12.6615 15.7458 12.6563 14.7746C12.6397 11.7875 12.65 8.79996 12.6504 5.81284C12.6504 5.25729 13.0382 4.91461 13.6021 4.96831C13.9248 4.99883 14.2265 5.26424 14.281 5.57833C14.3027 5.70428 14.3054 5.83447 14.3054 5.96273C14.307 7.48875 14.3066 9.01437 14.3062 10.5404H14.3066Z" fill="#494A4E"/>
                    <path d="M7.58574 4.10691C5.35494 4.10691 3.12415 4.10691 0.893745 4.10691C0.435265 4.10691 0.177395 3.92263 0.0316763 3.49418C-0.102195 3.10128 0.205828 2.58746 0.625212 2.51483C0.747237 2.49358 0.873605 2.48817 0.998394 2.48779C1.98525 2.48586 2.9725 2.48161 3.95936 2.49049C4.15918 2.49242 4.22276 2.43254 4.21723 2.23744C4.20459 1.78698 4.21052 1.33613 4.21447 0.885667C4.21921 0.358323 4.55764 0.00830615 5.09747 0.00560182C6.74894 -0.00212483 8.40081 -0.00135216 10.0523 0.00482915C10.6032 0.00676082 10.9424 0.35446 10.9471 0.89378C10.9507 1.34424 10.9554 1.79509 10.9448 2.24556C10.9404 2.42945 10.9989 2.49126 11.1908 2.4901C12.2041 2.48238 13.2174 2.48701 14.2307 2.48624C14.4732 2.48624 14.7003 2.5214 14.8855 2.69641C15.1627 2.95834 15.2306 3.26779 15.0821 3.62979C14.9621 3.92147 14.671 4.10613 14.3176 4.10652C12.0738 4.10729 9.82996 4.10691 7.58613 4.10691H7.58574ZM7.59995 1.64017C7.09329 1.64017 6.58624 1.64365 6.07958 1.63786C5.94334 1.63631 5.88766 1.6819 5.89319 1.81596C5.8999 1.97667 5.89635 2.13777 5.89438 2.29887C5.8928 2.42366 5.93979 2.48817 6.07958 2.48779C7.07987 2.48508 8.08055 2.48508 9.08083 2.48779C9.22063 2.48817 9.26762 2.42366 9.26604 2.29887C9.26406 2.14434 9.25893 1.98942 9.26801 1.83527C9.2771 1.68306 9.2147 1.63477 9.06109 1.63708C8.57417 1.64481 8.08687 1.63979 7.59995 1.63979V1.64017Z" fill="#494A4E"/>
                    <path d="M8.42743 10.3022C8.42743 9.34373 8.42545 8.38485 8.42861 7.42636C8.4298 7.0493 8.68925 6.7186 9.03242 6.63979C9.46088 6.54127 9.83091 6.69001 10.0098 7.05587C10.0667 7.17254 10.09 7.31587 10.0904 7.44722C10.0955 9.34527 10.0904 11.2429 10.0959 13.141C10.0975 13.6822 9.70572 13.9975 9.26264 14.0044C8.78126 14.0118 8.42901 13.6359 8.42782 13.1205C8.42585 12.1813 8.42743 11.2418 8.42743 10.3026V10.3022Z" fill="#494A4E"/>
                    <path d="M6.73258 10.3095C6.73258 11.268 6.73495 12.2268 6.731 13.1853C6.72982 13.5234 6.50986 13.8375 6.21842 13.9441C5.85511 14.0766 5.50207 13.9897 5.25289 13.7096C5.08979 13.5265 5.0661 13.3066 5.0661 13.0779C5.06689 11.2251 5.0661 9.37222 5.0665 7.51937C5.0665 7.48731 5.0665 7.45486 5.06729 7.42279C5.08269 6.93601 5.4227 6.60377 5.90013 6.60995C6.37559 6.61613 6.72863 6.95881 6.7314 7.434C6.73614 8.39249 6.73298 9.35136 6.73258 10.3099V10.3095Z" fill="#494A4E"/>
                  </svg>
                  Удалить
                </button>
              </div>
            </div>


          </div>
        </div>
        <div class="advanced-fields" v-if="$props.project.type === 'exchanger'">
          <div class="stat">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 332.02 345"><path d="M331.96,56.65c-.83-17.38-10.77-29.29-24.33-38.62-15.59-10.72-33.29-15.55-51.92-18.03h-26.97c-16.86,2.27-32.92,6.57-47.72,15.18-13.02,7.57-22.18,18.41-28.03,32.12-.94,2.21-1.19,4.85-1.2,7.29-.09,20.99-.05,41.98-.05,62.97,0,1.93,0,3.86,0,5.03-11.57-3.74-22.65-8.59-34.23-10.83-34.21-6.6-66.97-3.13-96.27,17.72-9.65,6.86-16.06,16.33-20.18,27.29-.96,2.56-.99,5.57-.99,8.37C0,204.96,.1,244.77,0,284.59c-.05,19.33,10.08,32.57,25.22,42.73,14.96,10.05,31.78,14.95,49.58,16.82,1.28,.13,2.53,.56,3.79,.86h23c8.6-1.69,17.34-2.91,25.78-5.18,15.86-4.27,30.04-11.71,41.09-24.26,7.55-8.57,11.6-18.54,11.76-30.01,.04-2.76,0-5.52,0-8.21,9.46,3.48,18.08,7.57,27.17,9.82,31.92,7.92,63.15,6.12,92.68-9.41,14.25-7.5,25.57-18.14,29.92-34.39,1.14-4.27,1.47-8.87,1.47-13.32,.09-52.31,.04-104.62,.07-156.93,0-5.49,.68-11,.42-16.46ZM32.96,154.41c9.51-9.93,21.92-14.32,34.97-16.81,8.13-1.55,16.48-1.98,20.71-2.46,20.6,.87,36.51,3.73,50.78,12.69,1.97,1.23,3.69,2.85,5.63,4.12,9.45,6.18,9.13,23.92-.11,30.82-10.89,8.13-22.97,12.51-36.12,14.65-20.33,3.31-40.26,1.92-59.19-6.49-5.96-2.65-11.73-6.49-16.48-10.96-8.32-7.84-8.12-17.29-.19-25.56Zm-6.29,70.52c.18-4.8,.04-9.62,.04-15.03,41.71,21.17,82.86,21.5,124.82,1.35,0,7.8,.47,15.53-.25,23.14-.25,2.69-3.08,5.44-5.3,7.57-7.88,7.59-17.65,11.76-28.12,14.28-25.42,6.11-50.16,4.57-73.73-7.43-3.8-1.93-7.3-4.64-10.52-7.47-4.87-4.27-7.18-9.81-6.93-16.42Zm108.68,82.94c-28.68,14.46-58.59,14.19-87.85,1.39-18.4-8.05-22.7-17.61-19.94-38.79,19.74,11.59,40.8,16.27,62.98,16.19,21.96-.08,42.91-4.48,62.16-15.88,2.2,18.92,2.22,27.21-17.36,37.08ZM184.26,46.63c4.27-4.46,9.52-8.65,15.15-11.04,30.41-12.9,60.74-12.83,90.45,2.49,3.19,1.65,5.98,4.19,8.73,6.57,8.69,7.51,8.27,20.33-.34,28.01-8.97,8-19.59,12.56-31.11,14.9-8.27,1.68-16.76,2.25-25.15,3.31-16.16-.53-31.61-3.27-45.76-11.14-4.29-2.39-8.39-5.53-11.76-9.11-7.31-7.77-7.56-16.33-.22-24Zm104.95,206.81c-18.24,10.6-38.23,13.35-58.78,10.88-9.77-1.17-19.27-4.6-28.88-7.09-1.26-.33-2.43-1.06-3.61-1.67-16.07-8.23-19.96-15.94-17.21-34.15,41.28,19.87,82.42,19.8,123.41-.88,2.7,16.07-1.07,24.85-14.93,32.9Zm-3.55-53.76c-28.67,13.45-57.83,13.17-86.85,.62-2.72-1.18-5.29-2.81-7.75-4.49-7.22-4.94-12.46-10.86-10.85-20.65,.63-3.86,.1-7.91,.1-12.85,20.18,11.44,41.01,15.76,62.75,15.56,21.53-.2,42.14-4.67,61.01-15.91,3.21,19.64-1.14,29.63-18.4,37.73Zm-3.13-57.04c-27.9,11.41-56.1,11.16-83.77-1.32-4.32-1.95-8.31-4.92-11.95-8.01-5.57-4.72-8.68-10.77-8.15-18.43,.31-4.46,.06-8.96,.06-13.97,42.15,21.37,83.76,21.39,125.5,1.12,4.09,20.33-1.74,32.47-21.67,40.62Z"/></svg>
            <span class="descr">Резерв: </span>
            {{ $props.project.reserve }}$
          </div>

          <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
              <path d="M5.11204 17.16V0.23999H6.26404V17.16H5.11204ZM5.56204 15.144C4.60204 15.144 3.68404 15 2.80804 14.712C1.93204 14.412 1.24204 14.028 0.738037 13.56L1.40404 12.156C1.88404 12.576 2.49604 12.924 3.24004 13.2C3.98404 13.476 4.75804 13.614 5.56204 13.614C6.29404 13.614 6.88804 13.53 7.34404 13.362C7.80004 13.194 8.13604 12.966 8.35204 12.678C8.56804 12.378 8.67604 12.042 8.67604 11.67C8.67604 11.238 8.53204 10.89 8.24404 10.626C7.96804 10.362 7.60204 10.152 7.14604 9.99599C6.70204 9.82799 6.21004 9.68399 5.67004 9.56399C5.13004 9.44399 4.58404 9.30599 4.03204 9.14999C3.49204 8.98199 2.99404 8.77199 2.53804 8.51999C2.09404 8.26799 1.73404 7.93199 1.45804 7.51199C1.18204 7.07999 1.04404 6.52799 1.04404 5.85599C1.04404 5.20799 1.21204 4.61399 1.54804 4.07399C1.89604 3.52199 2.42404 3.08399 3.13204 2.75999C3.85204 2.42399 4.76404 2.25599 5.86804 2.25599C6.60004 2.25599 7.32604 2.35199 8.04604 2.54399C8.76604 2.73599 9.39004 3.01199 9.91804 3.37199L9.32404 4.81199C8.78404 4.45199 8.21404 4.19399 7.61404 4.03799C7.01404 3.86999 6.43204 3.78599 5.86804 3.78599C5.16004 3.78599 4.57804 3.87599 4.12204 4.05599C3.66604 4.23599 3.33004 4.47599 3.11404 4.77599C2.91004 5.07599 2.80804 5.41199 2.80804 5.78399C2.80804 6.22799 2.94604 6.58199 3.22204 6.84599C3.51004 7.10999 3.87604 7.31999 4.32004 7.47599C4.77604 7.63199 5.27404 7.77599 5.81404 7.90799C6.35404 8.02799 6.89404 8.16599 7.43404 8.32199C7.98604 8.47799 8.48404 8.68199 8.92804 8.93399C9.38404 9.18599 9.75004 9.52199 10.026 9.94199C10.302 10.362 10.44 10.902 10.44 11.562C10.44 12.198 10.266 12.792 9.91804 13.344C9.57004 13.884 9.03004 14.322 8.29804 14.658C7.57804 14.982 6.66604 15.144 5.56204 15.144Z" fill="transparent"/>
            </svg>
            <span class="descr">Курс: </span>
            {{ $props.project.exchangeRate }}$
          </div>

          <div class="stat">
            <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 222.87 270.23"><path d="M166.56,52.77c-8.26-8.17-16.51-16.36-24.8-24.5-5.17-5.08-6.66-11.15-4.18-17.82,4.29-11.56,18.15-14.01,27.34-4.9,14.55,14.43,29,28.97,43.48,43.46,3.18,3.18,6.46,6.28,9.5,9.59,6.67,7.27,6.67,16.22-.27,23.23-17.59,17.76-35.25,35.44-53.02,53.02-7.2,7.12-16.99,7.09-23.63,.35-6.3-6.39-6.05-16.22,.82-23.28,6.97-7.17,14.13-14.16,21.19-21.24,1.15-1.15,2.22-2.37,4.21-4.52-2.86,0-4.59,0-6.32,0-77.5,0-64.99,0-142.49,0-9.42,0-15.05-3.61-17.51-11.08-3.51-10.68,4.03-21.08,15.66-21.16,20.5-.15,41-.06,61.5-.05,58.33,0,26.66,0,85,.01,.98,0,1.95,0,2.93,0,.2-.37,.41-.74,.61-1.11Z"/><path d="M56.31,217.46c8.26,8.17,16.51,16.36,24.8,24.5,5.17,5.08,6.66,11.15,4.18,17.82-4.29,11.56-18.15,14.01-27.34,4.9-14.55-14.43-29-28.97-43.48-43.46-3.18-3.18-6.46-6.28-9.5-9.59-6.67-7.27-6.67-16.22,.27-23.23,17.59-17.76,35.25-35.44,53.02-53.02,7.2-7.12,16.99-7.09,23.63-.35,6.3,6.39,6.05,16.22-.82,23.28-6.97,7.17-14.13,14.16-21.19,21.24-1.15,1.15-2.22,2.37-4.21,4.52,2.86,0,4.59,0,6.32,0,77.5,0,64.99,0,142.49,0,9.42,0,15.05,3.61,17.51,11.08,3.51,10.68-4.03,21.08-15.66,21.16-20.5,.15-41,.06-61.5,.05-58.33,0-26.66,0-85-.01-.98,0-1.95,0-2.93,0-.2,.37-.41,.74-.61,1.11Z"/></svg>
            <span class="descr">Мин. обмен: </span>
            {{ $props.project.minValueToExchange }}$
          </div>
        </div>
      </div>

    </div>



  <modal-window-backdrop
      v-if="showModalDelete === true"
      v-on:changeModal="(emitShowModal) => {this.showModalDelete = emitShowModal}"
      v-bind:icon-type="'warning'"
      v-bind:heading="'Удалить проект: ' + $props.project.name"
      v-bind:description="'Это действие безвозвратно удалит данную категорию, подтвердить?'"
      v-bind:descriptionType="'text'"
      v-bind:confirmAction="true"
      v-on:confirmAction="(emitConfirmAction) => {

                if (emitConfirmAction === true) {
                  deleteProject($props.project.id)

                  showModalDelete === false
                }
                showModalDelete === false
              }"

  >

  </modal-window-backdrop>

  <modal-window-backdrop
      v-if="showModalApprove === true"
      v-on:changeModal="(emitShowModal) => {this.showModalApprove = emitShowModal}"
      v-bind:icon-type="'ok'"
      v-bind:heading="'Вы собираетесь опубликовать проект: ' + $props.project.name"
      v-bind:description="'Вы действительно хотите это сделать? Проект появится в результатах выдачи.'"
      v-bind:descriptionType="'textApprove'"
      v-bind:confirmAction="true"
      v-on:confirmAction="(emitConfirmAction) => {
                showModalApprove === false
                if (emitConfirmAction === true) {
                  updateProject($props.project.id)
                  this.$emit('projectUpdated', counter)

                }
              }"

  >

  </modal-window-backdrop>


</template>

<script>
import ProjectsView from "../../pages/ProjectDetailed.vue";
import modalWindowBackdrop from "../Page Parts/Modal.vue";
import { onClickOutside } from '@vueuse/core'
import { ref } from "vue";
import config from "../../../assets/js/config.js";

export default {
  name: "ProjectCard.vue",
  components: { ProjectsView, modalWindowBackdrop },
  props: ['project', 'fadeAnimate', 'favorite'],
  emits: ['updated'],

  setup(props, emits) {

    const dropdown = ref(null);

    return {
      dropdown
    }

  },

  data () {
    return {
      favorite: false,
      isAdmin: false,
      showModalDelete: this.$emit.showModalDelete,
      showModalApprove: this.$emit.showModalApprove,
      reviewsLength: 0,
      adminDropDownShow: false,
      counter: 0,
      isLogin: false,
      reviewsCount: 0,
      isFavourite: false


    }
  },
  updated() {

    // onClickOutside(this.$refs.dropdown, event => this.adminDropDownShow = false)
  },
  mounted() {
    this.checkIsAdmin()
    this.$props.project.favorite === 1 || this.$props.favorite === true ? this.isFavourite = true : this.isFavourite = false

    localStorage.getItem('token') === null ? this.isLogin = false : this.isLogin = true
  },
  methods: {

    checkIsAdmin () {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')
      if (role === 'admin' && token !== '') {
        this.isAdmin = true
      } else {
      }
    },

    addFavorite(projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`http://62.113.96.171:3000/user/project/${projectId}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(
            {
              status: 'favorite'
            }
        )
      })
          .then((response) => response.json())
          .then((res) => { res })
          .catch((error) => {console.error(error)});
    },

    deleteFavorite(projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`http://62.113.96.171:3000/user/project/${projectId}`, {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify(
            {
              status: 'favorite'
            }
        )
      })
          .then((response) => response.json())
          .then((res) => {
            this.$emit('favoriteRemoved', projectId)
            this.isFavourite = false
          })
          .catch((error) => {console.error(error)});
    },
    closeOnEsc() {

      document.addEventListener('keydown', (e) => {
        e.key === 'Escape' ? this.adminDropDownShow = false : this.adminDropDownShow = true
      })
      document.addEventListener('click', (e) => {
        this.adminDropDownShow = false
      })



    },

    deleteProject(projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`http://62.113.96.171:3000/projects/${projectId}`, {
        method: "DELETE",
        headers: myHeaders,
      })
          .then((response) => response.json())
          .then(() => {
            this.$emit('updated', this.counter)
          })
          .catch((error) => {console.error(error)});
    },


    updateProject (projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      myHeaders.append("Content-Type", "application/json");

      fetch(`http://62.113.96.171:3000/projects/${projectId}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          isReviewed: true
        })
      })
          .then((response) => response.json())
          .then((result) => {
            this.projects = result.projects
            this.$emit('updated', this.counter)
          })
          .catch((error) => {console.error(error)});
    },
    updateProjectPayedStatus (projectId, status) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
      myHeaders.append("Content-Type", "application/json");
      this.adminDropDownShow = false

      fetch(`${config.api.url}projects/${projectId}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          payed: status
        })
      })
          .then((response) => response.json())
          .then((result) => {

            this.projects = result.projects
            this.$emit('updated', projectId)

          })
          .catch((error) => {console.error(error)});
    }
  }
}
</script>

<style scoped lang="scss">

.admin-menu-toggler {
  cursor: pointer;
  position: relative;


  span.burger {
    width: 15px;
    height: 4px;
    border-radius: 5px;
    background-color: #c4cbfc;
    display: block;
    margin-top: 2px;
    position: relative;

    transition: .3s ease;

    &:nth-child(2) {
      margin-left: -3px;
      opacity: 1;
    }
  }
  span.text {
    opacity: 1!important;
  }

  &:hover {
    span.burger {
      color: transparent;
    }
    span.burger:nth-child(2) {
      margin-left: 0px;
    }
  }

  &.active {
    span.burger:nth-child(1) {
      transform: rotate(50grad);
      top: 6px;
    }
    span.burger:nth-child(2) {
      opacity: 0!important;
      transform: rotate(400grad);
    }
    span.burger:nth-child(3) {
      transform: rotate(-50grad);
      top: -6px;
    }
  }
}

.admin-menu {
  width: 240px;
  z-index: 20;
  position: absolute;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 10px 0;
  right: 0;
  top: 20px;
  transition: .3s ease;
}
.admin-menu {
  display: block;
  box-sizing: border-box;
  right: 0;

  .btn {
    color: gray;
    background-color: transparent;
    transition: .3s ease;
    width: 100%;
    justify-content: start;
    svg {
      path, defs {
        transition: .3s ease;
        fill: gray;
      }
    }
    &:hover {
      color: #C8716B;
      transform: translateY(0);
      svg {
        path, defs {
          fill: #C8716B;
        }
      }
    }
    &.btn-approve {
      svg {
        width: 20px;
        height: 20px;
        path, defs {
          transition: .3s ease;
          fill: gray;
        }
      }
      &:hover {
        color: #9ec86b;
        svg {
          path, defs {
            fill: #9ec86b;
          }
        }
      }
    }

    &.btn-default {
      svg {
        width: 20px;
        height: 20px;
        path, defs {
          transition: .3s ease;
          fill: gray;
        }
      }
      &:hover {
        color: transparent;
        svg {
          path, defs {
            fill: transparent;
          }
        }
      }
    }
  }
}
.can-be-hovered {
  cursor: pointer;
}

.notNormal {

}

.project {
  cursor: pointer;

  border-radius:  20px;
  position: relative;
  background-color: #fff;
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-wrap: nowrap;

  box-sizing: border-box;
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  transition:.3s ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  }

  .advanced-fields {
    display: flex;
    position: absolute;
    bottom: -45px;
    left: 20%;
    width: 60%;
    border-radius: 10px;
    background-color: #fff;
    justify-content: space-between;
    padding: 5px 20px;

    font-size: 16px;
    align-items: center;
    flex-wrap: nowrap;
    box-sizing: border-box;
    margin-bottom: 30px;
    border: 1px solid #eaeaea;
    transition: 0.3s ease;

    .stat {
      color: #818181;
      svg {
        width: 15px;
        height: 15px;
        position: relative;
        top: 3px;

        path {
          fill: #818181;
        }
      }
    }
  }


  &.paid {
    background-color: #edf1fc;
    border: 1px solid #d8e3e7;


    .advanced-fields {
      background-color: #f0f6ff;
      border: 2px solid transparent;
    }

    &:hover {
      box-shadow: 0 0 20px #a3d7fc;
    }
  }

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
      width: auto;
      margin-left: 50%;
      transform: translateX(-50%);
    }


    img {
      object-fit: cover;

    }
    .favorite {
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
  .dropdown {
    color: var(--new-dark, transparent);
    text-align: right;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px; /* 138.889% */

  }
  .project-body {
    display: flex;
    flex-wrap: wrap ;
    flex-basis: 100%;
    .project-top {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: start;


      .name {
        display: flex;
        align-items: center;
        gap: 20px;
        word-break: break-all;

        color: var(--secondary, #2B2B2B);
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        .verified {
          width: 17px;
          height: 17px;

        }
      }
      .rating {
        display: flex;
        flex-basis: 23%;
        align-items: center;
        .stars {
          width: 100%;
        }
        .rate {
          margin-right: 10px;
          color: #000;

          text-align: right;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          opacity: .6;
        }
        .stars {
          .project-rating {
            width: 100%;
            justify-content: end;
            display: flex;
            align-items: center;
            position: relative;
            top: -5px;
            svg {

              width: 22px;
              height: 22px;
              margin-right: 10px;
              path {
                fill: transparent
              }
            }
            .number {
              padding: 2px 10px;
              color: #000;
              font-weight: 700;
              border-radius: 5px;
              font-size: 14px;

              svg {
                width: 12px;
                height: 12px;
                position: relative;

                margin-right: 0px;

                path {
                  fill: #000;
                }
              }



            }
            .text {
              padding: 5px 15px;
              color: #3e4b5b;
              font-weight: 300;
              border-radius: 5px;
              font-size: 10px;
            }
          }
        }

        .recommend-project {
          margin-left: 20px;

          display: flex;
          align-items: stretch;
          align-self: center;
          svg {
            width: 22px;
            height: 22px;
            path {
              fill: #0a58ca;
            }
          }
          img {
            width: 35px;
            height: 35px;
          }
        }

      }

    }
    .project-description {
      width: 100%;
      margin-top: 10px;
      padding-bottom: 10px;
      color: var(--secondary, #2B2B2B);
      font-family: 'Montserrat', sans-serif;

      font-style: normal;
      font-weight: 300;
      line-height: normal;
      word-break: break-all;

      p {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }



    }

    .project-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .links, .stats {
        display: flex;
        gap: 20px;
        align-items: center;
        .date {
          opacity: .3;
        }
      }
      .stats {
        font-size: 14px;
      }
      .testimonials svg, .views svg {
        opacity: .5;
        margin-right: 10px;
      }

      .testimonials, .views {
        display: flex;
        align-items: center;

      }
      .stats, .testimonials {
        span {
          color: var(--secondary, #2B2B2B);
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-style: normal;
          opacity: .5;
          font-weight: 400;
          line-height: 25px; /* 138.889% */
        }
      }


    }

  }
}

.category {
  font-size: 12px;
  color: #818181;

}
.mobileRating {
  display: none;
}
@media screen and (max-width: 768px)  {



  .project {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 10px;
    margin-bottom: 50px;

    .mobileRating {
      display: flex;
      z-index: 2;
      position: absolute;
      background-color: #fff;
      bottom: -1px;
      padding: 5px;
      border-radius: 10px;
      min-width: 30px;
      right: -1px;

      .stars {
        width: 100%;
        .project-rating {
          .number {
            svg {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }


    .avatar {
      width: 40vw;
      height: 40vw;
      flex-basis: 40vw;

      figure {
        width: 40vw;
        height: 40vw;
      }
    }

    .advanced-fields {
      bottom: -80px;
      width: 60%;
      left: 20%;
      font-size: 14px;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      margin-top: 0;

      .stat {
        display: block;
        width: 100%;
        margin-bottom: 5px;

        .descr {
          display: none;
        }
      }
    }



    .project-body {
      display: flex;
      width: 160px;
      

      .project-top {
        flex-wrap: wrap;
        margin-bottom: 20px;
        width: 100%;
        display: flex;
        justify-content: start;

        .rating {
          display: none;
        }




        .name {
          width: 100%;
          text-align: left;
          justify-content: center;
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .project-description {
        display: none;

      }
      .project-bottom {
        flex-wrap: wrap;
        margin-bottom: 0px;

        .links {
          margin-top: 10px;
          text-align: left;
          gap: 0;
          width: 100%;
          display: grid;
          flex-wrap: wrap;

          .category {
            text-align: left;
            width: 100%;
            display: none;
          }
          .admin-menu-toggler {
            position: relative;
            top: -20px;
            height: 0;
            justify-self: end;

          }
        }
        .stats {

          .descr {
            display: none;
          }
          flex-wrap: wrap;
          width: 100%;
          gap: 0px;
          justify-content: start;

          .testimonials, .views {
            width: auto;
            margin-right: 10px;
            flex-wrap: nowrap;
            text-align: left;
            align-items: center;
          }
          .testimonials {
            justify-content: end;
          }
          .views, .testimonials {
            justify-content: start;
            svg {
              width: 15px;

            }
          }
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
  .admin-menu {
    width: 190px;
    right: -11px;
  }
}
@media screen and (max-width: 500px){
  .project {
    margin-bottom: 10px;
    .project-body {
      .project-top {
        margin-bottom: 0;
      }
      .project-bottom {
        .links {
          margin-top: 0;
        }
      }
    }
    .advanced-fields {
      display: none;
      border-color: transparent;
      position: absolute;
      bottom: -20px;
      width: 100%;
      left: 0;
      padding: 2px 5px;
      margin-top: 0px;
      margin-bottom: 0;
      justify-content: space-between;

      .stat {
        margin-right: 5px;
        width: auto;
        font-size: 12px;
        svg {
          position: relative;
          top: 2px;
          width: 13px;
          height: 13px;
        }
      }

    }

    &.paid {
      .advanced-fields {

      }
    }
  }

}
</style>