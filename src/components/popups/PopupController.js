import {reactive} from "vue";

export const popup = reactive({
    isVisible : false,
    options: {}
})

export function openPopup(component) {
    popup.isVisible = true
}