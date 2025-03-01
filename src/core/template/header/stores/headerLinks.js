import {ref} from "vue";
import send from '@/assets/newicons/send.svg'
import chart from '@/assets/newicons/chart.svg'
import shield from '@/assets/newicons/shield.svg'
import sber from '@/assets/newicons/sber.svg'
import ads from '@/assets/newicons/ads.svg'

export const headerLinks = ref({
    left: [
        {
            icon: send,
            href: 'https://t.me/mxBaza',
            title: 'Baza channel',
            type: 'external',
            style: 'default'
        },
        {
            icon: chart,
            href: 'https://t.me/mxBaza',
            title: 'Купить рекламное место',
            type: 'external',
            style: 'default'
        }
    ],
    right: [
        {
            icon: sber,
            href: 'https://cardbtc.io/',
            title: 'Обмен криптовалюты',
            type: 'external',
            style: 'green'
        },
        {
            icon: shield,
            href: '/guarantee',
            title: 'Гарант',
            type: 'internal',
            style: 'default'
        },
        {
            icon: ads,
            href: '/advertisement',
            title: 'Реклама',
            type: 'internal',
            style: 'default'
        }
    ]
})