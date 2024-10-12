<template>
<div>
  <div>

    <DefaultHeader>
      {{ popup.product.name }}
    </DefaultHeader>
    <div class="info">
      <div class="image">
        <img :src="api.url + popup.product.avatarFilePath" alt="">
      </div>
      <div class="text">
        {{ popup.product.description }}
      </div>
    </div>
    <div class="buttons-group">

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="closePopup()">
        <div class="button-content">
          Закрыть окно
        </div>
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
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import ProjectLinkItem from "@/components/Layout/Project/ProjectLinkItem.vue";
import {api} from "@/API/apiurl.js";

export default {
  components: {
    InputText,
    InputPassword,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    closePopup,
    ProjectLinkItem
  },
  data() {
    return {
      popup,
      api,
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
  box-sizing: border-box;
  .button-wrapper {
    width: 50%;
  }
}
h2 {
  margin-top: 10px;
}

.info {
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;

  .image {
    width: 40%;
    border-radius: 20px;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    box-sizing: border-box;
    color: #191B2A;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 154.183%;
    aspect-ratio: 1 / 1;
    overflow: hidden;

    img {
      height: 100%;
    }
  }
  .text {
    width: 55%;
  }
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
</style>