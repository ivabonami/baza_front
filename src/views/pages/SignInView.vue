<template>

  <div class="form" id="sign-in" @keydown.enter="signIn()"
       v-if="this.state === 'signIn'">
    <div class="h2">Вход на базу</div>
    <input type="text"
           v-model="inputUsername"
           class="input login"
           placeholder="Логин">
    <input type="password"
           v-model="inputPassword"
           class="input password"
           placeholder="Пароль">
    <input type="submit" value="Войти" class="btn btn-filled"

    v-on:click="signIn()">

    <button class="switch"
            v-on:click="this.signUpSwitch()">
      Зарегистрироваться
    </button>

    <div class="error-box" v-if="this.credentialsError !== ''">
      {{this.credentialsError}}
    </div>
  </div>

  <div class="form"
       v-if="this.state === 'signUp'">
    <div class="h2">Регистрация</div>
    <input type="text"
           id="sign-in-password"
           v-model="inputUsername"
           class="input"
           placeholder="Логин">
    <input type="password"
           id="sign-in-password"
           v-model="inputPassword"
           class="input"
           placeholder="Пароль">
    <input type="password"
           id="sign-in-password"
           v-model="inputRepeatPassword"
           class="input"
           placeholder="Повторите пароль">
    <input type="submit" value="Зарегистрироваться" class="btn btn-filled"
           v-on:click="signUp()">

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
      //form control
      inputUsername: '',
      inputPassword: '',
      inputRepeatPassword: '',

      state: 'signIn',
      credentialsError: '',


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
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch("http://62.113.96.171:3000/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          username: this.inputUsername,
          password: this.inputPassword
        }),
      })
          .then((response) => response.json())
          .then((result) => {
            if (result.success === false) {
              this.credentialsError = result.message
              console.log(result)
              this.$router.go()
            } else {
              localStorage.setItem('token', result.token)
              if (this.inputUsername === 'admin') {
                localStorage.setItem('role', 'admin')
                this.$router.go()
              }
              localStorage.setItem('username', this.inputUsername)
            }


          })
          .catch((error) => {
            console.log('messageE:', error.message)
          });

    },

    signUp() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      if (this.inputPassword === this.inputRepeatPassword) {
        fetch("http://62.113.96.171:3000/signup", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            username: this.inputUsername,
            password: this.inputPassword
          }),
        })
            .then((response) => response.json())
            .then((result) => {
              fetch("http://62.113.96.171:3000/login", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                  username: this.inputUsername,
                  password: this.inputPassword
                }),
              })
                  .then((response) => response.json())
                  .then((result) => {
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('username', this.inputUsername)
                    this.credentialsError = result.message
                    this.$router.go()
                  })
                  .catch((error) => {
                    console.log('messageE:', error.message)
                  });
            })
            .catch((error) => {
              console.log('messageE:', error.message)
            });
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

.error-box {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background-color: #ffdede;
  border-radius: 10px;
}

</style>