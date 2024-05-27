import { reactive } from 'vue'

export const modalSetting = reactive({
    show: false, //show modal
    type: '', //types: error,
    headline: '', //heading
    description: '', //description

    image: '',
    modalSize: '',
    categoryToDelete: 0,
    testimonialEditMode: false,

    testimonial: {
        rating: 0,
        text: '',
        id: 0
    }

})