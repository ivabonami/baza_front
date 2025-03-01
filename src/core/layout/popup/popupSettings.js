import {reactive, shallowRef} from "vue";

export const popupSettings = reactive({
    isVisible: false,
    headline: 'Выполните действие',
    component: null
})

export function callPopup(headline, component) {
    popupSettings.isVisible = true
    popupSettings.headline = headline
    popupSettings.component = shallowRef(component)
}

export function dismissPopup() {
    popupSettings.isVisible = false
    popupSettings.headline = 'Выполните действие'
    popupSettings.component = null
}