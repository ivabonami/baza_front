<template>
  <div>
    <form @submit.prevent >
      <input-text
          class="mb15"
          :placeholder="'Логин'"
          @dataChanged="emit => data.username = emit" />

      <input-password
          class="mb15"
          :placeholder="'Пароль'"
          @passwordData="emit => data.password = emit" />

      <input-password
          :placeholder="'Повторите пароль'"
          @passwordData="emit => data.repeat = emit" />

      <div class="buttons-group">
        <button-black
            :type="'button'"
            style="margin-top: 10px;"
            :disabled="loading"
            @click="() => {
            loading = true
            onSubmit(data)
          }">
          <TheLoader v-if="loading"/>
          <span>Регистрация</span>
        </button-black>

        <ButtonSecondary
            style="margin-top: 10px;"
            :disabled="loading"
            @click.stop
            @click="$emit('changeState', 'SignIn')">
          <span>Есть аккаунт?</span>
        </ButtonSecondary>



      </div>


    </form>



  </div>
</template>

<script setup>
import InputText from "@/components/Inputs/InputText.vue";
import InputPassword from "@/components/Inputs/InputPassword.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import {signUp} from "@/API/authController.js";
import {addNotice} from "@/js/notifications.js";



const data = {
  username: null,
  password: null,
  repeat: null
}
const emits= defineEmits(['closePopup'])

let loading = ref(false)

async function onSubmit(userData) {
  if (!data.username) {
    addNotice({name: 'Не введен юзернейм', type: 'danger'})
  } else if (!data.password) {
    addNotice({name: 'Не введен пароль', type: 'danger'})
  } else if (!data.repeat) {
    addNotice({name: 'Повторите ввод пароля', type: 'danger'})
  } else if (data.repeat !== data.password){
    addNotice({name: 'Пароли не совпадают', type: 'danger'})
  } else {
    signUp(data).then(() => emits('closePopup'))
  }
  loading = false

}

</script>

<style scoped>

</style>