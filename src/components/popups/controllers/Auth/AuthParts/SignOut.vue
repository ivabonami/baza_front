<template>
  <div>
    <p>Вы действительно хотите выйти из аккаунта?<br> Убедитесь что вы сохранили логин и пароль.</p>

    <div class="buttons-group">
      <button-black
          :type="'button'"
          :style="'filled'"
          style="margin-top: 10px;"
          @click="onSignOut()">
        <span>Выйти</span>
      </button-black>

      <ButtonSecondary
          style="margin-top: 10px;"
          @click="emits('closePopup')">
        <span>Остаться на базе</span>
      </ButtonSecondary>
    </div>
  </div>
</template>

<script setup>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {signOut} from "@/Stores/userStore.js";
import {addNotice} from "@/js/notifications.js";

const data = {
  username: null,
  password: null,
  repeat: null
}

const emits = defineEmits(['closePopup'])

const onSignOut = () => {
  try {
    signOut()

    addNotice({name: 'Вы успешно вышли из аккаунта', type: 'success'})
    emits('closePopup')

  } catch (e) {
    addNotice({name: 'Ошибка при выходе из аккаунта', type: 'danger'})

  }


}


</script>

<style scoped>
p {
  width: 100%;
}
</style>