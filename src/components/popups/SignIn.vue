<template>
  <div>
    <form
        name="login"
        @submit.prevent
    >
      <auth-header />
      <input-text
          class="mb15"
          :data="{
          placeholder: 'Введите ваш логин',
          icon: userIcon
        }"
          @dataChanged="emit => data.username = emit" />

      <input-password
          class="mb15"
          :data="{
          placeholder: 'Введите ваш пароль',
          icon: lockIcon
        }"
          @passwordData="emit => data.password = emit" />


      <div class="buttons-group">
        <ButtonPrimary
            :type="'button'"
            style="margin-top: 10px;"
            :disabled="loading"
            @click="() => {
            loading = true
            onSubmit(data)
          }">
          <TheLoader v-if="loading"/>
          <span>Войти</span>
        </ButtonPrimary>

        <ButtonSecondary
            style="margin-top: 10px;"
            :disabled="loading"
            @click.stop
            @click="$emit('changeState', 'SignUp')">
          <span>Уже зарегистрированы?</span>
        </ButtonSecondary>



      </div>


    </form>



  </div>
</template>

<script setup>
import InputText from "@/components/Inputs/InputText.vue";
import InputPassword from "@/components/Inputs/InputPassword.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import {signIn, signUp} from "@/API/authController.js";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import userIcon from '@/assets/icons/user-icon.svg'
import lockIcon from '@/assets/icons/lock-icon.svg'
import AuthHeader from "@/components/Blocks/AuthHeader.vue";
import {addNotice} from "@/js/notifications.js";
import {setUserData} from "@/Stores/userStore.js";


const data = {
  username: null,
  password: null,
  repeat: null

}


let loading = ref(false);

async function onSubmit(userData) {

  if (!userData.username) {
    addNotice({name: 'Вы не ввели юзернейм', type: 'danger'})

  } else if (!userData.password) {
    addNotice({name: 'Вы не ввели пароль', type: 'danger'})
  } else {
    signIn(userData).then(result => {
      addNotice({name: 'Вы успешно авторизовались', type: 'success'})
      popup.show = false
      localStorage.setItem('username', userData.username)
      localStorage.setItem('token', result.data.token)

      setUserData({username: localStorage.getItem('username'), token: localStorage.getItem('token') })
    }).catch(err => {
      let message;
      if (err.response.data.message === 'Username already exists') {
        message = 'Такой пользователь уже сужествует'
        this.loading = false
      } else {
        message = 'Ошибка, проверьте правильность данных'
        this.loading = false
      }

      addNotice({name: message, type: 'danger'})
    })
  }

  this.loading = false


}

</script>

<style scoped>

</style>