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
      <svg data-dropdown="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path data-dropdown="true" d="M5.66667 8H2.24444C1.80885 8 1.59105 8 1.42467 8.08477C1.27833 8.15934 1.15934 8.27833 1.08477 8.42467C1 8.59105 1 8.80885 1 9.24444V13.7556C1 14.1912 1 14.409 1.08477 14.5753C1.15934 14.7217 1.27833 14.8407 1.42467 14.9152C1.59105 15 1.80885 15 2.24444 15H5.66667M5.66667 15H10.3333M5.66667 15L5.66667 5.35556C5.66667 4.91996 5.66667 4.70216 5.75144 4.53579C5.82601 4.38944 5.94499 4.27045 6.09134 4.19588C6.25772 4.11111 6.47551 4.11111 6.91111 4.11111H9.08889C9.52449 4.11111 9.74228 4.11111 9.90866 4.19588C10.055 4.27045 10.174 4.38944 10.2486 4.53579C10.3333 4.70216 10.3333 4.91996 10.3333 5.35556V15M10.3333 15H13.7556C14.1912 15 14.4089 15 14.5753 14.9152C14.7217 14.8407 14.8407 14.7217 14.9152 14.5753C15 14.4089 15 14.1912 15 13.7556V2.24444C15 1.80885 15 1.59105 14.9152 1.42467C14.8407 1.27833 14.7217 1.15934 14.5753 1.08477C14.409 1 14.1912 1 13.7556 1H11.5778C11.1422 1 10.9244 1 10.758 1.08477C10.6117 1.15934 10.4927 1.27833 10.4181 1.42467C10.3333 1.59105 10.3333 1.80885 10.3333 2.24444V4.88889" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span data-dropdown="true" class="sort">
        {{ normalizeSortName(this.selected.name) }}
      </span>
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

    color: #000;
    font-family: "PT Sans Caption";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;

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
    right: 0;
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
@media screen and (max-width: 600px){
  .filter {
    display: flex;
    justify-content: center;
    padding-left: 10px;
    box-sizing: border-box;
    position: relative;
    top: -2px;

    .filter_current {
      padding: 10px 8px;
      width: 14px;

    }
    .sort {
      display: none;
    }
  }
}
</style>