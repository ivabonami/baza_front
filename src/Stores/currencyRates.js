import {reactive} from "vue";

export const currencyRates = reactive({
    rates: [],
    coinsFrom: [{
        name: 'USD',
        color: 'green'
    }, {
        name: 'EUR',
        color: 'yellow'
    },{
        name: 'JPY',
        color: 'blue'
    },{
        name: 'GBP',
        color: 'violet'
    },{
        name: 'AUD',
        color: 'lightblue'
    },{
        name: 'CAD',
        color: 'red'
    },{
        name: 'CHF',
        color: '#7773FB'
    },{
        name: 'CNY',
        color: 'darkred'
    },{
        name: 'HKD',
        color: 'aqua'
    },{
        name: 'NZD',
        color: 'darkgreen'
    },{
        name: 'RUB',
        color: 'orange'
    }]
})