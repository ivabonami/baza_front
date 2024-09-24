<template>
  <div class="sort" data-dropdown="projectssort" @click="onDropdownStateChange()">
    <span class="sort-name" data-dropdown="projectssort">
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-dropdown="projectssort">
       <path data-dropdown="projectssort" d="M2.38589 3.66687C1.62955 2.82155 1.25138 2.39889 1.23712 2.03968C1.22473 1.72764 1.35882 1.42772 1.59963 1.22889C1.87684 1 2.44399 1 3.57828 1H18.4212C19.5555 1 20.1227 1 20.3999 1.22889C20.6407 1.42772 20.7748 1.72764 20.7624 2.03968C20.7481 2.39889 20.3699 2.82155 19.6136 3.66687L13.9074 10.0444C13.7566 10.2129 13.6812 10.2972 13.6275 10.3931C13.5798 10.4781 13.5448 10.5697 13.5236 10.6648C13.4997 10.7721 13.4997 10.8852 13.4997 11.1113V16.4584C13.4997 16.6539 13.4997 16.7517 13.4682 16.8363C13.4403 16.911 13.395 16.9779 13.336 17.0315C13.2692 17.0922 13.1784 17.1285 12.9969 17.2012L9.59686 18.5612C9.22931 18.7082 9.04554 18.7817 8.89802 18.751C8.76901 18.7242 8.6558 18.6476 8.583 18.5377C8.49975 18.4122 8.49975 18.2142 8.49975 17.8184V11.1113C8.49975 10.8852 8.49975 10.7721 8.47587 10.6648C8.45469 10.5697 8.41971 10.4781 8.37204 10.3931C8.31828 10.2972 8.2429 10.2129 8.09213 10.0444L2.38589 3.66687Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <svg width="14" height="8" viewBox="0 0 14 8" class="arrow" data-dropdown="projectssort" :class="direction" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 7L13 1" stroke="black" data-dropdown="projectssort" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>


      <dropdownBox v-if="dropdown.show === true"
                   :selector="'projectssort'"
                   @closeDropdown="onDropdownStateChange()"
      >
      <div class="sort-item" v-for="sort of $props.sorts" @click="setNewActiveSort(sort)">
        {{ sort.name }}

        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="">
         <path d="M6.5 11L9.5 14L15.5 8M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>
    </dropdownBox>


    </span>


  </div>
</template>

<script>
import dropdownBox from "@/components/ReUsable/DropdownBox.vue";


export default {
  name: "BaseSort.vue",
  props: {
    sorts: []
  },
  data() {
    return {
      dropdown: {
        show: false
      },
      direction: 'down',
      activeSort: {}
    }
  },

  components: {
    dropdownBox
  },

  methods: {
    onDropdownStateChange() {
      this.dropdown.show = !this.dropdown.show
      this.direction === 'up' ? this.direction = 'down' : this.direction = 'up'
    },
    setNewActiveSort(sort) {
      this.activeSort = sort
      this.$emit('sortChanged', sort)
    }
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.sort {



  .sort-item {
    color: #6B6B6B;
    transition: .3s ease;

    &:hover {
      color: #1E1E1E;
    }
  }
  .sort-name {
    position: relative;
    border-radius: 20px;
    background-color: transparent;
    transition: .3s ease;
    padding: 5px 15px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #d9d8ef;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      background-color: rgba(93, 89, 159, 0.15);
    }

    svg {
      path {
        transition: .3s ease;
        stroke: #7773FB;
      }
    }

    .arrow {
      transition: .3s ease;

      &.up {
        rotate: 180deg;
      }
      &.down {
        rotate: 0deg;
      }
    }

    &:hover {
      svg {
        path {
          stroke: #5D599F;
        }
      }
    }
  }
}
</style>