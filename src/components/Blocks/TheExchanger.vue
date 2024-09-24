<template>
  <div class="exchanger-box">

    <div class="exchanger-box_input" v-if="coinRate && !loading">
      <div class="exchanger-box_currency">
        <div class="currency-from">
          1 <span>{{ coinRate.currency }}</span>
        </div>
        <svg class="swapIcon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5L7 3M7 3L5 1M7 3H5C2.79086 3 1 4.79086 1 7M17 17L15 19M15 19L17 21M15 19H17C19.2091 19 21 17.2091 21 15M9.18903 5.5C9.85509 2.91216 12.2042 1 15 1C18.3137 1 21 3.68629 21 7C21 9.79574 19.0879 12.1449 16.5001 12.811M13 15C13 18.3137 10.3137 21 7 21C3.68629 21 1 18.3137 1 15C1 11.6863 3.68629 9 7 9C10.3137 9 13 11.6863 13 15Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <div class="currency-to" @click="dropdown.show = !dropdown.show" data-dropdown="exchanger">
          {{ currentSelectedCurrency.rate }}
          {{ currentSelectedCurrency.name }}

        </div>

         <dropdown-box v-if="dropdown.show === true"
                       :selector="'exchanger'"
                       @closeDropdown="dropdown.show = false">
           <div class="rates"
                :class="{selected: currentSelectedCurrency.name === name}"
                @click="changeSelectedCurrency(rate, name)"
                v-for="(rate, name) of coinRate.rates"
                :key="name"
           >
             {{ rate.substring(0, rate.indexOf('.') + 3) }} {{ name }}

             <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="currentSelectedCurrency.name === name">
               <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </div>

         </dropdown-box>
      </div>

      <button-black
          @buttonPressed="callModal({
            show: !popup.show,
            component: 'ExternalLink',
          })"
      >
        Обменять
      </button-black>

    </div>



    <div class="loading" v-if="loading">
      <TheLoader />
    </div>
<!--    <div class="exchanger-box_icon">-->

<!--    </div>-->
  </div>
</template>
<script>
import {getCoinIcon, getCoinRate} from "@/API/exchangerController.js";
import {addNotice} from "@/js/notifications.js";
import dropdownBox from "@/components/ReUsable/DropdownBox.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import buttonBlack from "@/components/Buttons/ButtonBlack.vue";
import {popup} from "@/js/controllers/popupController.js";


export default {
  name: 'TheExchanger',
  data() {
    return {
      coinRate: null,
      getCoinIcon,
      dropdown: {
        show: false
      },
      popup: {
        show: false
      },
      loading: false,
      currentSelectedCurrency: {}
    }
  },
  components: {
    dropdownBox,
    TheLoader,
    buttonBlack
  },
  methods: {
    changeSelectedCurrency(rate, name) {
      this.currentSelectedCurrency.name = name
      this.currentSelectedCurrency.rate = rate.substring(0, rate.indexOf('.') + 3)
    },
    callModal(settings) {
      for (const option in settings) {
        popup[option] = settings[option]
      }
    },
    getRate() {
      this.loading = true

      getCoinRate('BTC')
          .then(result => {
            this.coinRate = result.data.rates.data
            this.changeSelectedCurrency(this.coinRate.rates['USD'], 'USD')
            this.loading = false
          })
          .catch(err => {
            addNotice({name: 'Нет!', type: 'warning'})
            this.loading = false
          })
    }
  },
  mounted() {
    this.getRate()

  }
}
</script>
<style lang="scss" scoped>
.exchanger-box {
  display: flex;
  gap: 15px;


  .arrow {

  }
  .exchanger-box_icon {

  }
  .loading {
    position: relative;
    width: 30px;
    height: 30px;
  }
  .exchanger-box_input {
    display: flex;
    gap: 20px;

    .exchanger-box_currency {
      position: relative;
      display: flex;
      gap: 10px;
      align-items: center;

      svg.swapIcon {
        path {
          stroke: #B3B4C9;
        }
      }

      .currency-from, .currency-to {
        border-radius: 21px;
        border: 1px dashed #B3B4C9;
        background: #F8F7FC;
        padding: 5px 10px;
        white-space: nowrap;
      }

      .currency-from {
        color: #B3B4C9;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

      }

      .currency-to {
        color: #B3B4C9;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        cursor: pointer;
        transition: .3s ease;

        &:hover {
          background: #ecebf3;
        }
      }

      .rates {
        color: #B3B4C9;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        cursor: pointer;
        transition: .3s ease;
        padding: 5px;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.selected {
          color: #433269;
        }

        &:hover {
          background: #ecebf3;
        }
      }

    }
  }
}

</style>
