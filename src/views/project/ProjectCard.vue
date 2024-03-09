<template>

    <div class="project"
         :class="{ paid: $props.payed }"
         >


      <div class="avatar">


        <figure class="cover">
          <img :src="'http://62.113.96.171:3000/' + $props.avatar"
               alt="" class="hoverable"
               v-if="$props.avatar !== ''"
               v-on:click="$router.push('/project/' + $props.projectId)">

          <img src="/src/assets/images/avatar.webp"
               alt="" class="hoverable"
               v-else
               v-on:click="$router.push('/project/' + $props.projectId)">
        </figure>




        <div class="favorite"
             v-if="isLoggined === true"
             v-on:click="() => {
               !favorite ? favorite = true : favorite = false
               addFavorite(projectId)
             }"
              :class="{active: favorite}">
          <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.65 106.19">
            <path class="b"
                  d="M59.29,105.69c-.11,0-.18-.02-.2-.03-15.22-8.34-26.8-16.62-36.43-26.05-7.62-7.46-13.18-14.96-17.01-22.93C1.93,48.91,.25,41.6,.53,34.33,.99,22.39,5.81,12.96,14.86,6.29,20,2.5,25.92,.5,31.98,.5c7.57,0,14.91,3.15,20.65,8.88,1.44,1.44,2.72,3.11,3.96,4.72,.58,.75,1.15,1.5,1.74,2.23,.12,.15,.23,.32,.35,.49l.58,.84,.42-.56c.38-.51,.75-1.02,1.11-1.53,.79-1.1,1.54-2.13,2.37-3.14,4.85-5.91,10.3-9.52,16.67-11.04,2.4-.57,4.78-.86,7.08-.86,6.72,0,13.06,2.46,18.85,7.31,6.8,5.7,10.86,13.32,12.06,22.66,1.14,8.85-.6,17.74-5.33,27.19-4.04,8.07-9.91,15.69-17.96,23.31-8.46,8.02-18.31,15.15-30.98,22.43-1.25,.72-2.6,1.48-3.98,2.21-.05,.02-.15,.05-.27,.05Z"/>
            <path class="b"
                  d="M31.98,0V1c7.44,0,14.65,3.1,20.3,8.74,1.42,1.41,2.69,3.07,3.92,4.67,.57,.74,1.15,1.5,1.75,2.24,.11,.14,.21,.29,.31,.45,.06,.09,.12,.19,.19,.28l.79,1.15,.83-1.12c.38-.51,.75-1.02,1.11-1.53,.79-1.09,1.54-2.13,2.35-3.12,4.78-5.82,10.14-9.38,16.4-10.87,2.36-.56,4.7-.85,6.97-.85,6.6,0,12.83,2.42,18.53,7.19,6.7,5.61,10.7,13.13,11.88,22.34,1.13,8.75-.6,17.55-5.28,26.9-4.01,8.01-9.85,15.59-17.85,23.17-8.32,7.88-18.42,15.2-30.89,22.36-1.25,.72-2.6,1.48-3.93,2.18,0,0-.03,0-.08,0h-.01c-15.15-8.31-26.68-16.55-36.26-25.93-7.58-7.42-13.11-14.88-16.91-22.79-3.7-7.7-5.36-14.94-5.08-22.12C1.49,22.57,6.24,13.26,15.15,6.7,20.21,2.97,26.03,1,31.98,1V0m0,0c-6.01,0-12.06,1.94-17.42,5.89C5.03,12.91,.48,22.63,.03,34.31c-.31,7.97,1.75,15.45,5.18,22.59,4.22,8.79,10.19,16.29,17.11,23.07,10.82,10.6,23.31,18.88,36.54,26.13,.11,.06,.27,.09,.44,.09,.18,0,.37-.04,.5-.11,1.35-.71,2.68-1.46,4-2.22,11.15-6.41,21.71-13.63,31.08-22.5,7.25-6.87,13.56-14.47,18.06-23.45,4.33-8.65,6.63-17.73,5.38-27.47-1.18-9.18-5.1-17.01-12.23-22.98C100.31,2.63,93.92,.03,86.91,.03c-2.33,0-4.73,.29-7.2,.88-6.97,1.67-12.45,5.74-16.94,11.21-1.22,1.49-2.31,3.08-3.49,4.68-.19-.28-.35-.55-.55-.79-1.9-2.34-3.62-4.87-5.74-6.99C46.99,3.05,39.52,0,31.98,0h0Z"/>
          </svg>
        </div>
      </div>
      <div class="project-body" v-on:click="$router.push('/project/' + projectId)">
        <div class="project-top">
          <div class="name hoverable">
            {{ $props.projectName }}

            <img src="./../../assets/images/verified.webp"
                 class="verified"
                 title="Проверенный магазин">

          </div>

          <div class="rating hoverable" v-on:click="$router.push('/project/' + projectId)">

            <div class="stars">
              <div class="project-rating">

                <span class="number"
                      v-if="$props.projectRating"
                      :class="{
                        goodGreen: $props.projectRating === 5,
                        green: $props.projectRating >= 4 && $props.projectRating < 5,
                        yellow: $props.projectRating > 3 && $props.projectRating < 4,
                        orange: $props.projectRating > 2 && $props.projectRating <= 3,
                        red: $props.projectRating > 1 && $props.projectRating <= 2,
                        badRed: $props.projectRating >= 0 && $props.projectRating <= 1,
                          }">
                  {{ $props.projectRating }}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" >
                <path
                    d="M8.93325 0.7084L10.1489 4.61808C10.2802 5.04057 10.6571 5.32648 11.0822 5.32648H15.0168C15.9674 5.32648 16.3627 6.59722 15.5936 7.18118L12.4105 9.59732C12.0665 9.85835 11.9227 10.3211 12.054 10.7436L13.2697 14.6533C13.5635 15.5978 12.5287 16.3833 11.7597 15.7996L8.57651 13.3835C8.23253 13.1224 7.7669 13.1224 7.42292 13.3835L4.23977 15.7996C3.47071 16.3833 2.43593 15.5978 2.72972 14.6533L3.94542 10.7436C4.07671 10.3211 3.93294 9.85835 3.58896 9.59732L0.406373 7.18088C-0.362688 6.59722 0.0326187 5.32618 0.983169 5.32618H4.91752C5.3426 5.32618 5.71947 5.04028 5.85077 4.61778L7.06675 0.7084C7.36053 -0.236133 8.63947 -0.236133 8.93325 0.7084Z"/>
              </svg>
                </span>
                <span class="text" v-else title="Проект пока не имеет оценок, но это не значит что он плохой или хороший.">
                  Нет оценок
                </span>

              </div>


            </div>

          </div>

        </div>

        <div class="project-description hoverable" v-on:click="$router.push('/project/' + projectId)">
          <p v-if="$props.projectDescription.length < 120">
            {{ $props.projectDescription }}
          </p>
          <p v-else>
            {{ $props.projectDescription.substring(0,117)+"..." }}
          </p>
        </div>
        <div class="project-bottom">
          <div class="stats">
            <div class="testimonials hoverable" title="Отзывов" v-on:click="$router.push('/project/' + projectId)">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21" fill="none">
                <path d="M7.90289 18.3997C7.94974 18.3308 7.98652 18.2805 8.01942 18.2278C8.82354 16.944 9.62997 15.6618 10.4283 14.3745C10.5773 14.1341 10.7748 14.0323 11.0516 14.0326C13.4322 14.0357 15.8132 14.0388 18.1937 14.0326C19.7052 14.0288 20.9812 13.0744 21.3893 11.6397C21.4729 11.3458 21.5221 11.0322 21.5248 10.7272C21.5383 9.23701 21.5333 7.74648 21.5306 6.25595C21.5275 4.59236 20.2348 3.15836 18.5844 2.98569C18.3989 2.96633 18.2115 2.95549 18.0249 2.95549C14.7926 2.95356 11.5603 2.95472 8.3276 2.95201C8.21455 2.95201 8.09221 2.93962 7.99039 2.89626C7.76545 2.80025 7.64544 2.53582 7.6977 2.30314C7.75771 2.03678 7.94548 1.87457 8.21106 1.86141C8.26256 1.8587 8.31443 1.85986 8.36592 1.85986C11.6242 1.85986 14.8824 1.87767 18.1403 1.85328C20.205 1.83779 22.054 3.25515 22.5159 5.28382C22.5728 5.53353 22.6158 5.79214 22.6177 6.04689C22.6282 7.64698 22.6444 9.24707 22.622 10.8468C22.5964 12.6939 21.3707 14.3257 19.6123 14.9153C19.157 15.0679 18.6885 15.1465 18.2084 15.1465C15.9761 15.1472 13.7438 15.15 11.5115 15.1422C11.311 15.1414 11.2072 15.2076 11.1039 15.3753C10.2088 16.8232 9.30205 18.2642 8.40115 19.7087C8.29159 19.8844 8.16577 20.0335 7.94625 20.0629C7.68144 20.0985 7.48671 19.9859 7.34075 19.711C6.82971 18.7489 6.32061 17.7861 5.81034 16.8236C5.49017 16.22 5.17193 15.6153 4.84595 15.0148C4.81033 14.949 4.7391 14.8863 4.6698 14.8577C3.14985 14.2247 2.22378 13.1015 1.88425 11.4933C1.85134 11.3365 1.83121 11.1743 1.83005 11.014C1.82308 9.96253 1.82153 8.91064 1.82153 7.85914C1.82153 7.61601 1.952 7.42205 2.16416 7.34849C2.38135 7.27299 2.60164 7.29003 2.74915 7.47393C2.83819 7.58504 2.90594 7.74764 2.90788 7.88856C2.92181 8.7852 2.91446 9.68223 2.91523 10.5789C2.91601 12.179 3.79252 13.3884 5.30782 13.9122C5.45029 13.9614 5.59935 14.0926 5.67174 14.2258C6.39688 15.5627 7.10652 16.908 7.82043 18.251C7.84366 18.2948 7.86805 18.3374 7.90251 18.3993L7.90289 18.3997Z" fill="#2B2B2B"/>
                <path d="M1.24268 2.38211C1.54582 2.38211 1.84896 2.37708 2.1521 2.38405C2.33561 2.38831 2.43433 2.31088 2.48892 2.13588C2.66546 1.57103 2.85323 1.00966 3.03364 0.445972C3.08126 0.296532 3.1374 0.161804 3.32594 0.165288C3.50519 0.168773 3.55513 0.303888 3.60043 0.443262C3.78084 0.999985 3.96899 1.55438 4.13973 2.1142C4.20128 2.3163 4.31201 2.38869 4.51797 2.3856C5.10489 2.37669 5.69181 2.38366 6.27873 2.38211C6.42934 2.38172 6.57181 2.40069 6.6233 2.5664C6.67363 2.72784 6.58032 2.82888 6.4545 2.91909C5.97714 3.25978 5.50676 3.61054 5.02785 3.9493C4.86021 4.06776 4.81414 4.19707 4.88151 4.39529C5.07392 4.9617 5.2493 5.53352 5.43707 6.10147C5.48159 6.23658 5.48895 6.35544 5.36816 6.45029C5.2373 6.55288 5.11922 6.50604 4.99959 6.41815C4.52146 6.06701 4.03752 5.72399 3.56287 5.36859C3.39253 5.24083 3.25238 5.23464 3.07777 5.36588C2.60932 5.71857 2.12964 6.05694 1.65577 6.40267C1.53498 6.49094 1.41535 6.56372 1.27133 6.45377C1.12963 6.34576 1.16331 6.20909 1.20939 6.06817C1.39173 5.51184 1.56789 4.95356 1.75566 4.39917C1.82147 4.2052 1.78469 4.07396 1.61202 3.95317C1.12654 3.61248 0.652663 3.25552 0.170274 2.91096C0.0405785 2.81843 -0.0364644 2.71042 0.0173495 2.55285C0.0672919 2.40689 0.1966 2.38443 0.333651 2.38521C0.63679 2.38676 0.939929 2.3856 1.24307 2.3856V2.38327L1.24268 2.38211Z" fill="#2B2B2B"/>
                <path d="M14.8851 8.41039C13.7055 8.41039 12.5258 8.41117 11.3462 8.40962C11.0597 8.40962 10.8533 8.24276 10.7902 7.96981C10.7345 7.72901 10.858 7.46962 11.0965 7.36509C11.1875 7.32521 11.2959 7.31011 11.3961 7.31011C13.7167 7.30701 16.0373 7.30701 18.3583 7.30895C18.7051 7.30895 18.9374 7.4882 18.9781 7.76927C19.018 8.04647 18.8615 8.30276 18.5944 8.38407C18.5224 8.40613 18.4426 8.40884 18.3664 8.40923C17.2061 8.41078 16.0458 8.41039 14.8855 8.41039H14.8851Z" fill="#2B2B2B"/>
                <path d="M12.2319 10.4158C12.8634 10.4158 13.4944 10.4143 14.1259 10.4166C14.4728 10.4178 14.7217 10.6555 14.7143 10.9702C14.7066 11.2811 14.4627 11.5095 14.1298 11.5099C12.8607 11.5111 11.592 11.5115 10.3229 11.5099C9.98105 11.5099 9.7294 11.2684 9.73521 10.954C9.74101 10.64 9.97717 10.4186 10.319 10.417C10.9567 10.4143 11.5943 10.4162 12.2323 10.4162L12.2319 10.4158Z" fill="#2B2B2B"/>
                <path d="M7.94503 8.4104C7.46806 8.4104 6.99109 8.41157 6.51412 8.41002C6.17575 8.40886 5.93881 8.18779 5.93262 7.87227C5.92643 7.55248 6.15097 7.31399 6.49089 7.31167C7.46419 7.30509 8.43748 7.30509 9.41078 7.31051C9.74992 7.31245 9.99228 7.55325 9.99034 7.85872C9.98841 8.1754 9.73753 8.40924 9.39568 8.4104C8.91213 8.41157 8.42858 8.4104 7.94542 8.4104H7.94503Z" fill="#2B2B2B"/>
                <path d="M7.29969 10.4151C7.69923 10.4151 8.09915 10.412 8.49869 10.4158C8.83861 10.4193 9.07013 10.645 9.06935 10.9625C9.06819 11.2811 8.83435 11.5084 8.49792 11.5091C7.69226 11.5111 6.88621 11.5111 6.08055 11.5091C5.74721 11.5084 5.50796 11.2765 5.50757 10.9617C5.50757 10.6458 5.74257 10.4185 6.08133 10.4158C6.48745 10.4123 6.89357 10.4151 7.29969 10.4151Z" fill="#2B2B2B"/>
                <path d="M17.5858 10.4151C17.9532 10.4151 18.321 10.4124 18.6884 10.4159C19.0349 10.4194 19.2583 10.6358 19.2587 10.9602C19.2587 11.2866 19.0341 11.5084 18.6919 11.5092C17.9567 11.5115 17.2219 11.5111 16.4867 11.5092C16.1468 11.5084 15.9172 11.2854 15.916 10.9629C15.9145 10.6416 16.1406 10.4198 16.4832 10.4155C16.8506 10.4112 17.2184 10.4143 17.5858 10.4147V10.4151Z" fill="#2B2B2B"/>
              </svg>
              <span>{{ reviewsLength || 0 }}</span>
            </div>
            <div class="views hoverable" title="Просмотров " v-on:click="$router.push('/project/' + projectId)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="11" viewBox="0 0 20 11" fill="none">
                <path d="M0 5.5522C5.36282 -1.78782 14.5224 -1.91065 20 5.54408C17.4576 8.73988 14.3273 10.9954 10.0053 11C5.67922 11.0041 2.55604 8.73235 0 5.55277V5.5522ZM10.0195 9.10372C12.0303 9.09387 13.6915 7.46063 13.6886 5.49716C13.6862 3.54005 12.0149 1.89291 10.0207 1.8819C7.99811 1.87089 6.29192 3.55164 6.31557 5.53192C6.33923 7.5064 8.0058 9.11357 10.0195 9.10372ZM1.48264 5.49889C2.94518 7.21151 4.67739 8.49191 6.86262 9.16861C5.82057 8.14777 5.21497 6.95716 5.20788 5.50816C5.20078 4.06554 5.81702 2.88189 6.81176 1.83613C4.6632 2.54122 2.92211 3.77759 1.48264 5.49831V5.49889ZM18.502 5.5267C17.1903 3.79671 14.4674 1.94563 13.1817 1.8958C15.3877 4.44328 15.3794 6.27119 13.0682 9.25436C15.3232 8.49075 17.0554 7.20977 18.502 5.5267Z" fill="#2B2B2B"/>
                <path d="M9.85082 4.00324C10.8514 3.96266 11.5608 4.30421 11.879 4.95173C12.1707 5.54545 11.9218 6.24541 11.2733 6.65171C10.6036 7.07123 9.62661 7.11638 8.88706 6.76206C8.12098 6.39452 7.8377 5.78348 8.08964 5.03974C9.41204 5.29875 9.91713 5.01329 9.85022 4.00324H9.85082Z" fill="#2B2B2B"/>
              </svg>
              <span> {{ $props.projectViews === null ? 0 : $props.projectViews }}</span>
            </div>
            <div class="date hoverable"  title="Дата создания" v-on:click="$router.push('/project/' + projectId)">
              {{ new Date($props.projectCreateDate).toLocaleString('ru-ru', { day: '2-digit', month: 'short', year: 'numeric' }) }}
            </div>


          </div>




          <div class="links " v-on:click.stop >

            <div class="admin-menu-toggler" @click="($event) => {
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
                <button class="btn btn-approve" v-on:click="showModalApprove = true" v-if="$props.reviewed === false">
                  <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.38 253.44"><path d="M0,126.38C-.26,56.92,56.58,1.28,123.91,.02c72.59-1.36,129.81,57.57,129.47,126.88-.35,70.26-56.52,126.6-126.74,126.54C56.09,253.38-.03,197.07,0,126.38Zm126.77,98.16c53.91-.53,96.72-43.12,97.54-96.03,.87-55.79-43.41-98.67-96.02-99.43-55.58-.8-98.84,43.57-99.33,96.68-.5,54.54,43.38,98.59,97.81,98.79Z"/><path d="M68.69,106.26c4.18-.48,7.52,1.96,10.36,5.57,6.17,7.85,12.55,15.53,18.56,23.5,2.58,3.42,4.47,3.9,7.97,1.02,20.29-16.72,40.66-33.34,61.29-49.64,3.14-2.48,7.72-4.19,11.7-4.32,4.75-.16,8.81,2.75,10.45,7.82,1.78,5.5,1.46,10.74-3.21,14.62-11.9,9.89-23.96,19.58-36,29.3-13.59,10.98-27.24,21.89-40.83,32.87-8.04,6.5-15.01,5.95-21.52-2.07-9.86-12.13-19.64-24.34-29.35-36.59-2.97-3.74-5.01-7.83-3.25-12.92,2.23-6.43,6.13-9.24,13.84-9.15Z"/></svg>
                  Одобрить

                </button>
                <button class="btn btn-default" v-on:click="() => {
                  this.counter++


                  if ($props.payed === true) {
                    updateProjectPayedStatus($props.projectId, false)
                    this.adminDropDownShow = !this.adminDropDownShow
                  } else {
                    updateProjectPayedStatus($props.projectId, true)
                    this.adminDropDownShow = !this.adminDropDownShow


                  }

                }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
                    <path d="M5.11179 17.16V0.23999H6.26379V17.16H5.11179ZM5.56179 15.144C4.60179 15.144 3.68379 15 2.80779 14.712C1.93179 14.412 1.24179 14.028 0.737793 13.56L1.40379 12.156C1.88379 12.576 2.49579 12.924 3.23979 13.2C3.98379 13.476 4.75779 13.614 5.56179 13.614C6.29379 13.614 6.88779 13.53 7.34379 13.362C7.79979 13.194 8.13579 12.966 8.35179 12.678C8.56779 12.378 8.67579 12.042 8.67579 11.67C8.67579 11.238 8.53179 10.89 8.24379 10.626C7.96779 10.362 7.60179 10.152 7.14579 9.99599C6.70179 9.82799 6.20979 9.68399 5.66979 9.56399C5.12979 9.44399 4.58379 9.30599 4.03179 9.14999C3.49179 8.98199 2.99379 8.77199 2.53779 8.51999C2.09379 8.26799 1.73379 7.93199 1.45779 7.51199C1.18179 7.07999 1.04379 6.52799 1.04379 5.85599C1.04379 5.20799 1.21179 4.61399 1.54779 4.07399C1.89579 3.52199 2.42379 3.08399 3.13179 2.75999C3.85179 2.42399 4.76379 2.25599 5.86779 2.25599C6.59979 2.25599 7.32579 2.35199 8.04579 2.54399C8.76579 2.73599 9.38979 3.01199 9.91779 3.37199L9.32379 4.81199C8.78379 4.45199 8.21379 4.19399 7.61379 4.03799C7.01379 3.86999 6.43179 3.78599 5.86779 3.78599C5.15979 3.78599 4.57779 3.87599 4.12179 4.05599C3.66579 4.23599 3.32979 4.47599 3.11379 4.77599C2.90979 5.07599 2.80779 5.41199 2.80779 5.78399C2.80779 6.22799 2.94579 6.58199 3.22179 6.84599C3.50979 7.10999 3.87579 7.31999 4.31979 7.47599C4.77579 7.63199 5.27379 7.77599 5.81379 7.90799C6.35379 8.02799 6.89379 8.16599 7.43379 8.32199C7.98579 8.47799 8.48379 8.68199 8.92779 8.93399C9.38379 9.18599 9.74979 9.52199 10.0258 9.94199C10.3018 10.362 10.4398 10.902 10.4398 11.562C10.4398 12.198 10.2658 12.792 9.91779 13.344C9.56979 13.884 9.02979 14.322 8.29779 14.658C7.57779 14.982 6.66579 15.144 5.56179 15.144Z" fill="#6C7AFF"/>
                  </svg>
                  <span class="text" v-if="$props.payed === false"
                  >
                    Сделать платным</span>
                  <span class="text" v-else
                  >
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
        <div class="advanced-fields">
          {{ $props.exchangeRate }}
          {{ $props.reserve }}
        </div>
      </div>

    </div>

  <modal-window-backdrop
      v-if="showModalDelete === true"
      v-on:changeModal="(emitShowModal) => {this.showModalDelete = emitShowModal}"
      v-bind:icon-type="'warning'"
      v-bind:heading="'Удалить проект: ' + $props.projectName"
      v-bind:description="'Это действие безвозвратно удалит данную категорию, подтвердить?'"
      v-bind:descriptionType="'text'"
      v-bind:confirmAction="true"
      v-on:confirmAction="(emitConfirmAction) => {
                console.log(emitConfirmAction)
                if (emitConfirmAction === true) {
                  deleteProject($props.projectId)


                }
                showModalDelete === false
              }"

  >

  </modal-window-backdrop>

  <modal-window-backdrop
      v-if="showModalApprove === true"
      v-on:changeModal="(emitShowModal) => {this.showModalApprove = emitShowModal}"
      v-bind:icon-type="'ok'"
      v-bind:heading="'Вы собираетесь опубликовать проект: ' + $props.projectName"
      v-bind:description="'Вы действительно хотите это сделать? Проект появится в результатах выдачи.'"
      v-bind:descriptionType="'textApprove'"
      v-bind:confirmAction="true"
      v-on:confirmAction="(emitConfirmAction) => {
                showModalApprove === false
                if (emitConfirmAction === true) {
                  updateProject($props.projectId)

                }
              }"

  >

  </modal-window-backdrop>


</template>

<script>
import ProjectsView from "./ProjectsView.vue";
import modalWindowBackdrop from "../../components/page components/ModalWindowBackdrop.vue";
import { onClickOutside } from '@vueuse/core'
import { ref } from "vue";

export default {
  name: "ProjectCard.vue",
  components: { ProjectsView, modalWindowBackdrop },
  props: ['projectId', 'exchangeRate', 'reserve', 'avatar', 'payed', 'projectName', 'projectDescription', 'projectCreateDate', 'projectViews', 'projectRating', 'reviewed', 'projectCategory'],
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
      isLoggined: false,
      reviewsCount: 0


    }
  },
  updated() {

    // onClickOutside(this.$refs.dropdown, event => this.adminDropDownShow = false)
  },
  mounted() {
    this.checkIsAdmin()
    this.getReviews(this.$props.projectId)


    localStorage.getItem('token') ? this.isLoggined = true : this.isLoggined = false
  },
  methods: {
    checkIsAdmin () {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')

      console.log(this.isLoggined)



      if (role === 'admin' && token !== '') {
        this.isAdmin = true
      } else {
      }
    },

    addFavorite(projectId) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      fetch(`http://62.113.96.171:3000/projects/${projectId}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(
            {
              status: 'favorite'
            }
        )
      })
          .then((response) => response.json())
          .then((res) => { console.log(res) })
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
    getReviews (projectId, offset) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(this.getOffset)
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch(`http://62.113.96.171:3000/reviews?projectId=${projectId}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {

            this.reviewsLength = result.reviews.length
          })
          .catch((error) => console.error(error));
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
          .then(() => { this.$emit('updated', this.counter) })
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

      fetch(`http://62.113.96.171:3000/projects/${projectId}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          isReviewed: true,
          payed: status
        })
      })
          .then((response) => response.json())
          .then((result) => {
            this.projects = result.projects
            this.$emit('updated', this.counter)

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
    border-radius: 10px;
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
      color: #6C7AFF;
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
  border: 1px solid #6C7AFF;
  border-radius: 10px;
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
        color: #6C7AFF;
        svg {
          path, defs {
            fill: #6C7AFF;
          }
        }
      }
    }
  }
}
.hoverable {
  cursor: pointer;
}

.project {

  border-radius: 10px;
  position: relative;
  background-color: #fff;
  padding: 10px 15px;
  gap: 20px;
  display: flex;
  flex-wrap: nowrap;

  box-sizing: border-box;
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  transition:.3s ease;


  &.paid {
    background: #f0f6ff;
    border: 1px solid #d2e1e8;
    box-shadow: 0 0 8px #a3d7fc;
  }

  .avatar {
    flex-basis: 110px;
    flex-shrink: 0;
    flex-grow: 0;
    display: block;
    box-sizing: border-box;
    position: relative;
    border-radius: 15px;
    overflow: hidden;

    figure {
      width: 110px;
      height: 110px;
      text-align: center;
      margin: 0;
      display: block;
      box-sizing: border-box;
    }

    .cover img {
      object-fit: cover;
      min-height: 100%;
      width: inherit;
    }


    img {
      object-fit: cover;

    }
    .favorite {
      position: absolute;
      right: 10px;
      top: 10px;
      border-radius: 400px;
      background-color: rgba(0,0,0,.5);
      padding: 4px;
      transition: .3s ease;
      svg {
        padding: 4px 2px;
        transition: .3s ease;
        width: 17px;
        height: 14px;

        path {
          fill: transparent;
          stroke: #fff;
          stroke-linejoin: round;
          stroke-linecap: round;
          stroke-width: 5px;
          transition: .3s ease;
        }
      }
      &.active {
        svg {
          path {
            fill: #fff;
          }
        }
      }
    }
  }
  .dropdown {
    color: var(--new-dark, #6C7AFF);
    text-align: right;
    font-family: Montserrat;
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
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .name {
        display: flex;
        align-items: center;
        gap: 20px;

        color: var(--secondary, #2B2B2B);
        font-family: Montserrat;
        font-size: 18px;
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
        align-items: center;
        .rate {
          margin-right: 10px;
          color: #000;

          text-align: right;
          font-family: Montserrat;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          opacity: .6;
        }
        .stars {
          .project-rating {
            display: flex;
            align-items: center;
            svg {
              width: 22px;
              height: 22px;
              margin-right: 10px;
              path {
                fill: #6C7AFF
              }
            }
            .number {
              padding: 5px 15px;
              color: #fff;
              font-weight: 700;
              border-radius: 5px;
              font-size: 14px;

              svg {
                width: 10px;
                height: 10px;
                margin-right: 0;
                path {
                  fill: #fff;
                }
              }

              &.goodGreen {
                background-color: #0fd067;
              }
              &.green {
                background-color: #56d790;
              }
              &.yellow {
                background-color: yellow;
              }
              &.orange {
                background-color: orange;
              }
              &.red {
                background-color: orangered;
              }
              &.badRed {
                background-color: red;
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
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      word-break: break-all;



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
          font-family: Montserrat;
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

</style>