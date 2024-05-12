import { reactive } from 'vue'

export const modalSetting = reactive({
    show: false, //show modal
    type: '', //types: error,
    headline: '', //heading
    description: '', //description

    image: '',
    modalSize: ''

})