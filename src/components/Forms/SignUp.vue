<template>
  <form onsubmit="return false" class="auth" @keydown.enter="signUp()" @keydown.esc="$emit('closePopup', true)">
    <InputText
        :input="{
          name: 'Логин',
          placeholder: 'Юзернейм',
          tooltip: 'Ваш юзернейм, от 1 до 255 символов',
          min: 1,
          max: 255
        }"
        :tabindex="1"
        :error="{error: this.errors.username}"
        @returnData="emit => user.username = emit"
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
        :tabindex="2"
        :error="{error: this.errors.password}"
        @returnData="emit => user.password = emit"
    >
      <template #labelName>
        Пароль
      </template>
    </InputPassword>

    <InputPassword
        :input="{
          name: 'repeatPassword',
          placeholder: 'повторите пароль',
          tooltip: 'Повторите пароль',
          min: 1,
          max: 255,
        }"
        :tabindex="3"
        :error="{error: this.errors.repeatPassword}"
        @returnData="emit => user.repeatPassword = emit"
    >
      <template #labelName>
        Повторите пароль
      </template>
    </InputPassword>


    <button-primary
        type="submit"
        v-if="loading === false"
        @click="signUp"
        :style="'filled'">
      <template #default>
        Зарегистрироваться
      </template>
    </button-primary>

    <loaderSmall v-else></loaderSmall>
  </form>
</template>

<script>
import InputText from "../Inputs/InputText.vue";
import InputPassword from "../Inputs/InputPassword.vue";
import buttonPrimary from "../Buttons/ButtonPrimary.vue";
import {signIn, signUp} from "../../API/user.js";
import loaderSmall from "../Loaders/LoaderSmall.vue";
import {setInfo} from "../../Store/userInfo.js";

export default {
  name: "SignUp.vue",
  data() {
    return {
      user: {
        username: null,
        password: null,
        repeatPassword: null
      },
      errors: {

      },
      loading: false
    }
  },
  components: {InputText, InputPassword, buttonPrimary, loaderSmall},
  methods: {
    signUp() {
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

      if (this.user.repeatPassword === null || this.user.repeatPassword.length < 0 || this.user.repeatPassword === '') {
        this.errors.repeatPassword = "Поле 'повторите пароль' не может быть пустым"
      } else {
        delete this.errors.repeatPassword
      }

      if (this.user.password !== this.user.repeatPassword) {
        this.errors.passwords = "Пароли не совпадают"
      } else {
        delete this.errors.passwords
      }

      if (Object.keys(this.errors).length > 0) {
        this.$emit('errors', this.errors)
      } else {
        this.loading = true
        signUp(this.user)
            .then(result => {

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

                    } else {
                      this.$emit('errors', err.message)
                    }
                  })
            })
            .catch(err => {
              if (err.response.data.success === false) {
                let message = ""
                if (err.response.data.message === "Username already exists") {
                  message = "Такой пользователь уже существует"
                } else if (err.response.data.message === "User not found") {
                  message = "Пользователь не найден"
                } else if (err.response.data.message === "Username and password are required") {
                  message = "Юзернейм и пароль обязательны для заполнения"
                } else {
                  message = err.response.data.message
                }


                this.$emit('errors', {responseError: message})
                this.loading = false

              } else {
                this.$emit('errors', err.message)
              }
            })
      }
    }
  },
  beforeUnmount() {
    this.user.password = null
    this.user.username = null
    this.user.repeatPassword = null
  }
}
</script>

<style scoped lang="scss">

</style>