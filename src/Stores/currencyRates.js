import {reactive} from "vue";

export const currencyRates = reactive({
    rates: [],
    coinsFrom: ['BTC', 'ETH', 'USDT', 'TRX', 'BNB', 'TON', 'RUB']
})