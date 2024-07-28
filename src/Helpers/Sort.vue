<template>
  <div class="filter" data-dropdown="true">
    <div
        data-dropdown="true"
        @click="() => {
          this.showDropdown = !this.showDropdown
              document.addEventListener('keydown', e => {this.closeDropdown()})
              document.addEventListener('mousedown', e => {
                if (e.target.dataset.dropdown !== 'true') {
                  console.log(e.target.dataset.dropdown)
                  this.closeDropdown()
                }
              })
        }"
        class="filter_current">
<!--      <svg data-dropdown="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">-->
<!--        <path data-dropdown="true" d="M5.66667 8H2.24444C1.80885 8 1.59105 8 1.42467 8.08477C1.27833 8.15934 1.15934 8.27833 1.08477 8.42467C1 8.59105 1 8.80885 1 9.24444V13.7556C1 14.1912 1 14.409 1.08477 14.5753C1.15934 14.7217 1.27833 14.8407 1.42467 14.9152C1.59105 15 1.80885 15 2.24444 15H5.66667M5.66667 15H10.3333M5.66667 15L5.66667 5.35556C5.66667 4.91996 5.66667 4.70216 5.75144 4.53579C5.82601 4.38944 5.94499 4.27045 6.09134 4.19588C6.25772 4.11111 6.47551 4.11111 6.91111 4.11111H9.08889C9.52449 4.11111 9.74228 4.11111 9.90866 4.19588C10.055 4.27045 10.174 4.38944 10.2486 4.53579C10.3333 4.70216 10.3333 4.91996 10.3333 5.35556V15M10.3333 15H13.7556C14.1912 15 14.4089 15 14.5753 14.9152C14.7217 14.8407 14.8407 14.7217 14.9152 14.5753C15 14.4089 15 14.1912 15 13.7556V2.24444C15 1.80885 15 1.59105 14.9152 1.42467C14.8407 1.27833 14.7217 1.15934 14.5753 1.08477C14.409 1 14.1912 1 13.7556 1H11.5778C11.1422 1 10.9244 1 10.758 1.08477C10.6117 1.15934 10.4927 1.27833 10.4181 1.42467C10.3333 1.59105 10.3333 1.80885 10.3333 2.24444V4.88889" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--      </svg>-->
      <svg width="20" data-dropdown="true" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path data-dropdown="true"  d="M13.5 1H11.5C10.3954 1 9.5 1.89543 9.5 3C9.5 4.10457 10.3954 5 11.5 5H13.5C14.6046 5 15.5 4.10457 15.5 3C15.5 1.89543 14.6046 1 13.5 1Z" stroke="#7773FB" stroke-width="2"/>
        <path data-dropdown="true"  d="M7.5 9H9.5C10.6046 9 11.5 9.89543 11.5 11C11.5 12.1046 10.6046 13 9.5 13H7.5C6.39543 13 5.5 12.1046 5.5 11C5.5 9.89543 6.39543 9 7.5 9Z" stroke="#7773FB" stroke-width="2"/>
        <path data-dropdown="true"  d="M1 2C0.44772 2 0 2.44772 0 3C0 3.55228 0.44772 4 1 4V2ZM9.5 2H1V4H9.5V2Z" fill="#7773FB"/>
        <path data-dropdown="true"  d="M14.5 11H19" stroke="#7773FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path data-dropdown="true"  d="M19 3H18.5" stroke="#7773FB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path data-dropdown="true"  d="M1 12C0.44772 12 0 11.5523 0 11C0 10.4477 0.44772 10 1 10V12ZM1 10H5.5V12H1V10Z" fill="#7773FB"/>
      </svg>

      <span data-dropdown="true" class="sort">
        {{ normalizeSortName(this.selected.name) }}
      </span>
      <svg class="sort-mobile" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 7L13 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
    <div
        data-dropdown="true"
        v-if="showDropdown"
        class="filter_dropdown_items"
    >

      <div class="filter_dropdown_items_item"
           data-dropdown="true"
           :class="{active: $props.sort.name === sort.name}"
           @click="() => {
             if ($props.sort.name !== sort.name) {
               $emit('sortChanged', sort)
               this.selected = sort
               closeDropdown()
             }

           }"
           v-for="sort of $props.sort">
        {{ sort.name }}

        <svg data-dropdown="true" v-show="$props.sort.name === sort.name" xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M14 1L5.0625 10L1 5.90909" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "SortSlot.vue",
  props: {
    sort: Array
  },
  data() {
    return {
      showDropdown: false,
      selected: {}
    }
  },
  components: {},
  watch: {
    sort: function () {

    }
  },
  mounted() {

    this.selected = this.$props.sort[0]
    document.addEventListener('keydown', this.closeDropdown)
    document.addEventListener('mousedown', e => {
      if (e.target.dataset.dropdown !== 'true') {
        this.closeDropdown()
      }
    })


  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.closeDropdown)
    document.removeEventListener('mousedown', e => {
      if (e.target.dataset.dropdown !== 'true') {
        console.log(e.target.dataset.dropdown)
        this.closeDropdown()
      }
    })
  },
  methods: {
    closeDropdown () {
      this.showDropdown = false

    },
    normalizeSortName(sortName) {
      if (sortName) {
        if (sortName.length > 10) {
          return sortName.substring(0, 9) + '...'
        } else {
          return sortName
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.filter {
  position: relative;

  .filter_current {
    border-radius: 10px;
    border: 1px solid var(--gray-2, #D8D8D8);
    width: 150px;
    display: flex;
    gap: 10px;
    padding: 8px;
    cursor: pointer;
    transition: .15s ease;
    align-items: center;

    color: #000;
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;

    .sort-mobile {
      display: none;
    }

    &:hover {
      border-color: #b2b2b2;
    }

  }

  .filter_dropdown_items {
    border-radius: 10px;
    border: 1px solid var(--lightgray, #F2F5F7);
    background: #FFF;
    width: 180px;
    position: absolute;
    z-index: 10;
    right: -15px;
    margin-top: 5px;


    .filter_dropdown_items_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      transition: .15s ease;
      cursor: pointer;
      overflow: hidden;
      gap: 15px;
      font-size: 14px;

      &.active {
        cursor: default;
        background-color: #f5f5f5;
      }

      &:hover {
        background-color: #efefef;
      }
    }
  }

}
@media screen and (max-width: 768px){
  .filter {
    display: flex;
    justify-content: center;
    padding-left: 10px;
    box-sizing: border-box;
    position: relative;
    top: -2px;

    .filter_current {
      border-color: transparent;
      padding-top: 12px;
      width: 50px;
      align-items: center;
      gap: 15px;

      &:hover, &:focus {
        border-color: transparent;
      }

      .sort-mobile {
        display: flex;
        path {
          stroke-width: 1px;
        }
      }

    }

    .sort {
      display: none;
    }
  }
}
</style>