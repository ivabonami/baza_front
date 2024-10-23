<template>
  <div>
    <form name="login" @submit.prevent>
      <input-text
          style="margin-bottom: 15px;"
          :placeholder="'Логин'"
          @dataChanged="emit => data.username = emit" />

      <input-password
          :placeholder="'Пароль'"
          @passwordData="emit => data.password = emit" />


      <div class="buttons-group">
        <button-black
            :type="'button'"
            style="margin-top: 10px;"
            :disabled="loading"
            @click="onSubmit(data)">
          <TheLoader v-if="loading"/>
          <span class="button-content">Войти</span>
        </button-black>

        <ButtonSecondary
            style="margin-top: 10px;"
            :disabled="loading"
            @click.stop
            @click="$emit('changeState', 'SignUp')">
          <span class="button-content">Нет аккаунта?</span>
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
import {signIn} from "@/API/authController.js";
import {addNotice} from "@/js/notifications.js";


const data = {
  username: null,
  password: null,
  repeat: null
}

const emits = defineEmits(['changeState', 'closePopup'])

let loading = ref(false);

async function onSubmit(userData) {
  loading = true

  if (!userData.username) {
    addNotice({name: 'Вы не ввели юзернейм', type: 'danger'})

  } else if (!userData.password) {
    addNotice({name: 'Вы не ввели пароль', type: 'danger'})
  } else {
    signIn(userData).then(() => emits('closePopup'))
  }

  this.loading = false


}

</script>

<style scoped>

</style>