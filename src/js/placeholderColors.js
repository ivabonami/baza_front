import {reactive} from "vue";

export const placeholderColors = reactive([
    {
        name: 'Розово-фиолетовый',
        value: 'background: linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255) 0px) padding-box padding-box, linear-gradient(-45deg, rgb(116, 58, 213), rgb(213, 58, 157)) border-box border-box;'
    },
    {
        name: 'Бирюза',
        value: 'background: linear-gradient(#fff, #fff 0) padding-box, linear-gradient(-45deg, #1fa2ff, #a6ffcb) border-box'
    },
    {
        name: 'Желто-рыжий',
        value: 'background: linear-gradient(#fff, #fff 0) padding-box, linear-gradient(-45deg, #f12711, #f5af19) border-box'
    },
    {
        name: 'Красный',
        value: 'background: linear-gradient(#fff, #fff 0) padding-box, linear-gradient(-45deg, #e1eec3, #f05053) border-box'
    },
    {
        name: 'Темно-синий',
        value: 'background: linear-gradient(#fff, #fff 0) padding-box, linear-gradient(-45deg, #159957, #155799) border-box'
    },
    {
        name: 'Бирюза с переливом красного',
        value: 'background: linear-gradient(#fff, #fff 0) padding-box, linear-gradient(-45deg, #ff6e7f, #bfe9ff) border-box'
    },
    {
        name: 'Серый',
        value: 'background: linear-gradient(#fff, #fff 0) padding-box, linear-gradient(-45deg, #6D6027, #D3CBB8) border-box'
    },
    {
        name: 'Желто-зеленый',
        value: 'background: linear-gradient(#fff, #fff 0) padding-box, linear-gradient(-45deg, #CAC531, #F3F9A7) border-box'
    }
])