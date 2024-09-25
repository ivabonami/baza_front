<template>
<div>
  <div>
    <DefaultHeader>
      Покинуть базу?
    </DefaultHeader>
    <p style="text-align: center; color: #5D599F">
      Вы собираетесь перейти по <b>внешней ссылке</b> и покинуть BAZA, мы проверяем наши ссылки, но хотели бы знать, вы точно хотите это сделать?
    </p>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'link'"
          style="margin-top: 10px;"
          :link="'https://t.me/bitmafia_bot'"
          @click="() => {
            this.loading = false
            closePopup()
          }">
        <TheLoader v-if="loading"/>
        <span>Да, перейти</span>
      </ButtonPrimary>

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="closePopup()">
        <span>Остаться на BAZA</span>
      </ButtonSecondary>



    </div>


  </div>

</div>
</template>

<script>
import InputText from "@/components/Inputs/InputText.vue";
import InputPassword from "@/components/Inputs/InputPassword.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import userIcon from '@/assets/icons/user-icon.svg'
import lockIcon from '@/assets/icons/lock-icon.svg'
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup} from "@/js/controllers/popupController.js";



export default {
  components: {
    InputText,
    InputPassword,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    closePopup
  },
  data() {
    return {
      userIcon,
      lockIcon,
      data: {
        username: null,
        password: null
      },
      closePopup,
      loading: ref(false)
    }
  },
  methods: {

  }
}



</script>

<style scoped lang="scss">
.buttons-group {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
}
</style>