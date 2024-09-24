import {reactive} from "vue";

import iconCatalog from '@/assets/icons/lock-icon.svg'
import iconGuarantee from '@/assets/icons/icon-guarantee.svg'
import iconAdv from '@/assets/icons/icon-advertisement.svg'
import iconContacts from '@/assets/icons/icon-contacts.svg'
import iconFavorite from '@/assets/icons/icon-favorite.svg'
import iconPlus from '@/assets/icons/icon-plus.svg'

export const menuItems = reactive([
    {
        name: 'Каталог',
        href: '/',
        icon: iconCatalog,
        color: 'default'
    },{
        name: 'Гарант',
        href: '/',
        icon: iconGuarantee,
        color: 'default'
    },{
        name: 'Реклама',
        href: '/',
        icon: iconAdv,
        color: 'default'
    },{
        name: 'Избранное',
        href: '/',
        icon: iconFavorite,
        color: 'pink'
    },{
        name: 'Разместить',
        href: '/',
        icon: iconPlus,
        color: 'default'
    },
])