<template>
  <div class="categories-menu"
       @mousedown="(e) => {
            this.position = e.screenX
            this.dragSlide()
          }"
       @touchstart="e => this.position = e.targetTouches[0].screenX"
       @touchend="stopDrag"
       @touchmove="e => mobileDrag(e)"
       @mouseup="stopDrag"
       @mouseleave="stopDrag"
  >

    <div  ref="categoriesWrapper" class="categories-menu_items_wrapper">
      <div class="nav prev" @click="prevItem" v-if="scrollActive && step > 0">
        <svg width="33" height="44" viewBox="0 0 33 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="32" height="43" rx="16" stroke="#191B2A"/>
          <path d="M18.9971 26.2103C18.9977 26.107 18.98 26.0045 18.9452 25.9089C18.9104 25.8132 18.8591 25.7262 18.7943 25.6528L15.5833 22.0568C15.5178 21.9838 15.4657 21.897 15.4302 21.8013C15.3947 21.7056 15.3764 21.603 15.3764 21.4993C15.3764 21.3957 15.3947 21.2931 15.4302 21.1974C15.4657 21.1017 15.5178 21.0149 15.5833 20.9419L18.7943 17.3458C18.926 17.198 19 16.9975 19 16.7884C19 16.5793 18.926 16.3788 18.7943 16.2309C18.6625 16.0831 18.4839 16 18.2976 16C18.2053 16 18.114 16.0204 18.0288 16.06C17.9436 16.0996 17.8661 16.1577 17.8009 16.2309L14.597 19.8348C14.2139 20.2823 14 20.8788 14 21.4993C14 22.1199 14.2139 22.7164 14.597 23.1639L17.8009 26.7678C17.8659 26.8413 17.9433 26.8998 18.0286 26.9396C18.1138 26.9795 18.2052 27 18.2976 27C18.3899 27 18.4814 26.9795 18.5666 26.9396C18.6519 26.8998 18.7292 26.8413 18.7943 26.7678C18.8591 26.6944 18.9104 26.6074 18.9452 26.5117C18.98 26.4161 18.9977 26.3136 18.9971 26.2103Z" fill="black"/>
        </svg>

      </div>

      <div class="categories-menu_items" :style="styles" ref="categoryBox">
        <div  class="categories-menu_items_item"
             ref="categoryBoxItem"
             @click="$emit('projectsCategory', category.id)"
             :class="{active: $props.activeCategory === category.id}"
             v-for="(category, index) of $props.categories">

          <div>
            <div class="category-icon">
              <svg xmlns="http://www.w3.org/2000/svg" v-if="category.name === 'Маркетплейсы'" viewBox="0 0 20 22" fill="none">
                <path d="M14.1625 8V5C14.1625 2.79086 12.3716 1 10.1625 1C7.95334 1 6.16248 2.79086 6.16248 5V8M1.75448 9.35196L1.15448 15.752C0.983885 17.5717 0.898586 18.4815 1.20053 19.1843C1.46578 19.8016 1.9306 20.3121 2.5205 20.6338C3.192 21 4.10585 21 5.93353 21H14.3914C16.2191 21 17.133 21 17.8045 20.6338C18.3944 20.3121 18.8592 19.8016 19.1244 19.1843C19.4264 18.4815 19.3411 17.5717 19.1705 15.752L18.5705 9.35197C18.4264 7.81535 18.3544 7.04704 18.0088 6.46616C17.7045 5.95458 17.2548 5.54511 16.7171 5.28984C16.1065 5 15.3348 5 13.7914 5L6.53353 5C4.99017 5 4.21849 5 3.6079 5.28984C3.07014 5.54511 2.62049 5.95458 2.31614 6.46616C1.97057 7.04704 1.89854 7.81534 1.75448 9.35196Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Форумы'" viewBox="0 0 22 22" fill="none">
                <path d="M5.09436 10.2288C5.03221 9.82823 4.99996 9.41786 4.99996 9C4.99996 4.58172 8.60525 1 13.0526 1C17.4999 1 21.1052 4.58172 21.1052 9C21.1052 9.99807 20.9213 10.9535 20.5852 11.8345C20.5154 12.0175 20.4804 12.109 20.4646 12.1804C20.4489 12.2512 20.4428 12.301 20.4411 12.3735C20.4394 12.4466 20.4493 12.5272 20.4692 12.6883L20.8717 15.9585C20.9153 16.3125 20.9371 16.4895 20.8782 16.6182C20.8266 16.731 20.735 16.8205 20.6211 16.8695C20.4911 16.9254 20.3146 16.8995 19.9617 16.8478L16.7765 16.3809C16.6101 16.3565 16.527 16.3443 16.4512 16.3448C16.3763 16.3452 16.3245 16.3507 16.2511 16.3661C16.177 16.3817 16.0823 16.4172 15.893 16.4881C15.0097 16.819 14.0524 17 13.0526 17C12.6344 17 12.2237 16.9683 11.8227 16.9073M6.63158 21C9.59648 21 12 18.5376 12 15.5C12 12.4624 9.59648 10 6.63158 10C3.66668 10 1.26316 12.4624 1.26316 15.5C1.26316 16.1106 1.36028 16.6979 1.53955 17.2467C1.61533 17.4787 1.65322 17.5947 1.66566 17.6739C1.67864 17.7567 1.68091 17.8031 1.67608 17.8867C1.67145 17.9668 1.65141 18.0573 1.61134 18.2383L1 21L3.9948 20.591C4.15827 20.5687 4.24 20.5575 4.31137 20.558C4.38652 20.5585 4.42641 20.5626 4.50011 20.5773C4.5701 20.5912 4.67416 20.6279 4.88227 20.7014C5.43059 20.8949 6.01911 21 6.63158 21Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Обменники'" viewBox="0 0 22 22" fill="none">
                <path d="M5 5L7 3M7 3L5 1M7 3H5C2.79086 3 1 4.79086 1 7M17 17L15 19M15 19L17 21M15 19H17C19.2091 19 21 17.2091 21 15M9.18903 5.5C9.85509 2.91216 12.2042 1 15 1C18.3137 1 21 3.68629 21 7C21 9.79574 19.0879 12.1449 16.5001 12.811M13 15C13 18.3137 10.3137 21 7 21C3.68629 21 1 18.3137 1 15C1 11.6863 3.68629 9 7 9C10.3137 9 13 11.6863 13 15Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Услуги'" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 4H10.9344C13.9816 4 15.5053 4 16.0836 4.54729C16.5836 5.02037 16.8051 5.71728 16.6702 6.39221C16.514 7.17302 15.2701 8.05285 12.7823 9.81253L8.71772 12.6875C6.2299 14.4471 4.98599 15.327 4.82984 16.1078C4.69486 16.7827 4.91642 17.4796 5.41636 17.9527C5.99474 18.5 7.51836 18.5 10.5656 18.5H11.5M7 4C7 5.65685 5.65685 7 4 7C2.34315 7 1 5.65685 1 4C1 2.34315 2.34315 1 4 1C5.65685 1 7 2.34315 7 4ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-else-if="category.name === 'Графика и дизайн' || category.name === 'Дизайн'" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.5H4.5C2.567 1.5 1 3.067 1 5C1 6.933 2.567 8.5 4.5 8.5M8 1.5V8.5M8 1.5H11.5C13.433 1.5 15 3.067 15 5C15 6.933 13.433 8.5 11.5 8.5M8 8.5H4.5M8 8.5V15.5M8 8.5H11.5M4.5 8.5C2.567 8.5 1 10.067 1 12C1 13.933 2.567 15.5 4.5 15.5M8 15.5H4.5M8 15.5V19C8 20.933 6.433 22.5 4.5 22.5C2.567 22.5 1 20.933 1 19C1 17.067 2.567 15.5 4.5 15.5M11.5 8.5C13.433 8.5 15 10.067 15 12C15 13.933 13.433 15.5 11.5 15.5C9.567 15.5 8 13.933 8 12C8 10.067 9.567 8.5 11.5 8.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-else-if="category.name === 'Магазины ПАВ'" width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15.5H2.5M5.5 10H1M8 4.5H3M16 1L9.40357 10.235C9.1116 10.6438 8.96562 10.8481 8.97194 11.0185C8.97744 11.1669 9.04858 11.3051 9.1661 11.3958C9.30108 11.5 9.55224 11.5 10.0546 11.5H15L14 19L20.5964 9.76499C20.8884 9.35624 21.0344 9.15187 21.0281 8.98147C21.0226 8.83312 20.9514 8.69489 20.8339 8.60418C20.6989 8.5 20.4478 8.5 19.9454 8.5H15L16 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>


              <svg v-else-if="category.name === 'Товары и услуги'" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5.9966C2.83599 5.99236 2.7169 5.98287 2.60982 5.96157C1.81644 5.80376 1.19624 5.18356 1.03843 4.39018C1 4.19698 1 3.96466 1 3.5C1 3.03534 1 2.80302 1.03843 2.60982C1.19624 1.81644 1.81644 1.19624 2.60982 1.03843C2.80302 1 3.03534 1 3.5 1H18.5C18.9647 1 19.197 1 19.3902 1.03843C20.1836 1.19624 20.8038 1.81644 20.9616 2.60982C21 2.80302 21 3.03534 21 3.5C21 3.96466 21 4.19698 20.9616 4.39018C20.8038 5.18356 20.1836 5.80376 19.3902 5.96157C19.2831 5.98287 19.164 5.99236 19 5.9966M9 11H13M3 6H19V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H7.8C6.11984 19 5.27976 19 4.63803 18.673C4.07354 18.3854 3.6146 17.9265 3.32698 17.362C3 16.7202 3 15.8802 3 14.2V6Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-else-if="category.name === 'Магазины CC' || category.name === 'Магазины СС'"  width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 18L19.5 16.5M21 6H1M21 8V4.2C21 3.0799 21 2.51984 20.782 2.09202C20.5903 1.7157 20.2843 1.40974 19.908 1.21799C19.4802 1 18.9201 1 17.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.7157 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V11.8C1 12.9201 1 13.4802 1.21799 13.908C1.40973 14.2843 1.71569 14.5903 2.09202 14.782C2.51984 15 3.0799 15 4.2 15H9.5M20.5 14C20.5 15.933 18.933 17.5 17 17.5C15.067 17.5 13.5 15.933 13.5 14C13.5 12.067 15.067 10.5 17 10.5C18.933 10.5 20.5 12.067 20.5 14Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>


              <svg xmlns="http://www.w3.org/2000/svg"  v-else-if="category.name === 'Другое'"  viewBox="0 0 22 18" fill="none">
                <path d="M1.5 9H4.88197C5.56717 9 6.19357 9.38713 6.5 10C6.80643 10.6129 7.43283 11 8.11803 11H13.882C14.5672 11 15.1936 10.6129 15.5 10C15.8064 9.38713 16.4328 9 17.118 9H20.5M7.96656 1H14.0334C15.1103 1 15.6487 1 16.1241 1.16396C16.5445 1.30896 16.9274 1.5456 17.2451 1.85675C17.6043 2.2086 17.8451 2.6902 18.3267 3.65337L20.4932 7.9865C20.6822 8.36449 20.7767 8.55348 20.8434 8.75155C20.9026 8.92745 20.9453 9.10847 20.971 9.29226C21 9.49923 21 9.71053 21 10.1331V12.2C21 13.8802 21 14.7202 20.673 15.362C20.3854 15.9265 19.9265 16.3854 19.362 16.673C18.7202 17 17.8802 17 16.2 17H5.8C4.11984 17 3.27976 17 2.63803 16.673C2.07354 16.3854 1.6146 15.9265 1.32698 15.362C1 14.7202 1 13.8802 1 12.2V10.1331C1 9.71053 1 9.49923 1.02897 9.29226C1.05471 9.10847 1.09744 8.92745 1.15662 8.75155C1.22326 8.55348 1.31776 8.36448 1.50675 7.9865L3.67331 3.65337C4.1549 2.69019 4.3957 2.2086 4.75495 1.85675C5.07263 1.5456 5.45551 1.30896 5.87589 1.16396C6.35125 1 6.88969 1 7.96656 1Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-else viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.4 1H2.6C2.03995 1 1.75992 1 1.54601 1.10899C1.35785 1.20487 1.20487 1.35785 1.10899 1.54601C1 1.75992 1 2.03995 1 2.6V6.4C1 6.96005 1 7.24008 1.10899 7.45399C1.20487 7.64215 1.35785 7.79513 1.54601 7.89101C1.75992 8 2.03995 8 2.6 8H6.4C6.96005 8 7.24008 8 7.45399 7.89101C7.64215 7.79513 7.79513 7.64215 7.89101 7.45399C8 7.24008 8 6.96005 8 6.4V2.6C8 2.03995 8 1.75992 7.89101 1.54601C7.79513 1.35785 7.64215 1.20487 7.45399 1.10899C7.24008 1 6.96005 1 6.4 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.4 1H13.6C13.0399 1 12.7599 1 12.546 1.10899C12.3578 1.20487 12.2049 1.35785 12.109 1.54601C12 1.75992 12 2.03995 12 2.6V6.4C12 6.96005 12 7.24008 12.109 7.45399C12.2049 7.64215 12.3578 7.79513 12.546 7.89101C12.7599 8 13.0399 8 13.6 8H17.4C17.9601 8 18.2401 8 18.454 7.89101C18.6422 7.79513 18.7951 7.64215 18.891 7.45399C19 7.24008 19 6.96005 19 6.4V2.6C19 2.03995 19 1.75992 18.891 1.54601C18.7951 1.35785 18.6422 1.20487 18.454 1.10899C18.2401 1 17.9601 1 17.4 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.4 12H13.6C13.0399 12 12.7599 12 12.546 12.109C12.3578 12.2049 12.2049 12.3578 12.109 12.546C12 12.7599 12 13.0399 12 13.6V17.4C12 17.9601 12 18.2401 12.109 18.454C12.2049 18.6422 12.3578 18.7951 12.546 18.891C12.7599 19 13.0399 19 13.6 19H17.4C17.9601 19 18.2401 19 18.454 18.891C18.6422 18.7951 18.7951 18.6422 18.891 18.454C19 18.2401 19 17.9601 19 17.4V13.6C19 13.0399 19 12.7599 18.891 12.546C18.7951 12.3578 18.6422 12.2049 18.454 12.109C18.2401 12 17.9601 12 17.4 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.4 12H2.6C2.03995 12 1.75992 12 1.54601 12.109C1.35785 12.2049 1.20487 12.3578 1.10899 12.546C1 12.7599 1 13.0399 1 13.6V17.4C1 17.9601 1 18.2401 1.10899 18.454C1.20487 18.6422 1.35785 18.7951 1.54601 18.891C1.75992 19 2.03995 19 2.6 19H6.4C6.96005 19 7.24008 19 7.45399 18.891C7.64215 18.7951 7.79513 18.6422 7.89101 18.454C8 18.2401 8 17.9601 8 17.4V13.6C8 13.0399 8 12.7599 7.89101 12.546C7.79513 12.3578 7.64215 12.2049 7.45399 12.109C7.24008 12 6.96005 12 6.4 12Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
            <div class="category-name">
              {{ category.name }}
            </div>
          </div>







        </div>
      </div>

      <div class="categories-menu_items_clear" @click="$emit('projectsCategory', null)" v-if="$props.activeCategory">
        <div class="icon">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L1 11M1 1L11 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </div>
      </div>

      <div class="nav next" @click="nextItem" v-if="scrollActive">
        <svg width="33" height="44" viewBox="0 0 33 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="-0.5" y="0.5" width="32" height="43" rx="16" transform="matrix(-1 0 0 1 32 0)" stroke="#191B2A"/>
          <path d="M14.0029 26.2103C14.0023 26.107 14.02 26.0045 14.0548 25.9089C14.0896 25.8132 14.1409 25.7262 14.2057 25.6528L17.4167 22.0568C17.4822 21.9838 17.5343 21.897 17.5698 21.8013C17.6053 21.7056 17.6236 21.603 17.6236 21.4993C17.6236 21.3957 17.6053 21.2931 17.5698 21.1974C17.5343 21.1017 17.4822 21.0149 17.4167 20.9419L14.2057 17.3458C14.074 17.198 14 16.9975 14 16.7884C14 16.5793 14.074 16.3788 14.2057 16.2309C14.3375 16.0831 14.5161 16 14.7024 16C14.7947 16 14.886 16.0204 14.9712 16.06C15.0564 16.0996 15.1339 16.1577 15.1991 16.2309L18.403 19.8348C18.7861 20.2823 19 20.8788 19 21.4993C19 22.1199 18.7861 22.7164 18.403 23.1639L15.1991 26.7678C15.1341 26.8413 15.0567 26.8998 14.9714 26.9396C14.8862 26.9795 14.7948 27 14.7024 27C14.6101 27 14.5186 26.9795 14.4334 26.9396C14.3481 26.8998 14.2708 26.8413 14.2057 26.7678C14.1409 26.6944 14.0896 26.6074 14.0548 26.5117C14.02 26.4161 14.0023 26.3136 14.0029 26.2103Z" fill="black"/>
        </svg>

      </div>



    </div>


  </div>
</template>

<script>
import {categoriesStore} from "../../Store/categories.js";

export default {
  name: "MenuMain.vue",
  props: {
    activeCategory: 0,
    categories: Array
  },
  data() {
    return {
      loadingError: false,
      position: null,
      styles: null,
      categoriesStore,
      step: 0,
      visibleItems: 0,
      scrollActive: false,
      resizeTimeout: null,
    }
  },

  components: {

  },

  methods: {
    mobileDrag(e) {
      if (e.targetTouches[0].screenX - 50 > this.position && this.step > 0) {
        this.scrollActive = true
        this.prevItem()
        this.stopDrag()
        this.position = e.targetTouches[0].screenX
      } else if (e.targetTouches[0].screenX< this.position -50) {
        this.nextItem()
        this.stopDrag()
        this.position = e.targetTouches[0].screenX
      }
      this.stopDrag()

    },
    dragSlide() {
      if (this.scrollActive) {
        window.addEventListener('mousemove', this.dragToSlide)
      }


    },
    stopDrag() {
      window.removeEventListener('mousemove', this.dragToSlide)
    },
    dragToSlide(event) {

      if( window.innerWidth > 768 ) {
        if (event.screenX - 90 > this.position && this.step > 0) {
          this.scrollActive = true
          this.prevItem()
          this.position = event.screenX
        } else if (event.screenX < this.position - 80) {
          this.scrollActive = true
          this.nextItem()
          this.position = event.screenX
        }
      } else {
        if (event.screenX - 40 > this.position && this.step > 0) {
          this.scrollActive = true
          this.prevItem()
          this.position = event.screenX
        } else if (event.screenX < this.position - 40) {
          this.scrollActive = true
          this.nextItem()
          this.position = event.screenX
        }
      }
    },
    nextItem() {
      const category = this.categories.shift()
      this.categories.push(category)
      this.step++
      this.scrollActive = true
      const clientWidth = this.$refs.categoriesWrapper.clientWidth

    },
    prevItem() {
      this.scrollActive = true
      const category = this.categories.pop()
      this.categories.unshift(category)
      this.step--
    },
    detectOverflow(width) {
      if (this.resizeTimeout) {
        this.resizeTimeout = null
      }
      this.resizeTimeout = setTimeout(() => {
        if (this.$refs.categoryBox.scrollWidth > this.$refs.categoriesWrapper.scrollWidth) {
          this.scrollActive  = true
        } else {
          this.scrollActive  = false
        }
      }, 200)

    }
  },

  mounted() {
    window.addEventListener("resize", this.detectOverflow);
    this.detectOverflow()
  },
  updated() {

  },


  watch: {
    categoriesStore: function (newVal, oldVal) {
      this.categories = newVal.categories

    }
  }

}
</script>

<style scoped lang="scss">
.categories-menu_items_wrapper {
  width: 100%;
  box-sizing: border-box;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  .categories-menu_items_clear {
    cursor: pointer;
    svg {
      height: 20px;
      path {
        stroke-width: 1px;
      }
    }
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap:0;
    padding-left: 5px;
    padding-right: 5px;
  }
}
.categories-menu {
  overflow: hidden;
  width: 100%;
  display: flex;

  position: relative;

  .nav {
    z-index: 2;
    box-sizing: border-box;
    margin-top: 4px;

    &.next {

    }
    &.prev {

    }

    svg {
      cursor: pointer;
      height: 28px;

      rect {
        opacity: .6;
        fill: #F8F7FC;
        transition: .15s ease;
      }
      &:hover {
        rect {
          fill: #FFC700;
          stroke-width: 0;
        }

      }
    }
  }

  .categories-menu_items {
    display: flex;
    gap: 18px;
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */

    &::after {
      content: "";
      flex: auto;
    }



    .categories-menu_items_item {
      text-align: center;
      color: #000;
      font-family: "PT Sans Caption";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;
      transition: .15s ease;
      border-bottom: 1px solid transparent;
      white-space: nowrap;


      &:hover {
        border-bottom-color: rgba(0,0,0,.3);
      }

      svg {
        height: 20px;
        path {
          stroke-width: 1px;
        }
      }

      &.active {
        border-bottom-color: black;
      }

    }
  }
}
@media screen and (max-width: 600px){
  .categories-menu .nav.next {
    right: 20px;
  }
  .categories-menu_items_wrapper {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>