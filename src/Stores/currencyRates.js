import {reactive} from "vue";

import rub from '@/assets/currencies-icons/rub.svg'
import btc from '@/assets/currencies-icons/btc.svg'
import usd from '@/assets/currencies-icons/usd.svg'
import usdt from '@/assets/currencies-icons/usdt.svg'
import ltc from '@/assets/currencies-icons/ltc.svg'
import eth from '@/assets/currencies-icons/eth.svg'
import trx from '@/assets/currencies-icons/trx.svg'
import bnb from '@/assets/currencies-icons/bnb.svg'
import eur from '@/assets/currencies-icons/eur.svg'
import jpy from '@/assets/currencies-icons/jpy.svg'
import gbp from '@/assets/currencies-icons/gbp.svg'
import aud from '@/assets/currencies-icons/usd.svg'
import cad from '@/assets/currencies-icons/usd.svg'
import cny from '@/assets/currencies-icons/cny.svg'
import doge from '@/assets/currencies-icons/doge.svg'

export const currencyRates = reactive({
    rates: [],
    coinsFrom: [{
        name: 'USD',
        icon: usd,
        color: 'green'
    }, {
        name: 'EUR',
        icon: eur,
        color: 'yellow'
    },{
        name: 'JPY',
        icon: jpy,
        color: 'blue'
    },{
        name: 'GBP',
        icon: gbp,
        color: 'violet'
    },{
        name: 'AUD',
        icon: aud,
        color: 'lightblue'
    },{
        name: 'CAD',
        icon: cad,
        color: 'red'
    },{
        name: 'CHF',
        color: '#7773FB'
    },{
        name: 'CNY',
        icon: cny,
        color: 'darkred'
    },{
        name: 'HKD',
        color: 'aqua'
    },{
        name: 'NZD',
        color: 'darkgreen'
    },{
        name: 'RUB',
        icon: rub,
        color: 'orange'
    },{
        name: 'BTC',
        icon: btc,
        color: 'orange'
    },{
        name: 'ETH',
        icon: eth,
        color: 'orange'
    },{
        name: 'BNB',
        icon: bnb,
        color: 'orange'
    },{
        name: 'USDT',
        icon: usdt,
        color: 'orange'
    },{
        name: 'DOGE',
        icon: doge,
        color: 'orange'
    },{
        name: 'LTC',
        icon: ltc,
        color: 'orange'
    },{
        name: 'TRX',
        icon: trx,
        color: 'orange'
    }]
})