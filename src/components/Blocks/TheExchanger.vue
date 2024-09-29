<template>
  <div class="exchanger-box">

    <div class="exchanger-box_input">
      <div class="exchanger-box_currency">
        <div class="currency-from" data-dropdown="exchangerFrom" @click="changeDropdownState(dropdownTo)">


          <p class="rates" data-dropdown="exchangerFrom">
            <b><span data-dropdown="exchangerFrom" class="text">Отдаете {{ currentSelectedCurrencyFrom.name }} </span></b>
            <br />
            <span data-dropdown="exchangerFrom" class="value"> {{ currentSelectedCurrencyFrom.rate || 'Введите количество' }} </span>
          </p>

          <dropdown-box v-if="dropdownTo.show === true"
                        :selector="'exchangerFrom'"
                        @closeDropdown="changeDropdownState(dropdownTo)">

            <div class="search" @click="changeDropdownState(dropdownTo, dropdownTo.show)">
              <input placeholder="Количество" class="search-coin" type="number" ref="coinSearch" v-model="currentSelectedCurrencyFrom.rate">
              <svg v-if="coinName.length > 0"
                   @click="coinName = ''"
                   width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 11M1 1L11 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
            <div class="coins-rates"
                 :class="{selected: currentSelectedCurrencyFrom.name === name}"
                 @click="() => {
                   changeSelectedCurrencyFrom(name)
                   changeDropdownState(dropdownTo)
                 }"
                 v-for="(name) of currencyRates.coinsFrom"
                 :key="name"
            >
              <span>{{ name }}</span>

              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="currentSelectedCurrencyFrom.name === name">
                <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

          </dropdown-box>
        </div>


        <svg class="swapIcon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 5L7 3M7 3L5 1M7 3H5C2.79086 3 1 4.79086 1 7M17 17L15 19M15 19L17 21M15 19H17C19.2091 19 21 17.2091 21 15M9.18903 5.5C9.85509 2.91216 12.2042 1 15 1C18.3137 1 21 3.68629 21 7C21 9.79574 19.0879 12.1449 16.5001 12.811M13 15C13 18.3137 10.3137 21 7 21C3.68629 21 1 18.3137 1 15C1 11.6863 3.68629 9 7 9C10.3137 9 13 11.6863 13 15Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <div class="currency-to" @click="changeDropdownState(dropdownFrom, dropdownTo.show)" data-dropdown="exchangerTo">

          <div class="loading" v-if="loading">
             <TheLoader />
          </div>

          <p v-else-if="currentSelectedCurrencyFrom.name && !loading" class="rates" data-dropdown="exchangerTo">
            <b><span data-dropdown="exchangerTo" class="text">Получаете {{ currentSelectedCurrency.name }}</span></b>
            <br />
            <span data-dropdown="exchangerTo" class="value">{{ calculateInputRate(currentSelectedCurrencyFrom.rate, currentSelectedCurrency.rate) }}</span>


          </p>

          <dropdown-box v-if="dropdownFrom.show === true && !loading"
                        :selector="'exchangerTo'"
                        @closeDropdown="changeDropdownState(dropdownFrom)">

            <div class="search" @click="changeDropdownState(dropdownFrom, dropdownFrom.show)">
              <input class="search-coin" placeholder="поиск валюты" type="text" data-dropdown="coinName" ref="coinSearch" v-model="coinName">
              <svg v-if="coinName.length > 0"
                   @click="coinName = ''"
                   width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 11M1 1L11 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
            <div class="coins-rates"
                 :class="{selected: currentSelectedCurrency.name === name}"
                 @click="() => {
                  changeSelectedCurrencyTo(rate, name)
                  changeDropdownState(dropdownFrom, dropdownFrom.show)
                }"
                 v-for="(rate, name) of currencyRates.rates[0]"
                 :key="name"
                 v-show="name.toLowerCase().includes(coinName.toLowerCase())"
            >
              <span>{{ name }}</span>

              <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="currentSelectedCurrency.name === name">
                <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

          </dropdown-box>
        </div>




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
import {currencyRates} from "@/Stores/currencyRates.js";


export default {
  name: 'TheExchanger',
  data() {
    return {
      coinValue: 1,
      dropdownFrom: {
        show: false
      },
      dropdownTo: {
        show: false
      },
      popup: {
        show: false
      },
      loading: false,
      currentSelectedCurrency: {},
      currentSelectedCurrencyFrom: {
        name: 'USDT',
        rate: 1
      },
      currencyRates,
      coinName: ''
    }
  },
  components: {
    dropdownBox,
    TheLoader,
    buttonBlack
  },
  methods: {
    changeDropdownState(dropdown, focus) {
      dropdown.show = !dropdown.show

      if (focus) {
        setTimeout(() => {
          this.$refs.coinSearch.focus()
        }, 0)
      }

    },
    calculateInputRate(fromValue, toValue) {
      return (toValue * fromValue)
    },
    changeSelectedCurrencyTo(rate, name) {
      this.currentSelectedCurrency.name = name
      this.currentSelectedCurrency.rate = rate
    },

    changeSelectedCurrencyFrom(name) {
      this.currentSelectedCurrencyFrom.name = name
      this.getRate()
    },

    callModal(settings) {
      for (const option in settings) {
        popup[option] = settings[option]
      }
    },
    getRate() {
      this.loading = true
      currencyRates.rates.splice(0, currencyRates.rates.length)

      getCoinRate(this.currentSelectedCurrencyFrom.name)
          .then(result => {
            currencyRates.rates.push(result.data.rates.data.rates)
            const currency = this.currentSelectedCurrency.name || 'RUB'

            console.log(this.currentSelectedCurrency.name, currency)
            this.changeSelectedCurrencyTo(currencyRates.rates[0][currency], currency)
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

.search {
  display: flex;
  position: relative;

  input {
    width: 100%;
    box-sizing: border-box;
    height: 31px;
    border-radius: 378.5px;
    background: #F5F4FA;
    padding: 10px;
    margin-bottom: 10px;
    color: #5D599F;
    transition: .3s ease;
    border: 1px solid #ececec;

    &:focus {
      outline: #5D599F;

    }
  }
  svg {
    position: absolute;
    right: 10px;
    top: 9px;
    cursor: pointer;
    path {
      transition: .3s ease;
      stroke: #7c7c7c;
    }

    &:hover {
      path {
        stroke: #5D599F;
      }
    }
  }
}

.coins-rates {
  color: #B3B4C9;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  transition: .3s ease;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;


  &:hover {
    color: #817bc7;
  }

  &.selected {
    color: #5D599F;
    background-color: #f1f1f1;

    svg {
      path {
        stroke:  #5D599F;
      }
    }
  }
}

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
        border-radius: 30px;
        border: 1px dashed #B3B4C9;
        background: #F8F7FC;
        padding: 5px 20px;
        white-space: nowrap;
        cursor: pointer;
        position: relative;
        width: 150px;
        display: flex;

        .value {
          width: 140px;
          padding: 0;
          font-size: 15px;
          overflow: hidden;
          display: inline-block;
          text-decoration: none;
          text-overflow: ellipsis;
          white-space: nowrap;
        }


        &:hover {
          background: #ecebf3;
        }
      }

      .rates {
        color: #B3B4C9;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        cursor: pointer;
        transition: .3s ease;
        border-radius: 20px;
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
