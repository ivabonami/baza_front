<template>
  <div class="auth-popup">
    <component :is="component.state" @change-state="emit => {toggleComponent(emit)}" @closePopup="emits('closePopup')"/>
  </div>
</template>

<script setup>
import SignIn from "@/components/popups/controllers/Auth/AuthParts/SignIn.vue"
import SignUp from "@/components/popups/controllers/Auth/AuthParts/SignUp.vue"
import SignOut from "@/components/popups/controllers/Auth/AuthParts/SignOut.vue"

import {addNotice} from "@/js/notifications.js";
import {reactive,  shallowRef} from "vue";

const props = defineProps({
  setComponent: null,
})

const emits = defineEmits(['closePopup'])

const component = reactive({
  state: null
})

function toggleComponent(state) {
  try {
    if (state === 'SignIn') {
      component.state = shallowRef(SignIn)
    } else if (state === 'SignUp') {
      component.state = shallowRef(SignUp)
    } else if (state === 'SignOut') {
      component.state = shallowRef(SignOut)
    }

  } catch (e) {
    console.log(component)
    addNotice({name: 'Не удалось загрузить компонент', type: 'danger'})
  }

}

console.log(props.setComponent)

if (props.setComponent) {
  toggleComponent(props.setComponent)
} else {
  toggleComponent('SignIn')
}
</script>

<style scoped lang="scss">

</style>