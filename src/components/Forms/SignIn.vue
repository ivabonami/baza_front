<template>

  <div class="auth" @keydown.enter="signIn" @keydown.esc="$emit('closePopup', true)">
    <InputText
        :input="{
          name: 'Юзернейм',
          placeholder: 'Юзернейм',
          tooltip: 'Ваш юзернейм, от 1 до 255 символов',
          min: 1,
          max: 255,
        }"
        :error="{error: this.errors.username}"
        @data="emit => user.username = emit"
    >
      <template #labelName>
        Юзернейм
      </template>
    </InputText>

    <InputPassword
        :input="{
          name: 'password',
          placeholder: 'пароль',
          tooltip: 'Ваш пароль, от 1 до 255 символов',
          min: 1,
          max: 255,
        }"
        :error="{error: this.errors.password}"
        @data="emit => user.password = emit"
    >
      <template #labelName>
        Пароль
      </template>
    </InputPassword>


    <button-primary
        v-if="loading === false"
        @click="signIn"
        :style="'filled'">
      <template #default>
        Войти
      </template>
    </button-primary>

    <loaderSmall v-else></loaderSmall>
  </div>
</template>

<script>
import InputText from "../Inputs/InputText.vue";
import InputPassword from "../Inputs/InputPassword.vue";
import buttonPrimary from "../Buttons/ButtonPrimary.vue";
import {signIn} from "../../API/user.js";
import loaderSmall from "../Loaders/LoaderSmall.vue";
import {setInfo} from "../../Store/userInfo.js";



export default {
  name: "SignIn.vue",
  data() {
    return {
      user: {
        username: null,
        password: null
      },
      errors: {},
      loading: false,
    }
  },
  components: {InputText, InputPassword, buttonPrimary, loaderSmall},
  methods: {
    signIn() {

      if (this.user.username === null || this.user.username.length < 0  || this.user.username === '') {
        this.errors.username = "Юзернейм не может быть пустым"
      } else {
        delete this.errors.username
      }
      if (this.user.password === null || this.user.password.length < 0 || this.user.password === '') {
        this.errors.password = "Пароль не может быть пустым"
      } else {
        delete this.errors.password
      }

      if (Object.keys(this.errors).length > 0) {
        this.$emit('errors', this.errors)
      } else {
        this.loading = true
        signIn(this.user)
            .then(result => {
              setInfo(result.data.token, this.user.username)
              this.loading = false
              this.$emit('success', true)
            })
            .catch(err => {
              if (err.response.data.success === false) {
                let message = ""
                if (err.response.data.message === "Invalid credentials") { message = "Неверные логин и пароль" }
                if (err.response.data.message === "User not found") { message = "Пользователь не найден" }

                this.$emit('errors', {responseError: message})
                this.loading = false
                console.log(err)
              } else {
                this.$emit('errors', err.message)
              }
            })
      }

    }
  },
  mounted() {

  },

}
</script>

<style scoped lang="scss">

</style>