<template>
  <div v-if="this.isAdmin === true">

    <h1>Админка</h1>
    <p>Ты админ или юзер, расслабься :)
      <a href="/admin">Перейти в панель</a></p>
  </div>

  <div v-else>
    <h1>Залогиньтесь</h1>
    <div class="form">
      <div class="username-input-wrapper">
        <label for="username">Username</label>
        <input type="text" id="username-input" class="input">
      </div>
      <div class="password-input-wrapper">
        <label for="password">Password</label>
        <input type="password" id="password-input" class="input">
      </div>
      <div class="error-box" v-if="this.error === true">
        <p>Username or password is invalid</p>
      </div>
      <div class="btn btn-submit" id="password-input" v-on:click="this.credentialCheck()">
        Залогиниться
      </div>
    </div>
  </div>


</template>

<script>
export default {
  data() {
    return {
      name: "AdminView.vue",
      isAdmin: false,
      testLogin: 'admin',
      testPassword: 'password',
      error: false
    }
  },
  mounted() {
    if (localStorage.getItem('isAdmin') === 'false') {
      this.isAdmin = false
    } else if (localStorage.getItem('isAdmin') === null) {
      localStorage.setItem('isAdmin', 'false')
      this.isAdmin = false
    } else {
      this.isAdmin = true
    }

  },
  methods: {
    credentialCheck(username, password) {
      username = document.querySelector('#username-input')
      password = document.querySelector('#password-input')

      console.log(this.error, username, password)

      if (username.value === this.testLogin && password.value === this.testPassword) {
        this.isAdmin = true;
        this.error = false;
        localStorage.setItem('isAdmin', 'true')
      } else {
        this.error = true;
        username.classList.add('error')
        password.classList.add('error')
      }
    }
  }
  
}
</script>

<style lang='scss'>
.username-input-wrapper, .password-input-wrapper {
  display: flex;
  flex-wrap: wrap;

  margin-bottom: 20px;
  input {
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;

    &.error {
      border-color: red;
    }

  }
  label {
    font-weight: 600;
  }

}
.error-box {
  margin-bottom: 20px;
  color: red;
}
</style>