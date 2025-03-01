<template>
  <div class="project-info-description">
    <h4>
      {{ data.name }}
    </h4>
    <div class="project-info-description_text">
        <transition name="slide-out">
          <p :class="{'is-collapsed': descriptionText.short}" ref="textDescription">
              {{ normalizeText(data.description) }}
          </p>
        </transition>

    </div>
      <div v-if="data.description.length > 250">
          <span class="more-toggle" v-if="descriptionText.short && data.description.length > 100"  @click='toggle'>
          Полное описание
      </span>
          <span class="more-toggle" v-else-if="!descriptionText.short && data.description.length > 100"  @click='toggle'>
          Свернуть описание
      </span>
      </div>



    <div class="project-info-description_links">
      <div>
        <project-links
            style="margin-top: 10px;"
            :project-links="data.links"
            :show-count="999"
            :is-editable="false"
        >
        </project-links>
      </div>
    </div>
    <div class="exchanger_stats">
      <div class="exchanger_stat min-value-to-exchange" v-if="data.minValueToExchange">

        <div class="stat-ex">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
                d="M3 3L4 2M4 2L3 1M4 2H3C1.89543 2 1 2.89543 1 4M9 9L8 10M8 10L9 11M8 10H9C10.1046 10 11 9.10457 11 8M5.09451 3.25C5.42755 1.95608 6.60212 1 8 1C9.65685 1 11 2.34315 11 4C11 5.39787 10.0439 6.57244 8.75003 6.90548M7 8C7 9.65685 5.65685 11 4 11C2.34315 11 1 9.65685 1 8C1 6.34315 2.34315 5 4 5C5.65685 5 7 6.34315 7 8Z"
                stroke="#191B2A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ data.minValueToExchange }} ₽
        </div>
        <div class="desc-ex">
          мин. обмен
        </div>

      </div>
      <div class="exchanger_stat reserve" v-if="data.reserve">
        <div class="stat-ex">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
            <path
                d="M7.05 2.11111C7.05 2.72476 5.69566 3.22222 4.025 3.22222C2.35434 3.22222 1 2.72476 1 2.11111M7.05 2.11111C7.05 1.49746 5.69566 1 4.025 1C2.35434 1 1 1.49746 1 2.11111M7.05 2.11111V4.58731C6.37817 4.7911 5.95 5.09941 5.95 5.44444M1 2.11111V8.77778C1 9.39143 2.35434 9.88889 4.025 9.88889C4.7563 9.88889 5.42698 9.79357 5.95 9.63492V5.44444M1 4.33333C1 4.94698 2.35434 5.44444 4.025 5.44444C4.7563 5.44444 5.42698 5.34913 5.95 5.19047M1 6.55556C1 7.16921 2.35434 7.66667 4.025 7.66667C4.7563 7.66667 5.42698 7.57135 5.95 7.41269M12 5.44444C12 6.05809 10.6457 6.55556 8.975 6.55556C7.30434 6.55556 5.95 6.05809 5.95 5.44444M12 5.44444C12 4.83079 10.6457 4.33333 8.975 4.33333C7.30434 4.33333 5.95 4.83079 5.95 5.44444M12 5.44444V9.88889C12 10.5025 10.6457 11 8.975 11C7.30434 11 5.95 10.5025 5.95 9.88889V5.44444M12 7.66667C12 8.28032 10.6457 8.77778 8.975 8.77778C7.30434 8.77778 5.95 8.28032 5.95 7.66667"
                stroke="#191B2A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ data.reserve }} ₽
        </div>
        <div class="desc-ex">
          резерв
        </div>
      </div>

      <div class="menu-item" style="margin-left: auto "
           v-if="userStore.username === data.userData.username || userStore.role === 'admin'">
          <div class="item">
              <router-link :to="route.path + '/edit'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                              d="M1.27237 12.5486C1.30565 12.2491 1.32229 12.0994 1.3676 11.9594C1.4078 11.8352 1.4646 11.7171 1.53646 11.6081C1.61745 11.4853 1.72399 11.3787 1.93707 11.1656L11.5027 1.60005C12.3027 0.799984 13.5999 0.799985 14.4 1.60005C15.2 2.40011 15.2 3.69727 14.4 4.49734L4.83436 14.0629C4.62127 14.276 4.51473 14.3826 4.39191 14.4635C4.28295 14.5354 4.16477 14.5922 4.04059 14.6324C3.90062 14.6777 3.75087 14.6943 3.45137 14.7276L1 15L1.27237 12.5486Z"
                              stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  редактировать
              </router-link>
          </div>

          <div class="sep"></div>
          <div class="item" v-if="userStore.role === 'admin'"  title="Дневная накрутка">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 19H2.6C2.03995 19 1.75992 19 1.54601 18.891C1.35785 18.7951 1.20487 18.6422 1.10899 18.454C1 18.2401 1 17.9601 1 17.4V1M18 13L14.0811 8.81734C13.9326 8.65883 13.8584 8.57957 13.7688 8.5386C13.6897 8.50245 13.6026 8.48753 13.516 8.49534C13.4179 8.50418 13.3215 8.55423 13.1287 8.65433L9.87132 10.3457C9.67854 10.4458 9.58215 10.4958 9.48404 10.5047C9.39744 10.5125 9.31031 10.4976 9.23124 10.4614C9.14165 10.4204 9.06739 10.3412 8.91887 10.1827L5 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <span>{{ data.dailyViewsIncrement }}</span>
              <div class="change" @click="toggleComponent(shallowRef(DailyIncrement), 'Дневная накрутка')">
                  изменить
              </div>
          </div>
      </div>

    </div>

    <Teleport to="body" v-if="popup.isVisible">
      <the-baza-popup
          :headline="popup.headline"
          @closePopup="popup.isVisible = false"
      >
        <component :is="popup.component" :data="popup.data" @dailyViewsIncrementChanged="emit => saveDailyIncrement(emit)"/>
      </the-baza-popup>
    </Teleport>
  </div>
</template>
<script setup>
import {userStore} from "@/Stores/userStore.js";
import {reactive, ref, shallowRef} from "vue";
import {useRoute} from "vue-router";
import TheBazaPopup from "@/components/popups/TheBazaPopup.vue";
import ProjectDescription from "@/components/popups/Project/ProjectDescription.vue";
import ProjectLinks from "@/components/Layout/Project/ProjectParts/ProjectLinks.vue";
import DailyIncrement from '@/components/popups/Project/DailyIncrement.vue'
import {changeDailyIncrement} from "@/API/projectsController.js";

const route = useRoute()

const props = defineProps({
  data: ref(Object)
})

const popup = reactive({
    isVisible: false,
    component: null,
    headline: null,
    data: null
})

const descriptionText = reactive({
    short: true
})

const normalizeText = (text) => {
    if (descriptionText.short) {
        return text
    } else {
        return text
    }

}

const toggleComponent = (component, headline) => {
  popup.isVisible = true
  popup.headline = headline
  popup.data = props.data
  popup.component = component
}

const saveDailyIncrement = (count) => {
    changeDailyIncrement(props.data.id, count)
    popup.isVisible = false
}

const textDescription = ref(null)
const toggle = () => {
    textDescription.value.scrollTop = 0
    descriptionText.short = !descriptionText.short
}

</script>
<style scoped lang="scss">
.slide-out-enter-active,
.slide-out-leave-active {
  transition: all 0.3s;
}

.slide-out-enter,
.slide-out-leave-to {
  opacity: 0;
  transform: translateY(-340px);
}

.project-info-description {
    border-radius: 10px;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    padding: 20px;
    box-sizing: border-box;
    color: #191B2A;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    display: block;
    line-height: 154.183%; /* 21.586px */
  min-height: 240px;



  p {
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-word;
    color: #191B2A;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    transition: all .3s ease;
    height: auto;
  }

  .project-info-description_text {
    position: relative;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-word;
    color: #191B2A;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 5px;
    width: 100%;


    p {
      white-space: pre-wrap;
      max-height: 500px;
      overflow: hidden auto;
      transition: all 1s;

      &.is-collapsed {
        transition: all 1s;
        max-height: 65px;
        overflow: hidden;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

  }

  .exchanger_stats {
    display: flex;
    gap: 20px;
    margin-top: 10px;


    .exchanger_stat {
      width: 15%;
    }
  }

  h4 {
    color: #191B2A;
    text-align: left;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 5px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .menu-item {
    margin-top: auto;
    width: 100%;
    align-items: end;
    display: flex;
    justify-content: end;

    .item, .item a {
      color: #7c7c7c;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: .3s ease;

      svg {
        path {
          stroke: #838383;
        }
      }
    }
    a:hover , .change:hover {
      cursor: pointer;
      color: #575757;

      svg {
        path {
          stroke: #575757;
        }
      }
    }
    .sep {
      width: 1px;
      height: 20px;
      background-color: #bdbdbd;
      margin-left: 15px;
      margin-right: 15px;

    }
  }
  .more-toggle {
    cursor: pointer;
    color: #7c7c7c;
    transition: .3s ease;

    &:hover {
      color: #5D599F;
    }
  }
}

@media screen and (max-width: 500px){
  .project-info-description {
    .exchanger_stats {
      flex-wrap: wrap;
      align-items: center;

      .exchanger_stat {
        width: 45%;
      }
    }
    .menu-item {
      width: 100%;
      align-items: center;
      margin-left: 0!important;
    }
  }
}
</style>