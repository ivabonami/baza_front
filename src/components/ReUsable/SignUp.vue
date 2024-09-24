<template>
  <div>
    <form
        @submit.prevent
    >
      <auth-header />
      <input-text
          class="mb15"
          :data="{
          placeholder: 'Введите ваш логин',
          icon: userIcon
        }"
          @textData="emit => data.username = emit" />

      <input-password
          class="mb15"
          :data="{
          placeholder: 'Введите ваш пароль',
          icon: lockIcon
        }"
          @passwordData="emit => data.password = emit" />

      <input-password
          :data="{
          placeholder: 'Введите ваш пароль',
          icon: lockIcon
        }"
          @passwordData="emit => data.repeat = emit" />

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
          <span>Регистрация</span>
        </ButtonPrimary>

        <ButtonSecondary
            style="margin-top: 10px;"
            :disabled="loading"
            @click.stop
            @click="$emit('changeState', 'SignIn')">
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
import {signIn} from "@/API/authController.js";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import userIcon from '@/assets/icons/user-icon.svg'
import lockIcon from '@/assets/icons/lock-icon.svg'
import AuthHeader from "@/components/Blocks/AuthHeader.vue";



const data = {
  username: null,
  password: null,
  repeat: null
}


let loading = ref(false)

async function onSubmit(userData) {
  signIn(data).then(result => { console.log(result) }).catch(err => console.log(err))

}

</script>

<style scoped>

</style>