<template>

  <div class="form" id="sign-in"
       v-if="this.state === 'signIn'">
    <div class="h2">Вход на базу</div>
    <input type="text"
           id="sign-in-username"
           class="input login"
           placeholder="Логин">
    <input type="password"
           id="sign-in-password"
           class="input password"
           placeholder="Пароль">
    <input type="submit" value="Войти" class="btn btn-filled"
    v-on:click="signIn()">

    <button class="switch"
            v-on:click="this.signUpSwitch()">
      Зарегистрироваться
    </button>

    <div class="error-box" v-if="this.credentialsError === true">
      {{this.errorMessage}}
    </div>
  </div>

  <div class="form"
       v-if="this.state === 'signUp'">
    <div class="h2">Регистрация</div>
    <input type="text"
           id="sign-in-password"
           class="input"
           placeholder="Логин">
    <input type="password"
           id="sign-in-password"
           class="input"
           placeholder="Пароль">
    <input type="password"
           id="sign-in-password"
           class="input"
           placeholder="Повторите пароль">
    <input type="submit" value="Войти" class="btn btn-filled">

    <button class="switch"
    v-on:click="this.signInSwitch()">
      У меня есть аккаунт, войти
    </button>
  </div>
</template>

<script>
export default {
  name: "SignInView.vue",
  data () {
    return {
      state: 'signIn',
      username: 'admin',
      password: 'admin',
      credentialsError: false,
      errorMessage: ''

    }
  },
  methods: {
    signInSwitch () {
      this.state = 'signIn'
    },
    signUpSwitch () {
      this.state = 'signUp'
    },

    signIn() {
      const userUsername = document.querySelector('#sign-in-username'),
          userPassword = document.querySelector('#sign-in-password'),
          userInputBoxLogin = document.querySelector('#sign-in .login'),
          userInputBoxPassword = document.querySelector('#sign-in .password')

      if (userUsername.value === this.username && userPassword.value === this.password) {
        console.log('all true', userUsername.value, userPassword.value)

        localStorage.setItem('signedUsername', 'Главный')
        localStorage.setItem('role', 'admin')
        localStorage.setItem('token', 'dsasadsadasdasdds')

      } else if ( userUsername.value === this.username && userPassword.value !== this.password ) {
        console.log('pass false', userUsername.value, userPassword.value)

        userInputBoxPassword.classList.remove('error')
        userInputBoxLogin.classList.remove('error')

        userInputBoxPassword.classList.add('error')

        this.credentialsError = true
        this.errorMessage = 'Не правильный пароль'
      } else {
        console.log('all false', userUsername.value, userPassword.value)

        userInputBoxPassword.classList.remove('error')
        userInputBoxLogin.classList.remove('error')

        userInputBoxLogin.classList.add('error')
        userInputBoxPassword.classList.add('error')

        this.credentialsError = true
        this.errorMessage = 'Не правильный юзернейм и пароль'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.h2 {
  color: #000;

  font-family: Montserrat;
  font-size: 25px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
}
.modal {
  transition: .3s ease;
}
.form {
  .input {
    border-radius: 5px;
    border: 1px solid #6C7AFF;
    background: var(--neutral, #FFF);
    padding: 10px;
    color: #000;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;

    &.error {
      border: 1px solid #DC8A8C
    }

    &::placeholder {
      opacity: .3;
    }
  }
  .btn {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    font-size: 16px;
  }

  .switch {
    background-color: transparent;
    border: none;
    cursor: pointer;
    opacity: .5;
    transition: .3s ease;
    margin-top: 10px;
    color: #000;
    width: 100%;
    text-align: center;

    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;

    &:hover {
      opacity: 1;
    }
  }
}

</style>