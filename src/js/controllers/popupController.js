import {reactive, shallowRef} from "vue";

export const popup = reactive({
    show: false,
    heading: String,
    component: null,
    icon: null
})
export function closePopup() {
    popup.show = false
    popup.heading = String
    popup.component = null
}
