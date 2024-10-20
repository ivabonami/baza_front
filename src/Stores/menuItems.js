import {reactive} from "vue";

import iconGuarantee from '@/assets/icons/icon-guarantee.svg'
import iconAdv from '@/assets/icons/icon-advertisement.svg'
import iconFavorite from '@/assets/icons/icon-favorite.svg'
import iconPlus from '@/assets/icons/icon-plus.svg'
import iconSber from '@/assets/icons/Sberbank_Logo_2020.svg'

export const menuItems = reactive([
    {
        name: 'Гарант',
        href: '/guarantee',
        icon: iconGuarantee,
        color: 'default',
        type: 'internal'

    }, {
        name: 'Реклама',
        href: '/advertisement',
        icon: iconAdv,
        color: 'default',
        type: 'internal'
    }, {
        name: 'Избранное',
        href: '/favorite',
        icon: iconFavorite,
        color: 'pink',
        type: 'internal'
    }, {
        name: 'Разместить',
        href: '/add-project',
        icon: iconPlus,
        color: 'default',
        type: 'internal'
    }, {
        name: 'Обмен криптовалюты',
        href: 'https://google.com',
        icon: iconSber,
        color: 'green',
        type: 'external'
    },
])