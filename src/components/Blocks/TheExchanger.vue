<template>
  <div class="exchanger-box">

    <div class="exchanger-box_input">
      <div class="exchanger-box_currency">
        <div class="currency-from_wrapper" data-dropdown="exchangerFrom">
          <div class="currency-from"  data-dropdown="exchangerFrom">
            <div class="currency" data-dropdown="exchangerFrom" >
              <div class="value" data-dropdown="exchangerFrom">
                <input type="number" data-dropdown="exchangerFrom" v-model="exchangeCoins.from.rate" @input="setCoinFrom(exchangeCoins.from.name)">
              </div>
              <div class="drop"  data-dropdown="exchangerFrom" @click="dropdownTo.show = !dropdownTo.show">
                <svg class="arrow" data-dropdown="exchangerFrom" :class="{up: this.dropdownTo.show}" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                  <path data-dropdown="exchangerFrom" d="M0.922355 0.00366649C1.04299 0.00296887 1.16259 0.0260921 1.27427 0.0717097C1.38595 0.117327 1.48753 0.184542 1.57319 0.2695L5.77152 4.477C5.85674 4.56292 5.95812 4.63111 6.06983 4.67765C6.18153 4.72419 6.30134 4.74815 6.42236 4.74815C6.54337 4.74815 6.66318 4.72419 6.77488 4.67765C6.88659 4.63111 6.98797 4.56292 7.07319 4.477L11.2715 0.269499C11.4441 0.0968868 11.6782 -8.47752e-05 11.9224 -8.47965e-05C12.1665 -8.48179e-05 12.4006 0.0968867 12.5732 0.269499C12.7458 0.442111 12.8428 0.676222 12.8428 0.920332C12.8428 1.0412 12.819 1.16089 12.7727 1.27256C12.7265 1.38423 12.6587 1.4857 12.5732 1.57117L8.36569 5.7695C7.84324 6.27144 7.14685 6.55176 6.42236 6.55176C5.69786 6.55176 5.00147 6.27144 4.47902 5.7695L0.271522 1.57117C0.185605 1.48595 0.117408 1.38457 0.0708709 1.27286C0.0243325 1.16116 0.000373359 1.04134 0.000373348 0.920333C0.000373337 0.799322 0.0243325 0.679509 0.0708708 0.567804C0.117408 0.4561 0.185605 0.354716 0.271522 0.2695C0.357175 0.184542 0.458756 0.117327 0.57044 0.0717098C0.682125 0.0260922 0.801715 0.00296889 0.922355 0.00366649Z" fill="#B3B4C9"/>
                </svg>
                {{ exchangeCoins.from.name.toUpperCase() }}
                <div class="icon" data-dropdown="exchangerFrom" :style="`background-color: ${exchangeCoins.from.color}`">
                  <img  data-dropdown="exchangerFrom" :src="exchangeCoins.from.icon" alt="">
                </div>
              </div>


            </div>

          </div>
          <dropdown-box v-if="dropdownTo.show === true"
                        :selector="'exchangerFrom'"
                        @closeDropdown="() => dropdownTo.show = false">

            <div data-dropdown="exchangerFrom" class="search">
              <input data-dropdown="exchangerFrom" @change="() => {
                        getRate(exchangeCoins.from, exchangeCoins.to)
                        dropdownTo.show = false
                      }"
                     placeholder="поиск монеты" class="search-coin" type="text" ref="coinSearch" v-model="searchCoin.from">

              <svg data-dropdown="exchangerFrom"
                   @click="searchCoin.from = ''"
                   width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 11M1 1L11 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
            <div class="coins-rates"
                 data-dropdown="exchangerFrom"
                 :class="{selected: exchangeCoins.from.name.toUpperCase() === coin.name}"
                 @click="() => {
                   setCoinFrom(coin.name)
                   dropdownTo.show = false
                 }"
                 v-for="(coin) of currencyRates.coinsFrom"
                 :key="coin.name"
                 v-show="coin.name.toLowerCase().includes(searchCoin.from.toLowerCase())"
            >
              <span data-dropdown="exchangerFrom">{{ coin.name }}</span>

              <svg data-dropdown="exchangerFrom" v-show="exchangeCoins.from.name.toUpperCase() === coin.name" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

          </dropdown-box>
        </div>

        <div class="swap" @click="swapCoins()">
          <svg class="swapIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="currency-from_wrapper" data-dropdown="exchangerTo" >
          <div class="currency-to" data-dropdown="exchangerTo" >
            <div class="loading" data-dropdown="exchangerTo" v-if="loading">
              <TheLoader />
            </div>
            <div class="currency" data-dropdown="exchangerTo" v-else>

              <div class="drop" data-dropdown="exchangerTo" @click="dropdownFrom.show = !dropdownFrom.show">
                <div class="icon"  data-dropdown="exchangerTo" :style="`background-color: ${exchangeCoins.to.color}`" >
                  <img :src="exchangeCoins.to.icon" data-dropdown="exchangerTo" alt="">
                </div>

                <svg class="arrow" data-dropdown="exchangerTo" :class="{up: this.dropdownFrom.show}" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                  <path data-dropdown="exchangerTo" d="M0.922355 0.00366649C1.04299 0.00296887 1.16259 0.0260921 1.27427 0.0717097C1.38595 0.117327 1.48753 0.184542 1.57319 0.2695L5.77152 4.477C5.85674 4.56292 5.95812 4.63111 6.06983 4.67765C6.18153 4.72419 6.30134 4.74815 6.42236 4.74815C6.54337 4.74815 6.66318 4.72419 6.77488 4.67765C6.88659 4.63111 6.98797 4.56292 7.07319 4.477L11.2715 0.269499C11.4441 0.0968868 11.6782 -8.47752e-05 11.9224 -8.47965e-05C12.1665 -8.48179e-05 12.4006 0.0968867 12.5732 0.269499C12.7458 0.442111 12.8428 0.676222 12.8428 0.920332C12.8428 1.0412 12.819 1.16089 12.7727 1.27256C12.7265 1.38423 12.6587 1.4857 12.5732 1.57117L8.36569 5.7695C7.84324 6.27144 7.14685 6.55176 6.42236 6.55176C5.69786 6.55176 5.00147 6.27144 4.47902 5.7695L0.271522 1.57117C0.185605 1.48595 0.117408 1.38457 0.0708709 1.27286C0.0243325 1.16116 0.000373359 1.04134 0.000373348 0.920333C0.000373337 0.799322 0.0243325 0.679509 0.0708708 0.567804C0.117408 0.4561 0.185605 0.354716 0.271522 0.2695C0.357175 0.184542 0.458756 0.117327 0.57044 0.0717098C0.682125 0.0260922 0.801715 0.00296889 0.922355 0.00366649Z" fill="#B3B4C9"/>
                </svg>
                {{ exchangeCoins.to.name.toUpperCase() }}
                <div class="value">
                  {{ exchangeCoins.to.rate }}
                </div>
              </div>

            </div>

          </div>

          <dropdown-box v-if="dropdownFrom.show"
                        :selector="'exchangerTo'"
                        @closeDropdown="() => {
                          dropdownFrom.show === false
                        }">


            <div class="search" data-dropdown="exchangerTo">
              <input data-dropdown="exchangerTo" class="search-coin" placeholder="поиск валюты" type="text" ref="coinSearch" v-model="searchCoin.to">
              <svg data-dropdown="exchangerTo" v-if="searchCoin.to.length > 0"
                   @click="searchCoin.to = ''"
                   width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path data-dropdown="exchangerTo" d="M11 1L1 11M1 1L11 11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

            </div>
            <div class="coins-rates"
                 data-dropdown="exchangerTo"
                 :class="{selected: exchangeCoins.to.name === name}"
                 @click="() => {
                   setCoinTo(name)
                   dropdownFrom.show = false
                 }"
                 v-for="(rate, name) of currencyRates.rates[0]"
                 :key="name"
                 v-show="name.toLowerCase().includes(searchCoin.to.toLowerCase())"
            >
              <span data-dropdown="exchangerTo">{{ name }}</span>

              <svg data-dropdown="exchangerTo" v-show="exchangeCoins.to.name.toUpperCase() === name" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path data-dropdown="exchangerTo" d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

          </dropdown-box>
        </div>





      </div>

      <button-black
          :type="'link'"
          :link="'https://t.me/bitmafia_bot'"
          @click="() => {
            this.loading = false
          }">
        <TheLoader v-if="loading"/>
        <div class="button-content">
          Обменять
        </div>

      </button-black>

    </div>

  </div>
</template>
<script>
import {getCoinRate} from "@/API/exchangerController.js";
import {addNotice} from "@/js/notifications.js";
import dropdownBox from "@/components/ReUsable/DropdownBox.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import buttonBlack from "@/components/Buttons/ButtonBlack.vue";
import {popup} from "@/js/controllers/popupController.js";
import {currencyRates} from "@/Stores/currencyRates.js";
import usd from '@/assets/currencies-icons/usd.svg'
import rub from '@/assets/currencies-icons/rub.svg'


export default {
  name: 'TheExchanger',
  data() {
    return {

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
      exchangeCoins: {
        from: {
          name: 'rub',
          rate: 5000,
          icon: rub,
          color: 'rgba(5, 198, 83, 1)'
        },
        to: {
          name: 'btc',
          rate: null
        }
      },
      currencyRates,
      searchCoin: {
        from: '',
        to: ''
      }
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
    },

    callModal(settings) {
      for (const option in settings) {
        popup[option] = settings[option]
      }
    },
    setIcon(coin){

      try {
        coin.icon = currencyRates.coinsFrom.find(item => item.name === coin.name).icon
        coin.color = currencyRates.coinsFrom.find(item => item.name === coin.name).color
      } catch (e) {
        coin.icon = usd
        coin.color = 'orange'
      }


    },
    setCoinFrom(coin) {

      this.exchangeCoins.from.name = coin
      this.setIcon(this.exchangeCoins.from)
      this.getRate(this.exchangeCoins.from, this.exchangeCoins.to)

    },
    setCoinTo(coin) {
      this.exchangeCoins.to.name = coin.toUpperCase()
      this.setIcon(this.exchangeCoins.to)
      this.calculateSwap(this.exchangeCoins.to.name)
    },
    calculateSwap(coin) {
      this.exchangeCoins.to.rate = currencyRates.rates[0][coin] * this.exchangeCoins.from.rate
    },
    swapCoins() {
      this.exchangeCoins.to = [this.exchangeCoins.from, this.exchangeCoins.from = this.exchangeCoins.to][0]
      this.getRate(this.exchangeCoins.from, this.exchangeCoins.to)
    },
    getRate(coinFrom, coinTo) {
      this.loading = true
      currencyRates.rates.splice(0, currencyRates.rates.length)



      getCoinRate( coinFrom.name )
          .then(result => {
            currencyRates.rates.push(result.data.rates.data.rates)
            this.setCoinTo(coinTo.name)
            this.loading = false
          })
          .catch((error) => {
            addNotice({name: 'Не могу получить актуальный курс, попробуйте еще раз.', type: 'warning'})
            this.loading = false
          })


    }
  },
  mounted() {
    this.getRate(this.exchangeCoins.from, this.exchangeCoins.to)

  }
}
</script>
<style lang="scss" scoped>

.button-text {
  padding-left: 25px;
  padding-right: 25px;
}
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
  border-radius: 10px;
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
    background-color: #FFFFFF;
    border-radius: 30px;
    padding: 5px;
    box-sizing: border-box;
    align-items: center;

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
      .swap {
        cursor: pointer;
      }
      .currency-from_wrapper, .currency-to_wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        min-width: 195px;
      }
      .currency-from, .currency-to {
        border-radius: 12px;
        border: 2px dashed #B3B4C9;
        padding: 0 3px 0 1px;
        box-sizing: border-box;
        white-space: nowrap;
        cursor: pointer;
        position: relative;
        display: flex;
        width: 100%;
        height: 42px;
        align-items: center;
        gap: 5px;
        justify-content: start;
        background-color: #F8F7FC;



        .currency {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          gap: 2px;
          box-sizing: border-box;
          justify-content: space-between;

          input {
            height: 35px;
            box-sizing: border-box;
            width: 100%;
            font-size: 14px;
            color: #70718c;
            position: relative;
            background-color: transparent;
            border: 1px solid #c9c9c9;
            border-radius: 10px;
            padding-left: 8px;

          }
          .drop {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 14px;
            color: #70718c;
          }
        }


        .icon {
          min-width: 30px;
          height: 30px;
          display: block;
          position: relative;
          box-sizing: content-box;
          border-radius: 30px;
          background-color: #70718c;

          img {
            filter: invert(100%);
            height: 55%;
            top: 50%;
            left: 50%;
            position: absolute;
            translate: -50% -50%;


          }
        }

        svg {
          transform: rotate(0deg);
          transition: .2s ease;

          &.up {
            transform: rotate(180deg);
          }
        }

        .value {
          width: 80px;
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

      .currency-from {
        padding: 0 3px 0 2px;
      }
      .currency-to {
        padding: 0 2px 0 3px;
      }
      .arrow {
        width: 15px;
      }

      .rates {
        width: 66%;
        color: #B3B4C9;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        transition: .3s ease;
        border-radius: 10px;
        justify-content: space-between;
        align-items: center;
        .text {
          margin-bottom: -8px;
          display: block;
          b {
            text-transform: uppercase;
          }
        }


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
@media screen and (max-width: 500px){
  .button-text {
    width: 100%;
  }

  .exchanger-box {
    margin-bottom: 10px;
    width: 100%;

    .exchanger-box_input {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 5px;
      border-radius: 10px;


      .exchanger-box_currency {
        width: 100%;
        .rates {
          font-size: 10px;
        }

        .currency-from_wrapper, .currency-to_wrapper {
          min-width: 90px;
        }

        .currency-from, .currency-to {
          width: 100%;
          padding: 2px 2px;

          .value {
            font-size: 12px;
          }
          .arrow {
            display: none;
          }
        }
      }
    }
  }
}
</style>
