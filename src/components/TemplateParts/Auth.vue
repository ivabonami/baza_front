<template>
  <transition name="fadeHeight" mode="out-in">
    <div class="">
  <div class="form" id="sign-in" @keydown.enter="signIn()"
       v-if="this.state === 'signIn'">
    <input type="text"
           v-model="inputUsername"
           class="input login"
           placeholder="Логин">
    <input type="password"
           v-model="inputPassword"
           class="input password"
           placeholder="Пароль">
    <input type="submit" value="Войти" class="baza-button primary"

    v-on:click="signIn()">

    <button class="switch"
            v-on:click="this.signUpSwitch()">
      Нет аккаунта? Зарегистрироваться
    </button>

    <div class="error-box" v-if="this.credentialsError !== ''">
      {{this.credentialsError}}
    </div>
  </div>

  <div class="form"
       @keydown.enter="signUp()"
       v-if="this.state === 'signUp'">

    <input type="text"
           id="sign-in-password"
           v-model="inputUsername"
           ref="inputUsername"
           class="input"
           placeholder="Логин">
    <input type="password"
           id="sign-in-password"
           ref="inputPassword"
           v-model="inputPassword"
           class="input"
           placeholder="Пароль">
    <input type="password"
           ref="inputRepeatPassword"
           id="sign-in-password"
           v-model="inputRepeatPassword"
           class="input"
           placeholder="Повторите пароль">
    <input type="submit" value="Зарегистрироваться" class="baza-button primary"
           v-on:click="signUp()">

    <button class="switch"
    v-on:click="this.signInSwitch()">
      У меня есть аккаунт, войти
    </button>

    <div class="error-box" v-if="this.credentialsError !== ''">
      {{this.credentialsError}}
    </div>

    <div class="errors" ref="errors" v-if="this.errors.length > 0">
      <h3>Устраните ошибки:</h3>
      <div class="error" v-for="(error, index) of errors" >
        {{ index + 1 }}) {{ error }}

      </div>
    </div>
  </div>
    </div>
  </transition>
</template>

<script>
import {useFetch} from "../../assets/js/fetchRequest.js";
import {userInfo} from "../../assets/js/userService.js";
import {modalSetting} from "../../assets/js/modal.js";

export default {
  name: "SignInView.vue",
  props: ['tab'],
  data () {
    return {
      //form control
      inputUsername: '',
      inputPassword: '',
      inputRepeatPassword: '',

      state: 'signIn',
      credentialsError: '',

      errors: [],
      modalSetting

    }
  },
  mounted() {

    this.$props.tab === 'signup' ? this.state = 'signUp' : this.state = 'signIn'
  },

  methods: {
    signInSwitch () {
      this.state = 'signIn'
    },
    signUpSwitch () {
      this.state = 'signUp'
    },

    signIn() {

      useFetch('login', 'POST', {
        username: this.inputUsername,
        password: this.inputPassword
      }).then(result => {

        if (result.success === true) {
          userInfo.username = this.inputUsername
          userInfo.token = result.token

          localStorage.setItem('username', this.inputUsername.toLowerCase())
          localStorage.setItem('token', result.token)

          this.$router.go()
        }
        else if (result.response.status === 401) {
          switch (result.response.data.message){
            case "User not found":
              this.credentialsError = 'Такого пользователя не существует'
              break;

            case "Invalid credentials":
              this.credentialsError = 'Пароль введен не верно'
              break;

            case "Username and password are required":
              this.credentialsError = 'Вы не ввели логин и/или пароль'
              break;
          }
        }
      }).catch(error => {
        console.log(error)
      })


      // fetch("http://62.113.96.171:3000/login", {
      //   method: "POST",
      //   headers: myHeaders,
      //   body: JSON.stringify({
      //
      //   }),
      // })
      //     .then((response) => response.json())
      //     .then((result) => {
      //       if (result.success === false) {
      //

      //
      //
      //       } else {
      //         localStorage.setItem('token', result.token)
      //         if (this.inputUsername === 'admin') {
      //           localStorage.setItem('role', 'admin')
      //
      //         }
      //
      //         localStorage.setItem('username', this.inputUsername)
      //         this.$router.go()
      //       }
      //
      //
      //     })
      //     .catch((error) => {
      //       console.error(error.message)
      //     });

    },
    checkForm () {
      this.errors = []

      if (this.projectName.length < 5) {
        this.errors.push('Название услуги должно быть не менее 5 символов')
        this.$refs.projectName.style.borderColor = 'red'
      } else {
        this.$refs.projectName.style.borderColor = 'transparent'
      }

      if (this.projectDescription.length < 30) {
        this.errors.push('Описание услуги не должно быть меньше 30 символов')
        this.$refs.projectDescription.style.borderColor = 'red'
      } else {
        this.$refs.projectDescription.style.borderColor = 'transparent'
      }

      if (this.errors.length > 0 ) {
        setTimeout(()=> {
          this.$refs.errors.scrollIntoView({ behavior: 'smooth', block: 'center'})
        }, 20)
      } else {
        this.editable = false
        this.$emit('changed', {
          id: this.$props.id,
          newName: this.projectName,
          newDescription: this.projectDescription
        })
      }

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

              if (result.success === false) {
                switch (result.message) {

                  case 'Username and password are required':
                    this.credentialsError = 'Не введен логин и пароль'
                    break
                  case "Username already exists":
                    this.credentialsError = 'Такой пользователь существует'
                    break
                  case '':
                    this.credentialsError = ''
                    break
                }
              } else {
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
                      this.$router.go()

                    })
                    .catch((error) => {
                      console.error(error.message)
                    });
              }

            })
            .catch((error) => {
              console.error(error.message)
            });
      }



    }
  }
}
</script>

<style scoped lang="scss">
.h2 {
  color: #000;

  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
}
.modal {

}
.form {


  .switch {
    background-color: transparent;
    border: none;
    cursor: pointer;
    opacity: .5;
    transition: .3s ease;
    margin-top: 0px;
    color: #000;
    width: 100%;
    text-align: left;

    font-family: 'Montserrat', sans-serif;
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
  border-radius: 5px;
}
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.2s;
  max-height: 230px;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  opacity: 0;
  max-height: 0px;
}
</style>